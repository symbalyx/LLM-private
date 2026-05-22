# Symbalyx · Guide simple

Ce document explique l'application sans aucun terme technique. Si vous voulez comprendre comment elle marche concrètement, c'est ici.

---

## 1. Qu'est-ce que c'est ?

Une application de messagerie qui tourne **uniquement chez vous**, sur votre ordinateur. Aucun message ne passe par Internet ni par un service comme WhatsApp, Telegram ou Signal.

**Image** : c'est comme un talkie-walkie qui ne fonctionne que dans votre maison. Personne en dehors ne peut écouter.

**Pour qui** : un groupe restreint (jusqu'à 10 personnes), qui se connectent au même Wi-Fi pour s'écrire en privé.

---

## 2. Comparé aux applis que vous connaissez

|                              | WhatsApp / Telegram | Signal       | **Symbalyx** |
| ---------------------------- | ------------------- | ------------ | ------------ |
| Vos messages passent où ?    | Serveurs Meta/Telegram | Serveurs Signal | **Votre PC uniquement** |
| Qui peut lire ?              | Vous + destinataires (E2E) | Vous + destinataires (E2E) | **Vous + destinataires (E2E)** |
| Qui voit les métadonnées (qui parle à qui, quand) ? | WhatsApp/Meta | Signal | **Personne** (vous êtes seul) |
| Coupé d'Internet ?           | Non, dépend du net | Non | **Oui, marche sans Internet** |
| Faux mode pour invité ?      | Non | Non | **Oui** |
| Compartiment secret ?        | "Chat archivé" basique | Non | **Oui, avec code PIN** |
| Bouton effacer tout ?        | Désinstall manuel | Désinstall manuel | **Bouton 1 clic → tout part** |

---

## 3. Le chiffrement, c'est quoi ?

**Image** : imaginez que chaque message est mis dans un **coffre-fort** avant d'être envoyé. Seul le destinataire a la clé. Même si quelqu'un intercepte le coffre en route, il ne peut pas l'ouvrir.

C'est ça qu'on appelle "chiffré de bout en bout". Tous vos messages dans Symbalyx fonctionnent comme ça, **par défaut, sans réglage à faire**.

---

## 4. Les fonctions principales

### ⓪ Calculatrice façade (l'entrée secrète)

Quand vous ouvrez l'app, vous voyez **une calculatrice complète, fonctionnelle**. Elle fait vraiment des additions, soustractions, multiplications, divisions, pourcentages — tout comme la calculatrice de votre téléphone. Quelqu'un qui prend votre téléphone pense vraiment que vous avez juste une calculatrice.

**Pour ouvrir la messagerie cachée derrière** : tapez `2020 + 6 =`. L'écran affiche `2026` une demi-seconde, puis :

- Si vous avez activé **Touch ID / Face ID / Empreinte** : le téléphone demande votre doigt ou votre visage
- Si tout est OK → l'app messagerie s'ouvre

**Pour revenir à la calculatrice à tout moment** : le petit cadenas à côté de votre nom dans le menu de gauche → la messagerie disparaît instantanément, l'app redevient une calculatrice.

**Image** : c'est comme un livre dont la couverture dit "Dictionnaire" mais à l'intérieur c'est votre journal intime. Si quelqu'un ouvre le livre au hasard, il croit que c'est vraiment un dictionnaire.

**Pour activer Touch ID / Face ID** : Menu profil → **Touch ID / Face ID** → **Activer**. Le téléphone enregistre votre empreinte/visage. Désormais, après le `2020 + 6 =`, il faudra votre doigt/visage pour ouvrir.

**Sécurité supplémentaire pour les conversations niveau Maximum** : ces conversations utilisent un **chiffrement renforcé**. Les clés qui servent à déchiffrer les messages sont **changées toutes les heures et tous les 10 messages** (au lieu d'une fois par semaine pour les conversations normales). Si jamais une clé venait à fuiter, la quantité de messages exposés serait réduite à environ 150 fois moins. Pas besoin de redemander la biométrie à chaque clic, le verrou est cryptographique.

### A. Messagerie privée

Comme un fil de discussion WhatsApp, mais privé. Vous écrivez, l'autre reçoit.

### B. Groupes privés

Vous créez un groupe (famille, équipe, projet), invitez les personnes, et le groupe est immédiatement chiffré. Personne en dehors ne peut entrer.

**Image** : c'est comme une salle de réunion verrouillée. Vous seul avez la liste des invités.

### C. Appels voix et vidéo

Comme FaceTime ou WhatsApp video, jusqu'à 8 personnes. Chiffrés aussi. Pendant l'appel vous pouvez :

- **Couper votre micro** : icône micro (ou touche M)
- **Couper votre caméra** : icône caméra
- **Partager votre écran** : icône moniteur
- **Inviter quelqu'un en plus** : bouton **Inviter** en haut

### D. Messages éphémères (auto-effacement)

Vos messages disparaissent **tout seuls** au bout d'un temps que vous choisissez :

5 min · 30 min · 1h · 5h · 15h · 1 jour · 1 semaine · 1 mois · 3 mois · 1 an

**Image** : c'est comme écrire au tableau noir, et qu'au bout du temps choisi, le tableau s'efface tout seul.

**À utiliser pour** : un mot de passe partagé, une adresse, une info qui n'a pas vocation à rester.

### E. Conversation importante (ne s'efface jamais)

L'inverse : vous marquez une conversation comme **importante** et plus rien ne s'auto-efface dedans, même si vous avez activé un timer ailleurs. Elle s'épingle aussi en haut de la liste avec une **étoile ★**.

**Comment faire** : clic droit (ou appui long sur mobile) sur la conversation → **Conversation importante**.

**Image** : c'est comme garder un dossier important dans un classeur fermé à clé. Il reste là, intact, le temps que vous voulez.

### F. Niveaux de confidentialité par personne

Pour **chaque** personne dans vos contacts, vous pouvez régler un niveau :

| Niveau     | Effet                                                                 |
| ---------- | --------------------------------------------------------------------- |
| **Normal** | Tout fonctionne normalement.                                          |
| **Élevé**  | Notifications silencieuses. Aperçus du dernier message masqués dans la liste (juste "Nouveau message"). |
| **Maximum** | Tout d'au-dessus + les messages s'effacent automatiquement après **5 minutes**. Si vous changez de fenêtre, la conversation devient **floutée** instantanément. Aucune notification visible. |

**Comment** : ouvrez une conversation → icône **personnes** dans le bandeau du haut → choisissez le niveau pour chaque membre.

**Image** : c'est comme avoir des classeurs marqués "Public" / "Confidentiel" / "Top Secret". Le contenu Top Secret est toujours sous flou tant que vous ne regardez pas directement.

**Règle** : dans un groupe, le niveau effectif est le **plus restrictif** parmi tous les membres. Si vous mettez UNE personne en Maximum dans un groupe, le groupe entier passe en Maximum.

### G. Le coffre (conversations cachées)

Certaines conversations sont **invisibles** par défaut dans votre liste. Pour les voir, il faut entrer un code PIN à 4 chiffres.

**Image** : c'est comme un compartiment caché dans votre portefeuille. À l'œil nu on ne voit qu'un portefeuille normal. Vous appuyez à un endroit précis, et un compartiment caché s'ouvre.

**Comment marquer une conversation** : clic droit → **Masquer la conversation**.

**Comment ouvrir le coffre** :
- Appui long de 2 secondes sur votre photo de profil dans le menu, ou
- 5 petits clics rapides sur la mention "Symbalyx · v1" tout en bas du menu

Tapez votre PIN et la liste change : vous ne voyez que vos conversations cachées.

### H. Le compte coffre (niveau au-dessus)

Pour les choses **vraiment** sensibles, vous pouvez créer un **second compte** Symbalyx, séparé du principal. Quand vous ouvrez ce second compte, le premier est complètement déconnecté.

**Image** : c'est comme avoir deux téléphones séparés. Quand vous prenez le téléphone "secret", l'autre est éteint et personne ne peut le pister.

Pour entrer dans ce compte, il faut un code PIN. Sans ce code, le compte est **inaccessible** — même par vous si vous l'oubliez.

### I. Le mode visiteur (faux téléphone)

Le moment où vous prêtez votre téléphone à quelqu'un qui veut "passer un appel" ou "regarder une info".

Vous tapez 5 fois rapidement sur la pastille "Chiffré E2E" en haut → l'app **change instantanément**. L'inconnu voit :

- Une liste de conversations factices crédibles (Maman, un collègue, le pressing, votre banque…)
- Il peut ouvrir n'importe laquelle, lire des messages anciens, taper un message — **certains contacts répondent même automatiquement**
- Aucune trace de vos vraies conversations, votre vrai compte est complètement déconnecté

**Image** : c'est comme avoir un **faux portefeuille** rempli de cartes périmées à donner aux voleurs. Le vrai portefeuille reste dans votre poche intérieure.

**Plus de détails** :
- 4 profils factices différents : un cadre administratif, un consultant, un étudiant, un entrepreneur
- Chaque utilisateur de l'app voit un profil différent → si deux personnes se prêtent leur téléphone le même jour, l'inconnu ne voit pas les mêmes "amis" sur les deux, ce qui éviterait des soupçons
- Ton volontairement banal, neutre, sans rien de remarquable
- **Les contacts répondent naturellement, pas instantanément** : selon le contact, les réponses arrivent **entre 1 et 45 minutes plus tard**. Certains contacts ont seulement **30% de chance de répondre** (services, pharmacie, banque). Maman répond plus souvent que le pressing. L'indicateur "écrit…" n'apparaît qu'à la toute fin (10s avant la réponse), pas dès le premier mot tapé — comme dans la vraie vie. Bref : si l'inconnu écrit à "Maman" et qu'elle ne répond pas tout de suite, c'est normal. Elle peut répondre 15 minutes plus tard, ou pas du tout
- Pour sortir du mode visiteur : 5 tapes sur la pastille + votre code PIN

### J. TOUT SUPPRIMER · Annihilation

Deux boutons rouges visibles en bas du menu profil. Pas de mode "caché" : ils sont là, gros, voulus.

**Bouton 1 — TOUT SUPPRIMER** :
- Vous vous déconnectez de tous les appareils où vous étiez connecté en même temps
- Toutes les traces sont effacées de votre ordinateur : messages, clés, codes PIN, cache, tout
- L'application disparaît, la page devient blanche

Confirmation : taper le mot **SUPPRIMER** en majuscules.

**Bouton 2 — ANNIHILATION SERVEUR** (irréversible) :
Tout ce qui précède **+** votre compte sur Symbalyx est **désactivé pour toujours**. Vos messages dans les conversations partagées sont marqués comme effacés. Le compte ne peut **jamais** être réactivé.

Confirmation : taper **ANNIHILER** + votre mot de passe.

**Raccourci d'urgence** : `Ctrl+Shift+Q` déclenche le bouton 1 sans confirmation. Le tout en moins d'une seconde.

**Image** : c'est comme un coffre-fort qui contient une charge qui détruit le contenu si vous tirez sur la poignée d'urgence.

### K. Verrouillage automatique

Si vous ne touchez ni à la souris ni au clavier pendant un certain temps (réglable : 1, 5, 15 ou 30 min), l'écran se **bloque tout seul**. Pour le redéverrouiller, votre mot de passe.

**Image** : exactement comme l'écran qui se verrouille tout seul sur votre téléphone.

### L. Mode discret

Aucun bruit, aucune alerte. Les autres ne voient même pas que vous tapez un message ou que vous avez lu le leur.

**Image** : c'est comme entrer dans une bibliothèque. Vous lisez, vous écrivez, mais personne ne sait que vous êtes là.

---

## 5. Comment ouvrir l'app

L'application s'ouvre dans un navigateur (Chrome, Safari, Edge…), à l'adresse `http://localhost:8090` sur l'ordinateur qui fait tourner Symbalyx.

Vous pouvez aussi **l'installer** comme une vraie application :

- **Sur iPhone (Safari)** : bouton "Partager" → "Sur l'écran d'accueil"
- **Sur Android (Chrome)** : il vous proposera tout seul de l'installer, ou menu ⋮ → "Ajouter à l'écran d'accueil"
- **Sur ordinateur (Chrome/Edge)** : icône d'installation dans la barre d'adresse

Une fois installée, c'est exactement comme une appli téléchargée sur l'App Store, mais elle reste 100% chez vous.

---

### M. Joindre un fichier chiffré

Bouton **trombone** dans le bandeau d'une conversation. Cliquez, sélectionnez un fichier (jusqu'à 50 Mo : document, photo, vidéo, audio). L'app :

1. **Brouille** le contenu du fichier avec une clé aléatoire générée pour ce fichier seulement
2. Envoie le fichier brouillé vers le serveur (le serveur ne voit que des données illisibles)
3. Envoie la clé au destinataire via le canal chiffré normal

Le destinataire reçoit le fichier, sa messagerie le déchiffre automatiquement.

**Image** : c'est comme envoyer un dossier dans une mallette à code. Vous mettez le dossier dedans, vous fermez à clé, vous envoyez la mallette par la poste, et vous envoyez le code séparément au destinataire via un canal sécurisé. Si la mallette est interceptée, le voleur ne peut rien faire avec.

### N. Voir une fois (inspiré WhatsApp / Signal)

À côté du trombone, une **icône œil**. Cliquez dessus avant de joindre votre fichier : le fichier sera marqué "à usage unique" et **s'efface automatiquement 60 secondes après l'envoi**. Le destinataire a le temps de le voir, après il disparaît, vous ne pouvez plus revenir le récupérer non plus.

**Image** : c'est comme la photo qu'un détective regarde puis brûle.

### O. Note à moi-même (inspiré WhatsApp / Signal)

Bouton **Note à moi-même** dans la sidebar (sous "Nouveau groupe privé"). Crée une conversation où vous êtes seul. Pratique pour :
- Vous noter une info entre deux appareils (l'app sur l'ordi pour écrire, sur le téléphone pour relire)
- Sauvegarder un fichier important qui sera chiffré comme un message
- Faire des brouillons

**Image** : c'est comme un Post-it que vous vous laissez à vous-même, mais protégé par le même chiffrement que vos vraies conversations.

### P. Le Touch ID / Face ID est silencieux

Quand vous tapez `2020 + 6 =`, **rien n'apparaît côté Symbalyx**. Le téléphone affiche son propre prompt natif (le rond avec l'empreinte ou Face ID, exactement comme quand vous déverrouillez votre téléphone). Si la biométrie échoue, la calculatrice se remet à zéro sans message — pas le moindre indice qu'il y avait autre chose derrière.

