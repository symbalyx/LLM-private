/* ============================================================
 *  Symbalyx — Données du mode leurre (decoy).
 *
 *  4 profils distincts, mappés à chaque utilisateur Matrix.
 *  Chaque profil contient ses propres contacts, conversations
 *  et auto-réponses pour éviter qu'un visiteur tombe deux fois
 *  sur les mêmes "amis" en passant l'app entre deux personnes.
 *
 *  Mapping par défaut : voir window.DECOY_DATA.map en bas de
 *  fichier. Pour assigner un profil à un utilisateur Matrix,
 *  ajoute son handle (sans @ ni domaine).
 *
 *  Personnalisation : modifie les conversations, ou crée des
 *  profils additionnels (profileE, profileF, ...) puis ajoute
 *  l'entrée correspondante dans map.
 *
 *  Ton volontairement neutre, professionnel, plausible. Pas
 *  de kitch, peu d'emojis. À adapter à ta vie réelle pour
 *  rendre le leurre indiscernable.
 *
 *  Format d'un profil :
 *    {
 *      me:       { name, avatar }   identité affichée pendant le leurre
 *      conversations: [
 *        {
 *          id, name, avatar, color, lastSeen, pinned?, muted?,
 *          messages: [{ from: "me"|"them", text, time, day? }],
 *          autoreply?: [{ match: regex, reply: string, delay: ms }]
 *        }
 *      ]
 *    }
 * ============================================================
 */

/* ============================================================
 *  PROFIL A — cadre administratif, vie de famille
 * ============================================================ */
