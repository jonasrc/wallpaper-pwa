const cacheName = 'my-cache-v1';
const dynamicCache = 'dynamic-cache-v1';
const cacheable = [
  '/',
  'css/app.css',
  'css/main.css',
  'css/normalize.css',
  'js/vendor/modernizr-3.11.2.min.js',
  'js/index.js',
  'js/plugins.js',
  'js/ui.js',
  'img/thumbs/cheops.jpg',
  'img/thumbs/hst.jpg',
  'img/thumbs/noaa-20.jpg',
  'img/thumbs/space-station.jpg',
  'img/thumbs/starlink-1316.jpg',
  'img/icons/latitude_108.png',
  'img/icons/uphere-api.jpg',
  'img/icons/install-app.png',
  'favicon.ico',
  'data/data.json'
];

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js').then((registration) => {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    initializeUI();
  }, (error) => {
    console.log('Error while registering service worker: ', error);
  })
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        return cache.addAll(cacheable);
      })
      .then(self.skipWaiting())
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
      .then(function(response){
        return caches.open(dynamicCache)//Dynamic cache variable
          .then(function(cache){
            cache.put(event.request.url, response.clone());
            return response;
          })
      })
      .catch(function(error){
        return caches.match(event.request);
      })
  )
});

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     fetch(event.request)
//       .then((response) => {
//         return caches.open(dynamicCache)//Dynamic cache variable
//           .then(function(cache){
//             cache.put(event.request.url, response.clone());
//             return response;
//           })
//       })
//       .catch(() => {
//         return caches.open(cacheName)
//           .then((cache) => {
//             return cache.match(event.request);
//           });
//       })
//   )
// });

// self.addEventListener("fetch", fetchEvent => {
//   fetchEvent.respondWith(
//     caches.match(fetchEvent.request).then(res => {
//       return res || fetch(fetchEvent.request)
//     })
//   )
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request)
//       .catch(() => {
//         return caches.open(cacheName)
//           .then((cache) => {
//             return cache.match(event.request)
//           })
//       })
//   )
// });

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key)
          }
        }))
      })
      .then(() => self.clients.claim())
  )
});
