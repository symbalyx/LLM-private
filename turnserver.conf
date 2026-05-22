"""
Symbalyx — Assistant IA Matrix local avec mémoire longue façon Obsidian.

Objectif :
- rester 100% local (Matrix + Ollama, zéro cloud) ;
- garder une mémoire long terme dans des fichiers Markdown lisibles ;
- retrouver cette mémoire dans les prochaines réponses ;
- apprendre des corrections/feedbacks sans réentraîner le modèle ;
- générer des fichiers .html propres ;
- aider à diagnostiquer et patcher des bugs.

Commandes principales :
    !help
    !persona <assistant|secrétaire|coach|expert|devweb>
    !remember <texte>       mémorise une info durable en Markdown
    !recall <recherche>      recherche dans la mémoire long terme
    !memories [N]            affiche les dernières mémoires
    !learn <texte>           enregistre une leçon/règle réutilisable
    !feedback <texte>        corrige l'assistant pour les prochaines fois
    !html <brief>            génère un fichier HTML propre dans /data/generated/html
    !patch <bug/code>        propose un diagnostic + patch/diff
    !summary [N]
    !forget                  efface seulement le contexte court de la room

Important : "s'améliorer avec le temps" signifie ici améliorer les réponses par
mémoire récupérée + règles apprises. Les poids du modèle Ollama ne sont pas
réentraînés automatiquement.
"""

from __future__ import annotations

