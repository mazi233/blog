# Shared Worker
> shared worker 是在同一个进程中完成（在浏览器中也不会看到引入 `shared worker` 文件）
```html
<label for="square">Square</label><input type="number" name="" id="square">
<div id="result"></div>

<script>
  const sw = new SharedWorker('sharedWorker.js')
  // sw.port.start()
</script>

<script>
  const squareNumber = document.getElementById('square')
  const result = document.getElementById('result')
  squareNumber.onchange = e => {
    sw.port.postMessage([e.target.value, e.target.value])
    console.log('Message posted to worker')
  }
  sw.port.onmessage = function(e) {
    result.textContent = e.data
    console.log('Message received from worker')
  }
</script>
```

```js
// sharedWorker.js
onconnect = function(e) {
  var port = e.ports[0]

  port.onmessage = function(e) {
    var workerResult = 'Result: ' + (e.data[0] * e.data[1])
    port.postMessage(workerResult)
  }
}
```
