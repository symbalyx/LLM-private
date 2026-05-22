/* Service worker minimal. Noms volontairement génériques pour ne rien
 * révéler à un attaquant qui inspecte les ressources. */

const CACHE = "app-cache-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./templates.js",
  "./manifest.json",
  "./icon.svg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // Ne JAMAIS mettre en cache les requêtes Matrix / Element / LiveKit / Whisper.
  if (
    url.port === "8008" ||
    url.port === "8080" ||
    url.port === "8181" ||
    url.port === "8881" ||
    url.port === "7880" ||
    url.port === "9000" ||
    url.pathname.startsWith("/_matrix") ||
    url.pathname.startsWith("/_synapse")
  ) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request).catch(() => cached))
  );
});
