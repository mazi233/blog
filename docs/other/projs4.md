# 4. 变量、作用域和内存问题

## 4.1 基本类型和引用类型的值
:::tip 提醒
- 引用类型的值是存在内存中的对象
- JS 不允许直接访问内存中的位置，也就是说不能直接操作对象的内存空间。操作对象时，实际上是在操作对象的引用而不是实际的对象。为此，引用类型的值是按引用访问的
:::

### 4.1.2 复制变量值
> 一个变量向另一个变量<Important text='复制基础类型的值'/>，会在变量对象上创建一个新值，然后把该值复制到为新变量分配的位置上
```js
var num1 = 5
var num2 = num1
```
> 复制前的变量对象&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;复制后的变量对象

|变量|值|变量|值|
|----|-------------|----|-------------|
|num1|5 (Number类型)|num1|5 (Number类型)|
|||num2|5 (Number类型)|

> 



> 一个变量向另一个变量<Important text='复制引用类型的值'/>，同样也会将存储在变量对象中的值复制一份放到为新变量分配的空间中<br>
> 不同的是，<Important text='这个值的副本实际上是一个指针，而这个指针指向存储在堆中的一个对象。复制结束后，两个变量实际上将引用同一个对象'/>。因此，改变其中一个变量就会影响另一个变量

```js
var obj1 = new Object()
var obj2 = obj1
obj1.name = 'mazi'
alert(obj2.name) // mazi
```

:::tip 复制引用类型值
<br>

![image](/yylx.jpg)
:::

### 4.1.3 传递参数
:::tip 提醒
- ES 中所有函数的参数都是按值传递的。把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。
- 基本类型值得传递如同基本类型变量的复制一样，而引用类型值的传递，则如同引用类型变量的复制一样。
- 访问变量有按值和按引用两种方式，而参数只能按值传递。
- 在向参数传递基础类型的值时，被传递的值会被复制给一个局部变量 (arguments对象中的一个元素)。
- 在向参数传递引用类型的值时，会把<Important text='这个值在内存中的地址复制给一个局部变量' />，因此这个局部变量的变化会反映到函数的外部。
:::
```js
function addTen (num) {
  num += 10
  return num
}

var count = 20
var result = addTen(count)
alert(count) // 20
alert(result) // 30

function setName (obj) {
  obj.name = 'mazi'
}
var person = new Object()
setName(person)
alert(person.name) // mazi
```

:::danger 警告
:exclamation:很多人错误的认为，在局部作用域中修改的对象会在全局作用域反映出来，就说明参数是按引用传递的
```js
function setName (obj) {
  obj.name = 'mazi'
  obj = new Object()
  obj.name = 'kk'
}
var person = new Object()
setName(person)
alert(person.name) // 'mazi'
```
- 当在函数内部重写 obj 时，这个变量引用的就是一个局部对象了。而这个局部对象会在函数执行完毕后立即销毁
- 可以把 ES 函数的参数想象成局部变量
:::

### 4.1.4 检测类型
```js
var s = 'mazi'
var b = true
var i = 22
var u
var n = null
var o = new Object()
alert(s, b, i, u, n, o) // string, boolean, number, undefined, object, object

/* instanceof 操作符 */
result = variable instanceof constructor

alert(person instanceof Object) // true
alert(colors instanceof Array) // true
alert(pattern instanceof RegExp) // true
```
> 使用 instanceof 操作符检测基本类型的值，操作符始终会返回 false，因为基本类型不是对象

