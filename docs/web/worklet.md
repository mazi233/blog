# Worklet

```html
<style>
  .content {
    background-image: paint(myGradient);
  }
</style>
<div class="content">我丢雷楼谋</div>
<script>
  CSS.paintWorklet.addModule('myWorklet.js')
</script>
```

```js
// myWorklet.js
registerPaint('myGradient', class {
  paint(ctx, size, properties) {
    const gradient = ctx.createLinearGradient(0, 0, 0, size.height)

    gradient.addColorStop(0, 'black')
    gradient.addColorStop(0.7, 'rgb(210, 210, 210)')
    gradient.addColorStop(0.7, 'rgb(230, 230, 230)')
    gradient.addColorStop(1, 'white')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size.width, size.height)
  }
})
```
