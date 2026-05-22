# Symbalyx vs les autres · comparatif sévère

Objectif : positionner Symbalyx face aux apps de messagerie grand public et confidentielles, **sans complaisance**. Les colonnes où Symbalyx perd sont marquées telles quelles.

Légende : ✅ implémenté · ➖ partiel ou contraintes · ❌ absent

---

## 1. Chiffrement et métadonnées

| Critère | WhatsApp | Signal | Telegram | iMessage | Discord | Element/Matrix | Wire | Threema | **Symbalyx** |
|---|---|---|---|---|---|---|---|---|---|
| Chiffrement E2E **par défaut sur tous les chats** | ✅ | ✅ | ❌ (off par défaut, "secret chats" seulement) | ✅ (Apple→Apple) | ❌ | ✅ (par room) | ✅ | ✅ | ✅ |
| **Chiffrement E2E sur appels de groupe** | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ (MatrixRTC) | ✅ | ➖ (1-1 seulement) | ✅ |
| **Métadonnées (qui parle à qui, quand) visibles par l'éditeur** | ✅ Meta voit | ✅ Signal voit (sealed sender atténue) | ✅ Telegram voit | ✅ Apple voit | ✅ Discord voit | ✅ ton serveur les voit | ✅ Wire voit | ➖ Threema voit | **✅ personne ne les voit (tu es l'éditeur)** |
| Open source (client) | ✅ | ✅ | ➖ (client OS, serveur fermé) | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Open source (serveur) | ❌ | ➖ (binaires publiés) | ❌ | ❌ | ❌ | ✅ Synapse | ➖ | ❌ | ✅ |
| Auto-hébergement possible | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ (offre OnPrem payante) | ❌ | ✅ |
| **Indépendant d'Internet** (LAN seul) | ❌ | ❌ | ❌ | ❌ | ❌ | ➖ (si self-hosted) | ❌ | ❌ | ✅ |
| Disparition forcée des messages côté serveur | ❌ | ❌ | ✅ (secret) | ❌ | ❌ | ➖ (retention experimental) | ➖ | ❌ | ✅ retention server-side configurable |

**Verdict** : Signal reste la référence en chiffrement public. Symbalyx l'égale **techniquement**, et la dépasse sur les métadonnées **parce que tu es ton propre opérateur** — pas parce qu'on est techniquement meilleurs.

---

## 2. Fonctions de confidentialité opérationnelle