## 4.2 执行环境及作用域
:::tip 提醒
- 全局执行环境是最外围的一个执行环境。在浏览器中，全局执行环境被认为是 window 对象，因此所有全局变量和函数都是作为 window 对象的属性和方法创建的
- 某个执行环境中的所有代码执行完毕后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁（全局执行环境知道应用程序退出 -- 例如关闭网页或浏览器 -- 时才会退出）
- 每个函数都有自己的`执行环境`，当执行流进入一个函数时，函数的环境就会被推入一个`环境栈`中。而在函数执行之后，栈将其环境弹出，把控制权返回给之前的执行环境。
- 当代码在一个环境中执行时，会创建变量的一个<Important text='作用域链' />。作用域链的用途是保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终是当前执行的代码所在环境的变量对象。如果这个环境是函数，则将其<Important text='活动对象' />作为变量对象。活动对象在最开始时只包含一个变量，即 arguments 对象（这个对象在全局环境中不存在）。作用域的下一个变量对象来自包含（外部）环境，而再下一个来自于下一个包含环境。这样，一直延续到全局执行环境，全局执行环境的变量对象始终都是作用域链中的最后一个对象。
- 标识符解析是沿着作用域链一级一级地搜索标识符的过程。搜索过程始终从作用域链的前端开始，然后逐级地向后回溯，知道找到标识符为止（如果找不到标识符，通常会导致错误发生）
:::
```js
var color = 'blue'
function changeColor () {
  if (color === 'blue') {
    color = 'red'
  } else {
    color = 'blue'
  }
}
changeColor()
alert(`Color is now ${color}`)
```
> 在局部作用域定义的变量可以在局部环境中与全局环境互换使用
```js
var color = 'blue'
function changeColor () {
  var anotherColor = 'red'
  function swapColors () {
    var tempColor = anotherColor
    anotherColor = color
    color = tempColor
    // 这里可以访问 color、anotherColor 和 tempColor
  }
  // 这里可以访问 color 和 anotherColor，但不能访问 tempColor
  swapColors()
}
// 这里只能访问 color
changeColor()
```

### 4.2.1 延长作用域链
> - try-catch 语句的 catch 块
> - with 语句
> 这两个语句都会在作用域链的前端添加一个变量对象。对`with`语句来说，会将指定的对象添加到作用域链中。对`catch`语句来说，会创建一个新的变量对象，其中包含的是被抛出的错误对象的声明
```js
function buildUrl () {
  var qs = '?debug=true'
  with (location) {
    var url = href + qs
  }
  return url
}
```

:::danger 警告
:exclamation:在IE8及之版本的JavaScript实现中，存在一个与标准不一致的地方，即在catch语句中捕获的错误对象会被添加到执行环境的变量对象，而不是catch语句的变量对象中。换句话说，即使是在catch块的外部也可以访问到错误对象。IE9修复了这个问题
:::

### 4.2.2 没有块级作用域
```js
if (true) {
  var color = 'blue'
}
alert(color) // blue

for (var i = 0; i < 10; i++) {
  doSomething(i)
}
alert(i) // 10
```
1. 声明变量
> - 使用`var`声明的变量会自动被添加到最接近的环境中
> - 在函数内部，最接近的环境就是函数的局部环境
> - 在`with`语句中，最接近的环境是函数环境
```js
function add (num1, num2) {
  var sum = num1 + num2
  return sum
}
var res = add(10, 20) // 30
alert(sum) // 由于 sum 不是有效的变量，因此会导致错误

function add (num1, num2) {
  sum = num1 + num2
  return sum
}
var res = add(10, 20) // 30
alert(sum) // 30
```

2. 查询标识符
```js
var color = 'blue'
function getColor () {
  return color
}
alert(getColor()) // blue

var color = 'blue'
function getColor () {
  var color = 'red'
  return color
}
alert(getColor()) // red
```

## 4.3 立即回收
> - `JavaScript`具有自动垃圾回收机制，也就是说，执行环境会负责代码执行过程中使用的内存
> - 这种垃圾回收机制的原理很简单：找出那些不再继续使用的变量，然后释放其占用的内存
> - 垃圾回收器会按照固定的时间间隔（或代码执行中预定的收集时间），周期性地执行这一操作

