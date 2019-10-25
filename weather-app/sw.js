const CACHE_NAME = 'v1'
const urlsToCache = ['/', '/weather', '/index.html', '/favicon.ico']

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('activate', function (event) {
  const cacheWhitelist = [CACHE_NAME]

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        if (!(event.request.url.indexOf('http') === 0)) {
          return response
        }

        return (
          response ||
          fetch(event.request).then(function (response) {
            cache.put(event.request, response.clone())
            return response
          })
        )
      })
    })
  )
})