const profileA = {
  me: { name: "Antoine M.", avatar: "AM" },
  conversations: [
    {
      id: "A_mom", name: "Maman", avatar: "M",
      color: "linear-gradient(135deg, #b08968, #ddb892)",
      lastSeen: "il y a 14 min", pinned: true,
      messages: [
        { day: "Lundi" },
        { from: "them", text: "Bonjour mon grand. Tu peux me rappeler quand tu as un moment ?", time: "09:12" },
        { from: "me",   text: "Je te rappelle ce midi, je suis en réunion.", time: "09:18" },
        { from: "them", text: "Pas de souci.", time: "09:18" },
        { from: "them", text: "Petite question : tu as bien le RDV avec le notaire jeudi 14h ?", time: "12:40" },
        { from: "me",   text: "Oui c'est noté. Je passe te prendre à 13h30.", time: "12:55" },
        { from: "them", text: "Parfait. J'aurai préparé les papiers.", time: "12:56" },
        { day: "Mardi" },
        { from: "them", text: "Ton père s'est encore plaint du dos. Je l'ai pris pour vendredi chez le kiné.", time: "08:20" },
        { from: "me",   text: "Très bien. Dis-lui de pas forcer en attendant.", time: "08:35" },
        { from: "them", text: "Je lui ai déjà dit dix fois.", time: "08:36" },
        { from: "me",   text: "Je sais.", time: "08:36" },
        { day: "Hier" },
        { from: "them", text: "Tu rentres dîner samedi soir ?", time: "11:02" },
        { from: "me",   text: "Oui avec Claire. On apportera le dessert.", time: "11:30" },
        { from: "them", text: "Très bien. J'ai prévu un rôti.", time: "11:31" },
        { day: "Aujourd'hui" },
        { from: "them", text: "Bonne journée. À samedi.", time: "07:45" }
      ],
      autoreply: [
        { match: /merci/i,               replies: ["De rien.", "Avec plaisir.", "C'est normal."] },
        { match: /\boui\b|d.accord|ok/i, replies: ["Bien noté.", "Parfait.", "OK.", "Très bien.", "C'est noté."] },
        { match: /demain|samedi|dimanche/i, replies: ["Je te confirme demain matin.", "Je te tiens au courant.", "Je te redis ça."] },
        { match: /comment ça va|comment vas/i, replies: ["Ça va, et toi ?", "Pas mal. Et toi ?"] }
      ]
    },
    {
      id: "A_claire", name: "Claire", avatar: "C",
      color: "linear-gradient(135deg, #6c63ff, #5a47d1)",
      lastSeen: "actif·ve",
      messages: [
        { day: "Hier" },
        { from: "them", text: "Tu as pensé à passer chez le pressing ?", time: "17:32" },
        { from: "me",   text: "Oui je m'en occupe demain matin.", time: "17:40" },
        { from: "them", text: "Merci.", time: "17:40" },
        { from: "them", text: "On garde l'idée du resto vendredi ?", time: "19:50" },
        { from: "me",   text: "Oui 20h, c'est réservé.", time: "19:55" },
        { from: "them", text: "Parfait.", time: "19:56" },
        { day: "Aujourd'hui" },
        { from: "them", text: "N'oublie pas que les Lefèvre passent dimanche après-midi.", time: "08:14" },
        { from: "me",   text: "Reçu. Je rentrerai tôt.", time: "08:30" },
        { from: "them", text: "Tu peux acheter du café en passant ?", time: "13:20" }
      ],
      autoreply: [
        { match: /oui|ok|d.accord/i,         replies: ["OK", "ok 👍", "Parfait", "Très bien"] },
        { match: /resto|restaurant/i,        replies: ["On pourrait essayer l'italien de Saint-Marc.", "Tu choisis, je te suis.", "Pourquoi pas le japonais d'à côté ?"] },
        { match: /weekend|samedi|dimanche/i, replies: ["On peut aller marcher au parc samedi matin.", "Je suis libre samedi, dimanche je verrai.", "À voir avec tes parents."] },
        { match: /\b(bisou|love|t.aime)/i,   replies: ["Bisous ❤️", "À ce soir"] }
      ]
    },
    {
      id: "A_marc", name: "Marc · Cabinet", avatar: "MC",
      color: "linear-gradient(135deg, #2d3748, #4a5568)",
      lastSeen: "il y a 2h",
      messages: [
        { day: "Lundi" },
        { from: "them", text: "Antoine, je t'ai mis le brief sur le dossier Berthier en partage.", time: "10:15" },
        { from: "me",   text: "Reçu. Je regarde dans l'après-midi.", time: "10:22" },
        { from: "them", text: "Merci. Pense à la conf-call de 16h avec le client.", time: "10:23" },
        { from: "me",   text: "Noté.", time: "10:23" },
        { day: "Hier" },
        { from: "them", text: "Bonne réunion ce matin. Le client était plutôt satisfait.", time: "14:05" },
        { from: "me",   text: "Oui c'est positif. On enchaîne sur la phase 2 ?", time: "14:12" },
        { from: "them", text: "Oui. Je te fais passer le planning révisé d'ici demain.", time: "14:14" },
        { day: "Aujourd'hui" },
        { from: "them", text: "Planning envoyé par mail. Tu valides ?", time: "09:30" }
      ],
      autoreply: [
        { match: /valide|valider|ok/i, reply: "Top. Je préviens l'équipe.",              delay: 3000 },
        { match: /question|comment/i, reply: "Passe à mon bureau quand tu peux.",       delay: 3500 }
      ]
    },
    {
      id: "A_garage", name: "Garage Centrale Auto", avatar: "GA",
      color: "linear-gradient(135deg, #4a5d23, #6b8e3d)",
      lastSeen: "vu il y a 3 jours",
      messages: [
        { day: "Vendredi dernier" },
        { from: "them", text: "Bonjour M. Mariotti. Votre véhicule est prêt. Montant : 384 €.", time: "11:14" },
        { from: "me",   text: "Bonjour. Je passe le récupérer en fin de journée.", time: "11:50" },
        { from: "them", text: "Très bien. Nous fermons à 18h30.", time: "11:51" },
        { day: "Lundi" },
        { from: "them", text: "Pensez à passer pour le contrôle technique courant juin.", time: "10:00" }
      ]
    },
    {
      id: "A_pressing", name: "Pressing Madeleine", avatar: "PM",
      color: "linear-gradient(135deg, #34495e, #5d6d7e)",
      lastSeen: "vu il y a 2 jours",
      messages: [
        { from: "them", text: "Bonjour, votre commande #4821 est prête.", time: "14:20", day: "Lundi" },
        { from: "me",   text: "Merci, je passe demain.", time: "14:35" },
        { from: "them", text: "Bonne journée.", time: "14:36" }
      ]
    },
    {
      id: "A_banque", name: "BNP · Conseiller", avatar: "BC",
      color: "linear-gradient(135deg, #1f4e5f, #2c7a7b)",
      lastSeen: "vu il y a 5 jours",
      messages: [
        { from: "them", text: "Bonjour M. Mariotti. Votre virement de 1 250 € est enregistré.", time: "10:12", day: "Vendredi dernier" },
        { from: "them", text: "Cordialement.", time: "10:12" },
        { from: "me",   text: "Merci pour la confirmation.", time: "10:30" },
        { from: "them", text: "Je vous rappelle votre RDV mensuel mardi prochain 11h.", time: "16:40", day: "Lundi" },
        { from: "me",   text: "C'est noté.", time: "16:55" }
      ]
    },
    {
      id: "A_thomas", name: "Thomas", avatar: "T",
      color: "linear-gradient(135deg, #5a8dee, #758fff)",
      lastSeen: "il y a 6h",
      messages: [
        { day: "Samedi dernier" },
        { from: "them", text: "Tu joues au tennis dimanche ?", time: "10:45" },
        { from: "me",   text: "Oui 9h au club. Je réserve le court.", time: "11:00" },
        { from: "them", text: "Parfait.", time: "11:00" },
        { day: "Hier" },
        { from: "them", text: "Tu as vu le match hier soir ?", time: "22:18" },
        { from: "me",   text: "Oui. Match serré.", time: "22:24" },
        { from: "them", text: "On en parle vendredi devant un verre.", time: "22:25" }
      ],
      autoreply: [
        { match: /tennis|sport|club/i, reply: "OK pour dimanche 9h alors.",              delay: 3500 },
        { match: /\b(salut|hey|yo)\b/i, reply: "Salut. Ça va ?",                         delay: 2000 }
      ]
    },
    {
      id: "A_school", name: "École · Mme Renaud", avatar: "ER",
      color: "linear-gradient(135deg, #8b5a3c, #b88555)",
      lastSeen: "vu hier",
      messages: [
        { from: "them", text: "Bonjour M. Mariotti. Je voulais vous informer que Léa a très bien participé en classe cette semaine.", time: "16:30", day: "Vendredi dernier" },
        { from: "me",   text: "Merci beaucoup pour ce retour.", time: "17:10" },
        { from: "them", text: "Bonne soirée.", time: "17:11" },
        { day: "Mardi" },
        { from: "them", text: "Rappel : sortie scolaire mardi prochain, autorisation à signer.", time: "09:00" },
        { from: "me",   text: "Bien noté, je signe ce soir.", time: "09:30" }
      ]
    }
  ]
};

