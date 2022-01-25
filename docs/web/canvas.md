# html5 Canvas基础知识
Canvas是什么？翻译过来是画布的意思
Canvas元素用于在网页上绘制2D图形和图像

Canvas使用的场景有：1，动画；2，H5游戏；3，图表

对于Canvas需要掌握：
1. 使用Canvas画直线，矩形，圆形以及设置它们的样式
2. Canvas中的图形变换，渐变，文字和图片
3. Canvas的像素获取，阴影和曲线绘制以及区域的剪辑
4. Canvas动画，交互和离屏技术

Canvas坐标体系
- canvas默认大小，300*150
- 通过HTML，css，JavaScript设置width和height的区别
- HTML和JavaScript设置的画布大小
- css设置的是画布缩放后的大小
- 坐标系原点及方向（原点在左上角，向右为x方向，向下为y方向）

> 画直线，矩形和原型
- 画直线：ctx.moveTo(x1,y1)，ctx.lineTo(x2,y2)
- 画圆形: ctx.arc(x,y,radius,0,Math.PI*2,true)
- 画矩形：可以通过直线来画，也可以直接用（ctx.strokeRect(x1,y1,x2,y2）

> beginPath和closePath
- beginPath和closePath并不是成对出现的
- beginPath的作用是开始一条新路径
- closePath的作用是使当前路径闭合

> 描边和填充样式
- strokeStyle用来设置画笔样式，也就是直线，曲线，边框的样式
- fillStyle用来设置 填充样式
- lineWidth用来设置线条的粗细

> Canvas中的图形变换，渐变，文字和图片
- Canvas中的图像变换
- Canvas中的渐变
- Canvas中的文字
- Canvas中的图片

> Canvas中的图形变换

图形变换都是针对坐标系来说的：
- 平移：ctx.translate(x,y)
- 旋转：ctx.rotate(rad)
- 缩放：ctx.scale(x,y)

> save和restore

用来保存和恢复上下文的环境ctx，一般成对出现
- ctx.save()，保存当前上下文环境
- ctx.restore()，恢复到上一次的上下文环境

> Canvas中的渐变
- 线性渐变：ctx.createLinearGradient(xStart,yStart,xEnd,yEnd)
(xStart,yStart)是线段的起点，(xEnd,yEnd)是线段终点。起点到终点之间的颜色呈渐变。

- gradient.addColorStop可以来控制渐变的颜色

- 渐变可以理解为一种颜色

- 径向渐变：
ctx.createRadialGradient(xStart,yStart, radiusStart,xEnd,yEnd,radiusEnd);
(xStart,yStart)是第一个圆的原心，radiusStart是第一个圆的半径，(xEnd,yEnd)是第二个圆的原心，radiusEnd是第二个圆的半径；第一圆到第二个圆之间的颜色呈现渐变

> Canvas中的文字
- 描边文字：ctx.strokeText(text,x,y)
- 填充文字：ctx.fillText(text,x,y);
- 设置字体样式：ctx.font

```
例如：ctx.font="bold 100px sans-serif"
设置水平对齐方式：ctx.textAlign
left,start，左对齐，center居中对齐，end,right，右对齐
```

- 设置垂直对齐方式：ctx.textBaseline
```
top，顶对齐，middle，居中，bottom，底部对齐
计算文本宽度：ctx.measuerText(text).width 须在设置字体样式之后计算
```

> Canvas图片

绘制图片3种方法
- ctx.drawImage(image,x,y)，该方法把图片绘制在(x,y)处
- ctx.drawImage(image,x,y,w,h)，该方法把图片绘制在(x,y)处，并缩放为宽w,高h
- ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh)，该方法把图片中(sx,sy)处的宽sw，高sh的区域，绘制到(dx,dy)处，并缩放为宽dw，高dh

```js
// 在image加载完成之后绘制
const img = new Image()
img.src = 'logo.png'
img.onload = function() {
  ctx.drawImage(img, 0, 0, 40, 40, 0, 0, 80, 80)
}
```

> Canvas绘制
- Canvas的图形绘制和像素获取
- Canvas阴影绘制
- Canvas剪辑区域
- Canvas曲线绘制

> Canvas图形画刷

ctx.createPattern可以创建一个画刷模式，进而可以设置到fillStyle里，进行画刷的填充
- 函数原型：ctx.createPattern(image,type)
- type取值：
```
no-repeat不平铺
repeat-x橫方向平
repeat-y纵方向平铺
repeat全方向平铺
```

> Canvas像素操作
1. 获取像素
```js
// 返回的是一维数组：[r1,g1,b1,a1,r2,g2,b2,a2...]
var imageData = ctx.getImageData(x, y, w, h)
```
2. 设置像素
```js
// 把imageData放在(x,y)处
ctx.putImageData(imageData, x, y)

// 只显示（dirtyX,dirtyY）处的宽dirtyW,dirtyH的区域
ctx.putImageData(imageData, x, y, dirtyX, dirtyY, dirtyW, dirtyH)
```

> Canvas阴影绘制
- ctx.shadowOffsetX:阴影x方向的偏移距离
- ctx.shadowOffsetY:阴影y方向的偏移距离
- ctx.shadowColor：阴影的颜色
- ctx.shadowBlur：阴影的模糊半径

> Canvas剪辑区域
- 设置一个路径
- 调用ctx.clip()
- 再绘制图形

