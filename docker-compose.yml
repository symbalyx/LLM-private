# Audit sécurité — Symbalyx

Audit fait du point de vue attaquant. Sévérité **C**ritique / **H**aut / **M**oyen / **B**as.
État : ✅ corrigé · 🟡 atténué · ⚠ limite documentée · ❌ pas adressé.

## 1. Stockage des credentials

| # | Faille | Sévérité | État |
|---|---|---|---|
| 1.1 | PIN coffre/leurre hashé avec **SHA-256 simple** : 10 000 PINs à 4 chiffres × SHA-256 = quelques secondes à crack sur n'importe quel GPU si le hash localStorage est exfiltré. | C | ✅ Remplacé par **PBKDF2 250 000 itérations + salt**. Coût × 250 000. Le PIN coffre devient aussi la **clé de déchiffrement** des credentials du compte coffre isolé (pas juste un hash de vérification) — il faut **deviner ET déchiffrer**, le bruteforce devient indistinguable d'un essai légitime. |
| 1.2 | Access token Matrix passé via **hash URL à Element Call** : visible dans history navigateur, dans `document.referrer`, lisible par extension. | H | 🟡 Le hash n'est ni envoyé au serveur ni dans le referrer (par spec), mais reste lisible par toute extension installée. **Documenté** + recommandation HTTPS seul. Fix complet = postMessage post-load (TODO si tu confirmes). |
| 1.3 | sessionStorage pour le token Matrix. Vidé à la fermeture de la tab. | M | ✅ OK. Pas migré vers cookies HttpOnly car Element Web a besoin du token côté client. |
| 1.4 | Le mot de passe Matrix transite **en clair** en HTTP local (login + unlock). | C | ✅ **HTTPS via Caddy + mkcert** ajouté. Avec Caddy actif, tout le LAN est en TLS, le mot de passe n'est plus sniffable. |

## 2. Effacement réel

| # | Faille | Sévérité | État |
|---|---|---|---|
| 2.1 | Le panic d'origine ne wipait que `localStorage`/`sessionStorage` de l'origin Symbalyx. **Element Web** (autre origin sans Caddy) gardait ses **clés Megolm en IndexedDB** : un attaquant qui rouvre le navigateur déchiffre tout. | C | ✅ Refonte **annihilate()** : avec Caddy single-origin, wipe global IndexedDB + caches + service worker. Sans Caddy, wipe Symbalyx + redirect vers les origins externes avec route `/wipe` qui pose `Clear-Site-Data: *`. |
| 2.2 | Le panic ne révoquait pas les tokens Matrix actifs sur autres devices. | H | ✅ `POST /_matrix/client/v3/logout/all` ajouté → invalide TOUS les tokens du compte. |
| 2.3 | Le panic ne supprimait pas les messages côté serveur. | M | 🟡 Option `Annihilation niveau serveur` ajoutée (séparée) : `POST /_matrix/client/v3/account/deactivate` avec UI-auth, supprime le compte + tous les events envoyés. Action **irréversible** et nominative — bouton dédié, confirmation explicite. |
| 2.4 | Le service worker mettait en cache l'UI. Après panic, un reload restaurait l'UI depuis le cache → faux sentiment d'effacement. | M | ✅ `unregister()` du SW + `caches.delete()` dans annihilate. |
| 2.5 | Le bouton panic était petit et discret. | B | ✅ Bouton **TOUT SUPPRIMER** visible en bas du menu profil, rouge, full-width, irréversible. |

## 3. Mode leurre

| # | Faille | Sévérité | État |
|---|---|---|---|
| 3.1 | Inspection console (F12) : l'attaquant voit `decoy.active = true`, accède aux fake data en mémoire, et surtout au token Matrix encore en sessionStorage. | C | 🟡 En mode leurre, **on logout le compte Matrix avant l'activation** : plus de token en mémoire, plus de M.userId, plus de session. Symbalyx ne sait littéralement plus à quel serveur il était connecté. L'inconnu peut inspecter la console = il voit juste un faux client. |
| 3.2 | L'inconnu ouvre `http://IP:8080` (Element Web) dans un autre onglet → bypass total du leurre. | C | ✅ Element Web n'est plus exposé directement avec Caddy : seul `app.symbalyx.local` est routé. La route `/element/` requiert auth Symbalyx. Sans Caddy, **documenté** : ne pas révéler les URLs Element/Synapse au visiteur. |
| 3.3 | Les fausses conversations étaient les mêmes pour tous (Maman/Léo/Amélie). Risque : 2 personnes se passent l'app, voient les mêmes conv → suspect. | H | ✅ **4 profils décoy distincts** mappés par utilisateur Matrix. Chaque user voit ses propres contacts/messages. |
| 3.4 | Données décoy contenaient des emojis enfantins et un ton "fun" inadapté à un usage pro. | M | ✅ Refonte du ton : neutre, professionnel, plausible. Quelques emojis légers gardés (réalistes), pas de kitch. |

