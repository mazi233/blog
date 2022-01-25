# Service Worker
> 用于离线缓存（对 PWA 有很大作用）

```html
<script src="app.js"></script>
```

```js
// app.js

// register servie worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(reg => {
    console.log('Registration succeeded. Scope is ' + reg.scope)
  }).catch(err => {
    console.log('Registration failed with ' + err)
  })
}
```

```js
// sw.js
const ver = 'v2'

// add all cache files
this.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/index.css',
        '/myWorklet.js',
        '/app.js',
        '/sharedWorker.js',
        '/worker.js',
        '/worker2.js',
        '/worker3.js'
      ])
    })
  )
})

// update cache
this.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v2').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/index.css',
        '/myWorklet.js',
        '/app.js',
        '/sharedWorker.js',
        '/worker.js',
        '/worker2.js',
        '/worker3.js'
      ])
    })
  )
})

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request).then(res => {
        return caches.open(ver).then(cache => {
          cache.put(event.request, res.clone())
          return res
        })
      })
    }).catch(() => {
      // have no network and cache
      return new Response('<h1>Internal Server Error</h1>', {
        headers: {
          'Content-Type': 'text/html',
          'Accept': 'text/html;charset=utf-8'
        }
      })
    })
  )
})

// delete old caches
this.addEventListener('activate', event => {
  var cacheWhiteList = ['v2']

  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (cacheWhiteList.indexOf(key) === -1) {
          return caches.delete(key)
        }
      }))
    })
  )
})
```