> Canvas绘制曲线
- 弧线：
```js
// 圆心(x,y)  半径radius
// 从starAngle到endAngle
// anticlockwise代表是否逆时针方向
context.arc(x, y, radius, starAngle, endAngle, anticlockwise)
```

> 生成工具
- http://blogs.sitepointstatic.com/examples/tech/canvas-curves/quadratic-curve.html
- http://blogs.sitepointstatic.com/examples/tech/canvas-curves/bezier-curve.html

- 二次样条曲线：
```js
context.quadraticCurvTo(qcpx, qcpy, qx, qy)
```

- 贝塞尔曲线：
```js
context.bezierCurvTo(cp1x, cp1y, cp2x, cp2y, x, y)
```

- Canvas动画，Canvas离屏技术
1. ctx.clearRect(x,y, width,height)
:::tip 
清除(x,y)点起， 宽width,高height的区域，用于重新绘制

离屏技术是什么：通过在离屏Canvas中绘制元素，再复制到显示Canvas中，从而大幅提高性能的一种技术
:::


> 使用离屏技术：
- 静态场景绘制特别耗资源，动态场景绘制简单。为了不每次更新动态场景的时候，都去绘制静态场景
- 一般把静态场景绘制在离屏canvas上，更新动态场景的时候，把静态场景copy过来，而不是重新绘制

```js
// 离屏技术：
// 一个Canvas中的图形绘制到另一个Canvas方法：

// 该方法把canvas绘制在(x,y)处
ctx.drawImage(canvas, x, y)

// 该方法把canvas绘制在(x,y)处，并缩放为宽w,高h
ctx.drawImage(canvas, x, y, w, h)

// 该方法把canvas中（sx, sy）处的宽sw,高sh的区域，绘制到(dx,dy)处，并缩放为宽dw, 高dh
ctx.drawImage(canvas, sx, xy, sw, sh, dx, dy, dw, dh)

```
```js
// drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
```
| 参数 | 描述 |
|------|------|
| image | 规定要使用的图像，画布或视频 |
| sourceX | 开始剪切的x坐标位置 |
| sourceY | 开始剪切的y坐标位置 |
| sourceWidth | 被剪切图像的宽度 |
| sourceHeight | 被剪切图像的高度 |
| destX | 在画布上放置图像的 x 坐标位置 |
| destY | 在画布上放置图像的 y 坐标位置 |
| destWidth | 要使用的图像的宽度 |
| destHeight | 要使用的图像的高度 |


### 图形绘制
- 路径的概念
- 路径的绘制
  - 描边 stroke()
  - 填充 fill()
- 闭合路径
  - 手动闭合
  - 程序闭合 closePath()
- 开启新的路径 beginPath()

### 设置样式
- 画笔的状态
  - lineWidth 线宽，默认1px
  - lineCap 线末端类型：(butt默认)、round、square
  - lineJoin 相交线的拐点 miter(默认)、round、bevel
  - strokeStyle 线的颜色
  - fillStyle 填充颜色
  - setLineDash() 设置虚线
  - getLineDash() 获取虚线宽度集合
  - lineDashOffset 设置虚线偏移量（负值向右偏移）

### 矩形绘制
- rect(x,y,w,h) 没有独立路径
- strokeRect(x,y,w,h) 有独立路径，不影响别的绘制
- fillRect(x,y,w,h) 有独立路径，不影响别的绘制
- clearRect(x,y,w,h) 擦除矩形区域

### 圆弧绘制
- 弧度概念
- arc()
  - x 圆心横坐标
  - y 圆心纵坐标
  - r 半径
  - startAngle 开始角度
  - endAngle 结束角度
  - anticlockwise 是否逆时针方向绘制（默认false表示顺时针；true表示逆时针）

### 绘制文本
- ctx.font = '微软雅黑' 设置字体
- strokeText()
- fillText(text,x,y,maxWidth)
  - text 要绘制的文本
  - x,y 文本绘制的坐标（文本左下角）
  - maxWidth 设置文本最大宽度，可选参数
- ctx.textAlign 文本水平对齐方式，相对绘制坐标来说的
  - left
  - center
  - right
  - start 默认
  - end
- ctx.direction 属性css(rtl ltr) start和end于此相关
  - 如果是ltr,start和left表现一致
  - 如果是rtl,start和right表现一致
- ctx.textBaseline 设置基线（垂直对齐方式  ）
  - top 文本的基线处于文本的正上方，并且有一段距离
  - middle 文本的基线处于文本的正中间
  - bottom 文本的基线处于文本的证下方，并且有一段距离
  - hanging 文本的基线处于文本的正上方，并且和文本粘合
  - alphabetic 默认值，基线处于文本的下方，并且穿过文字
  - ideographic 和bottom相似，但是不一样
- measureText() 获取文本宽度obj.width

### 绘制图片
- drawImage()
  - img 图片对象、canvas对象、video对象
  - x,y,w,h 图片中的一个矩形区域
  - x1,y1,w1,h1 画布中的一个矩形区域
  - img 图片对象、canvas对象、video对象
  - x,y 图片绘制的左上角
  - w,h 图片绘制尺寸设置(图片缩放，不是截取)
  - img 图片对象、canvas对象、video对象
  - x,y 图片绘制的左上角
  - 三个参数drawImage(img,x,y)
  - 五个参数drawImage(img,x,y,w,h)
  - 九个参数drawImage(img,x,y,w,h,x1,y1,w1,h1)

