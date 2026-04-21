var CACHE_NAME = 'spectro-v2';
var URLS_TO_CACHE = [
  './',
  './index.html'
];

// Install: cache the app shell and activate immediately
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches and take control immediately
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME; })
            .map(function(key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

// Fetch: NETWORK-FIRST for everything
// Always try to get the latest version from the server
// Only use cache as fallback when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(networkResp) {
      // Got response from network — update the cache with fresh version
      var respClone = networkResp.clone();
      caches.open(CACHE_NAME).then(function(cache) {
        cache.put(event.request, respClone);
      });
      return networkResp;
    }).catch(function() {
      // Network failed — serve from cache (offline fallback)
      return caches.match(event.request);
    })
  );
});
