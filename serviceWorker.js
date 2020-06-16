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
const cacheable = [
  '/',
  '/css/app.css',
  '/css/main.css',
  '/css/normalize.css'
];

if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js').then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, (error) => {
      console.log('Error while registering service worker: ', error);
    })
  })
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        console.log('Cache opened!');
        cache.addAll(cacheable);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response ?? fetch(event.request);
      }
    )
  );
});