### 坐标变换
- 平移 移动画布的原点
  - translate(x,y) 参数表示移动目标点的坐标
- 缩放
  - scale(x,y) 参数表示宽高的缩放比例
- 旋转
  - rotate(angle) 参数表示旋转角度

## 使用路径
- lineTo()
- rect()
- arc()
- fill()
- stroke()

> 创建绘图路径

使用方法：beginPath()和closePath()，分别表示开始一个新的路径和关闭当前的路径

- 使用beginPath()方法创建一个新的路径
- moveTo(x,y)，开始绘图时的坐标
- lineTo(x,y)，绘制直线到目标坐标
- arc(x,y, radius, startAngle,endAngle, counterclockwise)
  - x,y描述弧的圆形的圆心坐标
  - radius圆形的半径
  - startAngle描述弧的开始点的角度
  - endAngle描述弧的结束点的角度
  - counterclockwise，true值，表示逆时针方向，否则反之
- rect(x,y, width, height)：xy,起点坐标，矩形的宽高，绘制矩形路径
> closePath方法关闭当前路径

### 绘制图形样式
1. stokeStyle 属性设置矩形边框的颜色
2. lineWidth 属性设置边框的宽度
3. fillStyle 属性设置填充的颜色
```js
var grid = 10;
// 画多少条x轴方向的线，横向的条数，画布的高度
var canvasHeight = myCanvas.height
var canvasWidth = myCanvas.width
// 画布宽高
ctx.canvas.width
ctx.canvas.height
// 网格大小
var gridSize = 10;
var canvasHeight = ctx.canvas.height;
var xLineTotal = canvasHeight / gridSize
// 总线条
var xLineTotal = Math.floor(canvasHeight / gridSize);
for (var i=0; i<=xLineTotal; i++) {
  ctx.beginPath();
  ctx.moveTo(0, i*gridSize-0.5);
  ctx.lineTo(canvasWidth, i*gridSize-0.5);
  ctx.strokeStyle='#eee';
  ctx.stroke();
}
// 画多少条y轴方向的线
var yLineTotal = canvasWidth / gridSize
var yLineTotal = Math.floor(canvasWidth / gridSize);
for (var i=0; i <= yLineTotal; i++) {
  ctx.beginPath();
  ctx.moveTo(i*gridSize-0.5,0);
  ctx.lineTo(i*gridSize-0.5,canvasHeight);
  ctx.strokeStyle='#eee';
  ctx.stroke();
}
```

### arc方法和rect方法
arc创建一个圆形，rect创建一个矩形，最后调用stroke()方法和fill()方法
```js
// 圆形
context.arc(100, 100, 30, 0, Math.PI * 2, true)
```
使用beginPath()方法可以新创建一个子路径，closePath()方法用来闭合路径的

> 绘制两条直线
```js
function DrawLine() {
  const canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  // 创建绘制过程
  context.beginPath()
  context.moveTo(50, 50)
  context.lineTo(120, 120)
  context.lineTo(120, 60)
  context.closePath()
  context.strokeStyle = '#000'
  // 执行绘制
  context.stroke()
}
```
- beginPath() 方法开始一条路径，或者重置当前的路径
- closePath() 方法创建从当前点到开始点的路径

如果不用beginPath()方法，绘制图形时不再创建子路径，第一次的图形在执行过程中会被绘制填充两次。

> 图形组合
属性 globalCompositeOperation 设置如何在画布上组合颜色

| 值 | 说明 |
| --- | --- |
| copy | 只绘制新图形，删除其他所有内容 |
| darker | 在图形重叠的地方，颜色由两个颜色值相减后决定 |
| destination-atop | 已有的内容只在它和新的图形重叠的地方保留，新图形绘制在内容后 |
| destination-in | 在新图形和已有画布重叠的地方，已有内容都保留，所有其他内容成为透明 |
| destination-out | 在新图形和已有内容不重叠的地方，已有内容保留所有其他内容成为透明 |
| destination-over | 新图形绘制于已有内容的后面 |
| lighter | 在图形重叠的地方，颜色由两种颜色值的叠加值来决定 |
| source-atop | 只在新图形和已有内容重叠的地方才绘制新图形 |
| source-in | 在新图形和已有内容重叠的地方，新图形才会被绘制，所有其他内容成为透明 |
| source-out | 只在和已有图形不重叠的地方绘制新图形 |
| source-over | 新图形绘制于已有图形的顶部 |
| xor | 在重置和正常绘制的其他地方，图形都成为透明 |

> 绘制曲线
```js
// 圆形，曲线
arc(x, y, radius, startAngle, endAngle, counterclockwise)
```
- x,y 表示弧的圆形的圆心坐标
- radius 表示弧的圆形的半径
- startAngle 表示圆弧的开始点的角度
- endAngle 表示圆弧的结束点的角度
- counterclockwise 若true表示逆时针，false反之顺时针


方法：
- fill() 填充路径
- stroke() 描边
- arc() 创建圆弧
- rect() 创建矩形
- fillRect() 绘制矩形路径区域
- strokeRect() 绘制矩形路径描边
- clearRect() 在给定的矩形内清除指定的像素
- beginPath() 起始一条路径，或重置当前路径
- moveTo() 把路径移动到画布中的指定点，不创建线条
- lineTo()添加一个新点，在画布中创建从该点到最后指定点的线条
- clip() 从原始画布剪切任意形状和尺寸的区域
- arcTo() 创建两切线之间的弧/曲线
- quadraticCurveTo() 创建二次方贝塞尔曲线
- bezierCurveTo() 创建三次方贝塞尔曲线
- isPointInPath() 如果指定的点位于当前路径中，则返回 true，否则返回 false

