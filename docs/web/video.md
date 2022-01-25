# Video

```html
<style>
#capture {
  position: fixed;
  top: 20px;
  right: 100px;
}
</style>

<input type="file" accept="video/*" onchange="loadFile(event)">
<video
  id="previewContainr"
  controls
  width="480"
  height="270"
  style="display: none;"
></video>

<button id="capture" onclick="captureVideo()">截图</button>

<canvas
  id="myCanvas"
  width="460"
  height="270"
  style="border: 1px solid blue;"
></canvas>
<canvas
  id="myCanvas2"
  width="460"
  height="270"
  style="border: 1px solid blue;"
></canvas>

<div>
  <button id="playBtn">播放</button>
  <button id="pauseBtn">暂停</button>
</div>

<script>
  // 本地播放视频
  const loadFile = function (event) {
    const reader = new FileReader()
    reader.onload = function() {
      const output = document.querySelector('#previewContainr')
      output.style.display = 'block'
      output.src = URL.createObjectURL(new Blob([reader.result]))
    }
    reader.readAsArrayBuffer(event.target.files[0])
  }
</script>

<script>
  // 视频截图
  let video = document.querySelector('#previewContainr')
  let canvas = document.createElement('canvas')
  let img = document.createElement('img')
  img.crossOrigin = ''
  let ctx = canvas.getContext('2d')

  function captureVideo() {
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    img.src = canvas.toDataURL()
    document.body.append(img)
  }
</script>

<script>
  // canvas播放视频
  let canvas1 = document.querySelector('#myCanvas')
  let playBtn = document.querySelector('#playBtn')
  let pauseBtn = document.querySelector('#pauseBtn')
  const context = canvas1.getContext('2d')

  /* 实现色度键控（绿屏效果）start */
  let canvas2 = document.querySelector('#myCanvas2')
  const context2 = canvas2.getContext('2d')
  /* 实现色度键控（绿屏效果）end */

  let timerId = null

  function draw() {
    if (video.paused || video.ended) return
    context.clearRect(0, 0, canvas1.width, canvas1.height)
    context.drawImage(video, 0, 0, canvas1.width, canvas1.height)

    /* 实现色度键控（绿屏效果）start */
    let frame = context.getImageData(0, 0, canvas1.width, canvas1.height)
    let l = frame.data.length / 4
    for (let i = 0; i < l; i++) {
      let r = frame.data[i * 4 + 0]
      let g = frame.data[i * 4 + 1]
      let b = frame.data[i * 4 + 2]
      if (g > 100 && r > 100 && b < 43)
        frame.data[i * 4 + 3] = 0
    }
    context2.putImageData(frame, 0, 0)
    /* 实现色度键控（绿屏效果）end */

    timerId = setTimeout(draw, 0)
  }

  playBtn.addEventListener('click', () => {
    if (!video.paused) return
    video.play()
    draw()
  })

  pauseBtn.addEventListener('click', () => {
    if (video.paused) return
    video.pause()
    clearTimeout(timerId)
  })
</script>
```