import asyncio
import hashlib
import json
import logging
import os
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import httpx
from nio import (
    AsyncClient,
    AsyncClientConfig,
    InviteEvent,
    LoginResponse,
    MegolmEvent,
    RoomMessageText,
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
log = logging.getLogger("symbalyx-assistant")

HOMESERVER = os.getenv("HOMESERVER", "http://synapse:8008")
BOT_USERNAME = os.getenv("BOT_USERNAME", "assistant")
BOT_PASSWORD = os.getenv("BOT_PASSWORD")
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://ollama:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2:3b")
STORE_DIR = Path(os.getenv("BOT_STORE", "/data/store"))
SERVER_NAME = os.getenv("SERVER_NAME", "localhost")

MEMORY_DIR = Path(os.getenv("ASSISTANT_MEMORY_DIR", "/data/memory"))
GENERATED_DIR = Path(os.getenv("ASSISTANT_GENERATED_DIR", "/data/generated"))
AUTO_MEMORY = os.getenv("ASSISTANT_AUTO_MEMORY", "true").lower() in {"1", "true", "yes", "on"}
MAX_TURNS = int(os.getenv("ASSISTANT_MAX_TURNS", "12"))
MAX_RECALL = int(os.getenv("ASSISTANT_MAX_RECALL", "6"))
MAX_MESSAGE_CHARS = int(os.getenv("ASSISTANT_MAX_MESSAGE_CHARS", "12000"))

PERSONAS = {
    "assistant": (
        "Tu es l'assistant local Symbalyx. Tu es clair, utile, concret, en français. "
        "Tu utilises la mémoire fournie quand elle est pertinente, sans l'inventer. "
        "Tu dis quand tu n'es pas sûr. Réponse concise sauf demande détaillée."
    ),
    "secrétaire": (
        "Tu es une secrétaire professionnelle. Tu aides à rédiger, organiser, reformuler, "
        "faire des comptes rendus et préparer des messages. Ton français est propre, sobre, efficace."
    ),
    "coach": (
        "Tu es un coach direct et bienveillant. Tu transformes les idées en prochaines actions. "
        "Tu poses peu de questions, tu proposes surtout un plan clair."
    ),
    "expert": (
        "Tu es un expert généraliste précis. Tu sépares les faits, hypothèses, risques et actions. "
        "Tu évites les promesses vagues et tu signales les limites."
    ),
    "devweb": (
        "Tu es un développeur web senior. Tu produis du HTML/CSS/JS propre, responsive, accessible, "
        "sans dépendances inutiles. Tu patches les bugs avec des explications courtes et un diff clair."
    ),
}

HTML_SYSTEM = """
Tu es un intégrateur web senior.
Génère un fichier HTML complet, propre, premium et maintenable.

Contraintes obligatoires :
- Réponds uniquement avec le code HTML complet, sans commentaire autour.
- Un seul fichier .html autonome.
- HTML sémantique, CSS dans <style>, JS dans <script> uniquement si utile.
- Responsive mobile/tablette/desktop.
- Accessibilité : labels, aria si utile, contrastes corrects, focus visible.
- Pas de CDN obligatoire, pas de tracking, pas de framework.
- Design sobre, crédible, pas "site IA générique".
- Code lisible, classes propres, pas d'énormes répétitions.
""".strip()

PATCH_SYSTEM = """
Tu es un développeur senior chargé de corriger des bugs.
Tu dois produire :
1. Diagnostic probable.
2. Cause racine.
3. Patch conseillé en diff unifié si le code fourni permet de le faire.
4. Tests manuels rapides.
5. Risques à vérifier.

Sois direct. Si le code fourni est insuffisant, donne le patch minimal le plus sûr et précise ce qui manque.
""".strip()

HELP_TEXT = """
Commandes Symbalyx IA :

• !persona <assistant|secrétaire|coach|expert|devweb>
• !remember <texte>  — ajoute une mémoire durable en Markdown
• !recall <recherche> — recherche dans la mémoire long terme
• !memories [N] — affiche les dernières mémoires
• !learn <texte> — enregistre une règle/leçon réutilisable
• !feedback <texte> — corrige mon comportement futur
• !html <brief> — crée un fichier .html propre dans /data/generated/html
• !patch <bug/code> — diagnostic + patch/diff
• !summary [N] — résume les N derniers messages
• !forget — efface seulement le contexte court de cette conversation

La mémoire est stockée dans /data/memory au format Markdown, lisible comme un coffre Obsidian local.
""".strip()


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def day_stamp() -> str:
    return datetime.now().strftime("%Y-%m-%d")


def slugify(value: str, fallback: str = "note") -> str:
    value = value.lower().strip()
    value = re.sub(r"[^\w\s-]", "", value, flags=re.UNICODE)
    value = re.sub(r"[\s_-]+", "-", value).strip("-")
    return (value or fallback)[:80]


def safe_room_id(room_id: str) -> str:
    return hashlib.sha256(room_id.encode("utf-8")).hexdigest()[:16]


def compact(text: str, limit: int = 1800) -> str:
    text = (text or "").strip()
    return text if len(text) <= limit else text[: limit - 20].rstrip() + "\n…[tronqué]"


def tokens(text: str) -> set[str]:
    return {t for t in re.findall(r"[a-zA-ZÀ-ÿ0-9_]{3,}", text.lower()) if len(t) >= 3}


def extract_code_block(text: str, lang: str = "html") -> str:
    fence = re.search(rf"```(?:{lang})?\s*(.*?)```", text, re.IGNORECASE | re.DOTALL)
    if fence:
        return fence.group(1).strip()
    return text.strip()


async def ollama_chat_messages(messages: list[dict[str, str]], timeout: int = 240) -> str:
    async with httpx.AsyncClient(timeout=timeout) as c:
        try:
            r = await c.post(
                f"{OLLAMA_URL}/api/chat",
                json={"model": OLLAMA_MODEL, "messages": messages, "stream": False},
            )
            r.raise_for_status()
            data = r.json()
            return ((data.get("message") or {}).get("content") or "").strip() or "(réponse vide)"
        except httpx.HTTPError as exc:
            log.exception("Ollama chat error")
            return f"⚠ Modèle local indisponible : {exc}"


async def ollama_generate(prompt: str, system: str | None = None, timeout: int = 240) -> str:
    if system:
        messages = [{"role": "system", "content": system}, {"role": "user", "content": prompt}]
        return await ollama_chat_messages(messages, timeout=timeout)

    async with httpx.AsyncClient(timeout=timeout) as c:
        try:
            r = await c.post(
                f"{OLLAMA_URL}/api/generate",
                json={"model": OLLAMA_MODEL, "prompt": prompt, "stream": False},
            )
            r.raise_for_status()
            return (r.json().get("response") or "").strip()
        except httpx.HTTPError as exc:
            log.exception("Ollama generate error")
            return f"⚠ Modèle local indisponible : {exc}"


class MemoryVault:
    """Vault Markdown local, volontairement simple et lisible."""

    def __init__(self, root: Path) -> None:
        self.root = root
        self.rooms_dir = root / "rooms"
        self.global_dir = root / "global"
        self.index_path = root / "index.jsonl"
        self.lessons_path = self.global_dir / "lessons.md"
        self.feedback_path = self.global_dir / "feedback.md"
        self.root.mkdir(parents=True, exist_ok=True)
        self.rooms_dir.mkdir(parents=True, exist_ok=True)
        self.global_dir.mkdir(parents=True, exist_ok=True)

    def room_dir(self, room_id: str) -> Path:
        d = self.rooms_dir / safe_room_id(room_id)
        d.mkdir(parents=True, exist_ok=True)
        return d

    def append_memory(
        self,
        room_id: str,
        title: str,
        body: str,
        *,
        kind: str = "memory",
        tags: list[str] | None = None,
        source: str = "manual",
    ) -> dict[str, Any]:
        tags = tags or []
        item_id = hashlib.sha1(f"{now_iso()}-{room_id}-{title}-{body}".encode()).hexdigest()[:12]
        title = title.strip() or "Mémoire"
        body = body.strip()
        created = now_iso()

        note = {
            "id": item_id,
            "created": created,
            "room_hash": safe_room_id(room_id),
            "kind": kind,
            "title": title,
            "text": body,
            "tags": tags,
            "source": source,
        }

        md = [
            f"## {title}",
            "",
            f"- id: `{item_id}`",
            f"- created: `{created}`",
            f"- kind: `{kind}`",
            f"- source: `{source}`",
            f"- tags: {' '.join('#' + slugify(t, 'tag') for t in tags) if tags else '—'}",
            "",
            body,
            "",
        ]

        day_file = self.room_dir(room_id) / f"{day_stamp()}.md"
        with day_file.open("a", encoding="utf-8") as f:
            f.write("\n".join(md) + "\n")

        with self.index_path.open("a", encoding="utf-8") as f:
            f.write(json.dumps(note, ensure_ascii=False) + "\n")

        return note

    def append_global(self, path: Path, title: str, body: str) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("a", encoding="utf-8") as f:
            f.write(f"\n## {title}\n\n- date: `{now_iso()}`\n\n{body.strip()}\n")

    def add_lesson(self, room_id: str, body: str) -> dict[str, Any]:
        self.append_global(self.lessons_path, "Leçon apprise", body)
        return self.append_memory(room_id, "Leçon apprise", body, kind="lesson", tags=["lesson", "improvement"], source="!learn")

    def add_feedback(self, room_id: str, body: str) -> dict[str, Any]:
        self.append_global(self.feedback_path, "Feedback utilisateur", body)
        return self.append_memory(room_id, "Feedback utilisateur", body, kind="feedback", tags=["feedback", "improvement"], source="!feedback")

    def iter_index(self) -> list[dict[str, Any]]:
        if not self.index_path.exists():
            return []
        out = []
        for line in self.index_path.read_text(encoding="utf-8").splitlines():
            try:
                out.append(json.loads(line))
            except json.JSONDecodeError:
                continue
        return out

    def recent(self, room_id: str | None = None, limit: int = 8) -> list[dict[str, Any]]:
        items = self.iter_index()
        if room_id:
            rh = safe_room_id(room_id)
            items = [i for i in items if i.get("room_hash") == rh]
        return list(reversed(items[-limit:]))

    def search(self, query: str, room_id: str | None = None, limit: int = 6) -> list[dict[str, Any]]:
        q = tokens(query)
        if not q:
            return self.recent(room_id, limit)

        items = self.iter_index()
        rh = safe_room_id(room_id) if room_id else None
        scored: list[tuple[int, dict[str, Any]]] = []

        for item in items:
            text = " ".join([
                item.get("title", ""),
                item.get("text", ""),
                " ".join(item.get("tags", [])),
                item.get("kind", ""),
            ])
            item_tokens = tokens(text)
            score = len(q & item_tokens) * 3

            # Bonus room courante, sans exclure les souvenirs globaux.
            if rh and item.get("room_hash") == rh:
                score += 2

            # Bonus si les mots exacts apparaissent.
            low = text.lower()
            for t in q:
                if t in low:
                    score += 1

            if score > 0:
                scored.append((score, item))

        scored.sort(key=lambda x: x[0], reverse=True)
        return [item for _, item in scored[:limit]]

    def context_block(self, query: str, room_id: str) -> str:
        results = self.search(query, room_id=room_id, limit=MAX_RECALL)
        if not results:
            return "Aucune mémoire pertinente trouvée."

        lines = []
        for item in results:
            tags = " ".join("#" + t for t in item.get("tags", []))
            lines.append(
                f"- [{item.get('kind')}] {item.get('title')} {tags}\n"
                f"  {compact(item.get('text', ''), 500)}"
            )
        return "\n".join(lines)


class PersistentState:
    def __init__(self, path: Path) -> None:
        self.path = path
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.data: dict[str, dict[str, Any]] = {}
        self.load()

    def load(self) -> None:
        if self.path.exists():
            try:
                self.data = json.loads(self.path.read_text(encoding="utf-8"))
            except Exception:
                log.warning("Impossible de charger state.json, reset mémoire courte")
                self.data = {}

    def save(self) -> None:
        self.path.write_text(json.dumps(self.data, ensure_ascii=False, indent=2), encoding="utf-8")

    def for_room(self, room_id: str) -> dict[str, Any]:
        key = safe_room_id(room_id)
        if key not in self.data:
            self.data[key] = {"persona": "assistant", "history": []}
        return self.data[key]


class Assistant:
    def __init__(self) -> None:
        STORE_DIR.mkdir(parents=True, exist_ok=True)
        GENERATED_DIR.mkdir(parents=True, exist_ok=True)

        self.vault = MemoryVault(MEMORY_DIR)
        self.state = PersistentState(STORE_DIR / "state.json")

        config = AsyncClientConfig(store_sync_tokens=True, encryption_enabled=True)
        self.client = AsyncClient(
            HOMESERVER,
            f"@{BOT_USERNAME}:{SERVER_NAME}",
            store_path=str(STORE_DIR),
            config=config,
        )

    async def login(self) -> None:
        if not BOT_PASSWORD:
            raise RuntimeError("BOT_PASSWORD est requis")

        device_id_file = STORE_DIR / "device_id"
        device_id = device_id_file.read_text().strip() if device_id_file.exists() else None

        resp = await self.client.login(
            BOT_PASSWORD,
            device_name="Symbalyx Assistant Memory",
            device_id=device_id,
        )
        if not isinstance(resp, LoginResponse):
            raise RuntimeError(f"Login échoué : {resp}")

        device_id_file.write_text(self.client.device_id or "")
        log.info("Connecté comme %s (%s)", self.client.user_id, self.client.device_id)

    async def send(self, room_id: str, body: str) -> None:
        body = compact(body, MAX_MESSAGE_CHARS)
        await self.client.room_send(
            room_id=room_id,
            message_type="m.room.message",
            content={"msgtype": "m.text", "body": body},
            ignore_unverified_devices=True,
        )

    async def auto_join(self, room_id: str, _event: InviteEvent) -> None:
        log.info("Invitation reçue pour %s, jonction…", room_id)
        await self.client.join(room_id)
        await asyncio.sleep(2)
        await self.send(
            room_id,
            "Bonjour 👋 Je suis l'assistant local Symbalyx. "
            "J'ai maintenant une mémoire longue Markdown façon Obsidian, "
            "un générateur HTML et un mode patch/debug. Tape !help."
        )

    async def fetch_history(self, room_id: str, n: int = 30) -> list[str]:
        resp = await self.client.room_messages(room_id, start="", limit=n)
        out: list[str] = []
        for ev in (getattr(resp, "chunk", None) or []):
            content = getattr(ev, "body", None) or getattr(ev, "content", {}).get("body")
            sender = getattr(ev, "sender", "?")
            if content:
                short = sender.split(":")[0].lstrip("@")
                out.append(f"{short}: {content}")
        return list(reversed(out))

    async def chat_with_memory(self, room_id: str, persona: str, history: list[dict[str, str]], user_msg: str) -> str:
        memory_context = self.vault.context_block(user_msg, room_id)
        system = (
            f"{PERSONAS.get(persona, PERSONAS['assistant'])}\n\n"
            "Mémoire longue pertinente récupérée depuis le vault Markdown local :\n"
            f"{memory_context}\n\n"
            "Règle : utilise cette mémoire seulement si elle aide vraiment. "
            "Ne prétends jamais avoir réentraîné ton modèle : tu t'améliores par mémoire et feedback."
        )

        messages: list[dict[str, str]] = [{"role": "system", "content": system}]
        for turn in history[-MAX_TURNS:]:
            messages.append({"role": "user", "content": turn["user"]})
            messages.append({"role": "assistant", "content": turn["bot"]})
        messages.append({"role": "user", "content": user_msg})

        return await ollama_chat_messages(messages)

    async def maybe_extract_memory(self, room_id: str, user_msg: str, reply: str) -> None:
        if not AUTO_MEMORY:
            return

        prompt = f"""
Tu dois décider s'il y a des informations DURABLES à mémoriser pour aider l'assistant plus tard.
Ne mémorise pas les banalités ni les messages temporaires.
Mémorise seulement :
- préférences stables ;
- décisions de projet ;
- règles de code/design réutilisables ;
- bugs corrigés et causes racines ;
- infos importantes sur le projet.

Réponds en JSON strict :
{{"memories":[{{"title":"...","text":"...","tags":["..."]}}]}}

Message utilisateur :
{user_msg}

Réponse assistant :
{reply}
""".strip()

        raw = await ollama_generate(prompt, timeout=120)
        try:
            match = re.search(r"\{.*\}", raw, re.DOTALL)
            data = json.loads(match.group(0) if match else raw)
            memories = data.get("memories", [])[:3]
            for mem in memories:
                text = str(mem.get("text", "")).strip()
                title = str(mem.get("title", "Mémoire auto")).strip()
                tags = [slugify(str(t), "tag") for t in mem.get("tags", [])][:6]
                if len(text) >= 30:
                    self.vault.append_memory(room_id, title, text, kind="auto", tags=tags, source="auto")
        except Exception:
            log.debug("Auto-memory ignorée, JSON invalide: %s", compact(raw, 500))

    async def cmd_html(self, room_id: str, brief: str) -> None:
        if not brief:
            await self.send(room_id, "Donne un brief après !html. Exemple : `!html landing page premium studio web Bordeaux`")
            return

        await self.send(room_id, "Je génère un fichier HTML propre en local…")
        prompt = (
            "Brief utilisateur :\n"
            f"{brief}\n\n"
            "Génère maintenant le fichier HTML complet."
        )
        raw = await ollama_generate(prompt, system=HTML_SYSTEM, timeout=300)
        html = extract_code_block(raw, "html")

        if "<html" not in html.lower():
            html = "<!doctype html>\n<html lang=\"fr\">\n<head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>Symbalyx</title></head><body>\n" + html + "\n</body></html>"

        out_dir = GENERATED_DIR / "html"
        out_dir.mkdir(parents=True, exist_ok=True)
        filename = f"{datetime.now().strftime('%Y%m%d-%H%M%S')}-{slugify(brief, 'site')}.html"
        path = out_dir / filename
        path.write_text(html, encoding="utf-8")

        self.vault.append_memory(
            room_id,
            "HTML généré",
            f"Fichier généré : `{path}`\nBrief : {brief}",
            kind="artifact",
            tags=["html", "generated"],
            source="!html",
        )

        preview = compact(html, 3500)
        await self.send(
            room_id,
            f"✅ Fichier HTML créé : `{path}`\n\n"
            f"Aperçu du code :\n```html\n{preview}\n```"
        )

    async def cmd_patch(self, room_id: str, content: str) -> None:
        if not content:
            await self.send(room_id, "Colle le bug, l'erreur console ou le code après !patch.")
            return

        memory_context = self.vault.context_block(content, room_id)
        prompt = (
            "Mémoire de projet utile :\n"
            f"{memory_context}\n\n"
            "Bug/code à corriger :\n"
            f"{content}\n\n"
            "Produis le diagnostic et le patch."
        )
        result = await ollama_generate(prompt, system=PATCH_SYSTEM, timeout=300)

        out_dir = GENERATED_DIR / "patches"
        out_dir.mkdir(parents=True, exist_ok=True)
        filename = f"{datetime.now().strftime('%Y%m%d-%H%M%S')}-patch.md"
        path = out_dir / filename
        path.write_text(result, encoding="utf-8")

        self.vault.append_memory(
            room_id,
            "Patch/debug généré",
            f"Patch sauvegardé : `{path}`\nContexte : {compact(content, 1200)}",
            kind="debug",
            tags=["patch", "bugfix"],
            source="!patch",
        )

        await self.send(room_id, f"🛠️ Patch sauvegardé : `{path}`\n\n{result}")

    async def handle_text(self, room, event: RoomMessageText) -> None:
        if event.sender == self.client.user_id:
            return

        body = (event.body or "").strip()
        if not body:
            return

        room_id = room.room_id
        st = self.state.for_room(room_id)
        lower = body.lower()

        # Personas
        m = re.match(r"^!persona\s+([\wÀ-ÿ-]+)", body, re.IGNORECASE)
        if m:
            persona = m.group(1).lower()
            if persona not in PERSONAS:
                await self.send(room_id, f"Persona inconnu. Choix : {', '.join(PERSONAS)}")
                return
            st["persona"] = persona
            self.state.save()
            await self.send(room_id, f"Persona changé : {persona}")
            return

        if lower.startswith("!help"):
            await self.send(room_id, HELP_TEXT)
            return

        if lower.startswith("!forget"):
            st["history"] = []
            self.state.save()
            await self.send(room_id, "Contexte court effacé. La mémoire longue Markdown reste conservée.")
            return

        # Mémoire manuelle
        if lower.startswith("!remember") or lower.startswith("!memo"):
            text = re.sub(r"^!(remember|memo)\s*", "", body, flags=re.IGNORECASE).strip()
            if not text:
                await self.send(room_id, "Ajoute le texte à mémoriser après !remember.")
                return
            item = self.vault.append_memory(room_id, "Mémoire manuelle", text, kind="manual", tags=["memo"], source="!remember")
            await self.send(room_id, f"🧠 Mémoire enregistrée : `{item['id']}`")
            return

        if lower.startswith("!learn"):
            text = body[len("!learn"):].strip()
            if not text:
                await self.send(room_id, "Ajoute la règle/leçon à apprendre après !learn.")
                return
            item = self.vault.add_lesson(room_id, text)
            await self.send(room_id, f"✅ Leçon enregistrée dans le vault : `{item['id']}`")
            return

        if lower.startswith("!feedback"):
            text = body[len("!feedback"):].strip()
            if not text:
                await self.send(room_id, "Ajoute le feedback après !feedback.")
                return
            item = self.vault.add_feedback(room_id, text)
            await self.send(room_id, f"✅ Feedback mémorisé : `{item['id']}`")
            return

        if lower.startswith("!recall"):
            query = body[len("!recall"):].strip()
            results = self.vault.search(query, room_id=room_id, limit=8)
            if not results:
                await self.send(room_id, "Aucune mémoire trouvée.")
                return

            lines = ["Mémoires trouvées :"]
            for item in results:
                tags = " ".join("#" + t for t in item.get("tags", []))
                lines.append(
                    f"\n• `{item.get('id')}` — {item.get('title')} [{item.get('kind')}] {tags}\n"
                    f"{compact(item.get('text', ''), 700)}"
                )
            await self.send(room_id, "\n".join(lines))
            return

        m = re.match(r"^!memories(?:\s+(\d+))?", body, re.IGNORECASE)
        if m:
            n = min(int(m.group(1) or 8), 20)
            items = self.vault.recent(room_id=room_id, limit=n)
            if not items:
                await self.send(room_id, "Aucune mémoire dans cette conversation.")
                return
            msg = ["Dernières mémoires :"]
            for item in items:
                msg.append(f"• `{item.get('id')}` {item.get('title')} — {compact(item.get('text', ''), 250)}")
            await self.send(room_id, "\n".join(msg))
            return

        if lower.startswith("!obsidian"):
            await self.send(
                room_id,
                "Vault mémoire local :\n"
                f"• Racine : `{MEMORY_DIR}`\n"
                f"• Notes par room : `{MEMORY_DIR / 'rooms'}`\n"
                f"• Index JSONL : `{MEMORY_DIR / 'index.jsonl'}`\n"
                f"• Leçons : `{MEMORY_DIR / 'global' / 'lessons.md'}`\n"
                f"• Feedback : `{MEMORY_DIR / 'global' / 'feedback.md'}`"
            )
            return

        m = re.match(r"^!summary(?:\s+(\d+))?", body, re.IGNORECASE)
        if m:
            n = min(int(m.group(1) or 30), 200)
            await self.send(room_id, f"Récupération des {n} derniers messages…")
            try:
                msgs = await self.fetch_history(room_id, n)
                if not msgs:
                    await self.send(room_id, "Aucun message à résumer.")
                    return
                summary = await ollama_generate(
                    "Résume en français en 3 à 7 puces, avec décisions, dates, bugs et actions :\n\n"
                    + "\n".join(msgs[-n:]),
                    timeout=240,
                )
                self.vault.append_memory(
                    room_id,
                    "Résumé de conversation",
                    summary,
                    kind="summary",
                    tags=["summary"],
                    source="!summary",
                )
                await self.send(room_id, f"Résumé :\n\n{summary}")
            except Exception as exc:
                await self.send(room_id, f"Erreur résumé : {exc}")
            return

        if lower.startswith("!html"):
            await self.cmd_html(room_id, body[len("!html"):].strip())
            return

        if lower.startswith("!patch") or lower.startswith("!debug"):
            content = re.sub(r"^!(patch|debug)\s*", "", body, flags=re.IGNORECASE).strip()
            await self.cmd_patch(room_id, content)
            return

        # Conversation libre avec mémoire longue
        persona = st.get("persona", "assistant")
        history = st.get("history", [])
        reply = await self.chat_with_memory(room_id, persona, history, body)

        history.append({"user": compact(body, 4000), "bot": compact(reply, 4000)})
        st["history"] = history[-MAX_TURNS:]
        self.state.save()

        await self.send(room_id, reply)

        # Apprentissage long terme léger après réponse.
        try:
            await self.maybe_extract_memory(room_id, body, reply)
        except Exception as exc:
            log.debug("Auto-memory skipped: %s", exc)

    async def on_megolm(self, room, event: MegolmEvent) -> None:
        log.warning("Message chiffré non déchiffrable dans %s (clé manquante)", room.room_id)

    async def main(self) -> None:
        await self.login()
        if self.client.should_upload_keys:
            await self.client.keys_upload()

        self.client.add_event_callback(self.handle_text, RoomMessageText)
        self.client.add_event_callback(self.on_megolm, MegolmEvent)
        self.client.add_event_callback(self.auto_join, InviteEvent)

        log.info("Modèle Ollama : %s via %s", OLLAMA_MODEL, OLLAMA_URL)
        log.info("Mémoire longue : %s | generated: %s | auto_memory=%s", MEMORY_DIR, GENERATED_DIR, AUTO_MEMORY)
        await self.client.sync_forever(timeout=30000, full_state=True)


async def main() -> None:
    while True:
        bot = Assistant()
        try:
            await bot.main()
        except Exception as exc:
            log.error("Boucle principale tombée : %s, redémarrage dans 5 s", exc)
            await asyncio.sleep(5)


if __name__ == "__main__":
    asyncio.run(main())