辅助线绘制弧线：arcTo() 方法
```js
// 辅助线绘制弧线
arcTo(x1, y1, x2, y2, radius)
```

> arcTo()方法绘制一条弧线
```js
// 绘制一条弧线
function draw() {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  // 开始绘制
  context.beginPath()
  // 移动点
  context.moveTo(80, 120)
  // 绘制线条
  context.lineTo(150, 60)
  context.lineTo(180, 130)
  // 描边
  context.strokeStyle = 'rgba(0, 0, 0, 0.4)'
  context.lineWidth = 2
  context.stroke()
  context.beginPath()
  context.moveTo(80, 120)
  context.arcTo(150, 60, 180, 130, 50)
  context.strolkeStyle='rgba(255, 135, 0, 1)'
  context.stroke()
}
```

### 绘制二次样条曲线
quadraticCurveTo()方法：
```js
quadraticCurveTo(cpX, cpY, x, y)
// cpX, cpY描述了控制点的坐标，x, y描述了曲线的终点坐标
```

### 绘制贝济埃曲线
bezierCurveTo()方法：它是应用于二维图形应用程序的数学曲线
```js
bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, x, y)
// cp1X, cp1Y 表示第一个控制点的坐标 
// cp2X, cp2Y 表示第二个控制点的坐标 
// x, y表示曲线的终点坐标
```

绘制曲线：
```js
function draw() {
  // 绘制曲线
  var canvas = document..getElementById('canvas')
  var context = canvas.getContext('2d')
  // 开始绘制
  context.beginPath()
  // 移动
  context.moveTo(100, 180)
  // 连线
  context.lineTo(110, 80)
  context.moveTo(260, 100)
  context.lineTo(300, 200)
  // 描边
  context.strokeStyle = 'rgba(0, 0, 0, 0.4)'
  // 设置宽度
  context.lineWidth = 3
  context.stroke()
  context.beginPath()
  context.moveTo(100, 180)
  // 绘制贝济埃曲线
  context.bezierCurveTo(110, 80, 260, 100, 300, 200)
  // 设置宽度
  context.lineWidth = 3
  context.strokeStyle = 'rgba(255,135,0,1)'
  context.stroke()
}
```

- lineCap 设置或返回线条的结束断点样式
- lineJoin 设置或返回两条线相交时，产生拐角类型
- lineWidth 设置或返回当前的线条宽度
- miterLimit 设置或返回最大斜接长度
- fillRect() 绘制一个实心矩形
- strokeRect() 绘制一个空心矩形

设置阴影，shadowBlur -context.shadowBlur = 20

- createLinearGradient() 创建线性渐变
- createPattern() 在指定的方向上重复指定的元素
- createRadialGradient() 创建放射状/环形的渐变
- addColorStop() 规定渐变对象中的颜色和停止位置
```js
gradient.addColorStop(stop,color)
```
- scale() 缩放当前绘图变大或变小
- rotate() 旋转当前绘图
- translate() 重新映射画布的(0,0)位置

## 使用图像
> 使用三种方法插入图像
```js
function draw() {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')
  // image实例
  const newImg = new Image()
  newImg.src = './logo.jpg' // 指定图像的文件地址
  newImg.onload = function(){
    // 绘图
    context.drawImage(newImg, 0, 0)
    context.drawImage(newImg, 250,100, 150,200)
    context.drawImage(newImg, 90, 80, 100, 100, 0, 0,120, 120)
  }
}
```
> 在插入图像之前，需要考虑图像加载的时间，如果图像没加载完成就已经执行drawImage()方法，就不会显示任何图片

## 绘制渐变
提供了两种渐变的创建的方法：
```js
// 创建线性渐变
createLinearGradient()方法

// 创建径向渐变
createRadialGradient()方法
```
> 设置渐变颜色和过渡方式

语法如下：

- offset是一个范围在0.0到1.0之间的浮点值 表示渐变的开始点和结束点之间的一部分
- offset的0为开始点，1为结束点
```js
addColorStop(offset, color)
```

### 绘制线性渐变的矩形
```js
function draw() {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  // 创建渐变对象，线性渐变
  var grd = context.createLinearGradient(0, 0, 300, 0)
  // 设置渐变颜色
  grd.addColorStop(0, '#xxx') // 设置颜色
  grd.addColorStop(1, '#xxx') // 设置颜色
  // 将填充样式设置为线性渐变对象
  context.fillStyle = grd
  context.fillRect(0, 0, 300, 80)
}
```

### 绘制径向渐变的矩形
```js
function draw() {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  // 径向渐变
  var grd = context.createRadialGradient(50, 50, 0, 100, 100, 90)
  // 设置渐变颜色以及方式
  grd.addColorStop(0, '#xxx')
  grd.addColorStop(1, '#xxx')
  context.fillStyle = grd
  context.beginPath()
  // 圆形
  context.arc(100, 100, 90, 0, Math.PI * 2, true)
  context.fill()
}
```

