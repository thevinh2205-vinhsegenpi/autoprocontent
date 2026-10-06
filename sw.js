// AUTO PRO CONTENT BĐS — Service Worker v8.0
const CACHE_NAME = 'autopro-bds-v8';
const OFFLINE_CACHE = 'autopro-offline-v8';

// Files cần cache để dùng offline
const CORE_FILES = [
  './index.html',
  './app-logic.js',
  './manifest.json'
];

// Optional assets (không fail nếu thiếu)
const OPTIONAL_FILES = [
  './assets/screenshot-overview.jpg',
  './assets/screenshot-features.jpg',
  './assets/author-photo.jpg'
];

// ── INSTALL: cache core files ──
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache core files (bắt buộc)
      return cache.addAll(CORE_FILES).then(() => {
        // Cache optional files (không bắt buộc)
        return Promise.allSettled(
          OPTIONAL_FILES.map(f => cache.add(f).catch(() => {}))
        );
      });
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: xóa cache cũ ──
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== OFFLINE_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: Cache-first cho app files, Network-first cho external ──
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Chỉ handle GET requests
  if (e.request.method !== 'GET') return;

  // External requests (Google Fonts, CDN) — network only, no cache
  if (url.origin !== self.location.origin) {
    e.respondWith(
      fetch(e.request).catch(() =>
        new Response('', { status: 503, statusText: 'Offline' })
      )
    );
    return;
  }

  // App files — Cache First, fallback to network
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;

      // Not in cache — fetch from network và cache lại
      return fetch(e.request).then(response => {
        // Chỉ cache response thành công
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(e.request, responseToCache);
        });
        return response;
      }).catch(() => {
        // Offline và không có cache — trả về offline page
        if (e.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('./index.html');
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});

// ── BACKGROUND SYNC: thông báo update có sẵn ──
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
