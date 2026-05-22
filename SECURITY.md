# Symbalyx · Messagerie chiffrée locale

Stack Matrix Synapse + Element Web + Element Call + UI custom, 100% locale,
chiffrement E2E natif (Megolm + MatrixRTC), jusqu'à 10 utilisateurs.

> 🟢 **Présentation grand public** : [`GUIDE.md`](./GUIDE.md) — explique chaque fonction sans aucun jargon, avec comparatifs WhatsApp / Signal.
> 🔒 **Audit sécurité** : [`SECURITY.md`](./SECURITY.md) — failles trouvées du point de vue attaquant, correctifs appliqués.

**Features livrées :**
- ✅ Messagerie 1-1 et groupe E2E (Olm/Megolm)
- ✅ Groupes privés créés depuis la UI custom (preset `private_chat` + encryption forcée + history `invited` + guests interdits)
- ✅ Messages éphémères (rétention serveur via `m.room.retention`, configurable par groupe : 1h → 30j)
- ✅ Appels voix et vidéo de groupe E2EE (Element Call + LiveKit SFU, jusqu'à 8 participants)
- ✅ **Mode visiteur (leurre)** : fausses conversations crédibles avec auto-réponses scriptées, quand on passe le téléphone à un inconnu. Activation discrète via 5 taps sur le badge "Chiffré E2E". Aucune connexion réseau pendant le leurre.
- ✅ **Transcription locale** des messages vocaux et **résumé d'appels** via Whisper (100% local, zéro cloud)
- ✅ **PWA installable** sur iOS et Android (manifest + service worker, ajout à l'écran d'accueil)
- ✅ Messages vocaux supportés nativement (Element)
- ✅ Recherche d'utilisateurs / invitations
- ✅ UI custom dark/glassmorphism inspirée Signal (sidebar, badges chiffrement, actions rapides)
- ✅ **Coffre** : conversations masquées accessibles uniquement via code PIN secret (bouton secret dans le profil)
- ✅ **Mode discret** : push silencieux global, read receipts désactivés, typing notifications désactivés
- ✅ **Auto-verrouillage** : session verrouillée après inactivité (1/5/15/30 min), réauth par mot de passe
- ✅ **Sortie de secours** : panic button (logout + effacement local + redirection vers about:blank), raccourci `Ctrl+Shift+Q`
- ✅ **Menu contextuel** sur les rooms (clic droit / long-press mobile) : masquer, couper notifs, quitter
- ✅ Présence (online/last_active) désactivée côté serveur · URL previews désactivés · profils restreints aux salons communs · redactions purgées · devices stales nettoyés
- ✅ Responsive mobile, accès LAN possible

---

## UI sociale + Bots IA visibles

La belle interface Symbalyx est sur le port `8090` :

```txt
http://localhost:8090
```

Sur téléphone, utilisez l'IP du PC :

```txt
http://IP_DU_PC:8090
```

Le port `8080` ouvre Element Web brut. Il sert de secours technique, mais l'interface est volontairement plus basique.

### Faire apparaître les bots IA

Dans l'UI `8090`, les profils IA sont visibles dans la sidebar : Dev Web, Debug, Mémoire et Résumé. Pour avoir aussi un vrai bot Matrix dans les salons, lancez :

```powershell
cd matrix
.\scripts\setup-ai.ps1
```

Puis ouvrez un salon et cliquez **Inviter IA**. Le bot `@assistant:localhost` accepte les invitations et répond aux commandes :

```txt
!help
!remember <fait à retenir>
!recall <recherche>
!learn <règle>
!html <brief>
!patch <bug ou code>
```


## Prérequis

- Windows 10/11
- Docker Desktop **démarré**
- PowerShell en administrateur
- Connaître votre IP locale (`ipconfig` → `Adresse IPv4`)

---

## ÉTAPE 1 — Récupérer le projet

```powershell
cd $env:USERPROFILE
git clone https://github.com/symbalyx/symbalyx-ia.git
cd symbalyx-ia\matrix
```

**Validation :** `dir` affiche `docker-compose.yml`, `element/`, `element-call/`, `ui/`, `config/`.

---

## ÉTAPE 2 — Générer la configuration Synapse

```powershell
docker run -it --rm `
  -v "${PWD}\data\synapse:/data" `
  -e SYNAPSE_SERVER_NAME=localhost `
  -e SYNAPSE_REPORT_STATS=no `
  matrixdotorg/synapse:latest generate
```

**Validation :** `data\synapse\homeserver.yaml` existe.

---

## ÉTAPE 3 — Patcher homeserver.yaml

### 3a. Remplacez la section `database` par :

```yaml
database:
  name: psycopg2
  args:
    user: synapse
    password: synapse_local_pw_change_me
    database: synapse
    host: postgres
    port: 5432
    cp_min: 5
    cp_max: 10
```

### 3b. Ajoutez ce bloc à la fin du fichier :

```yaml
# === Symbalyx base overrides ===
enable_registration: true
enable_registration_without_verification: true
password_config:
  enabled: true

listeners:
  - port: 8008
    tls: false
    type: http
    x_forwarded: true
    bind_addresses: ['0.0.0.0']
    resources:
      - names: [client, federation]
        compress: false

encryption_enabled_by_default_for_room_type: all
federation_domain_whitelist: []
serve_server_wellknown: true

turn_uris: ["turn:VOTRE_IP_LOCALE:3478?transport=udp"]
turn_shared_secret: "symbalyx_turn_secret_change_me"
turn_user_lifetime: 86400000
turn_allow_guests: false

max_upload_size: 50M
```

> Remplacez `VOTRE_IP_LOCALE` par votre IPv4 (ex `192.168.1.42`).

### 3c. Ajoutez **aussi** le contenu de `config/synapse-overrides-v2.yaml` à la fin :

```powershell
Get-Content config\synapse-overrides-v2.yaml | Add-Content data\synapse\homeserver.yaml
```

Ce bloc active :
- l'annonce du focus MatrixRTC (Element Call) via `.well-known/matrix/client`
- la rétention serveur des messages (`m.room.retention`)
- le durcissement vie privée (profils restreints, salons publics fédérés interdits)

**Validation :**

```powershell
Select-String -Path data\synapse\homeserver.yaml -Pattern "rtc_foci"
Select-String -Path data\synapse\homeserver.yaml -Pattern "retention"
```

Les deux doivent renvoyer une ligne.

---

## ÉTAPE 4 — Démarrer la stack

```powershell
docker compose up -d
```

Premier lancement : ~1 Go d'images (Synapse + Element + Element Call + LiveKit + lk-jwt-service + Postgres + coturn + nginx). 2-5 min selon votre connexion.

**Validation :**

```powershell
docker compose ps
```

9 conteneurs attendus, tous `running` / `healthy` :

| Conteneur                 | Rôle                                  |
| ------------------------- | ------------------------------------- |
| `symbalyx_postgres`       | base Matrix                           |
| `symbalyx_synapse`        | homeserver Matrix                     |
| `symbalyx_element`        | client Element Web                    |
| `symbalyx_livekit`        | SFU média (appels groupe)             |
| `symbalyx_lk_jwt`         | bridge auth Matrix ↔ LiveKit          |
| `symbalyx_element_call`   | client appel vidéo groupe E2EE        |
| `symbalyx_coturn`         | TURN/STUN appels 1-1                  |
| `symbalyx_whisper`        | transcription vocale locale           |
| `symbalyx_ui`             | UI custom Symbalyx                    |

Tests rapides :

```powershell
curl http://localhost:8008/health         # OK
curl http://localhost:8008/.well-known/matrix/client   # JSON avec rtc_foci
curl http://localhost:8881/healthz        # OK (lk-jwt-service)
```

---

## ÉTAPE 5 — Créer les comptes utilisateurs

La UI Symbalyx permet maintenant de créer un compte depuis l'écran **Première connexion**.
Pour que ce bouton fonctionne, vérifiez que `enable_registration: true` et `enable_registration_without_verification: true` sont bien présents dans `data/synapse/homeserver.yaml` après application des overrides.

Option alternative plus verrouillée : créer les comptes via la CLI admin du conteneur.

```powershell
# Admin
docker exec -it symbalyx_synapse register_new_matrix_user `
  -u admin -p ChangeMoiAdmin2026 -a `
  -c /data/homeserver.yaml http://localhost:8008

# 9 utilisateurs
docker exec -it symbalyx_synapse register_new_matrix_user -u alice  -p MotDePasseFort1 --no-admin -c /data/homeserver.yaml http://localhost:8008
docker exec -it symbalyx_synapse register_new_matrix_user -u bob    -p MotDePasseFort2 --no-admin -c /data/homeserver.yaml http://localhost:8008
docker exec -it symbalyx_synapse register_new_matrix_user -u carol  -p MotDePasseFort3 --no-admin -c /data/homeserver.yaml http://localhost:8008
docker exec -it symbalyx_synapse register_new_matrix_user -u david  -p MotDePasseFort4 --no-admin -c /data/homeserver.yaml http://localhost:8008
docker exec -it symbalyx_synapse register_new_matrix_user -u eve    -p MotDePasseFort5 --no-admin -c /data/homeserver.yaml http://localhost:8008
docker exec -it symbalyx_synapse register_new_matrix_user -u frank  -p MotDePasseFort6 --no-admin -c /data/homeserver.yaml http://localhost:8008
docker exec -it symbalyx_synapse register_new_matrix_user -u grace  -p MotDePasseFort7 --no-admin -c /data/homeserver.yaml http://localhost:8008
docker exec -it symbalyx_synapse register_new_matrix_user -u henry  -p MotDePasseFort8 --no-admin -c /data/homeserver.yaml http://localhost:8008
docker exec -it symbalyx_synapse register_new_matrix_user -u iris   -p MotDePasseFort9 --no-admin -c /data/homeserver.yaml http://localhost:8008
```

---

## ÉTAPE 6 — Utiliser la messagerie

| URL                          | Quoi                          |
| ---------------------------- | ----------------------------- |
| **`http://localhost:8090`**  | **UI custom Symbalyx**        |

> Sur téléphone, utilisez `http://IP_DU_PC:8090` et non `localhost`. La UI détecte maintenant automatiquement l'IP utilisée pour appeler Matrix.
| `http://localhost:8080`      | Element Web officiel          |
| `http://localhost:8181`      | Element Call standalone       |
| `http://localhost:8008`      | API Synapse                   |

### Créer un groupe privé chiffré

1. Connectez-vous sur `http://localhost:8090` avec `alice / MotDePasseFort1`
2. Cliquez **+ Nouveau groupe privé**
3. Saisissez un nom (ex `Équipe`)
4. Tapez les pseudos à inviter (`bob`, `carol`, …) — autocomplétion via le user directory
5. **Créer le groupe** → chiffrement E2E activé automatiquement

### Activer les messages éphémères sur un groupe

1. Sélectionnez le groupe dans la sidebar
2. Cliquez l'icône **horloge** dans le header
3. Choisissez la durée (1h / 6h / 24h / 7j / 30j) → **Appliquer**

Le badge `Auto-suppression Xh` apparaît sous le nom du groupe. Le serveur purge les anciens events à chaque cycle (1×/jour).

### Assistant IA local (Ollama + bot Matrix E2E)

Symbalyx peut faire tourner un **assistant IA entièrement en local** : aucune donnée ne quitte ta machine. Le LLM est servi par Ollama, et un bot Matrix dédié (`@assistant:localhost`) rejoint les conversations chiffrées pour répondre, résumer, organiser.

**Activation (une fois)** :

```powershell
# 1. Démarrer Ollama + télécharger un modèle léger (~2 Go)
docker compose up -d ollama
docker exec symbalyx_ollama ollama pull llama3.2:3b

# 2. Créer le compte Matrix pour le bot
docker exec -it symbalyx_synapse register_new_matrix_user `
  -u assistant -p ChangeMoiAssistant2026 --no-admin `
  -c /data/homeserver.yaml http://localhost:8008

# 3. Mettre le mot de passe dans .env (à côté du docker-compose.yml)
@"
ASSISTANT_BOT_PASSWORD=ChangeMoiAssistant2026
OLLAMA_MODEL=llama3.2:3b
"@ | Out-File -Encoding ascii .env

# 4. Démarrer le bot (build de l'image au premier coup, 2-3 min)
docker compose --profile ia up -d --build assistant_bot
docker compose logs -f assistant_bot
```

Tu dois voir `Connecté comme @assistant:localhost`. Le bot accepte ensuite **automatiquement** toutes les invitations.

**Inviter le bot dans une conversation** :

Dans Symbalyx, ouvre une conversation → bouton **Membres** → **Inviter l'Assistant IA**. Le bot rejoint sous 5 secondes et envoie un message d'accueil.

**Commandes dans la conversation** :

| Commande | Effet |
|---|---|
| `!help` | Liste les commandes |
| `!persona assistant\|secrétaire\|coach\|expert\|devweb` | Change le ton et l'approche |
| `!summary [N]` | Résume les N derniers messages |
| `!remember <texte>` | Enregistre une mémoire durable |
| `!recall <recherche>` | Recherche dans la mémoire long terme |
| `!learn <texte>` | Ajoute une règle/leçon réutilisable |
| `!feedback <texte>` | Corrige le comportement futur |
| `!html <brief>` | Génère un fichier `.html` propre |
| `!patch <bug/code>` | Diagnostic + patch/diff |
| `!forget` | Efface le contexte court, pas la mémoire longue |
| `<texte libre>` | Conversation normale avec mémoire récupérée |


#### Mémoire longue façon Obsidian

Le bot ne se limite plus aux 10 derniers messages. Il garde aussi une **mémoire long terme locale** dans :

```txt
matrix/data/assistant_bot/memory/
```

Structure créée automatiquement :

```txt
memory/
  index.jsonl
  rooms/<room_hash>/2026-05-22.md
  global/lessons.md
  global/feedback.md
generated/
  html/*.html
  patches/*.md
```

Ces fichiers Markdown peuvent être ouverts comme un mini-vault Obsidian : notes par salon, tags `#html`, `#bugfix`, `#lesson`, liens `[[...]]` si tu en ajoutes dans les notes.

**Nouvelles commandes utiles :**

| Commande | Effet |
|---|---|
| `!remember <texte>` | Enregistre une mémoire durable manuelle |
| `!recall <recherche>` | Recherche dans la mémoire long terme |
| `!memories [N]` | Affiche les dernières mémoires de la conversation |
| `!learn <texte>` | Enregistre une règle/leçon réutilisable |
| `!feedback <texte>` | Corrige le comportement futur du bot |
| `!obsidian` | Affiche les chemins du vault mémoire |
| `!html <brief>` | Génère un vrai fichier `.html` autonome dans `generated/html/` |
| `!patch <bug/code>` | Produit diagnostic + patch/diff, sauvegardé dans `generated/patches/` |
| `!persona devweb` | Mode développeur web senior pour HTML/CSS/JS/debug |

**Exemples :**

```txt
!learn Pour les sites Symbalyx, garder une UI premium sobre, moins chargée, mobile-first, sans aspect IA générique.
!remember Le projet NAD utilise un éditeur local avec sauvegarde JSON via serveur Node.
!recall NAD éditeur sauvegarde
!html landing page premium pour studio web à Bordeaux, crème/bordeaux, CTA devis gratuit
!patch Uncaught ReferenceError: markMissing is not defined dans index.html
```

**Auto-mémoire :**

Par défaut, le bot essaie de mémoriser automatiquement les informations durables : décisions projet, bugs corrigés, préférences stables, règles de design/code. Il ne réentraîne pas le modèle ; il améliore ses réponses en récupérant ces mémoires dans le prompt.

Pour désactiver :

```env
ASSISTANT_AUTO_MEMORY=false
```


**Résumé d'appel par l'IA** (au lieu de l'heuristique mots-clés) :

L'icône "document" dans le bandeau d'une conversation utilise désormais Ollama (via le proxy `/ollama/` exposé par nginx) pour générer un vrai résumé en langage naturel. Si Ollama est éteint, fallback automatique sur l'heuristique.

**Modèles disponibles** :

| Modèle | Taille | RAM | Qualité |
|---|---|---|---|
| `llama3.2:3b` (défaut) | ~2 Go | ~3-4 Go | Bonne, rapide |
| `qwen2.5:3b` | ~2 Go | ~3-4 Go | Très bonne en FR |
| `llama3.1:8b` | ~5 Go | ~7-8 Go | Excellente |
| `mistral-nemo:12b` | ~7 Go | ~10 Go | Pro |

Change avec `docker exec symbalyx_ollama ollama pull <model>` puis ajuste `OLLAMA_MODEL` dans `.env` et `docker compose --profile ia up -d`.

**Sécurité** :

- Le bot **lit et écrit en clair vis-à-vis du protocole** : il déchiffre les messages des conversations où il est invité avec Megolm (libolm) et chiffre ses réponses pareillement. C'est strictement équivalent à un membre humain de plus.
- Les conversations où **tu n'invites pas le bot** lui restent invisibles, comme pour n'importe quel autre membre du serveur.
- **Tout reste local** : le LLM tourne sur ta machine via Ollama, aucune connexion sortante.

---

### Compte coffre cryptographiquement isolé

Le mode "Coffre" local (tag `u.symbalyx.hidden`) filtre les conversations dans la sidebar mais elles restent sur le même compte Matrix. Pour les **vraies infos sensibles**, utilise un **2e compte Matrix dédié**, dont les credentials sont chiffrés AES-GCM avec une clé dérivée de ton PIN coffre.

**Setup (une fois)** :

1. Créer le 2e compte côté Synapse via la CLI :

   ```powershell
   docker exec -it symbalyx_synapse register_new_matrix_user `
     -u tonpseudo_v -p MotDePasseSensiblesFort `
     --no-admin -c /data/homeserver.yaml http://localhost:8008
   ```

   Convention : suffixe `_v` (vault), mais tu peux choisir le pseudo que tu veux. Le suffixe ne révèle pas la nature du compte — Synapse a juste un user de plus parmi les autres.

2. Menu profil → **Compte coffre** → **Lier**
3. Saisis identifiant, mot de passe, et un PIN à 4-8 chiffres
4. L'app teste le login, chiffre les credentials avec PBKDF2 + AES-GCM, stocke en localStorage

**Ouvrir le coffre** :

Menu profil → **Compte coffre** → **Ouvrir** → saisir le PIN. L'app :
- `logout` du compte principal (révoque le device courant)
- `login` sur le compte coffre
- Charge ses conversations
- Bascule l'UI en thème rouge/orange (badge **Coffre** visible)

Pendant que le coffre est ouvert, ton compte principal est **complètement déconnecté**. Aucun token, aucun device. Si l'attaquant exfiltre la mémoire, il a juste un compte secondaire avec des conversations sensibles — mais pas ton identité principale.

**Fermer le coffre** :

Menu profil → **Compte coffre** → **Fermer**. Logout + retour à l'écran de login. Il faudra te reconnecter au compte principal manuellement.

> ⚠ **Note** : si tu oublies le PIN coffre, les credentials sont **irrécupérables** (chiffrés sans backdoor). Solution : recréer un nouveau coffre depuis zéro après recréation manuelle du compte Matrix.

---

### Mode visiteur (leurre) — quand on passe le téléphone à un inconnu

Pensé pour les moments où quelqu'un te demande "ton téléphone pour appeler" / "regarder une info". Tu actives le mode visiteur **en 1 seconde** et l'appli affiche **uniquement des fausses conversations crédibles** (Maman, Léo, le pressing, le club de yoga, etc.) avec un fake chat fonctionnel.

**Activation (2 méthodes au choix)** :
- **5 taps rapides** sur le badge « Chiffré E2E » en haut à droite (le plus discret)
- Menu profil → **Mode visiteur**

**Au 1er usage** : un prompt demande un code à 4 chiffres pour le mode (différent du code coffre). C'est ce code qui servira aussi à **sortir** du mode visiteur.

**Pendant le mode visiteur** :
- Sidebar : 8 conversations factices (Maman, Léo, Amélie, Pressing, Yoga, Banque, Pharmacie, Équipe projet)
- Tu peux **ouvrir n'importe laquelle, lire des messages crédibles, taper et envoyer un message** — il s'affiche normalement, comme dans une vraie messagerie
- Certains contacts répondent automatiquement à des mots-clés (auto-replies scriptés, ex : "merci" → "De rien 😘")
- **Aucune connexion réseau vers Matrix** : tout est local. Impossible que l'inconnu tombe sur tes vraies conversations.
- Le menu profil, l'avatar, le label de l'utilisateur affichent un nom factice (configurable dans `ui/decoy-data.js` → `myName`)
- Pas de badge "Coffre" visible (rien ne révèle l'existence du mode normal)

**Pour sortir du mode visiteur** (toi seul) :
- 5 taps sur le badge "Chiffré E2E" → prompt code → entrer le code de leurre ou le code coffre

**Personnaliser les fausses conversations** :

Édite `matrix/ui/decoy-data.js`. Le fichier contient :
- **4 profils distincts** (A : cadre administratif, B : indépendant/consultant, C : étudiant, D : entrepreneur). Chacun avec 7-8 contacts et 5-15 messages réalistes par conversation.
- Un **mapping `map`** par utilisateur Matrix (`alice → A`, `bob → B`, ...) : chaque user voit son propre profil pour éviter qu'un visiteur tombe deux fois sur les mêmes "amis" en passant l'app entre deux personnes.
- Une identité fake par profil (`me.name`, `me.avatar`) qui remplace l'avatar et le label du menu profil quand le leurre est actif.

À chaque session, ajuste le mapping et personnalise les conversations pour que ça colle à la "vie" supposée de chaque utilisateur.

> **Conseil** : pré-remplir avec des conversations qui ressemblent à la vie réelle. Un inconnu qui regarde la liste cherche des incohérences (langue, ton, dates). Les messages factices fournis sont volontairement banals et datés (hier, semaine dernière) pour ne pas paraître "trop frais". Ton neutre, peu d'emojis — pas de kitch.

**Sécurité du leurre** :
- À l'activation, le token Matrix est **invalidé** (`logout`) et `sessionStorage` est vidé. L'inconnu qui ouvre la console F12 ne voit aucun token, aucune session active.
- Aucune connexion réseau vers Matrix pendant le leurre.
- À la sortie, retour à l'écran de login — il faut se reconnecter manuellement pour accéder au vrai compte.

> **Conseil de crédibilité** : pré-remplir avec des conversations qui ressemblent à ta vie. Un inconnu qui regarderait la liste cherche des incohérences (langue, ton, dates). Les messages factices fournis sont volontairement banals et datés (hier, semaine dernière) pour ne pas paraître "trop frais".

`docker compose restart ui` après modification du fichier.

---

### Conversations masquées (Coffre)

Symbalyx propose un **mode coffre** : certaines conversations sont entièrement cachées de la sidebar et accessibles uniquement après avoir entré un code PIN secret.

**Comment masquer une conversation**

1. Dans la sidebar, **clic droit** sur la conversation à masquer (ou **long-press** sur mobile)
2. Cliquer **Masquer la conversation**

La conversation disparaît immédiatement de la liste visible. Elle n'est plus accessible qu'en ouvrant le coffre.

**Comment ouvrir le coffre**

Deux gestes secrets équivalents (au choix) :

- **Long-press 2 secondes** sur votre avatar (gros rond coloré dans le menu profil)
- **5 taps rapides** sur la mention « Symbalyx · v1 » tout en bas du menu profil

Au premier accès, vous choisissez un code à 4 chiffres. Aux suivants, vous le saisissez.

> Le code est stocké **hashé en SHA-256, salé avec votre user_id, en localStorage**. Personne d'autre que vous ne peut le récupérer. Si vous l'oubliez : effacez les données locales depuis le menu profil → vous pouvez en créer un nouveau, mais perdrez l'accès rapide aux conversations masquées (elles restent accessibles via Element Web qui ignore le tag custom).

Quand le coffre est ouvert :
- L'interface bascule en thème rouge/orange discret
- Un badge **Coffre** apparaît à côté du badge Chiffré E2E
- La sidebar n'affiche **que** les conversations masquées
- Pour quitter : re-long-press l'avatar (ou 5 taps secret zone)

> **Limite honnête** : ce verrou protège l'écran de Symbalyx UI. Si quelqu'un accède à Element Web (`localhost:8080`) sur la même machine et se connecte avec votre compte, il verra toutes les conversations. Pour aller plus loin, créez un compte Matrix dédié pour les conversations sensibles.

### Mode discret

Menu profil → **Mode discret** (toggle).

Lorsqu'il est actif :
- Une règle push globale `dont_notify` est ajoutée → aucune notification système
- Element n'envoie ni read receipts ni typing notifications (les autres ne voient pas que vous avez lu / que vous tapez)

### Verrouillage automatique

Menu profil → **Verrouillage auto** (cycle : Désactivé / 1 / 5 / 15 / 30 min).

Après le délai d'inactivité (souris, clavier, scroll), un écran de verrouillage couvre toute l'application. Pour déverrouiller, ressaisissez votre mot de passe Matrix.

Bouton **cadenas** à côté de votre avatar = verrouiller manuellement.

### TOUT SUPPRIMER · Annihilation totale

Deux gros boutons rouges sont visibles en bas du menu profil. **Pas d'option par défaut, pas de bouton caché — tu veux supprimer, tu cliques, tout part.**

**Bouton 1 — TOUT SUPPRIMER (local)** :

- Révoque **tous** les tokens Matrix actifs du compte (`logout/all` → tous les appareils logués sont déconnectés)
- Vide `localStorage`, `sessionStorage`
- Supprime **toutes les IndexedDB** de l'origin (où Element stocke les clés Megolm)
- Vide le Cache API
- Désinscrit le service worker (plus de cache résiduel)
- Vide les cookies
- Appelle `/wipe` sur Element / Element Call / Synapse → `Clear-Site-Data: *` (efface aussi leur storage si Caddy single-origin est actif)
- Redirige vers `about:blank` et remplace l'history

Demande de taper `SUPPRIMER` en majuscules pour confirmer.

**Bouton 2 — ANNIHILATION SERVEUR (irréversible)** :

Tout ce qui précède **+** :
- Appel à `POST /_matrix/client/v3/account/deactivate` avec `erase: true`
- Le compte Matrix est **désactivé**, les messages sont marqués comme effacés sur le serveur, le compte ne pourra **plus jamais** être réactivé

Demande de taper `ANNIHILER` en majuscules + le mot de passe Matrix (validation UI-auth requise par le serveur).

**Raccourci clavier** : `Ctrl+Shift+Q` déclenche le bouton 1 (effacement local) sans confirmation.

⚠ **Limite** : sans Caddy single-origin (étape HTTPS), les IndexedDB d'Element Web et Element Call (sur leurs ports natifs 8080/8181) ne peuvent **pas** être effacées par l'app — limite browser cross-origin. Active HTTPS + Caddy pour avoir vraiment "tout tout tout" effacé.

### Transcription vocale & résumé d'appel (Whisper local)

Un service Docker `whisper` (image `onerahmet/openai-whisper-asr-webservice`, modèle `small` par défaut) tourne sur le port `9000` en local. Tout transit reste sur ta machine.

**Transcrire un message vocal** :
1. Dans une conversation, clique l'icône **document** (à côté de l'horloge) dans le header
2. **Transcrire le dernier vocal** → l'app récupère le dernier `m.audio` du salon, le télécharge, le passe à Whisper, affiche le texte

**Enregistrer + résumer un appel** :
1. Pendant l'appel (ou juste après), icône **document** → **Enregistrer & résumer**
2. Autorise le micro la 1ère fois
3. À la fin, clique **Arrêter et résumer**
4. Whisper transcrit → un résumé heuristique (intro + mots-clés) s'affiche dans la modale
5. Tu peux copier-coller dans la conversation

> **Modèle plus précis** : édite `docker-compose.yml`, change `ASR_MODEL: "small"` en `"medium"` ou `"large-v3"`. Compromis : plus précis = plus lent et plus de RAM (`small` ~1 Go, `large-v3` ~6 Go).

> **Résumé par LLM local** : la version actuelle utilise une heuristique simple (sujet + mots-clés). Pour un vrai résumé en langage naturel, on peut ajouter Ollama (Mistral 7B ou Llama 3.1 8B). À demander si tu veux que je l'ajoute.

---

### Installer l'app sur ton téléphone (PWA)

L'app Symbalyx est installable comme une vraie app sur iOS, Android et desktop, sans passer par un store.

**iOS (Safari)** :
1. Ouvre `http://IP_PC:8090` dans Safari
2. Appuie sur **Partager** → **Sur l'écran d'accueil**
3. L'icône Symbalyx apparaît sur ton écran d'accueil, comme une vraie app

**Android (Chrome)** :
1. Ouvre `http://IP_PC:8090` dans Chrome
2. Un bandeau "Installer Symbalyx" apparaît en bas → clique-le
3. Ou : menu ⋮ → "Ajouter à l'écran d'accueil"

**Desktop (Chrome/Edge)** :
1. Ouvre l'URL
2. Icône d'installation dans la barre d'URL (à droite) → clique

L'app installée s'ouvre **sans barre de navigateur**, comme une app native. Plus discrète. Le service worker met en cache l'UI ; les conversations restent toujours fetched live depuis le serveur.

> **Limite iOS** : Apple bride certaines fonctions PWA (notifications push, accès micro en background). Pour caméra/micro pendant les appels, il faut HTTPS (voir section dédiée plus bas).

---

### Lancer un appel voix ou vidéo de groupe (chiffré)

1. Sélectionnez le groupe
2. Icône **téléphone** = appel voix, icône **caméra** = appel vidéo
3. Une fenêtre Element Call s'ouvre, demandez aux autres membres de cliquer le même bouton de leur côté
4. Jusqu'à 8 participants simultanés, flux E2EE bout-en-bout (LiveKit ne voit que du chiffré)

---

## ÉTAPE 7 — Accès depuis un téléphone (même WiFi)

1. IP du PC :

   ```powershell
   ipconfig | findstr IPv4
   ```

2. Ouvrir le pare-feu :

   ```powershell
   New-NetFirewallRule -DisplayName "Symbalyx HTTP" -Direction Inbound -Protocol TCP -LocalPort 8008,8080,8090,8181,8881 -Action Allow
   New-NetFirewallRule -DisplayName "Symbalyx LiveKit" -Direction Inbound -Protocol TCP -LocalPort 7880,7881 -Action Allow
   New-NetFirewallRule -DisplayName "Symbalyx Media UDP" -Direction Inbound -Protocol UDP -LocalPort 3478,49152-49172,50000-60000 -Action Allow
   ```

3. Remplacer `localhost` par votre IP locale dans :
   - `ui/index.html` → bloc `CONFIG` (3 URLs : `homeserver`, `elementUrl`, `elementCall`)
   - `element/config.json` → `base_url`
   - `element-call/config.json` → `base_url` et `livekit_service_url`
   - `data/synapse/homeserver.yaml` → `extra_well_known_client_content.org.matrix.msc4143.rtc_foci[0].livekit_service_url`

4. Relancer :

   ```powershell
   docker compose restart synapse element element-call ui
   ```

5. Sur le téléphone : `http://VOTRE_IP:8090`

> **Limite** : sans HTTPS, les navigateurs mobiles refusent l'accès caméra/micro pour les appels vidéo. Pour les appels vidéo depuis mobile, voir la section HTTPS plus bas.

---

## ÉTAPE 8 — Vérifier que tout est chiffré

### Vérif messages (Megolm)

1. Connectez `alice` et `bob` dans deux navigateurs
2. Alice crée un groupe privé avec bob
3. Échangez des messages
4. Vérification serveur :

   ```powershell
   docker exec -it symbalyx_postgres psql -U synapse -d synapse -c `
     "SELECT type, content::text FROM events WHERE type='m.room.encrypted' ORDER BY received_ts DESC LIMIT 3;"
   ```

   Les contenus sont du type `{"algorithm":"m.megolm.v1.aes-sha2","ciphertext":"AwgAEnA..."}` — chiffré illisible.

### Vérif appels (MatrixRTC + PerParticipantE2EE)

1. Lancez un appel vidéo entre alice et bob
2. Dans la fenêtre Element Call, cliquez l'icône **i** ou regardez le bandeau du haut : doit afficher "End-to-end encrypted"
3. Vérification serveur LiveKit :

   ```powershell
   docker logs symbalyx_livekit --tail 20
   ```

   Les logs montrent les sessions WebRTC mais aucun contenu média n'est déchiffrable côté serveur (clés Megolm partagées hors-bande entre participants Matrix).

### Vérif rétention

1. Activez `1 heure` sur un groupe
2. Vérification de l'event state :

   ```powershell
   docker exec -it symbalyx_postgres psql -U synapse -d synapse -c `
     "SELECT room_id, content::text FROM events WHERE type='m.room.retention' ORDER BY received_ts DESC LIMIT 3;"
   ```

   Vous voyez `{"max_lifetime": 3600000}`.

3. Synapse purge les events anciens à chaque exécution du job (1×/jour par défaut, configurable).

---

## Commandes utiles

```powershell
# Logs
docker compose logs -f synapse
docker compose logs -f element-call
docker compose logs -f livekit

# Stop / restart
docker compose down
docker compose up -d
docker compose restart synapse

# Reset total (⚠ efface comptes + messages)
docker compose down -v
Remove-Item -Recurse -Force .\data\

# Liste users
docker exec -it symbalyx_postgres psql -U synapse -d synapse -c "SELECT name FROM users;"

# Forcer un purge de rétention immédiat
docker exec -it symbalyx_synapse curl -X POST `
  -H "Authorization: Bearer TOKEN_ADMIN" `
  "http://localhost:8008/_synapse/admin/v1/purge_history/!ROOMID:localhost" `
  -d '{"delete_local_events": true, "purge_up_to_ts": 0}'
```

---

## HTTPS local · single-origin via Caddy

Active HTTPS + reverse proxy Caddy pour deux raisons :
1. Les navigateurs refusent caméra/micro hors HTTPS (donc pas d'appels vidéo mobile sans).
2. Tout passe sur un seul origin (`https://symbalyx.local:8443`) → le bouton **TOUT SUPPRIMER** peut effacer les IndexedDB d'Element Web et Element Call (sinon c'est cross-origin et impossible depuis JS).

### Étapes

```powershell
# 1. Installer mkcert via Scoop (https://scoop.sh)
scoop install mkcert
mkcert -install

# 2. Générer les certificats
mkdir certs
cd certs
mkcert -cert-file cert.pem -key-file key.pem `
  symbalyx.local localhost 127.0.0.1 192.168.1.42
cd ..

# 3. Ajouter symbalyx.local à votre fichier hosts (Bloc-notes en admin)
#    C:\Windows\System32\drivers\etc\hosts
#    Ajoute la ligne :
#    127.0.0.1   symbalyx.local

# 4. Démarrer Caddy
docker compose --profile https up -d

# 5. Ouvrir https://symbalyx.local:8443
```

Routes exposées :

| URL                                     | Service        |
| --------------------------------------- | -------------- |
| `https://symbalyx.local:8443/`          | UI Symbalyx    |
| `https://symbalyx.local:8443/element/`  | Element Web    |
| `https://symbalyx.local:8443/call/`     | Element Call   |
| `https://symbalyx.local:8443/_matrix/`  | Synapse API    |
| `https://symbalyx.local:8443/whisper/`  | Whisper        |
| `https://symbalyx.local:8443/wipe`      | Clear-Site-Data global |

Une fois Caddy actif, **ne plus exposer** les ports natifs 8008/8080/8181 sur le LAN — désactive-les ou bloque-les au pare-feu.

> Pour basculer la UI vers les URLs Caddy, édite `ui/index.html` → `CONFIG` :
> ```js
> homeserver:  "https://symbalyx.local:8443",
> elementUrl:  "https://symbalyx.local:8443/element",
> elementCall: "https://symbalyx.local:8443/call",
> whisperUrl:  "https://symbalyx.local:8443/whisper",
> ```
> Et dans `data/synapse/homeserver.yaml` : `public_baseurl: "https://symbalyx.local:8443"`.

---

## Personnaliser le branding

Éditez `matrix/ui/index.html` → bloc `CONFIG` en haut du `<script>` :

```js
const CONFIG = {
  brandName:    "VotreNom",
  brandSuffix:  "· chiffré",
  brandLetter:  "V",
  homeserver:   "http://localhost:8008",
  elementUrl:   "http://localhost:8080",
  elementCall:  "http://localhost:8181",
  serverName:   "localhost"
};
```

Couleurs : variables CSS `--accent`, `--accent-2`, `--signal-blue` en haut du `<style>`.

Pas besoin de rebuild : `docker compose restart ui` (ou recharger la page).

---

## Architecture

```
┌─────────────────┐
│  UI Symbalyx    │ :8090
│  (sidebar +     │
│   actions)      │
└────────┬────────┘
         │
         ├──► API Matrix ────► Synapse :8008 ────► Postgres
         │    (login, rooms,
         │     retention,
         │     invitations)
         │
         ├──► iframe Element :8080 (chat E2E)
         │
         └──► iframe Element Call :8181
                 │
                 ├──► lk-jwt-service :8881 (auth Matrix → JWT)
                 │
                 └──► LiveKit SFU :7880 (relais média chiffré)
```

Tous les flux restent locaux. Aucun port n'est exposé sur Internet.
Le chiffrement Megolm (messages) et PerParticipantE2EE (média) s'effectue dans le navigateur ; les serveurs ne relayent que du chiffré.


---

## Patch UI social v2

L'interface custom Symbalyx se lance sur `http://localhost:8090` depuis le PC, ou `http://IP_DU_PC:8090` depuis un téléphone du même Wi-Fi.

Attention : `http://localhost:8080` ouvre Element Web brut. C'est utile comme secours technique, mais son interface est plus fade et moins personnalisée. Pour l'UI Symbalyx améliorée, utilisez le port `8090`.

Ce patch améliore surtout :
- sidebar façon messagerie moderne, plus lisible ;
- cartes de conversation plus nettes ;
- anneaux d'avatar et profil inspirés des codes sociaux modernes ;
- header de chat plus clair ;
- menu profil plus premium ;
- cache PWA mis à jour en `app-cache-v6-social-ui`.
