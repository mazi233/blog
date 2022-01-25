# Web Worker
```html
<!-- 页面内worker -->
<script id="worker" type="app/worker">
  console.log(name)
  addEventListener('message', function () {
    postMessage('some message');
  }, false);
</script>

<script>
  let worker = new Worker('worker.js')

  // 页面内worker
  let b = new Blob([document.getElementById('worker').textContent])

  let url = window.URL.createObjectURL(b)

  let w = new Worker(url, { name: 'w' })

  w.postMessage('hhh')

  w.onmessage = e => {
    console.log(e.data)
  }

  // 移交控制权
  let buff = new ArrayBuffer(1)
  worker.postMessage(buff, [buff])

  worker.onmessage = e => {
    console.log(e.data)
  }
</script>
```

```js
// worker.js
console.time('w')

importScripts('worker2.js')
importScripts('worker3.js')

console.log(w2)

onmessage = e => {
  console.log(e)
}

let count = 0
for(let i = 0; i < 1000000000; i++) {
  count += i
}

postMessage(count)

console.timeEnd('w')

// worker2.js
const w2 = 'worker2'

console.log('worker22222')

// worker3.js
console.log('worker3')
```