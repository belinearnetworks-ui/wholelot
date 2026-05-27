const CACHE_NAME = 'pwa-v1';

// Only put files here that YOU ARE 100% SURE exist
const ASSETS_TO_CACHE = [
  '/',
  // '/assets/styles.css', <--- Comment these out one by one to find the error
  // '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // We use a map to try adding files individually so it doesn't crash
      return Promise.all(
        ASSETS_TO_CACHE.map((url) => {
          return cache.add(url).catch(err => console.error(`Failed to cache: ${url}`, err));
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});