/* ===================================================================
   Lime OS — sw.js (Service Worker)
   Faz cache dos arquivos essenciais para o Lime OS abrir mesmo
   offline / sem internet, como um "sistema" instalado de verdade.
   =================================================================== */

const CACHE_NAME = 'lime-os-v0-1';

const FILES_TO_CACHE = [
  './index.html',
  './manifest.json',
  './css/base.css',
  './css/boot.css',
  './css/loading.css',
  './css/lock.css',
  './css/home.css',
  './css/app-window.css',
  './js/boot.js',
  './js/loading.js',
  './js/lock.js',
  './js/home.js',
  './js/app-window.js',
  './js/main.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
