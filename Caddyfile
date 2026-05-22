"""
Symbalyx — Assistant IA Matrix avec chiffrement E2E (Megolm) et LLM Ollama local.

Connecte un compte Matrix bot (par défaut `@assistant:localhost`) au homeserver,
accepte automatiquement les invitations, déchiffre les messages chiffrés de
bout en bout, et y répond via un modèle Ollama tournant en local. Aucune
donnée ne quitte le serveur.

Commandes reconnues dans les conversations :
    !help              liste les commandes
    !persona <nom>     change le persona (assistant, secrétaire, coach, expert)
    !summary [N]       résume les N derniers messages (défaut 30)
    !notes <texte>     enregistre une note dans le room (relais)
    !forget            efface l'historique conversationnel du bot pour cette room
    <texte libre>      conversation normale, contextualisée

Variables d'environnement :
    HOMESERVER         URL Synapse interne (par défaut http://synapse:8008)
    BOT_USERNAME       login bot (par défaut "assistant")
    BOT_PASSWORD       mot de passe du compte (REQUIS)
    OLLAMA_URL         endpoint Ollama (par défaut http://ollama:11434)
    OLLAMA_MODEL       nom du modèle (par défaut llama3.2:3b)
    BOT_STORE          chemin du store nio (par défaut /data/store)
"""

import asyncio
import json
import logging
import os
import re
from pathlib import Path