/* ============================================================
 *  PROFIL B — indépendant / consultant
 * ============================================================ */
const profileB = {
  me: { name: "Camille L.", avatar: "CL" },
  conversations: [
    {
      id: "B_compta", name: "Sandrine · Comptable", avatar: "SC",
      color: "linear-gradient(135deg, #2c5282, #2b6cb0)",
      lastSeen: "il y a 1h", pinned: true,
      messages: [
        { day: "Lundi" },
        { from: "them", text: "Bonjour Camille. J'ai bien reçu les factures du mois.", time: "09:25" },
        { from: "me",   text: "Parfait. Tu as tout ce qu'il te faut ?", time: "09:40" },
        { from: "them", text: "Oui. Petite remarque : la facture #2024-038 n'a pas le bon RIB. Tu peux corriger ?", time: "10:00" },
        { from: "me",   text: "Je rectifie aujourd'hui.", time: "10:05" },
        { from: "them", text: "Merci.", time: "10:05" },
        { day: "Mercredi" },
        { from: "them", text: "TVA T1 envoyée à l'admin. 2 380 € à provisionner pour le 15.", time: "14:20" },
        { from: "me",   text: "Reçu. C'est prévu.", time: "14:35" },
        { day: "Aujourd'hui" },
        { from: "them", text: "Petit rappel : déclaration sociale avant fin du mois.", time: "08:15" }
      ],
      autoreply: [
        { match: /merci|ok/i,                replies: ["Bonne journée.", "À bientôt.", "Avec plaisir."] },
        { match: /factur|tva|imp[oô]t/i,     replies: ["Je regarde et je reviens vers toi en début d'après-midi.", "Je m'en occupe.", "Je vérifie ça aujourd'hui."] },
        { match: /salaire|paie|virement/i,   replies: ["Tout est en ordre pour le mois.", "Je te fais le récap demain matin."] },
        { match: /rdv|rendez-vous/i,         replies: ["Je propose mardi 14h ou jeudi 10h, qu'est-ce qui te va ?", "On peut se voir au bureau quand tu veux."] },
        { match: /\b(bonjour|salut)\b/i,     replies: ["Bonjour Camille.", "Bonjour, j'espère que tu vas bien."] }
      ]
    },
    {
      id: "B_clientX", name: "Hélène · Client", avatar: "HC",
      color: "linear-gradient(135deg, #553c9a, #7c5aa6)",
      lastSeen: "actif·ve",
      messages: [
        { day: "Lundi" },
        { from: "them", text: "Bonjour Camille, est-ce que vous pouvez nous transmettre le devis révisé ?", time: "10:15" },
        { from: "me",   text: "Je vous l'envoie d'ici demain matin.", time: "10:30" },
        { from: "them", text: "Parfait merci.", time: "10:31" },
        { day: "Mardi" },
        { from: "me",   text: "Devis envoyé par mail. À votre disposition pour les retours.", time: "09:45" },
        { from: "them", text: "Bien reçu. On revient vers vous en fin de semaine.", time: "10:20" },
        { day: "Hier" },
        { from: "them", text: "C'est validé de notre côté. Vous pouvez démarrer la phase 1.", time: "16:10" },
        { from: "me",   text: "Excellent. Je vous transmets le calendrier détaillé lundi.", time: "16:25" },
        { from: "them", text: "Parfait. Bon week-end.", time: "16:30" }
      ],
      autoreply: [
        { match: /question|comment|combien/i, replies: ["Je vous appelle dans la journée pour en discuter.", "Je peux organiser un échange demain matin si vous voulez."] },
        { match: /devis|tarif|prix/i,         replies: ["Je vous renvoie le devis actualisé d'ici demain.", "On en discute lors de notre prochain point."] },
        { match: /délai|quand|livr/i,         replies: ["Sous 10 jours ouvrés.", "Je consulte l'équipe et je reviens vers vous."] },
        { match: /merci/i,                    replies: ["Je vous en prie.", "À votre service."] }
      ]
    },
    {
      id: "B_jean", name: "Jean", avatar: "J",
      color: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
      lastSeen: "il y a 30 min",
      messages: [
        { day: "Samedi dernier" },
        { from: "them", text: "Tu es libre dimanche pour boire un café ?", time: "12:30" },
        { from: "me",   text: "Oui avec plaisir. 15h au lieu habituel ?", time: "13:00" },
        { from: "them", text: "Parfait.", time: "13:00" },
        { day: "Lundi" },
        { from: "them", text: "Merci pour le moment de dimanche. Ça fait du bien de souffler un peu.", time: "08:45" },
        { from: "me",   text: "Oui même chose. On remet ça bientôt.", time: "09:10" },
        { day: "Hier" },
        { from: "them", text: "Tu as vu l'expo dont je t'avais parlé au Petit Palais ?", time: "19:20" },
        { from: "me",   text: "Pas encore. J'ai vu qu'elle se termine fin du mois.", time: "19:45" },
        { from: "them", text: "On pourrait y aller samedi prochain ?", time: "19:46" }
      ],
      autoreply: [
        { match: /samedi|dimanche|weekend/i, reply: "Ça me va. Je confirme jeudi.", delay: 3500 },
        { match: /\b(salut|hey|coucou)\b/i, reply: "Salut, comment ça va ?", delay: 2500 }
      ]
    },
    {
      id: "B_pere", name: "Papa", avatar: "P",
      color: "linear-gradient(135deg, #a0522d, #cd853f)",
      lastSeen: "vu hier",
      messages: [
        { day: "Vendredi dernier" },
        { from: "them", text: "Ma chérie, comment tu vas ?", time: "11:00" },
        { from: "me",   text: "Bien Papa, et toi ?", time: "11:15" },
        { from: "them", text: "Ça va. Petite fatigue avec le changement de temps.", time: "11:16" },
        { from: "me",   text: "Tu prends bien tes médicaments ?", time: "11:18" },
        { from: "them", text: "Oui ne t'inquiète pas.", time: "11:20" },
        { day: "Lundi" },
        { from: "them", text: "RDV cardio passé. Tout va bien, juste l'ordonnance à renouveler.", time: "15:30" },
        { from: "me",   text: "Tant mieux. Je passe samedi.", time: "15:45" }
      ],
      autoreply: [
        { match: /papa|santé|médecin/i, reply: "Tout va bien. Ne te fais pas de soucis.", delay: 3500 }
      ]
    },
    {
      id: "B_avocat", name: "Cabinet Mercier", avatar: "CM",
      color: "linear-gradient(135deg, #2d3748, #4a5568)",
      lastSeen: "vu il y a 4 jours",
      messages: [
        { from: "them", text: "Bonjour Mme Lefort. Maître Mercier vous propose un point téléphonique mardi 10h.", time: "14:00", day: "Lundi" },
        { from: "me",   text: "Ce créneau me convient.", time: "14:20" },
        { from: "them", text: "Très bien. Nous vous appellerons.", time: "14:21" }
      ]
    },
    {
      id: "B_plombier", name: "Plomberie Express", avatar: "PE",
      color: "linear-gradient(135deg, #2b6cb0, #3182ce)",
      lastSeen: "vu il y a 6 jours",
      messages: [
        { from: "them", text: "Intervention prévue jeudi entre 10h et 12h.", time: "16:00", day: "Mardi dernier" },
        { from: "me",   text: "Très bien je serai là.", time: "16:15" },
        { from: "them", text: "Devis signé bien reçu, merci.", time: "08:30", day: "Mercredi dernier" }
      ]
    },
    {
      id: "B_assur", name: "Mutuelle Pro", avatar: "MP",
      color: "linear-gradient(135deg, #38a169, #48bb78)",
      lastSeen: "vu il y a 1 semaine",
      messages: [
        { from: "them", text: "Bonjour, votre remboursement de 142,80 € est en cours de traitement.", time: "10:00", day: "Lundi dernier" }
      ]
    }
  ]
};