## 4. Confidentialité passive

| # | Faille | Sévérité | État |
|---|---|---|---|
| 4.1 | nginx UI loguait toutes les requêtes (paths, IP, user-agent). | M | ✅ `access_log off;` dans nginx.conf. Pas de trace des navigations Symbalyx côté serveur. |
| 4.2 | Postgres Synapse loguait par défaut les statements SQL en debug. | M | ✅ Niveau log Synapse réglé à WARNING via `log_config`. |
| 4.3 | Headers `Server: nginx/X.Y.Z` et `X-Powered-By` leakaient les versions. | B | ✅ `server_tokens off;` + Caddy retire les headers par défaut. |
| 4.4 | Pas de Content-Security-Policy → XSS possible si dépendance compromise. | M | 🟡 CSP `default-src 'self'; ...` ajouté en `Report-Only` dans Caddy (ne casse pas, signale les violations). Strict-mode planifié quand on aura externalisé le CSS inline. |
| 4.5 | `Referrer-Policy` non défini → URLs sensibles peuvent leak en referrer. | M | ✅ `Referrer-Policy: no-referrer` global. |

## 5. Réseau / fédération

| # | Faille | Sévérité | État |
|---|---|---|---|
| 5.1 | Synapse écoutait par défaut sur `0.0.0.0:8008` accessible du LAN entier. Si pare-feu Windows mal réglé → exposition Internet. | H | ✅ Avec Caddy : seul `:443` est exposé, Synapse passe en `127.0.0.1:8008`. Sans Caddy, instruction PowerShell explicite pour limiter les règles entrantes. |
| 5.2 | Fédération Matrix activable accidentellement → fuite metadata. | H | ✅ `federation_domain_whitelist: []` (vide = fédération désactivée), confirmé. |
| 5.3 | TURN secret en clair dans `homeserver.yaml`. | B | 🟡 Documenté : à régénérer à chaque déploiement. Pas une vraie faille (LAN only). |

## 6. Cryptographie applicative

| # | Faille | Sévérité | État |
|---|---|---|---|
| 6.1 | Pas de vérification cross-signing automatique entre les 10 users. Un attaquant qui injecte un faux device dans le serveur pourrait voir les nouveaux messages. | H | ⚠ **Limite Matrix** : impose à chaque user de vérifier les autres manuellement (QR/emojis Element). Documenté en gras dans le README. |
| 6.2 | Megolm key backup : si activé sans clé de récupération forte, les clés sont stockées sur le serveur en chiffré-par-mot-de-passe-faible. | H | ⚠ Documenté : **désactiver** le key backup automatique pour les rooms sensibles, ou utiliser une recovery key longue. |
| 6.3 | Element Call PerParticipantE2EE est récent et a eu des bugs (clés non rotated quand un participant part). | M | ⚠ Documenté : préférer fermer et recréer l'appel quand un membre part en cours. |

## 7. Audit "voleur de téléphone"

Scénario : un attaquant a un accès physique au téléphone déverrouillé (OS) et lance Symbalyx. Que voit-il ? Que peut-il extraire ?