## 6. Ce qui marche bien aujourd'hui

✅ Échanger des messages texte chiffrés à 10 personnes  
✅ Créer des groupes privés  
✅ Envoyer des messages vocaux  
✅ Appeler en voix ou vidéo, à plusieurs  
✅ Effacer automatiquement les messages (10 durées disponibles)  
✅ Marquer une conversation comme "à garder pour toujours"  
✅ Régler le niveau de confidentialité par personne  
✅ Cacher des conversations dans un coffre avec code PIN  
✅ Utiliser un compte séparé pour le coffre (vraie isolation)  
✅ Mode visiteur factice pour prêter le téléphone  
✅ Tout effacer en un clic, vraiment tout  
✅ Verrouillage automatique  
✅ Installation comme une vraie app sur téléphone  
✅ Transcrire automatiquement les messages vocaux (le texte du vocal apparaît, sans envoi à un service cloud)  
✅ **Calculatrice façade** au démarrage (`2020 + 6 =` pour entrer)  
✅ **Touch ID / Face ID** après le code calculatrice  
✅ **Touch ID redemandé** à l'ouverture d'une conversation niveau Maximum  
✅ **Joindre un fichier** chiffré (jusqu'à 50 Mo : photo, document, vidéo, audio)  
✅ **Voir une fois** : pièce jointe qui s'efface 60 secondes après envoi  
✅ **Note à moi-même** : conversation privée avec soi  
✅ **Faux contacts** qui répondent de manière naturelle (délais 1-45 min, parfois sans réponse)  
✅ **Photo de profil** personnalisable  
✅ **Indicateur en ligne** : point vert sur l'avatar des contacts connectés  
✅ **Fichiers jusqu'à 250 Mo** (au lieu de 50 Mo), chiffrés avant envoi  
✅ **Façade calculatrice** vraiment indistinguable : title, icône PWA, prompt Touch ID, manifest — tout dit "Calculatrice"  

---

## 7. Ce qui reste à améliorer

🔧 **Le résumé des appels** : aujourd'hui, après un appel enregistré, l'app vous donne les **mots-clés** principaux et une intro. Pour un vrai résumé en français correct (comme ferait un humain), il faudrait ajouter un "moteur de langue" supplémentaire (environ 5 Go d'espace en plus). C'est faisable, à demander.

🔧 **Les appels depuis téléphone** : pour que la caméra/le micro marchent depuis un téléphone, l'app doit être configurée en HTTPS (étape supplémentaire de quelques minutes, documentée). Sur ordinateur, ça marche déjà.

🔧 **Stories à 24h** : des messages qu'on partage à tout un groupe et qui disparaissent au bout de 24h, façon Instagram. Pas encore fait, facile à ajouter.

🔧 **Vérification de l'identité des contacts** : aujourd'hui, quand vous ajoutez un nouveau membre à un groupe, vous devez **vérifier** que c'est bien lui (en lui montrant un QR code, en personne). C'est un peu manuel. À automatiser dans un futur.

🔧 **Effacement vraiment "tout tout tout"** : le bouton TOUT SUPPRIMER efface tout côté Symbalyx. Pour qu'il efface **aussi** les traces d'Element (le composant chat à l'intérieur), il faut activer l'étape HTTPS. Sinon, environ 1% des traces peuvent rester (les "clés de déchiffrement" stockées dans une zone séparée).

🔧 **Détection des captures d'écran** : sur mobile, l'app ne peut pas vous prévenir si l'autre prend une photo de l'écran. Limite imposée par les navigateurs. Mitigation existante : le mode Maximum floute automatiquement l'écran si la fenêtre passe en arrière-plan.

🔧 **Alertes en cas de nouveau téléphone qui se connecte** : utile pour détecter si quelqu'un a réussi à entrer dans votre compte. Pas encore fait, demandé.

🔧 **Sauvegarde chiffrée des messages** : si votre ordinateur tombe en panne, vous perdez tout. Une option de sauvegarde chiffrée sur clé USB serait utile.

🔧 **Bot intelligent personnel** : un assistant qui répond à vos questions, comme ChatGPT, mais tournant **uniquement sur votre ordinateur** sans envoyer vos questions sur Internet. À ajouter sur demande (environ 5 Go d'espace, fonctionne sans connexion).

---

## 8. Limites honnêtes à connaître

### Ce que l'app **ne peut pas** empêcher

- Si quelqu'un regarde par-dessus votre épaule en lisant l'écran : aucune appli ne peut bloquer ça (mais le mode Maximum atténue en floutant si vous changez de fenêtre)
- Si quelqu'un installe un logiciel espion sur votre ordinateur : l'appli ne peut pas s'en protéger. Garder l'OS à jour et un anti-virus est essentiel
- Si quelqu'un prend votre téléphone avec votre session ouverte : c'est exactement pour ça que le **verrouillage automatique** et le **mode visiteur** existent
- Si l'ordinateur qui fait tourner Symbalyx est éteint, personne ne peut écrire (logique : c'est lui le serveur)

### Ce que l'app **ne fait pas** (volontaire)

- Pas de cloud, pas de "sauvegarde dans les nuages". Pour sauvegarder, vous devez copier vous-même (clé USB chiffrée par exemple)
- Pas de notifications push sur téléphone éteint. Pour avoir une alerte, le téléphone doit avoir l'app ouverte ou en arrière-plan récent
- Pas de "récupération de compte" si vous perdez le code PIN du coffre. Le coffre est conçu pour être inviolable, même par vous

---

## 9. À retenir en une phrase

> **Symbalyx, c'est WhatsApp mais qui tourne sur votre ordinateur, sans intermédiaire, avec un bouton qui efface tout pour de vrai, un compartiment secret protégé par code, et un mode "fausse appli" à donner aux curieux.**