/* ============================================================
 *  PROFIL C — étudiant / jeune actif
 * ============================================================ */
const profileC = {
  me: { name: "Hugo D.", avatar: "HD" },
  conversations: [
    {
      id: "C_mom", name: "Maman", avatar: "M",
      color: "linear-gradient(135deg, #d69e2e, #ecc94b)",
      lastSeen: "il y a 2h", pinned: true,
      messages: [
        { day: "Lundi" },
        { from: "them", text: "Tu as réussi ton partiel ?", time: "18:30" },
        { from: "me",   text: "Oui, 14. Pas la note de l'année mais correcte.", time: "18:45" },
        { from: "them", text: "Très bien. Continue comme ça.", time: "18:46" },
        { day: "Mercredi" },
        { from: "them", text: "Tu rentres le week-end du 18 ?", time: "10:15" },
        { from: "me",   text: "Oui, train samedi matin.", time: "10:30" },
        { from: "them", text: "Parfait. Tu veux qu'on vienne te chercher à la gare ?", time: "10:31" },
        { from: "me",   text: "Non je prends le bus, pas la peine.", time: "10:35" },
        { day: "Hier" },
        { from: "them", text: "N'oublie pas d'appeler ta grand-mère ce week-end.", time: "19:00" },
        { from: "me",   text: "Je l'appelle demain.", time: "19:20" },
        { day: "Aujourd'hui" },
        { from: "them", text: "Bonne journée mon chéri. Pense à bien manger le midi.", time: "07:50" }
      ],
      autoreply: [
        { match: /merci|ok/i,              replies: ["Bisous mon grand.", "Bisous ❤️", "À bientôt mon chéri."] },
        { match: /examen|partiel|note/i,   replies: ["Tu vas y arriver. Je crois en toi.", "Reste concentré, tu connais ton cours.", "Pense à bien dormir avant."] },
        { match: /argent|virement/i,       replies: ["Je te fais un virement ce soir.", "C'est fait, vérifie demain.", "On en reparle ce week-end."] },
        { match: /fatigué|crevé|dort?/i,   replies: ["Repose-toi bien.", "Tu travailles trop, fais des pauses."] },
        { match: /weekend|samedi|dimanche/i, replies: ["Tu rentres samedi ?", "On vous attend dimanche midi."] }
      ]
    },
    {
      id: "C_coloc", name: "Sami · Coloc", avatar: "S",
      color: "linear-gradient(135deg, #38b2ac, #4fd1c5)",
      lastSeen: "actif·ve",
      messages: [
        { day: "Hier" },
        { from: "them", text: "Tu rentres tard ce soir ?", time: "17:40" },
        { from: "me",   text: "Vers 21h, j'ai TD.", time: "17:55" },
        { from: "them", text: "OK je commande des pâtes, ça te va ?", time: "17:56" },
        { from: "me",   text: "Top.", time: "17:56" },
        { day: "Aujourd'hui" },
        { from: "them", text: "On manque de PQ.", time: "09:14" },
        { from: "me",   text: "Je passe en rentrant.", time: "09:20" },
        { from: "them", text: "Aussi du café.", time: "09:21" },
        { from: "them", text: "Et du lait.", time: "09:21" },
        { from: "me",   text: "Fais-moi une liste plutôt.", time: "09:22" },
        { from: "them", text: "Je te l'envoie dans 2 min.", time: "09:22" }
      ],
      autoreply: [
        { match: /liste|courses/i,        replies: ["Café · Lait · PQ · Pain · Yaourts · Pâtes", "Rajoute du sopalin stp", "Et de la lessive aussi"] },
        { match: /soir|dîner|manger/i,    replies: ["OK pour ce soir alors.", "Je passe au marché en rentrant.", "Pizza ce soir ?"] },
        { match: /\b(salut|yo|hey)\b/i,   replies: ["Yo", "Salut", "Yo ça roule ?"] },
        { match: /loyer|charges/i,        replies: ["Je te fais le virement demain.", "C'est noté, fin du mois."] },
        { match: /tu rentres|rentre/i,    replies: ["Je sais pas encore, je te dis tt à l'heure", "Tard ce soir je pense"] }
      ]
    },
    {
      id: "C_groupeTD", name: "Groupe TD Macro", avatar: "TM",
      color: "linear-gradient(135deg, #6b46c1, #805ad5)",
      lastSeen: "actif·ve", muted: true,
      messages: [
        { day: "Lundi" },
        { from: "them", text: "Léa : Salut tout le monde, on se cale quand pour le dossier de groupe ?", time: "14:20" },
        { from: "them", text: "Yann : Mercredi 18h à la BU ça vous va ?", time: "14:25" },
        { from: "me",   text: "OK pour moi.", time: "14:30" },
        { from: "them", text: "Léa : Validé.", time: "14:35" },
        { from: "them", text: "Yann : Ya quelqu'un qui a la correction du TD 3 ?", time: "16:40" },
        { from: "me",   text: "Je l'ai. Je vous mets sur le drive.", time: "16:50" },
        { from: "them", text: "Léa : Merci !", time: "16:51" },
        { day: "Mercredi" },
        { from: "them", text: "Yann : Je serai en retard de 15 min ce soir, désolé.", time: "17:30" },
        { from: "them", text: "Léa : Pas de souci, on commence sans toi.", time: "17:31" }
      ]
    },
    {
      id: "C_amel", name: "Amélie", avatar: "A",
      color: "linear-gradient(135deg, #ed64a6, #f687b3)",
      lastSeen: "il y a 4h",
      messages: [
        { day: "Samedi dernier" },
        { from: "them", text: "C'était super hier soir", time: "11:30" },
        { from: "me",   text: "Oui j'ai bien aimé. On remet ça ?", time: "11:45" },
        { from: "them", text: "Carrément. T'es libre vendredi prochain ?", time: "11:46" },
        { from: "me",   text: "Oui je note.", time: "11:50" },
        { day: "Mardi" },
        { from: "them", text: "Tu as vu le truc qu'on s'était dit pour le concert ?", time: "20:15" },
        { from: "me",   text: "Oui je vais regarder pour les places ce soir.", time: "20:30" },
        { from: "them", text: "Cool.", time: "20:30" },
        { day: "Hier" },
        { from: "them", text: "Bonne nuit", time: "23:40" }
      ],
      autoreply: [
        { match: /concert|sortie/i,    replies: ["Je regarde et je te dis ce soir.", "T'as pris les places ?", "Carrément partant."] },
        { match: /vendredi|samedi/i,   replies: ["Ça marche pour moi.", "Je peux le soir oui.", "Note moi 20h."] },
        { match: /\b(coucou|salut|hello|hi)\b/i, replies: ["Coucou", "Hey toi", "Salut 🙂"] },
        { match: /bonne nuit|dodo/i,   replies: ["Bonne nuit", "Dors bien"] },
        { match: /bisou|coeur|love/i,  replies: ["💜", "Bisous toi"] }
      ]
    },
    {
      id: "C_banque", name: "Banque · Jeunes", avatar: "BJ",
      color: "linear-gradient(135deg, #2c5282, #2b6cb0)",
      lastSeen: "vu il y a 5 jours",
      messages: [
        { from: "them", text: "Bonjour, votre virement parental de 400 € a bien été crédité.", time: "08:30", day: "Vendredi dernier" }
      ]
    },
    {
      id: "C_prof", name: "M. Lavergne (TD)", avatar: "ML",
      color: "linear-gradient(135deg, #4a5568, #718096)",
      lastSeen: "vu il y a 2 jours",
      messages: [
        { from: "them", text: "Bonjour M. Dubois, votre rattrapage est confirmé pour vendredi 14h salle B201.", time: "11:00", day: "Mercredi" },
        { from: "me",   text: "Merci, c'est noté.", time: "11:30" }
      ]
    },
    {
      id: "C_pizza", name: "Pizzeria Mario", avatar: "PM",
      color: "linear-gradient(135deg, #c53030, #e53e3e)",
      lastSeen: "vu il y a 1 semaine",
      messages: [
        { from: "them", text: "Votre commande #7821 est en préparation. Livraison estimée 35 min.", time: "20:15", day: "Vendredi dernier" }
      ]
    }
  ]
};

