server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    root /app;
    index index.html;

    access_log off;
    server_tokens off;

    add_header Referrer-Policy "no-referrer" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    location = /config.json {
        default_type application/json;
        try_files $uri =404;
    }

    location = /symbalyx-element-ui.css {
        default_type text/css;
        try_files $uri =404;
        add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0" always;
    }

    location = /symbalyx-element-ui.js {
        default_type application/javascript;
        try_files $uri =404;
        add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0" always;
    }

    # Injecte la surcouche UI Symbalyx dans Element Web.
    # Sans ça, l'iframe reste Element brut et aucune refonte visuelle ne peut toucher le chat.
    location = /index.html {
        sub_filter_once off;
        sub_filter_types text/html;
        sub_filter '</head>' '<link rel="stylesheet" href="/symbalyx-element-ui.css?v=4"><script defer src="/symbalyx-element-ui.js?v=4"></script></head>';
        try_files $uri =404;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