### 描边属性
线帽属性：lineCap，表示指定线条的末端如何绘制值：lineCap: butt, round, square，当线条具有一定的宽度才能表现出来
```js
butt
// 定义了线段没有线帽
round
// 定义了线段的末端为一个半圆形的线帽
square
// 定义了线段的末端为一个矩形的线帽
```

线条的连接属性lineJoin，用于两条线条到的连接方式：

miter两条线段的外边缘一直延伸到它们相交，属性miterLimit是用来描述如何绘制两条线段的交点，是表示延伸长度和线条长度的比值。

默认为10，只有miter使用时有效
```js
lineJoin = [value]

round 
// 两条线段的外边缘应该和一个填充的弧结合
bevel 
// 两条线段的外边缘应该和一个填充的三角形相交
```

## 模式
语法如下：
```js
createPattern(image, repetitionStyle)
```
- repeat 表示图像在各个方向上循环平铺
- repeat-x 表示图像在横向上循环平铺
- repeat-y 表示图像在纵向上循环平铺
- no-repeat 表示图像只使用一次
```js
function draw() {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  var img = new Image()
  // 使用Image()构造函数创建图像对象
  img.src='../images/xxx' 
  // 指定图像的文件地址
  img.onload = function() {
    // 绘图模式
    var ptrn = context.createPattern(img, 'repeat')
    // 填充样式
    context.fillStyle = ptrn
    // 填充矩形
    context.fillReat(0, 0, 500, 200)
  }
}
```
移动变化：
```js

// 移动
translate(dx, dy)
// 绘制
function draw() {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  // 设置移动偏移量
  context.translate(200, 200)
  // 绘制一个圆形
  ArcFace(context)
}
// 绘制一个圆形
function ArcFace(context) {
  // 绘制一个圆形边框
  context.beginPath()
  // 绘制圆形
  context.arc(0, 0, 90, 0, Math.PI * 2, true)
  // 线宽
  context.lineWidth = 5
  // 描边
  context.strokeStyle = '#f90'
  context.stroke()
  // 绘制
  context.beginPath()
  context.moveTo(-30, -30)
  context.lineTo(-30, -20)
  context.moveTo(30, -30)
  context.lineTo(30, -20)
  context.moveTo(-20, 30)
  // 曲线
  context.bezierCurveTo(-20, 44, 20, 30, 30, 20)
  context.strokeStyle = '#000'
  context.lineWidth = 10
  context.lineCap = 'round'
  // 笑脸😀
  context.stroke()
}
```
缩放变换，语法如下：
```js
scale(sx, sy)
// sx为水平方向上的缩放因子，sy为垂直方向上的缩放因子
// 示例
function draw() {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContent('2d')
  // 移动
  context.translate(200, 200)
  // 缩放
  context.scale(0.5, 0.5)
  ArcFace(context)
}
```

旋转变换：
```js
rotate(angle)
// 旋转例子
function draw() {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  context.translate(200, 200)
  // 旋转
  context.rotate(Math.PI / 6)
  context.scale(0.5, 0.5)
  ArcFace(context)
}
```

矩形变形，语法如下：
```js
transform(m1x,m1y,m2x,m2y,dx,dy); // 移动，缩放，旋转

1. 移动translate (dx, dy)
2. 缩放scale (sx,sy)
3. 旋转rotate (A)
```

## 使用文本
绘制文本的方法：

- fillText(text, x, y, maxwidth)
- strokeText(texxt, x, y, maxwidth)
  - text表示要绘制的文本
  - 参数x表示绘制文字的起点横坐标
  - 参数y表示绘制文字的起点纵坐标
  - 参数maxwidth表示显示文本的最大宽度

文本属性表：
| 属性 | 说明 |
| --- | --- |
| font | 数组字体样式 |
| textAlign | start,end,left,right,center |
| textBaseline | top,hanging,middle,alphabetic,ideographic,bottom |

> 绘制文本
```js
// 绘制文本示例
function draw() {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  // 填充颜色
  context.fillStyle = '#000'
  context.font = 'bold 12px impact'
  // 绘制文本
  context..fillText('达达前端，魔王哪吒', 10, 10)
  context.strokeStyle = '#000'
  context.font = 'bold italic 12px impact'
  // 绘制文本
  context.strokeText('jeskson', 10, 10)
}
```
绘制获取文本宽度的measureText()方法：
```js
measureText(text)
```

测量文本的宽度：
```js
function draw() {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  context.fillStyle = '#000'
  context.font='bold 10px impact'
  // 测量文本的宽度
  var tm = context.measureText(txt)
  context.fillText(txt, 10, 10)
  context.fillText(tm.width, tm.width + 10, 50)
  context.strokeStyle = '#000'
  context.font = 'bold italic 10px impact'
  // 测量文本的宽度
  tm = context.measureText(txt)
  context.strokeText(txt,10,10)
  context.strokeText(tm.width, tm.width + 10, 100)
}
```

> 阴影效果
阴影属性表：

| 属性 | 说明 |
| --- | --- |
| shadowColor | 使用半透明颜色 |
| shadowOffsetX | 阴影的横向位移量 |
| shadowOffsetY | 阴影的纵向位移量 |
| shadowBlur | 高斯模糊 |

> 状态保存和恢复
- 状态保存方法save()
- 状态恢复方法restore()，恢复最后一次保存的状态

状态的保存和恢复是`通过数据栈进行的`

