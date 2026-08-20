const CACHE_NAME = 'hutang-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika file ada di cache, gunakan itu (berjalan offline)
        if (response) return response;
        // Jika tidak, ambil dari jaringan
        return fetch(event.request);
      })
  );
});
