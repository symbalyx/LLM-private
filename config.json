server {
    listen       80;
    server_name  _;

    # Pas de logs d'accès (vie privée)
    access_log off;
    error_log /var/log/nginx/error.log warn;

    # Cache les en-têtes de version
    server_tokens off;

    # Sécurité de base
    add_header Referrer-Policy "no-referrer" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    root   /usr/share/nginx/html;
    index  index.html;

    # Effacement global du storage (Clear-Site-Data)
    location = /wipe {
        add_header Clear-Site-Data '"cache", "cookies", "storage", "executionContexts"' always;
        return 200 "Wiped";
    }

    # Service worker doit être servi avec le bon MIME
    location = /service-worker.js {
        add_header Service-Worker-Allowed "/" always;
        types { application/javascript js; }
        try_files $uri =404;
    }

    # Proxy vers Ollama (LLM local) pour résumés d'appels et UI assistant.
    # Évite d'exposer le port 11434 sur le LAN ; la UI passe par /ollama/.
    location /ollama/ {
        proxy_pass http://ollama:11434/;
        proxy_set_header Host $host;
        proxy_read_timeout 600s;
        proxy_buffering off;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