## 操作像素
- 图像数据对象ImageData
- 获取图像数据的方法getImageData()，用于从Canvas上下文中获取图像数据。getImageData(sx, sy, sw, sh);
- 绘制图像数据的方法putImageData()getImageData(imagedata,dx,dy[,..])
- 创建图像数据的方法createImageData()

### 绘制海报
```vue
<template>
  <view class="backgroundColor">
    <canvas
      class="isCan"
      canvas-id="dadaPoster"
      :style="{ width: cansWh.cansWidth + 'px', height: cansWh.cansHeight + 'px' }"
    ></canvas>
    <image class="showImg" mode="aspectFit" v-if="tempImgShow" @longpress="longpress" :src="tempImg"></image>
    <view v-if="tempImgShow" class="fixedBox flex flex-direction">
      <view class="boxTop text-white">长按图片发送给朋友</view>
      <view class="boxDown">
        <button class="flexBtn" hover-class="btnHover" @click="closeCans">关闭</button>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      tempImgShow: false,
      tempImg: '',
      cansWh: { // 画布宽高
        cansWidth: 800,
        cansHeight: 900,
      },
      qrcode: { // 举例二维码
        top: 0.85,
        left: 0.035,
        width: 0.23,
        qrHeight: null,
      },
      productImg: { // 产品图
        top: 0.1,
        left: 0.03,
        width: 1,
        height: 0.5,
      },
    }
  },
  methods: {
    // 绘制图
    drawImg(method,param){
      return new Promise((resolve, reject)=>{
        if(param.url.indexOf('http') === 0){
          uni.downloadFile({
            url: param.url,
            success(res) {
              param.url = res.tempFilePath
              method(param).then(res=>{
                resolve(res)
              }).catch(err=>{
                reject(err)
              })
            },
            fail(error) {
              console.log(error)
            }
          })
        } else {
          method(param).then(res=>{
            resolve(res)
          }).catch(err=>{
            reject(err)
          })
        }
      })
    }
    // 绘制圆形
    drawCircle(param) {
    var that = this,x = param.x,y = param.y,r = param.r,url = param.url
      return new Promise((resolve, reject) => {
        x = Math.ceil(that.cansWh.cansWidth * x)
        y = Math.ceil(that.cansWh.cansHeight * y)
        r = r > 1 ? r : Math.ceil(that.cansWh.cansWidth * r)
        that.ctx.save()
        var d = 2 * r
        var cx = x + r
        var cy = y + r
        that.ctx.arc(cx, cy, r, 0, 2 * Math.PI)
        that.ctx.clip()
        that.ctx.drawImage(url, x, y, d, d)
        that.ctx.restore()
        that.ctx.draw(true, res=>{
          resolve()
        })
      })
    }
    // 绘制图
    drawPic(item) {
      return new Promise((resolve, reject) => {
        let x, y, w, h, r
        y = item.sTop <= 1 ? this.cansWh.cansHeight * item.sTop : item.sTop
        w = item.sWidth <= 1 ? this.cansWh.cansWidth * item.sWidth : item.sWidth
        h = item.sHeight <= 1 ? this.cansWh.cansHeight * item.sHeight : item.sHeight
        if (item.sLeft == 'center') {
          x = item.sWidth <= 1 ? this.cansWh.cansWidth * (0.5 - item.sWidth / 2) : this.cansWh.cansWidth * 0.5 - item.sWidth /
            2
        } else {
          x = this.cansWh.cansWidth * item.sLeft
        }
        if (item.r) {
          r = item.r
          this.ctx.save()
          if (w < 2 * r) r = w / 2
          if (h < 2 * r) r = h / 2
          this.ctx.beginPath()
          this.ctx.moveTo(x + r, y)
          this.ctx.arcTo(x + w, y, x + w, y + h, r)
          this.ctx.arcTo(x + w, y + h, x, y + h, r)
          this.ctx.arcTo(x, y + h, x, y, r)
          this.ctx.arcTo(x, y, x + w, y, r)
          this.ctx.closePath()
          this.ctx.clip()
          this.ctx.drawImage(item.url, x, y, w, h)
          this.ctx.restore() // 返回上一状态
        } else {
          this.ctx.drawImage(item.url, x, y, w, h)
        }
        this.ctx.draw(true, res=>{
          resolve()
        })
      })
    }
    // 保存
    saveCans() {
      let tempRatio = 1
      uni.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: this.cansWh.cansWidth * tempRatio,
        height: this.cansWh.cansHeight * tempRatio,
        destWidth: this.cansWh.cansWidth * tempRatio * 2,
        destHeight: this.cansWh.cansHeight * tempRatio * 2,
        canvasId: 'dadaPoster',
        success: (res) => {
          this.tempImg = res.tempFilePath
          setTimeout(() => {
            this.tempImgShow = true
          }, 100)
          uni.hideLoading()
        },
        fail: (res) => {
          console.log(res)
          uni.hideLoading()
        }
      })
    }
  }
}
</script>
```

## 小结

### canvas标签的使用
```js
// canvas标签的使用
<canvas width="100" height="100"></canvas>
// 获取canvas
var canvas = document.getElementById('target')
if(canvas.getContext) {
  var ctx = canvas.getContext('2d');
} else {
  alert('该浏览器版本过低，请更换')
}

// 矩形
fillRect(x, y, width, height) // 填充
strokeRect(x, y, width, height) // 空心
clearRect(x, y, width, height ) // 清除透明 
var grd = ctx.createLinearGradient(x1 ,y1, x2, y2); //线性渐变
var grd = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);//径向渐变
```
曲线