| Critère | WhatsApp | Signal | Telegram | iMessage | Element/Matrix | Wire | Threema | **Symbalyx** |
|---|---|---|---|---|---|---|---|---|
| Verrouillage app (PIN / biométrie) | ✅ | ✅ | ✅ | ❌ (vient de l'OS) | ❌ (officiellement, third-party Aurora oui) | ❌ | ✅ | ✅ |
| Messages éphémères | ✅ (durées limitées) | ✅ | ✅ | ❌ | ➖ | ✅ | ❌ | ✅ **11 durées** (5min→1an) |
| **Façade trompe-l'œil** (app déguisée) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ Calculatrice fonctionnelle** |
| **Coffre / compartiment caché** (PIN dédié) | ➖ "Chats verrouillés" | ❌ | ➖ "Dossier secret" | ❌ | ❌ | ❌ | ❌ | ✅ Tags `u.symbalyx.hidden` + PIN PBKDF2 |
| **Compte secondaire cryptographiquement isolé** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Credentials chiffrés AES-GCM par le PIN coffre |
| **Mode décor** (fausses conversations avec auto-réponses) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ 4 profils × 7-8 contacts × 23-39 variantes |
| Niveau de confidentialité **par contact** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Normal/Élevé/Maximum (rotation Megolm 1h/10msg) |
| **Bouton "tout effacer"** réel (révoque tous les devices + wipe local + Clear-Site-Data) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Deux niveaux : local + désactivation compte serveur |
| Auto-verrouillage par inactivité | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ (1/5/15/30 min) |
| Mode discret (no read receipts / no typing) | ➖ (lecture seule, désactivable globalement) | ➖ | ➖ | ❌ | ➖ | ✅ | ✅ | ✅ |
| Photos / fichiers "voir une fois" | ✅ | ✅ | ❌ | ❌ | ❌ | ➖ | ❌ | ✅ (auto-redaction serveur à 60s) |
| Note à moi-même | ✅ | ✅ | ✅ "Messages enregistrés" | ✅ | ➖ | ✅ | ✅ | ✅ |

**Verdict** : Symbalyx **invente plusieurs catégories** que les autres n'ont pas du tout (façade, mode décor, niveaux par contact, vrai bouton effacer). C'est ici que la différence saute aux yeux.

---

## 3. Intelligence artificielle intégrée

| Critère | WhatsApp (Meta AI) | Signal | Telegram | iMessage (Apple Intelligence) | Discord | Element | **Symbalyx** |
|---|---|---|---|---|---|---|---|
| Assistant IA intégré | ✅ Meta AI | ❌ | ❌ (bots tiers) | ✅ Apple Intelligence | ✅ Clyde (limité) | ❌ | ✅ Ollama local |
| **L'IA tourne sur l'appareil de l'utilisateur** (pas dans le cloud) | ❌ Meta cloud | n/a | n/a | ➖ partiellement on-device | ❌ cloud | n/a | ✅ Ollama sur le serveur du LAN |
| L'IA peut **lire les conversations** | ➖ Meta voit ce que tu envoies à Meta AI | n/a | n/a | ➖ | ➖ | n/a | ✅ seulement si tu invites le bot dans la room |
| Résumé d'appel automatique | ❌ | ❌ | ❌ | ➖ (notes vocales seulement) | ❌ | ❌ | ✅ Whisper + Ollama, local |
| Skills personnalisables | ❌ | n/a | n/a | ➖ | n/a | n/a | ✅ calc, note, rappel, traduire, rédige, résumer |
| **Choix du modèle** | ❌ | n/a | n/a | ❌ | ❌ | n/a | ✅ llama3.2, qwen2.5, mistral-nemo… |

**Verdict** : Symbalyx est la seule app où **l'IA ne sait pas qu'elle parle à toi** côté éditeur. Meta AI et Apple Intelligence relisent ce que tu leur envoies sur leurs serveurs.

---

## 4. Confort d'usage et adoption

C'est ici que **Symbalyx perd** honnêtement.

| Critère | WhatsApp | Signal | Telegram | iMessage | **Symbalyx** |
|---|---|---|---|---|---|
| **App native iOS/Android** | ✅ | ✅ | ✅ | ✅ | ❌ PWA seulement |
| **Setup en 30 secondes** | ✅ | ✅ | ✅ | ✅ (préinstallé) | ❌ Docker + Synapse + comptes à créer |
| **Notifications push** quand l'app est fermée | ✅ | ✅ | ✅ | ✅ | ❌ navigateur seulement, dégradé |
| **Réseau d'effet** (les gens y sont déjà) | ✅ 2 milliards | ➖ 70M | ✅ 900M | ✅ écosystème Apple | ❌ ton groupe à toi |
| **Mises à jour automatiques** | ✅ | ✅ | ✅ | ✅ | ➖ git pull + docker build |
| App Store visible | ✅ | ✅ | ✅ | ✅ | ❌ |
| Fonctionne sur internet mobile sans intervention | ✅ | ✅ | ✅ | ✅ | ❌ il faut un VPN ou exposer le serveur |
| Échelle | Sans limite | Sans limite | Groupes 200k | Sans limite | **~10 personnes** (par design) |
| **Récupération de compte si tel perdu** | ✅ (numéro de tel) | ➖ (PIN) | ✅ | ✅ (Apple ID) | ❌ Si tu perds le PIN coffre, tu perds les données |

**Verdict** : Symbalyx n'est pas un produit grand public. C'est un **outil pour un petit groupe qui veut une vraie souveraineté**, pas une alternative à WhatsApp pour le grand public.

---

## 5. Performances et qualité

| Critère | WhatsApp / Signal | Telegram | iMessage | **Symbalyx** |
|---|---|---|---|---|
| Latence d'envoi de message | < 200 ms | < 200 ms | < 200 ms | ~100-300 ms (LAN local, plus rapide) |
| Qualité des appels vidéo | Très bonne | Très bonne | Excellente | Bonne (dépend de LiveKit, OK pour 8) |
| Stabilité après mise à jour | Bonne | Bonne | Excellente | ➖ chaque MAJ de Synapse/Element peut casser un truc |
| Performance IA | ChatGPT / Claude cloud (excellents) | n/a | Apple Intelligence (correct, on-device) | Ollama 3B local (correct mais loin de GPT-4o) |
| Recherche full-text dans les messages | ✅ | ✅ | ✅ | ➖ via Element, limité |

**Verdict** : sur la qualité IA brute, **Symbalyx perd** face à ChatGPT/Claude/Apple Intelligence parce que tourner un LLM sur ton ordi ne peut pas égaler un cluster GPU dans un datacenter. Mais le LLM local ne **lit pas ta vie privée**.

---

## 6. Modèle économique et alignement

| Critère | WhatsApp | Signal | Telegram | iMessage | Discord | **Symbalyx** |
|---|---|---|---|---|---|---|
| Éditeur lit / vend les données | Meta (publicité Instagram/FB) | Non profit | Telegram (offre Premium) | Apple (peu monétisé) | Discord (publicité, données aux IA) | **Personne (tu es l'éditeur)** |
| Modèle | Pub Meta + Business | Dons | Pub + Premium | Hardware Apple | Pub + Nitro | Gratuit (tu paies électricité + dispo) |
| Demande d'accès des autorités | Régulière (Meta répond) | Très limité | Très opaque | Cas par cas (Apple résiste) | Régulier | **Seulement si police vient saisir ton PC** |
| Géré depuis quel pays | États-Unis (Meta) | États-Unis | UAE / chypriote | États-Unis | États-Unis | Ta cuisine |

---

## 7. Cas d'usage où Symbalyx **gagne nettement**

- Tu partages des informations qui ne doivent **jamais** transiter par un tiers (avocat-client, médecin-patient, journaliste-source, conseil d'administration sensible, projet stratégique d'entreprise)
- Tu veux que **personne, pas même l'éditeur**, ne puisse répondre à une demande des autorités
- Tu veux pouvoir **donner ton téléphone à un inconnu** sans risque de fuite
- Tu veux un **assistant IA sans envoyer tes questions à un cloud externe**
- Tu veux **maîtriser entièrement** ton stack (effacer, recréer, déplacer, archiver à ta guise)

## 8. Cas d'usage où Symbalyx **n'est PAS adapté**

- Tu veux écrire à un ami qui n'a pas envie d'apprendre à installer Docker
- Tu veux des notifications push fiables sur ton iPhone même quand l'app est fermée depuis des heures
- Tu veux écrire à 100 personnes
- Tu veux que ça marche en mobilité sans VPN ni serveur exposé
- Tu veux le confort grand public (stickers, GIFs animés, statuts, communautés, channels)

---

## Bilan sans complaisance

| Catégorie | Symbalyx vs concurrents |
|---|---|
| Souveraineté / vie privée totale | **Meilleur du marché** (parce qu'il n'y a pas de "marché", tu héberges) |
| Fonctions confidentialité opérationnelle (façade, coffre, mode décor) | **Meilleur du marché** (inventé pour ça) |
| Sécurité cryptographique brute | **Égal à Signal / iMessage** |
| Assistant IA confidentiel | **Meilleur du marché** (Meta AI et Apple Intelligence lisent, ici non) |
| Confort grand public | **Très inférieur** à WhatsApp, Signal, Telegram, iMessage |
| Adoption / effet réseau | **Inexistant** |
| Setup et maintenance | **Inférieur** à tout le monde |

**Symbalyx, c'est WhatsApp pour 10 personnes qui prennent leur confidentialité au sérieux et qui acceptent de payer le confort grand public en échange d'une souveraineté totale.**

Si tu cherches juste "comme WhatsApp mais en mieux", prends Signal.
Si tu cherches "personne ne doit savoir que cette app existe ni ce qu'elle contient, et l'éditeur doit être moi", Symbalyx est la réponse.