import httpx
from nio import (
    AsyncClient,
    AsyncClientConfig,
    InviteEvent,
    LoginResponse,
    MegolmEvent,
    RoomMessageText,
    SyncResponse,
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger("assistant")

HOMESERVER   = os.getenv("HOMESERVER",   "http://synapse:8008")
BOT_USERNAME = os.getenv("BOT_USERNAME", "assistant")
BOT_PASSWORD = os.getenv("BOT_PASSWORD")
OLLAMA_URL   = os.getenv("OLLAMA_URL",   "http://ollama:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2:3b")
STORE_DIR    = os.getenv("BOT_STORE",    "/data/store")
SERVER_NAME  = os.getenv("SERVER_NAME",  "localhost")

PERSONAS = {
    "assistant": (
        "Tu es un assistant personnel concis, neutre, professionnel. "
        "Tu réponds en français en 3 phrases maximum sauf si on te demande "
        "une explication détaillée. Pas d'emojis sauf si l'utilisateur en met."
    ),
    "secrétaire": (
        "Tu es une secrétaire pro qui aide à rédiger, reformuler, organiser "
        "des messages et résumer des échanges. Tu vouvoies l'utilisateur. "
        "Tu réponds en français, ton soigné et synthétique."
    ),
    "coach": (
        "Tu es un coach bienveillant et direct. Tu poses des questions "
        "ouvertes, tu reformules, tu suggères des actions concrètes. "
        "Réponses courtes en français."
    ),
    "expert": (
        "Tu es un expert généraliste très précis. Tu vérifies tes faits, "
        "tu indiques clairement quand tu ne sais pas. Réponses structurées "
        "en français, à l'écrit clair."
    ),
}

# Mémoire par room : persona courant + historique court (10 derniers tours)
room_state: dict[str, dict] = {}
MAX_TURNS = 10


def state_for(room_id: str) -> dict:
    if room_id not in room_state:
        room_state[room_id] = {"persona": "assistant", "history": []}
    return room_state[room_id]


async def ollama_chat(persona: str, history: list[dict], user_msg: str) -> str:
    """Appelle Ollama en mode /api/chat avec l'historique récent."""
    messages = [{"role": "system", "content": PERSONAS.get(persona, PERSONAS["assistant"])}]
    for turn in history[-MAX_TURNS:]:
        messages.append({"role": "user",      "content": turn["user"]})
        messages.append({"role": "assistant", "content": turn["bot"]})
    messages.append({"role": "user", "content": user_msg})

    async with httpx.AsyncClient(timeout=180) as c:
        try:
            r = await c.post(
                f"{OLLAMA_URL}/api/chat",
                json={"model": OLLAMA_MODEL, "messages": messages, "stream": False},
            )
            r.raise_for_status()
            data = r.json()
            return (data.get("message") or {}).get("content", "").strip() \
                or "(réponse vide)"
        except httpx.HTTPError as e:
            log.error(f"Ollama error: {e}")
            return f"⚠ Le modèle local est indisponible : {e}"


async def ollama_summary(text: str) -> str:
    prompt = (
        "Voici une transcription de conversation ou d'appel. "
        "Résume-la en français en 3 à 5 puces concises, "
        "en gardant les décisions, dates et chiffres précis.\n\n"
        f"---\n{text}\n---\n\nRésumé :"
    )
    async with httpx.AsyncClient(timeout=180) as c:
        r = await c.post(
            f"{OLLAMA_URL}/api/generate",
            json={"model": OLLAMA_MODEL, "prompt": prompt, "stream": False},
        )
        r.raise_for_status()
        return r.json().get("response", "").strip()


HELP_TEXT = (
    "Commandes :\n"
    "• !persona <assistant|secrétaire|coach|expert>\n"
    "• !summary [N]   — résume les N derniers messages (défaut 30)\n"
    "• !notes <texte> — relais d'une note\n"
    "• !forget        — efface le contexte de cette conversation\n"
    "• !help          — cette aide\n\n"
    "Sinon, écris-moi normalement, je réponds avec le persona en cours."
)


class Assistant:
    def __init__(self) -> None:
        Path(STORE_DIR).mkdir(parents=True, exist_ok=True)
        config = AsyncClientConfig(
            store_sync_tokens=True,
            encryption_enabled=True,
        )
        self.client = AsyncClient(
            HOMESERVER,
            f"@{BOT_USERNAME}:{SERVER_NAME}",
            store_path=STORE_DIR,
            config=config,
        )

    async def login(self) -> None:
        if not BOT_PASSWORD:
            raise RuntimeError("BOT_PASSWORD est requis")
        # Tentative avec une device_id stable pour préserver les sessions Megolm
        device_id_file = Path(STORE_DIR) / "device_id"
        device_id = device_id_file.read_text().strip() if device_id_file.exists() else None
        resp = await self.client.login(
            BOT_PASSWORD,
            device_name="Symbalyx Assistant",
            device_id=device_id,
        )
        if not isinstance(resp, LoginResponse):
            raise RuntimeError(f"Login échoué : {resp}")
        device_id_file.write_text(self.client.device_id)
        log.info(f"Connecté comme {self.client.user_id} ({self.client.device_id})")

    async def send(self, room_id: str, body: str) -> None:
        await self.client.room_send(
            room_id=room_id,
            message_type="m.room.message",
            content={"msgtype": "m.text", "body": body},
            ignore_unverified_devices=True,
        )

    async def auto_join(self, room_id: str, _event: InviteEvent) -> None:
        log.info(f"Invitation reçue pour {room_id}, on rejoint…")
        await self.client.join(room_id)
        await asyncio.sleep(2)
        await self.send(
            room_id,
            "Bonjour 👋  Je suis ton assistant local (modèle exécuté chez toi, "
            "aucune donnée ne sort de la machine). Tape !help pour les commandes."
        )

    async def fetch_history(self, room_id: str, n: int = 30) -> list[str]:
        """Récupère les N derniers messages texte du room pour le résumé."""
        resp = await self.client.room_messages(room_id, start="", limit=n)
        out: list[str] = []
        for ev in (resp.chunk or []):
            content = getattr(ev, "body", None) or getattr(ev, "content", {}).get("body")
            sender = getattr(ev, "sender", "?")
            if content:
                short = sender.split(":")[0].lstrip("@")
                out.append(f"{short}: {content}")
        return list(reversed(out))

    async def handle_text(self, room, event: RoomMessageText) -> None:
        if event.sender == self.client.user_id:
            return
        body = (event.body or "").strip()
        if not body:
            return

        st = state_for(room.room_id)
        m = re.match(r"^!persona\s+(\w+)", body, re.IGNORECASE)
        if m:
            p = m.group(1).lower()
            if p not in PERSONAS:
                await self.send(room.room_id, f"Persona inconnu. Choix : {', '.join(PERSONAS)}")
                return
            st["persona"] = p
            await self.send(room.room_id, f"Persona changé : {p}")
            return

        if body.lower().startswith("!help"):
            await self.send(room.room_id, HELP_TEXT)
            return

        if body.lower().startswith("!forget"):
            st["history"] = []
            await self.send(room.room_id, "Contexte effacé pour cette conversation.")
            return

        m = re.match(r"^!summary(?:\s+(\d+))?", body, re.IGNORECASE)
        if m:
            n = int(m.group(1) or 30)
            await self.send(room.room_id, f"Récupération des {n} derniers messages…")
            try:
                msgs = await self.fetch_history(room.room_id, n)
                if not msgs:
                    await self.send(room.room_id, "Aucun message à résumer.")
                    return
                text = "\n".join(msgs[-n:])
                summary = await ollama_summary(text)
                await self.send(room.room_id, f"Résumé des {len(msgs)} derniers messages :\n\n{summary}")
            except Exception as e:
                await self.send(room.room_id, f"Erreur résumé : {e}")
            return

        if body.lower().startswith("!notes"):
            note = body[len("!notes"):].strip()
            if note:
                await self.send(room.room_id, f"📝 Note enregistrée :\n{note}")
            return

        # Conversation libre, contextualisée
        reply = await ollama_chat(st["persona"], st["history"], body)
        st["history"].append({"user": body, "bot": reply})
        await self.send(room.room_id, reply)

    async def on_megolm(self, room, event: MegolmEvent) -> None:
        # Tentative de déchiffrement à la volée si la session n'est pas connue
        log.warning(f"Message chiffré non déchiffrable dans {room.room_id} (clé manquante)")

    async def main(self) -> None:
        await self.login()
        if self.client.should_upload_keys:
            await self.client.keys_upload()
        self.client.add_event_callback(self.handle_text,  RoomMessageText)
        self.client.add_event_callback(self.on_megolm,    MegolmEvent)
        self.client.add_event_callback(self.auto_join,    InviteEvent)
        log.info(f"Modèle Ollama : {OLLAMA_MODEL} via {OLLAMA_URL}")
        await self.client.sync_forever(timeout=30000, full_state=True)


async def main() -> None:
    bot = Assistant()
    while True:
        try:
            await bot.main()
        except Exception as e:
            log.error(f"Boucle principale tombée : {e}, redémarrage dans 5 s")
            await asyncio.sleep(5)


if __name__ == "__main__":
    asyncio.run(main())