- 二次贝塞尔曲线`quadraticCurveTo(cp1x, cp1y, x, y)` `(cp1x,cp1y) 控制点 (x,y)结束点`
- 三次贝塞尔曲线`bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)` `（cp1x, cp1y）控制点1`  `(cp2x, cp2y) 控制点2`  `(x, y)结束点`

![image](/cvs.png)
![image](/cvs2.png)
![image](/cvs3.png)
![image](/cvs4.png)
![image](/cvs5.png)
![image](/cvs6.png)
### HTML5绘图制作海报
```html
<body>
  <img src="img/bg.png" id="img1" style="display: block" width="1200" height="800" />
  <img src="img/dada.png" id="img2" style="display: block" width="100" height="100" />
  <img id="img3" />
  <button onclick="draw()" id="btn">点击下载</button>
  
  <script>
    function draw() {
      var img1 = document.getElementById('img1'),
      var img2 = document.getElementById('img2'),
      var img3 = document.getElementById('img3')
      
      var img1.width = 1200
      var img1.height = 800
      var img2.width = 100
      var img2.height = 100
      
      var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d')
      // 绘制宽度
      canvas.width = img1.width
      // 绘制高度
      canvas.height = img1.height;
      /**
       * context.drawImage(image,x,y,w,h)
       * var img=new Image(); img.src="url(...)";
       * x:绘制图像的x坐标
       * y:绘制图像的y坐标
       * w:绘制图像的宽度
       * h:绘制图像的高度
       */
        
      context.drawImage(img1, 0, 0, img1.width, img1.height)
      // 将 img2 加入画布
      context.drawImage(img2, 100, 100, img2.width, img2.height)
      // 文字填充颜色
      context.fillStyle = '#333'
      // 文字字体
      context.font = 'bold 45px 黑体'
      // 设置文字
      var name_text = '达达前端，魔王哪吒'
      // 获取文字的宽度
      var name_width = context.measureText(name_text).width
      // 获取除去文本后的一半的宽度
      var x = (canvas.width - name_width) / 2
      
      /**
       * context.font:设置字体样式
       * context.textAlign:水平对齐方式
       * context.textBaseline:垂直对齐方式
       * context.measureText(text):计算字体长度(px)
       */
      context.fillText(name_text, x, 450)
      context.fillStyle = '#333' // 文字填充颜色
      context.font = '25px bold 黑体'
      var con_1 = 'dadaqianduan'
      var con_2 = '达达'
      /**
       * text:要绘制的文字
       * x:文字起点的x坐标轴
       * y:文字起点的y坐标轴
       */
      context.fillText(con_1, x, 400)
      var con_width_2 = context.measureText(con_2).width
      context.fillText(con_2, canvas.width - x - con_width_2, 400)
      context.stroke()
      // 将画布内容导出
      var src = canvas.toDataURL()
      img3.src = src
      const a = document.createElement('a')
      a.href = src
      a.download = '自定义.png'
      a.click()
    }
  </script>
</body>
```

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Canvas</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    body {
      text-align: center;
    }

    canvas {
      border: 1px solid;
    }
  </style>
</head>
<body>
  <canvas id="cvs" width="500" height="500"></canvas>
  <script src="./basis.js"></script>
  <script src="./funcs.js"></script>
</body>
</html>
```

```js
const canvas = document.getElementById('cvs')
const ctx = canvas.getContext('2d')

const canvasHeight = canvas.height
const canvasWidth = canvas.width

// 绘制文字
// ctx.font = '98px 黑体'
// ctx.fillStyle = 'red'
// ctx.textAlign = 'center'
// ctx.fillText('达达前端', 200, 323, 234)


// 绘制图片
const image = new Image()
image.src = 'logo.jpg'
image.onload = e => {
  // 在画布上定位图像
  // 方法在画布上绘制图像、画布或视频
  // 方法也能够绘制图像的某些部分，以及/或者增加或减少图像的尺寸
  // drawImage(image, x, y)
  // ctx.drawImage(image, 0, 0)
  
  // 在画布上定位图像，并规定图像的宽度和高度
  // drawImage(image, x, y, width, height)
  // ctx.drawImage(image, 0, 0, 100, 100)
  
  // 剪切图像，并在画布上定位被剪切的部分
  // drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
  // ctx.drawImage(image, 100, 100, 100, 100, 100, 100, 100, 100)
}

// 绘制矩形
// strokeRect() - 矩形边框
// fillRect() - 填充矩形区域
// strokeStyle - 设置线条的颜色
// lineWidth - 设置线条宽度，默认宽度为1，单位是像素
// fillStyle - 设置区域或文字的填充颜色
// ctx.strokeStyle = '#0f0'
// ctx.lineWidth = 2
// ctx.strokeRect(200, 200, 100, 100)
// ctx.fillRect(200, 200, 100, 100)

// // 使用clearRect方法，可以擦除指定的矩形区域
// ctx.clearRect(100, 200, 100, 100)

// ctx.moveTo(100, 100)
// ctx.lineTo(200, 200)
// ctx.stroke()

