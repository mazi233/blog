# FLIP思想
> FLIP（F：first，L：last，I：Invert，P：Play）

> 将一些耗费性能的动画转换为 transform 操作的一种思想（rotate、translate、scale等）

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }

  #btn {
    position: fixed;
    right: 20px;
    top: 10px;
  }

  .animate {
    transition: .3s cubic-bezier(0, 0, .32, 1);
  }

  .con {
    width: 300px;
    height: 200px;
    background-color: aquamarine;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
  }

  .end {
    top: 100px;
    left: 200px;
  }

  #capture {
    position: fixed;
    top: 20px;
    right: 100px;
  }
</style>

<button id="btn">点我一下</button>
<div class="con">
  我是您爸爸啊
</div>

<script>
  const btn = document.getElementById('btn')

  btn.onclick = () => {
    const con = document.querySelector('.con')

    if (con.classList.contains('end')) {
      let first = con.getBoundingClientRect()

      con.classList.remove('end')
      con.classList.remove('animate')

      let last = con.getBoundingClientRect()

      let invertTop = first.top - last.top
      let invertLeft = first.left - last.left

      con.style.transform = `translate(${invertLeft}px, ${invertTop}px)`

      requestAnimationFrame(() => {
        con.classList.add('animate')

        con.style.transform = ''
      })
    } else {
      let first = con.getBoundingClientRect()

      con.classList.add('end')

      let last = con.getBoundingClientRect()

      let invertTop = first.top - last.top
      let invertLeft = first.left - last.left

      con.style.transform = `translate(${invertLeft}px, ${invertTop}px)`

      requestAnimationFrame(() => {
        con.classList.add('animate')

        con.style.transform = ''
      })
    }
  }
</script>
```