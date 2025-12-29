const CACHE_NAME = 'fc-drewno-v1';
const ASSETS = [
    './',
    './index.html',
    './O_Teamie.html',
    './Druzyny.html',
    './Osiagniecia.html',
    './Kontakt.html',
    './css/output.css',
    './img/logo.webp',
    './img/logo2.webp',
    './rangi/Gold.webp',
    './rangi/Platinum.webp',
    './rangi/Diamont.webp'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
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