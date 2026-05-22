# ============================================================
#  Symbalyx — coturn (TURN/STUN) pour appels voix/vidéo
#  Usage local uniquement. Pas d'exposition Internet.
# ============================================================

# Port d'écoute principal
listening-port=3478

# Plage de ports UDP pour les flux média
min-port=49152
max-port=49172

# Authentification statique (à changer en prod réelle)
lt-cred-mech
use-auth-secret
static-auth-secret=symbalyx_turn_secret_change_me

# Realm
realm=localhost

# Pas de logs verbeux
no-stdout-log
simple-log

# Sécurité minimale local
no-tlsv1
no-tlsv1_1
no-multicast-peers
no-cli