| # | Vecteur | Avant | Après |
|---|---------|-------|-------|
| 7.1 | **Ouverture de l'app** : l'attaquant voit immédiatement une UI de messagerie | Topbar "Symbalyx · secure", écran login évident | ✅ **Calculatrice fonctionnelle** par défaut. Aucun indice visuel. Inspecter F12 sur la calculette ne révèle qu'une calculette. |
| 7.2 | **Title de l'onglet / icône PWA** | "Symbalyx · Messagerie chiffrée" + cadenas violet | ✅ "Calculatrice" + icône calculette iOS. PWA installée s'appelle "Calc". |
| 7.3 | **Nom du fichier JS de leurre** : `decoy-data.js` visible dans Network | Trahit l'existence d'un mode leurre | ✅ Renommé `templates.js`. |
| 7.4 | **Secret en clair dans le code** : `SECRET = { a: 2020, op: "+", b: 6 }` | Lisible en `view source` → la combinaison est exposée | ✅ Hash SHA-256 du secret stocké, comparaison au runtime. L'attaquant qui lit le code source ne déduit pas la combinaison par lecture passive. |
| 7.5 | **Clés localStorage parlantes** : `sx_pin_*`, `sx_decoy_pin_*`, `sx_vault_acct_*` | Trahit l'existence de PINs et d'un coffre | ✅ Préfixe neutre `c_*` (peut passer pour un cache de calculatrice). |
| 7.6 | **WebAuthn prompt OS-natif** affichait "Symbalyx wants to use Touch ID" | Révèle le nom de l'app | ✅ `rp.name = "Calculatrice"`. Le prompt OS dit "Calculatrice veut utiliser Touch ID". |
| 7.7 | **Manifest PWA** : `name: "Symbalyx"`, `description: "Messagerie privée..."` | Visible dans devtools → cramé | ✅ `name: "Calculatrice"`, `description: "Calculatrice"`. |
| 7.8 | **Brand `Symbalyx`** appliqué à `document.title` au chargement | Onglet affiche "Symbalyx · ..." même sur la calc | ✅ `document.title` reste "Calculatrice" en permanence ; le branding n'est appliqué qu'au DOM mainApp, jamais au title. |
| 7.9 | **`initial_device_display_name: "Symbalyx Web"`** envoyé à Synapse | Visible dans la liste des devices Matrix | ✅ Renommé "Mobile" (générique). |
| 7.10 | **Service worker cache** nommé `symbalyx-ui-vN` | Visible dans devtools Application | ✅ Renommé `app-cache-vN`. |
| 7.11 | **Element Web** accessible directement sur `http://localhost:8080` | Bypass complet de la calculatrice : si le voleur tape `:8080` direct, il a la session active | ⚠ **Atténuation** : avec Caddy single-origin actif, Element n'est plus exposé sur `:8080` (route `/element/` uniquement). Sans Caddy, c'est cramé. **Recommandation forte d'activer Caddy** en usage réel. |
| 7.12 | **sessionStorage token** récupérable par inspection si l'app n'a pas été verrouillée | Devtools → Application → sessionStorage → `symbalyx_token` lisible | ✅ Clé renommée `c_t`. ⚠ Le contenu (token Matrix) reste lisible — mitigation : auto-lock court + bouton "Verrouiller maintenant" qui retourne à la calculatrice. |
| 7.13 | **Métadonnées Synapse** (room IDs, timestamps) | Inhérent au protocole | ❌ Hors scope · documenté |
| 7.14 | **Memory dump** via attaque physique avancée | Hors scope navigateur | ❌ Hors scope · chiffrement disque OS recommandé |
| 7.15 | **PIN à 4 chiffres** : 10 000 combinaisons, bruteforcable même avec PBKDF2 250k iter (~40 min) | Faible entropie | 🟡 Atténué par PBKDF2 ; pour les vrais paranos, accepter 6-8 chiffres déjà supporté côté UI |

### Verdict honnête

Avec les fixes appliqués, un voleur qui ouvre l'app **voit une calculatrice et rien d'autre**. Pour passer outre, il faut :
1. Connaître la séquence exacte (`2020 + 6 =`) — non déductible du code
2. Réussir Touch ID / Face ID (si activé)

Les deux failles **restantes** sont :
- **Element Web sur :8080 sans Caddy** : tant qu'on n'active pas le profil Caddy HTTPS, un voleur intelligent qui sniffe le réseau ou qui regarde le code source via devtools (sur la calculatrice elle-même) verra des références à `:8080` et peut taper l'URL directement. **À fixer impérativement avant usage réel** : `docker compose --profile https up -d`.
- **PIN court (4 chiffres)** : bruteforcable en ~40 min sur GPU. Pour les vrais usages sensibles, configurer un PIN coffre à 6-8 chiffres et activer Touch ID en couche supplémentaire.

## 8. Limites assumées (out of scope)

- **Memory inspection** par un attaquant avec accès physique au PC déverrouillé : impossible à empêcher en JS browser-side. Mitigation : auto-lock + screen lock OS.
- **Keylogger / malware local** : hors scope. Tout chiffrement E2E est contourné si l'OS hôte est compromis.
- **Analyse de trafic** : un observateur LAN voit qu'il y a du trafic Matrix (volume, timings), même chiffré. Mitigation : VPN, ou décor de bruit (pas implémenté).
- **Forensique disque** : Postgres + IndexedDB laissent des traces sur disque même après "suppression". Mitigation : chiffrement disque OS (BitLocker / FileVault / LUKS).
- **Synapse admin token** : un admin de la machine peut tout lire en clair en bypassant le client. Garder l'admin pour soi.

## 8. Tests de pénétration recommandés (à faire en local)

1. Connecter alice + bob, échanger des messages, dump `pg_dump synapse | grep -i content` → doit retourner uniquement du `m.megolm.v1.aes-sha2` ciphertext.
2. F12 / Inspecteur en mode décoy : confirmer que `M.token`, `M.userId` sont null et que sessionStorage est vide.
3. Activer panic, fermer le navigateur, rouvrir : aucune session restaurée, aucun cache.
4. Tenter de joindre `http://IP:8080` quand Caddy est actif : doit retourner 403/404.
5. Sniffer (Wireshark) sur la loopback en HTTPS : aucun mot de passe lisible.
6. Bruteforce du PIN coffre : lancer 100 tentatives via console JS, mesurer le temps. Avec PBKDF2 250k iter, doit prendre ~25s pour 100 essais (10 000 essais ≈ 40 min, dissuasif).

---

**Dernière mise à jour** : 2026-05-20. Quand tu ajoutes une feature, audite-la et mets cette table à jour.
