
const CACHE_NAME = 'japon-en-flor-v1';

// Estrategia: Cache First, falling back to network para assets estáticos
// Network First para navegación.

self.addEventListener('install', (event) => {
  // El SW se instala inmediatamente
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Limpiar caches antiguos si los hubiera
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Ignorar peticiones que no sean http/https (como chrome-extension)
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si está en caché, lo devolvemos
      if (cachedResponse) {
        return cachedResponse;
      }

      // Si no, hacemos la petición a la red
      return fetch(event.request).then((networkResponse) => {
        // Verificamos si la respuesta es válida
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        // Clonamos la respuesta para guardarla en caché
        const responseToCache = networkResponse.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});