:::warning 分析
- 局部变量只在函数执行的过程中存在。而在这个过程中，会为局部变量在栈（或堆）内存上分配相应的空间，以便存储它们的值。然后在函数中使用这些变量，直至函数执行结束。此时局部变量就没有存在的必要了，因此可以释放它们的内存以供将来使用。在这种情况下，很容易判断变量是否还有存在的必要；但并非所有情况下都这么容易就能得出结论
- 垃圾回收器必须跟踪哪个变量有用哪个变量没用，对于不再有用的变量打上标记，以备将来回收其占用的内存
:::

### 4.3.1 标记清除
> - `JavaScript`中最常用的垃圾回收方式是`标记清除`，当变量进入环境（例如：在函数中声明一个变量）时，就将这个变量标记为 “进入环境”。从逻辑上讲，永远不能释放进入环境的变量所占用的内存，因为只要执行流进入相应的环境，就可能会用到它们。而当变量离开环境时，则将其标记为 “离开环境”
> - 垃圾收集器在运行的时候会给存储在环境中的所有变量都加上标记（当然可以使用任何标记方式）。然后。它会去掉环境中的变量以及被环境中的变量引用的变量的标记。而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后，垃圾收集器完成`内存回收`工作，销毁那些带标记的值并回收它们所占用的内存空间

### 4.3.2 引用计数
> - `引用计数`的含义是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型值赋值给该变量时，则这个值的引用次数就是 1，如果同一个值又被赋值给另一个变，则该值得引用次数加 1。相反，如果包含对这个值引用的变量又取得了另一个值，则这个值的引用次数减 1。当这个值的引用次数变成 0 时，则说明没有办法再访问这个值了，因而就可以将其占用的内存空间回收起来。这样，当垃圾收集器下次再运行时，它就会释放那些引用次数为零的值所占用的内存
> - `引用计数`存在一个很大的问题--`循环引用`，`循环引用`指的是对象 A 中包含一个指向对象 B 的指针，而对象 B 中也包含一个指向对象 A 的引用
> - 在 IE 中有一部分对象并不是JavaScript对象（比如：BOM 和 DOM 对象），它们就存在循环引用问题
> - IE9 把 BOM 和 DOM 对象都转换成了真正的 JavaScript 对象
```js
var ele = document.getElementById('some-ele')
var myObj = new Object()
myObj.ele = ele
ele.myObj = myObj

// 为了避免类似的循环引用问题，我们可以手动切断原生JavaScript对象与DOM元素的连接
myObj.ele = null
ele.myObj = null
```

### 4.3.3 性能问题
> - IE 的垃圾收集器是根据内存分配量运行的，具体一点就是 `256个变量`、`4096个对象（或数组）字面量`和`数组元素（slot）`或者`64KB`的字符串。达到上述某一临界值，垃圾收集器就会运行
> - IE7 触发垃圾收集器的变量分配、字面量和（或）数组元素的临界值被调整为动态修正：如果垃圾收集例程回收的内存分配量低于 15%，则变量、字面量和（或）数组元素的临界值就会翻倍。如果例程回收了 85% 的内存分配量，则将各种临界值重置回默认值

### 4.3.4 管理内存
> - 确保占用最少的 内存可以让页面获得更好的性能。而优化内存占用的最佳方式，就是为执行中的代码只保存必要的数据。一旦数据不再有用，最好通过将其值设置为`null`来释放其内存--这个嘴阀叫`解除引用`。这一做法适用于大多数全局变量和全局对象的属性。局部变量会在它们离开执行环境时自动被解除引用
> - 解除一个值的引用并不意味着自动回收该值所占用的内存。解除引用的真正作用是让值脱离执行环境，以便垃圾收集器下次运行时将其回收
```js
function createPerson (name) {
  var localPerson = new Object()
  localPerson.name = name
  return localPerson
}
var globalPerson = createPerson('mazi')
// 手工解除 globalPerson 的引用
globalPerson = null
```
