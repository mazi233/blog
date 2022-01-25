# 7. 函数表达式
> 关于函数声明，它的一个重要特征就是`函数声明提升`。以上是在执行代码之前会先读取函数声明。这就意味着可以把函数声明方法哦调用它的后面
```js
sayHi()
function sayHi () {
  alert('Hi!')
}
```
创建一个函数并将它赋值给变量`functionName`。这种情况下创建的函数叫做`匿名函数`，因为`function`关键字后面没有标识符。（匿名函数有时候也叫`拉姆达表达式`）匿名函数的`name`属性时空字符串
```js
sayHi() // 错误：函数还不存在
var sayHi = function () {
  alert('Hi!')
}
```

```js
// ❎
// 不要这么做
// 大多数浏览器返回第二个声明，而 Firefox 会在第一个为 true 时返回第一个声明
if (cond) {
  function sayHi () {
    alert('Hi')
  }
} else {
  function sayHi () {
    alert('Yo')
  }
}

// ✅
var sayHi
if (cond) {
  sayHi = function () {
    alert('Hi')
  }
} else {
  sayHi = function () {
    alert('Yo')
  }
}
```

## 7.1 递归
```js
function factorial (num) {
  if (num < 1) {
    return 1
  } else {
    return num * factorial(num - 1)
  }
}

var another = factorial
factorial = null
alert(another(4)) // 报错
```
我们知道，`arguments.callee`是一个指向正在执行的函数的指针
```js
function factorial (num) {
  if (num < 1) {
    return 1
  } else {
    return num * arguments.callee(num - 1)
  }
}
```
但在严格模式下，不能通过脚本访问`arguments.callee`，访问这个属性会导致报错，不过，可以使用命名函数表达式来达成相同的结果
```js{5}
var factorial = (function f (num) {
  if (num < 1) {
    return 1
  } else {
    return num * f(num - 1)
  }
})
```

## 7.2 闭包
`闭包`是指有权访问另一个函数作用域中的变量的函数

当某个函数被调用时，会创建一个执行环境及相应的作用域链。然后，使用`arguments`和其他命名参数的值来初始化函数的活动对象
```js
function compare (val1, val2) {
  if (val1 < val2) {
    return -1
  } else if (val1 > val2) {
    return 1
  } else {
    return 0
  }
}
```
:::tip 闭包
<br>

![image](/bb.jpg)
:::

后台的每个执行环境都有一个表示变量的对象--变量对象。全局环境的变量对象始终存在，而像`compare()`函数这样的局部环境的变量对象，则只在函数执行的过程中存在。在创建`compare()`函数时，会创建一个预先包含全局变量对象的作用域链，这个作用域链被保存在内部的`[[Scope]]`属性中，当调用`compare()`函数时，会为函数创建一个执行环境，然后通过复制函数的`[[Scope]]`属性中的对象构建起执行环境的作用域链。此后，又有一个活动对象（在此作为变量对象使用）`被创建并被推入执行环境作用域链的前端`.

本地作用域本质上是一个指向变量对象的指针列表，它只引用但不实际包含变量对象
```js
var compare = createComparisonFunction('name')
var result = compare({ name: 'mazi' }, { name: 'kk' })

// 解除对匿名函数的引用
// compare = null
```
当`createComparisonFunction()`函数返回后，其执行环境的作用域链会被销毁，但他的活动对象仍然留在内存中；直到匿名函数被销毁后，`createComparisonFunction()`的活动对象才会被销毁
:::tip 闭包2
<br>

![image](/bb2.jpg)
:::

### 7.2.1 闭包与变量
```js
function createFuncs () {
  var res = new Array()
  for (var i = 0; i < 10; i++) {
    res[i] = function () {
      return i
    }
  }
  return res
}
```
上面每个函数都返回 10。因为每个函数的作用域链中都保存着`createFuncs()`函数的活动对象，所以它们引用的都是`同一个变量i`，当对象`createFuncs()`函数返回后，变量`i`的值是 10，此时每个函数都引用着保存变量`i`的同一个变量对象，所以在每个函数内部`i`的值都是 10
```js
// 修改
function createFuncs () {
  var res = new Array()
  for (var i = 0; i < 10; i++) {
    res[i] = function (num) {
      return function () {
        return num
      }
    }(i)
  }
  return res
}
```

### 7.2.2 关于this对象
`匿名函数`的执行环境具有全局性，因此其`this`对象通常指向`window`。但有时候由于编写闭包的方式不同，这一点可能不会那么明显
```js
var name = 'window'
var obj = {
  name: 'obj',
  getName: function () {
    return function () {
      return this.name
    }
  }
}
alert(obj.getName) // 'window'
```
每个函数都有两个特殊变量：`this`和`arguments`。<Important text='内部函数在搜索这两个变量时，只会搜索到其活动对象为止，因此永远不会直接访问外部函数中的这两个变量' />
```js{5,7}
var name = 'window'
var obj = {
  name: 'obj',
  getName: function () {
    var that = this
    return function () {
      return that.name
    }
  }
}
alert(obj.getName) // 'obj'
```
```js
var name = 'window'
var obj = {
  name: 'obj',
  getName: function () {
    return this.name
  }
}
alert(obj.getName) // 'window'
```
`this`的值可能出乎意外
```js
obj.getName() // 'obj'
(obj.getName)() // 'obj'

// 这个赋值表达式的值是函数本身，所以`this`的值不能得到维持，结果就返回了`windows`
(obj.getName = obj.getName)() // 'window', 在非严格模式下
```

### 7.2.3 内存泄露
如果闭包的作用域链中保存着一个`HTML`元素，那么就意味着该元素将无法销毁
```js
function assignHandler () {
  var ele = document.getElementById('someele')
  ele.onclick = function () {
    alert(ele.id)
  }
}

// 修改
function assignHandler () {
  var ele = document.getElementById('someele')
  var id = ele.id
  ele.onclick = function () {
    alert(id)
  }
  assignHandler = null
}
```