/* ============================================================
 *  PROFIL D — entrepreneur / commerçant
 * ============================================================ */
const profileD = {
  me: { name: "Stéphane R.", avatar: "SR" },
  conversations: [
    {
      id: "D_associe", name: "Karim · Associé", avatar: "KA",
      color: "linear-gradient(135deg, #2c5282, #2b6cb0)",
      lastSeen: "il y a 5 min", pinned: true,
      messages: [
        { day: "Lundi" },
        { from: "them", text: "Salut Steph. Le bilan du mois est dans le drive.", time: "08:30" },
        { from: "me",   text: "Reçu. Je regarde ce matin.", time: "08:45" },
        { from: "them", text: "On est en hausse de 8% sur le mois précédent.", time: "08:46" },
        { from: "me",   text: "Bonne nouvelle. On en discute à 11h ?", time: "08:50" },
        { from: "them", text: "Validé.", time: "08:50" },
        { day: "Mercredi" },
        { from: "them", text: "Le fournisseur Delaunay a relancé pour le paiement.", time: "14:20" },
        { from: "me",   text: "Je règle aujourd'hui.", time: "14:25" },
        { from: "them", text: "Top merci.", time: "14:26" },
        { day: "Hier" },
        { from: "them", text: "RDV banque mardi prochain 10h pour la ligne de crédit.", time: "16:30" },
        { from: "me",   text: "Je suis dispo.", time: "16:35" },
        { day: "Aujourd'hui" },
        { from: "them", text: "On a 3 candidatures pour le poste vendeur. Tu peux jeter un œil ?", time: "09:10" }
      ],
      autoreply: [
        { match: /chiffre|résultat|bilan/i, replies: ["On regarde ça ensemble demain matin.", "Le chiffre s'améliore, à voir si ça tient.", "Je te fais un point à 17h."] },
        { match: /banque|crédit/i,          replies: ["Je m'occupe du dossier dans la journée.", "RDV calé mardi avec le conseiller.", "Je prépare les pièces ce soir."] },
        { match: /merci|ok/i,               replies: ["👍", "Top.", "Bien noté."] },
        { match: /fournisseur|commande/i,   replies: ["On gère, ne t'inquiète pas.", "Je vois ça demain matin."] },
        { match: /embauche|candidat|recrut/i, replies: ["Je te fais le tri ce soir.", "On en parle après-demain."] }
      ]
    },
    {
      id: "D_femme", name: "Élise", avatar: "É",
      color: "linear-gradient(135deg, #b794f4, #d6bcfa)",
      lastSeen: "il y a 1h",
      messages: [
        { day: "Lundi" },
        { from: "them", text: "Tu finis à quelle heure ce soir ?", time: "17:50" },
        { from: "me",   text: "Vers 19h. Je prends Léo à la sortie.", time: "18:00" },
        { from: "them", text: "Merci. Je rentre vers 20h.", time: "18:00" },
        { day: "Mardi" },
        { from: "them", text: "Léo a la kermesse vendredi à 17h. Tu peux essayer d'y être ?", time: "12:30" },
        { from: "me",   text: "Je m'organise pour passer.", time: "12:45" },
        { from: "them", text: "Merci.", time: "12:46" },
        { day: "Hier" },
        { from: "them", text: "Pense à appeler tes parents pour leur anniversaire de mariage.", time: "08:45" },
        { from: "me",   text: "Vrai, j'allais oublier. Merci.", time: "09:00" },
        { day: "Aujourd'hui" },
        { from: "them", text: "Bonne journée. Bisous.", time: "07:30" }
      ],
      autoreply: [
        { match: /merci|ok/i,               replies: ["Bisous.", "À ce soir.", "💜"] },
        { match: /soir|dîner|manger/i,      replies: ["OK je rentre direct alors.", "Tu veux que je prépare ?", "On commande quelque chose ?"] },
        { match: /léo|enfant|école/i,       replies: ["Je m'en occupe.", "Pense à signer le carnet.", "Il a oublié son goûter ce matin."] },
        { match: /weekend|samedi|dimanche/i, replies: ["On voit chez les parents non ?", "Je dois confirmer pour samedi."] },
        { match: /\b(bisou|love|❤️)/i,       replies: ["💜", "Je t'embrasse"] }
      ]
    },
    {
      id: "D_fournisseur", name: "Delaunay & Fils", avatar: "DF",
      color: "linear-gradient(135deg, #744210, #975a16)",
      lastSeen: "vu il y a 1 jour",
      messages: [
        { from: "them", text: "Bonjour M. Roussel. Livraison prévue jeudi entre 8h et 10h.", time: "10:00", day: "Lundi" },
        { from: "me",   text: "Bien noté.", time: "10:30" },
        { day: "Hier" },
        { from: "them", text: "Facture #2024-184 envoyée par mail, échéance 30 jours.", time: "14:20" }
      ]
    },
    {
      id: "D_client", name: "Mme Carpentier · Client", avatar: "MC",
      color: "linear-gradient(135deg, #d53f8c, #ed64a6)",
      lastSeen: "il y a 3h",
      messages: [
        { day: "Mardi" },
        { from: "them", text: "Bonjour M. Roussel. Le canapé que j'ai commandé arrive bien semaine 23 ?", time: "11:00" },
        { from: "me",   text: "Bonjour Mme Carpentier. Oui, livraison prévue mardi 4 juin matin.", time: "11:15" },
        { from: "them", text: "Parfait. Merci pour le suivi.", time: "11:16" }
      ]
    },
    {
      id: "D_avocat", name: "Cabinet Bernard", avatar: "CB",
      color: "linear-gradient(135deg, #2d3748, #4a5568)",
      lastSeen: "vu il y a 4 jours",
      messages: [
        { from: "them", text: "M. Roussel, le dossier prudhomal est mis en délibéré. Décision sous 3 semaines.", time: "16:00", day: "Mardi dernier" },
        { from: "me",   text: "Bien reçu. Merci de me tenir au courant.", time: "16:20" }
      ]
    },
    {
      id: "D_papa", name: "Papa", avatar: "P",
      color: "linear-gradient(135deg, #97266d, #b83280)",
      lastSeen: "vu hier",
      messages: [
        { day: "Dimanche dernier" },
        { from: "them", text: "Bonne fête des pères mon grand.", time: "10:00" },
        { from: "me",   text: "Merci Papa. À toi aussi.", time: "10:20" },
        { day: "Mercredi" },
        { from: "them", text: "Comment ça va le commerce ?", time: "18:00" },
        { from: "me",   text: "Plutôt bien, +8% ce mois.", time: "18:15" },
        { from: "them", text: "Très bien fiston, je suis fier de toi.", time: "18:16" }
      ],
      autoreply: [
        { match: /commerce|boutique|chiffre/i, replies: ["Continue comme ça mon grand.", "Belle progression.", "Bravo fiston."] },
        { match: /\b(papa|père)\b/i,           replies: ["Oui mon grand.", "Dis-moi."] },
        { match: /santé|fatigué|forme/i,       replies: ["Ça va. Toi, repose-toi un peu.", "On vieillit tous, c'est la vie."] }
      ]
    },
    {
      id: "D_compta", name: "Cabinet Conseil", avatar: "CC",
      color: "linear-gradient(135deg, #285e61, #2c7a7b)",
      lastSeen: "vu il y a 6 jours",
      messages: [
        { from: "them", text: "Bonjour, les charges sociales du trimestre ont été payées.", time: "10:30", day: "Vendredi dernier" },
        { from: "me",   text: "Merci pour la confirmation.", time: "10:45" }
      ]
    }
  ]
};

/* ============================================================
 *  MAPPING utilisateur Matrix → profil
 *  Modifie cette table pour affecter chaque user à un profil
 *  cohérent avec sa "vie réelle" supposée.
 * ============================================================ */
window.DECOY_DATA = {
  profiles: {
    A: profileA,
    B: profileB,
    C: profileC,
    D: profileD
  },

  // Mapping explicite username -> profil (sans @, sans domaine)
  // Ajoute des entrées au fur et à mesure que tu crées des comptes.
  map: {
    admin: "A",
    alice: "A",
    bob:   "B",
    carol: "C",
    david: "D",
    eve:   "B",
    frank: "A",
    grace: "C",
    henry: "D",
    iris:  "B"
  },

  // Profil par défaut si l'username n'est pas mappé
  defaultProfile: "A",

  // Fonction utilitaire utilisée par index.html
  getForUser(userId) {
    const handle = (userId || "").replace(/^@/, "").split(":")[0].toLowerCase();
    const key = this.map[handle] || this.defaultProfile;
    return this.profiles[key];
  }
};