setTimeout(() => {
  // grids()
  // xys()
  // arc()
  // arcTo()
  bezier()
}, 100)
```

```js
// funcs.js
function grids() {
  // 画多少条x轴方向的线，横向的条数，画布的高度
  const grid = 10
  // 网格大小
  const gridSize = 10
  let xLineTotel = canvasHeight / gridSize
  // 总线数
  xLineTotel = Math.floor(canvasHeight / gridSize)
  for (let i = 0; i <= xLineTotel; i++) {
    ctx.beginPath()
    ctx.moveTo(0, i * gridSize - .5)
    ctx.lineTo(canvasWidth, i * gridSize - .5)
    ctx.strokeStyle = '#eee'
    ctx.stroke()
  }

  // 画多少条y轴方向的线
  let yLineTotal = canvasWidth / gridSize
  yLineTotal = Math.floor(canvasWidth / gridSize);
  for (let i = 0; i <= yLineTotal; i++) {
    ctx.beginPath()
    ctx.moveTo(i * gridSize - .5, 0)
    ctx.lineTo(i * gridSize - .5, canvasHeight)
    ctx.strokeStyle = '#eee'
    ctx.stroke()
  }
}

function xys() {
  const space = 20
  const arrowSize = 10
  
  const x0 = space
  const y0 = canvasHeight - space

  ctx.moveTo(x0, y0)
  ctx.lineTo(canvasWidth - space, y0)
  ctx.stroke()
  ctx.lineTo(canvasWidth - space - arrowSize, y0 + arrowSize / 2)
  ctx.lineTo(canvasWidth - space - arrowSize, y0 - arrowSize / 2)
  ctx.lineTo(canvasWidth - space, y0)
  ctx.fill()
  ctx.stroke()

  ctx.moveTo(x0, y0)
  ctx.lineTo(space, space)
  ctx.stroke()
  ctx.lineTo(space - arrowSize / 2, space + arrowSize)
  ctx.lineTo(space + arrowSize / 2, space + arrowSize)
  ctx.lineTo(space, space)
  ctx.fill()
  ctx.stroke()
  
  const coordinate = {
    x: 146,
    y: 356
  }
  
  const dottedSize = 6
  ctx.beginPath()
  ctx.moveTo(coordinate.x - dottedSize / 2, coordinate.y - dottedSize / 2)
  ctx.lineTo(coordinate.x + dottedSize / 2, coordinate.y - dottedSize / 2)
  ctx.lineTo(coordinate.x + dottedSize / 2, coordinate.y + dottedSize / 2)
  ctx.lineTo(coordinate.x - dottedSize / 2, coordinate.y + dottedSize / 2)
  ctx.closePath()
  ctx.fill()
}

function arc() {
  ctx.beginPath()
  // 绘制圆形
  ctx.arc(100, 100, 50, 0, Math.PI * 2, true)
  // 关闭
  ctx.closePath()
  // 填充颜色
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.fill()
}

function arcTo() {
  ctx.beginPath()
  ctx.moveTo(80, 120)
  ctx.lineTo(150, 60)
  ctx.lineTo(180, 130)

  ctx.strokeStyle = 'rgba(0, 0, 0, .4)'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(80, 120)
  ctx.arcTo(150, 60, 180, 130, 50)
  ctx.strokeStyle = 'rgba(255, 135, 0, 1)'
  ctx.stroke()
}

function bezier() {
  // 开始绘制
  ctx.beginPath()
  // 移动
  ctx.moveTo(100, 180)
  // 连线
  ctx.lineTo(110, 80)
  ctx.moveTo(260, 100)
  ctx.lineTo(300, 200)
  // 描边
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)'
  // 设置宽度
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(100, 180)
  // 绘制贝济埃曲线
  ctx.bezierCurveTo(110, 80, 260, 100, 300, 200)
  // 设置宽度
  ctx.lineWidth = 3
  ctx.strokeStyle = 'rgba(255,135,0,1)'
  ctx.stroke()
}
```

## canvas录制

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    html, body {
      width: 100%;
      height: 100%;
    }
    .main {
      display: flex;
    }
    #videoContainer {
      display: none;
    }
  </style>
</head>
<body>
  <div class="main">
    <canvas width="600" height="600"></canvas>
    <div id="videoContainer"></div>
    <video
      width="300"
      height="300"
      controls
      autoplay
      id="video"
    ></video>
  </div>
  <script>
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas

    ctx.fillStyle = 'red'

    function draw(rotation = 0) {
      ctx.clearRect(0, 0, 1000, 1000)
      ctx.save()
      ctx.translate(width / 2, height / 2)
      ctx.rotate(rotation)
      ctx.translate(-width / 2, -height / 2)
      ctx.beginPath()
      ctx.rect(200, 200, 200, 200)
      ctx.fill()
      ctx.restore()
    }

    function update(t) {
      draw(t / 500)
      requestAnimationFrame(update)
    }
    update(0)


    const stream = canvas.captureStream()

    const recorder = new MediaRecorder(stream, {  miniType: 'video/webm' })

    const data = []
    recorder.ondataavailable = function(event) {
      if (event.data && event.data.size) {
        data.push(event.data)
      }
    }

    recorder.onstop = () => {
      const url = URL.createObjectURL(new Blob(data, { type: 'video/webm' }))
      document.querySelector('#videoContainer').style.display = 'block'
      document.querySelector('video').src = url
    }

    recorder.start()
    setTimeout(() => {
      recorder.stop()
    }, 6000)
  </script>
</body>
</html>
```
