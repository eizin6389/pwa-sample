let CACHE_STATIC_VERSION = '202103010001';
let CACHE_TARGET = [
  '/js/main.js',
  '/images/icons/personal/icon32.ico',
  '/images/icons/personal/icon48.ico',
  '/images/icons/personal/icon64.ico',
  '/images/icons/personal/icon114.png',
  '/images/icons/personal/icon128.png',
  '/images/icons/personal/icon144.png'
];

// インストール
self.addEventListener('install', function (event) {
  console.log('[Service Worker] Installing Service Worker...');

  // キャッシュできるまで次の処理を待つ
  event.waitUntil(
    caches.open(CACHE_STATIC_VERSION)
      .then(function (cache) {
        console.log('[Service Worker] Precaching App...');
        cache.addAll(CACHE_TARGET);
      })
  );
});

// リソースフェッチ時のキャッシュロード処理
// Webページのリクエスト発生
self.addEventListener('fetch', (event) => {
  event.respondWith(async function () {
    const cache = await caches.open(CACHE_STATIC_VERSION);
    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) return cachedResponse;

    const networkResponse = await fetch(event.request);

    // ￿キャッシュがサポートされているメソッドだけキャッシュする
    if (event.request.method == 'GET') {
      event.waitUntil(
        cache.put(event.request, networkResponse.clone())
      );
    }
    return networkResponse;
  }());
});

self.addEventListener('activate', function (event) {
  console.log('[Service Worker] Activating Service Worker...');
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== CACHE_STATIC_VERSION) {
            console.log('[Service Worker] Removing old cache...');
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});