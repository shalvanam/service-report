var CACHE_NAME = 'spectro-v1';
var URLS_TO_CACHE = [
  './',
  './index.html'
];

// Install: cache the app shell
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
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

// Fetch: network first for API calls, cache first for app files
self.addEventListener('fetch', function(event) {
  var url = event.request.url;
  
  // Network-first for Google Sheet API and CDN resources
  if (url.includes('script.google.com') || url.includes('fonts.google') || url.includes('cdnjs.cloudflare')) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    );
    return;
  }
  
  // Cache-first for app files
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).then(function(fetchResp) {
        var respClone = fetchResp.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, respClone);
        });
        return fetchResp;
      });
    })
  );
});
