// const isLocalhost = Boolean(
//   window.location.hostname === 'localhost' ||
//   // [::1] is the IPv6 localhost address.
//   window.location.hostname === '[::1]' ||
//   // 127.0.0.0/8 are considered localhost for IPv4.
//   window.location.hostname.match(
//     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
//   )
// );
//
// function register() {
// }
//
// function unregister() {
//
// }

const cacheName = 'my-cache-v1';
const dynamicCache = 'dynamic-cache-v1';
const cacheable = [
  '/',
  'css/app.css',
  'css/main.css',
  'css/normalize.css',
  'js/vendor/modernizr-3.11.2.min.js',
  'js/main.js',
  'js/plugins.js',
  'js/ui.js',
  'img/thumbs/cheops.jpg',
  'img/thumbs/hst.jpg',
  'img/thumbs/noaa-20.jpg',
  'img/thumbs/space-station.jpg',
  'img/thumbs/starlink-1316.jpg',
  'img/icons/latitude_108.png',
  'img/icons/uphere-api.jpg',
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
        console.log('Cache opened!');
        return cache.addAll(cacheable);
      })
      .then(self.skipWaiting())
  );
});

//FETCH v1
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => {
//           return response ?? fetch(event.request);
//         }
//       )
//   );
// });

//FETCH v2 - FUNCTIONAL!!!
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

//FETCH v3 - DYNAMIC!!!
self.addEventListener('fetch', function(event) {
  let request = event.request;

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

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key)
          }
        }))
      })
      .then(() => self.clients.claim())
  )
});
