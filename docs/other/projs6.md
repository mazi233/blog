# 6. 面向对象的程序设计
## 6.1 理解对象
```js
var person = {
  name: 'mazi',
  age: 24,
  job: 'Front End Engineer',
  say () {
    alert(`${this.name} ${this.age} ${this.job}`)
  }
}
```

### 6.1.1 属性类型
> ES 中有两种属性：`数据属性`和`访问器属性`<br>
#### 1. 数据属性
> 数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有4个描述其行为的特性
:::tip 数据属性
:tada: [[Configurable]]: 表示能否通过`delete`删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性，这个特性的默认值为`true`<br>
:tada: [[Enumerable]]: 表示能否通过`for-in`循环返回属性，这个特性的默认值为`true`<br>
:tada: [[Writable]]: 表示能否修改属性的值，这个特性的默认值为`true`<br>
:tada: [[Value]]: 包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。这个特性的默认值为`undefined`
:::
> 要修改属性默认的特性，必须使用 ES5 的`Object.defineProperty()`方法。这个方法接收三个参数：`属性所在的对象`、`属性`和`名字的一个描述符对象`。其中，描述符对象的属性必须是：`configurable、enumerable、writable、value`。设置一个或多个值，可以修改对应的特性值
```js
var person = {}
Object.defineProperty(person, 'name', {
  writable: false,
  value: 'mazi'
})
alert(person.name) // 'mazi'
person.name = 'kk'
alert(person.name) // 'mazi'
```
> 上面的例子创建了一个名为 name 的属性，他的值 'mazi' 是 只读的。这个属性的值是不可修改的，如果尝试为他指定新的值，则在非严格模式下，赋值操作将被忽略；在严格模式下，赋值操作将会导致抛出错误
```js
var person = {}
Object.defineProperty(person, 'name', {
  configurable: false,
  value: 'mazi'
})
alert(person.name) // 'mazi'
delete person.name
alert(person.name) // 'mazi'
```
> 把`configurable`设置为 false ，表示不能从对象中删除属性。如果对这个属性调用`delete`，则在非严格模式下什么也不会发生，而在严格模式下会导致错误。而且，<Important text='一旦把属性定义为不可配置的，就不能再把它变回可配置了，此时再调用 Object.defineProperty() 方法修改除 writable 之外的属性，都会导致报错'/>
```js
var person = {}
Object.defineProperty(person, 'name', {
  configurable: false,
  value: 'mazi'
})

// 报错
Object.defineProperty(person, 'name', {
  configurable: true,
  value: 'mazi'
})
```
> 可以多次调用`Object.defineProperty()`方法修改同一个属性，但在把`configurable`特性设置为`false`之后就会有限制了<br>
> 在调用`Object.defineProperty()`方法创建一个新的属性时，如果不指定，`configurable、enumerable、writable`特性的属性的默认值都是`false`。如果调用`Object.defineProperty()`方法只是修改已定义的属性的特性，则无此限制
:::warning 提醒
IE8 是第一个实现`Object.defineProperty()`方法的浏览器。然而，这个版本的实现存在诸多限制：只能在 DOM 对象上使用这个方法，而且只能创建访问器属性。由于实现不彻底，建议不要在 IE8 中使用
:::

#### 2. 访问器属性
> 访问器属性不包含属性值；它们包含一对`getter`和`setter`（不过，这两个函数都不是必需的）。在读取访问器属性时，会调用`getter`函数，这个属性负责返回有效的值；在写入访问器属性时，会调用`setter`函数并传入新值，这个函数负责决定如何处理数据
:::tip 访问器属性
:tada: [[Enumerable]]: 表示能否通过`for-in`循环返回属性。这个特性的默认值为`true`<br>
:tada: [[Configurable]]: 表示能否通过`delete`删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为数据属性。这个特性的默认值为`true`<br>
:tada: [[Get]]: 在读取属性时调用的函数。默认值为`undefined`<br>
:tada: [[Set]]: 在写入属性时调用的函数。默认值为`undefined`
:::
> 访问器属性不能直接定义，必须使用`Object.defineProperty()`来定义
```js
var book = {
  _year: 2004,
  edition: 1
}
Object.defineProperty(book, 'year', {
  get: function () {
    return this._year
  },
  set: function (newVal) {
    if (newVal > 2004) {
      this._year = newVal
      this.edition += newVal - 2004
    }
  }
})
book.year = 2005
alert(book.edition) // 2
```
> 不一定非要同时指定`getter`和`setter`。只指定`getter`意味着属性时不能写，尝试写入属性后被忽略。在严格模式下，尝试写入只指定了`getter`函数的属性会抛出错误。类似地，只指定`setter`函数的属性也不能读，否则在非严格模式下会返回`undefined`，而在严格模式下会抛出错误<br>
> 在这个方法出现之前，要创建访问器属性，一般都是用两个非标准的方法：`__defineGetter__()`和`__defineSetter__()`。这两个方法最早由 Firfox 引入
```js
var book = {
  _year: 2004,
  edition: 1
}
book.__defineGetter__('year', function () {
  return this._year
})
book.defineSetter__('year', function (newVal) {
  if (newVal > 2004) {
    this._year = newVal
    this.edition = newVal - 2004
  }
})
book.year = 2005
alert(book.edition) // 2
```
> 在不支持`Object.defineProperty()`方法的浏览器中不能修改`[[Configurable]]`和`[[Enumerable]]`

### 6.1.2 定义多个属性
> 由于为对象定义多个属性的可能性很大，ES5 又定义了一个`Object.defineProperties()`方法。利用这个方法可以通过描述符一次定义多个属性。这个方法接收两个参数：第一个对象是要添加和修改其属性的对象。第二个对象的属性与第一个对象中要添加或修改的属性一一对应
```js
var book = {}
Object.defineProperties(book, {
  _year: {
    writable: true,
    value: 2004
  },
  edition: {
    writable: true,
    value: 1
  },
  year: {
    get: function () {
      return this._year
    },
    set: function () {
      if (newVal > 2004) {
        this._year = newVal
        this.edition = newVal - 2004
      }
    }
  }
})
```

### 6.1.3 读取属性的特性
> 使用 ES5 的`Object.getOwnPropertyDescriptor()`方法，可以取得给定属性的描述符。这个方法接收两个参数：属性所在的对象和要读取其描述符的属性名称。返回值是一个对象，如果是访问器属性，这个对象的属性有`configurable、enumerable、get、set`; 如果是数据属性，这个对象的属性有`configurable、ennumerable、writable、value`
```js
var book = {}
Object.defineProperties(book, {
  _year: {
    writable: true,
    value: 2004
  },
  edition: {
    writable: true,
    value: 1
  },
  year: {
    get: function () {
      return this._year
    },
    set: function () {
      if (newVal > 2004) {
        this._year = newVal
        this.edition = newVal - 2004
      }
    }
  }
})
var des1 = Object.getOwnPropertyDescriptor(book, '_year')
alert(des1.value) // 2004
alert(des1.configurable) // false
alert(typeof des1.get) // 'undefined'

var des2 = Object.getOwnPropertyDescriptor(book, 'year')
alert(des1.value) // undefined
alert(des1.enumerable) // false
alert(typeof des1.get) // 'function'
```
> 对于数据属性`_year`，value等于最初的值，`configurable`是`false`，而`get`等于`undefined`。对于访问器属性`year`，`value`等于`undefined`，`enumerable`是`false`，而`get`是一个指向`getter`函数的指针<br>
> 在 JS 中，可以针对任何对象--包括 BOM 和 DOM 对象，使用`Object.getOwnPropertyDescriptor()`方法

## 6.2 创建对象
> 虽然 Object 构造函数或对象字面量都可以用来创建单个对象，但这些方式有个明显的缺点：使用同一个接口创建很多对象，会产生大量的重复代码。

### 6.2.1 工厂函数
```js
function createPerson (name, age, job) {
  var o = new Object()
  o.name = name
  o.age = age
  o.job = job
  o.sayName = function () {
    alert(this.name)
  }
  return o
}
var per1 = createPerson('mazi', 24, 'FEE')
var per2 = createPerson('kk', 24, 'Kj')
```
> 函数 `createPerson()`能够根据接受的参数来构建一个包含所有必要信息的`Person`对象。可以无数次调用，而每次都会返回一个包含三个属性一个方法的对象。工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（怎么知道对象是什么类型）

### 6.2.2 构造函数模式
> ES 中的构造函数可用来创建特定类型的对象。像 Object 和 Array 这样的原生构造函数，在运行时会自动出现在执行环境中。此外，也可以创建自定义的构造函数，从而定义自定义对象类型的属性和方法
```js
function Person (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    alert(this.name)
  }
}
var per1 = new Person('mazi', 24, 'FEE')
var per2 = new Person('kk', 24, 'Kj')
```
> `Person()`函数取代了`createPerson()`函数。我们注意到，`Person()`中的代码除了与`createPerson()`中相同的部分外，还存在一下不同：
>- 没有显式地创建对象
>- 直接将属性和方法赋给了`this`对象
>- 没有`return`语句

:::tip 创建实例
:tada: 创建`Person`的新实例，必须使用`new`操作符<br>
1. 创建一个新对象
2. 将构造函数的作用域赋给新对象（因此`this`就指向了新对象）
3. 执行构造函数中的代码（为这个新对象添加属性）
4. 返回新对象
:::
> per1 和 per2 分别保存着`Person`的一个不同的实例。这两个对象都有一个`constructor(构造函数)`属性，该属性指向`Person`
```js
alert(per1.constructor == Person) // true
alert(per2.constructor == Person) // true
```
> 对象的`constructor`属性最初是用来标识对象类型的。但是，提到检测对象类型，还是`instanceof`操作符更可靠一点。我们在例子中创建的所有对象既是`Object`的实例，同时也是`Person`的实例，这一点通过`instanceof`操作符可以得到验证
```js
alert(per1 instanceof Object) // true
alert(per1 instanceof Person) // true
alert(per2 instanceof Object) // true
alert(per2 instanceof Person) // true
```
> 创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型；而这正式构造函数模式胜过工程模式的地方。per1 和 per2 之所以同时是`Object`的实例，是因为所有对象均继承自`Object`
:::warning 提示
:warning: 以这种方式定义的构造函数时定义在`Global`对象（在浏览器中是window对象）中的
:::

#### 1. 构造函数当作函数
> 构造函数与其他函数的唯一区别，就在于调用它们的方式不同。不过，构造函数毕竟也是函数，不存在定义构造函数的特殊语法。任何函数，只要通过`new`操作符来调用，那它就可以作为构造函数；而任何函数，如果不通过`new`操作符来调用，那它跟普通函数也不会有什么两样

#### 2. 构造函数的问题
> 构造函数模式虽然好用，但也不是没有缺点。使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍。在前面的例子中，per1 和 per2 都有一个名为`sayName()`的方法，但那两个方法不是同一个`Function`的实例。不要忘了--ES 中的函数是对象，因此每定义一个函数，也就是实例化了一个对象
```js{5}
function Person (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = new Function('alert(this.name)') // 与声明函数在逻辑上是等价的
}
```
> 以这种方式创建函数，会导致不同的作用域链和标识符解析，但创建`Function`新实例的机制仍然是相同的。因此，不同实例上的同名函数是不相等的
```js
alert(per1.sayName == per2.sayName) // false
```
> 然而，创建两个完全同样任务的`Function`实例的确没有必要；况且有`this`对象在，根本不用在执行代码前就把函数绑定到特定对象上。因此，大可像下面这样做
```js{5,7,8,9}
function Person (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = sayName
}
function sayName () {
  alert(this.name)
}
var per1 = new Person('mazi', 24, 'FEE')
var per2 = new Person('kk', 24, 'Kj')
```
> 这么一来，由于`sayName`包含的是一个指向函数的指针，因此 per1 和 per2 对象就共享了在全局作用域中定义的同一个`sayName()`函数。新问题：在全局作用域中定义的函数实际上只能被某个对象调用，折让全局作用域有点名不副实。而更让人无法接受的是：如果对象需要定义很多方法，那么就要定义很多全局函数，对于我们这个自定义的引用类型就丝毫没有封装性可言了

### 6.2.3 原型模式
>我们创建的每个函数都有一个`prototype(原型)`属性，这个属性是一个指针，指向一个对象而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。如果按照字面意思来理解，那
么`prototype`就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以
让所有对象实例共享它所包含的属性和方法。换句话说，不必在构造函数中定义对象实例的信息，而是
可以将这些信息直接添加到原型对象中
```js
function Person () {}
Person.prototype.name="mazi"
Person.prototype.age= 24
Person.prototype job="FEE"
Person.prototype.sayName = function() {
  alert(this.name)
}
var personl = new Person()：
personl. sayName() // 'mazi'
var person2 = new Person()
person2.sayName() // 'mazi'
alert(person1.sayName == person2.sayName) // true
```

#### 1. 理解原型对象
>- 无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个`prototype`
属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个`constructor(构造函数)`属性，这个属性是一个指向`prototype`属性所在函数的指针。就拿前面的例子来说`Person. prototype.constructor`指向`Person`。而通过这个构造函数，我们还可继续为原型对象添加其他属性和方法
>- 创建了自定义的构造函数之后，其原型对象默认只会取得`constructor`属性；至于其他方法，则
都是从`Object`继承而来的。当调用构造函数创建一个新实例后，该实例的内部将包含一个指针(内属性)，指向构造函数的原型对象。ECMA262第5版中管这个指针叫`[[Prototype]]`。虽然在脚本中没有标准的方式访问`[[Prototype]]`，但 Firefox、Samn和 Chrome在每个对象上都支持一个属性`__proto__`，而在其他实现中，这个属性对脚本则是完全不可见的
>- 不过，要明确的真正重要的一点就是，这个连接存在于实例与构造函数的原型对象之间，而不是存在于实例与构造函数之间
:::tip 理解原型对象
<br>

![image](/ljyxdx.jpg)
:::
>- Person构造函数、Person的原型属性以及 Person现有的两个实例之间的关系
在此，`Person.prototype`指向了原型对象，而`Person.prototype.constructor`又指回了`Person`原型对象中除了包含`constructor`属性之外，还包括后来添加的其他属性。Person的每个实例person1和 person2都包含一个内部属性，该属性仅仅指向了`Person.prototype`;换句话说
可构造函数没有直接 要格外注意的是，虽然这两个实例都不包含属性和方法，但我们却可以调用`person1.sayName()`。这是通过查找对象属性的过程来实现的
>- 虽然在所有现中都无法访问到`[[Prototype]]`,但可以通过`isPrototypeOf()`方法来确定对象之间是否存在这种关系。从本质上讲，如果`[[Prototype]]`指向调用`isPrototypeof()`方法的对象(Person.prototype)，那么这个方法就返回true
```js
alert(Person.prototype.isPrototypeOf(person1)) // true
alert(Person.prototype.isPrototypeOf(person2)) // true
```
> 我们用原型对象的`isPrototypeOf()`方法测试了 person1 和 person2。因为它们内部都有一个指向`Person.prototype`的指针，因此都返回了`true`

> ECMAScript5增加了一个新方法，叫`Object.getPrototypeOf()`在所有支持的实现中，这个
方法返回`[[Prototype]]`的值
```js
alert(Object.getPrototypeOf(person1) == Person.prototype) // true
alert(Object.getPrototypeOf(person1).name) // 'mazi'
```
>- 使用`Object.getPrototypeOf()`可以方便地取得一个对象的原型，而这在利用原型实现继承的情况下是非常重要
>- 每当代码读取某个对象的某个属性时，都会执行一次搜索，目标是具有给定名字的属性。索首先对象实例本身开始。如果在实例中找到了具有给定名字的属性，则返回该属性的值；如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性。如果在原型对象中找到了这个属性，则返回该属性的值
:::warning 提醒
:warning: 原型最初只包含`constructor`属性，而该属性也是共享的，因此可以通过对象实例访问
:::
> 虽然可以通过对象实例访问保存在原型中的值,但却不能通过对象实例重写原型中的值。如果我们
在实例中添加了一个属性,而该属性与实例原型中的一个属性同名,那我们就在实例中创建该属性,读
属性将会屏蔽原型中的那个属性
```js{11,12,13}
function Person(){}
Person.prototype.name = "Nicholas"
Person.prototype.age = 29
Person.prototype.job = "Software Engineer"
Person.prototype.sayName = function() {
  alert(this name)
}
var person1 = new Person()
var person2 = new Person()

person1.name = 'Greg'
alert(person1.name) // 'Greg' --- 来自实例 (原型上的name属性被屏蔽)
alert(person2.name) // 'Nicholas' --- 来自原型
```
> 为对象实例添加一个属性时,这个属性就会屏蔽原型对象中保存的同名属性;换句话说,添加这个属性只会阻止我们访问原型中的那个属性,但不会修改那个属性。即使将这个属性设置为`null`,也
只会在实例中设置这个属性,而不会恢复其指向原型的连接。不过,使用`delete`操作符则可以完全删
除实例属性,从而让我们能够重新访问原型中的属性
```js{15,16}
function Person () {}
Person.prototype.name = "Nicholas"
Person.prototype.age = 29
Person.prototype.job = "Software Engineer"
Person.prototype.sayName = function() {
  alert(this name)
}
var person1 = new Person()
var person2 = new Person()

person1.name = 'Greg'
alert(person1.name) // 'Greg' --- 来自实例
alert(person2.name) // 'Nicholas' --- 来自原型

delete person1.name
alert(person1.name) // 'Nicholas' --- 来自原型
```
> 使用`hasOwnProperty()`方法可以检测一个属性是存在于实例中,还是存在于原型中。这个方法(不
要忘了它是从Object继承来的)只在给定属性存在于对象实例中时,才会返回true
```js
alert(person1.hasOwnProperty('name')) // false

person1.name = 'Greg'
alert(person1.name) // Greg
alert(person1.hasOwnProperty('name')) // true

alert(person2.name) // Nicholas
alert(person2.hasOwnProperty('name')) // false

delete person1.name
alert(person1.name) // Nicholas
alert(person1.hasOwnProperty('name')) // true
```
:::tip 理解原型对象2
<br>

![image](/ljyxdx2.jpg)
:::
:::warning 提醒
:warning: ES5 的`Object.getOwnPropertyDescriptor()`方法只能用于 实例属性，要去的原型属性的描述符，必须直接在原型对象上使用`Object.getOwnPropertyDescriptor()`方法
:::

#### 2. 原型与in操作符
> 有两种方式使用 in 操作符：单独使用和在 for-in 循环中使用。在单独使用时，in 操作符会在通过对象能够访问给定属性时返回`true`，无论该属性存在于实例中还是原型中
```js{2,7,11,16}
alert(person1.hasOwnProperty('name')) // false
alert('name' in person1) // true

person1.name = 'Greg'
alert(person1.name) // 'Greg'
alert(person1.hasOwnProperty('name')) // true
alert('name' in person1) // true

alert(person2.name) // 'Nicholas'
alert(person2.hasOwnProperty('name')) // false
alert('name' in person2) // true

delete person1.name
alert(person1.name) // 'Nicholas'
alert(person1.hasOwnProperty('name')) // false
alert('name' in person1) // true
```
```js
// 确定属性是在实例中还是在原型上
function hasPrototypeProperty (obj, name) {
  return !obj.hasOwnProperty(name) && (name in obj)
}
```
>- 在使用`for-in`循环时,返回的是所有能够通过对象访问的、可枚举的(enumerabled)属性,其中
既包括存在于实例中的属性,也包括存在于原型中的属性。屏蔽了原型中不可枚举属性(即将
`[[Enumerable]]`标记为`false`的属性)的实例属性也会在`for-in`循环中返回,因为根据规定,所
开发人员定义的属性都是可枚举的—只有在E8及更早版本中例外。
>- IE早期版本的实现中存在一个bug,即屏蔽不可枚举属性的实例属性不会出现在`for-in`循环中

> 要取得对象上所有可枚举的`实例属性`，可以使用 ES5的`Object.keys()`，这个方法接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组
```js
function Person () {}
Person.prototype.name = 'mazi'
Person.prototype.age = 24
Person.prototype.job = 'FEE'
Person.prototype.sayName = function () {
  alert(this.name)
}

var keys = Object.keys(Person.prototype)
alert(keys) // 'name, age, job, sayName'

var p1 = new Person()
p1.name = 'kk'
p1.age = 24
var p1Keys = Object.keys(p1)
alert(p1Keys) // 'name, age'
```
> 如果你想获得所有实例属性，无论它是否可枚举，都可以使用`Object.getOwnPropertyNames()`
```js
var keys = Object.getOwnPropertyNames(Person.prototype)
alert(keys) // 'constructor, name, age, job, sayName'
```
> 注意结果里包含了不可枚举的`constructor`属性。`Object.keys()`和`Object.getOwnPropertyNames()`方法都可以替代`for-in`循环

#### 3. 更简单的原型语法
> 为了减少不必要的输入，也为了从视觉上更好的封装原型的功能，更常见的做法是用一个包含所有属性和方法的对象字面量来重写整个原型对象
```js
function () {}
Person.prototype = {
  name: 'mazi',
  age: 24,
  job: 'FEE',
  sayName: function () {
    alert(this.name)
  }
}
```
> 我们将`Person.prototype`设置为等于一个以对象字面量形式创建的新对象最终结果相同,但有一个例外;`constructor`属性不再指向`Person`了。前面曾经介绍过,每创建不函数,就会同时创建它的 `prototype`对象,这个对象也会自动获得`constructor`属性。而我们在这里使用的语法,本质上完全重写了默认的`prototype`对象,因此`constructor`属性也就变成了对象的`constructor`属性(指向 Object构造函数),不再指向`Person`函数。此时,尽管`instanceof`操作符还能返回正确的结果,但通过`constructor`已经无法确定对象的类型了
```js
var friend = new Person()

alert(friend instanceof Object) // true
alert(friend instanceof Person) // true
alert(friend.constructor == Person) // false
alert(friend.constructor == Object) // true
```
```js{4}
// 重设 constructor 的值
function Person () {}
Person.prototype = {
  constructor: Person,
  name: 'mazi',
  age: 24,
  job: 'FEE',
  sayName: function () {
    alert(this.name)
  }
}
```
> 以这种方式重设`constructor`属性会导致它的`[[Enumerable]]`特性被设置为`true`。默认情况下，原生的`constructor`属性时不可枚举的。试试用`Object.defineProperty()`修改它
```js{12,13,14,15}
function Person () {}
Person.prototype = {
  name: 'mazi',
  age: 24,
  job: 'FEE',
  sayName: function () {
    alert(this.name)
  }
}

// 重设构造函数，只适用于 ES5 兼容的浏览器
Object.defineProperty(Person.prototype, 'constructor', {
  enumerable: false,
  value: Person
})
```

#### 4. 原型的动态性
<Important text='对原型对象的任何修改都会立即反映到实例上'/><br>
<Important text='实例与原型的连接只是一个指针，而不是副本'/>
```js
var friend = new Person()

Person.prototype.sayHi = function () {
  alert('Hi')
}
friend.sayHi() // Hi
```
> 实例中的指针仅指向原型，而不是构造函数
```js{5,13}
function Person() {}
var friend = new Person()

Person.prototype = {
  constructor: Person,
  name: 'mazi',
  age: 24,
  job: 'FEE',
  sayName: function () {
    alert(this.name)
  }
}
friend.sayName() //error
```
:::tip 原型的动态性
<br>

![image](/yxdtx.jpg)

重写原型对象切断了现有原型与任何之前已经存在的对象实例之间的联系
:::

#### 5. 原生对象的原型
> 原生对象的原型也采用类似`Array.prototype`的模式
```js
typeof Array.prototype.sort() // 'function'
```

#### 6. 原型对象的问题
原型对象的问题所在：<Important text='所有对象的属性都是相同的'/>
```js
function Person() {}

Person.prototype = {
  constructor: Person,
  name: 'mazi',
  age: 24,
  job: 'FEE',
  friends: ['kk', 'yjb', 'hz', 'ax', 'zz', 'xc'],
  sayName: function () {
    alert(this.name)
  }
}
var friend1 = new Person()
var friend2 = new Person()
friend1.friends.push('mm')

alert(person1.friends) // 'kk', 'yjb', 'hz', 'ax', 'zz', 'xc', 'mm'
alert(person2.friends) // 'kk', 'yjb', 'hz', 'ax', 'zz', 'xc', 'mm'
alert(person1.friends === person2.friends) // true
```

### 6.2.4 组合使用构造函数和原型模式
```js
function Person (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.friends = ['mazi', 'kaikai']
}
Person.prototype = {
  constructor: Person,
  sayName: function () {
    alert(this.name)
  }
}

var per1 = new Person('mazi', 24, 'FEE')
var per1 = new Person('kaikai', 24, 'Kj')

per1.friends.push('ax')
alert(per1.friends) // 'mazi, kaikai, ax'
alert(per1.friends) // 'mazi, kaikai'
alert(per1.friends === per2.friends) // false
alert(per1.sayName === per2.sayName) // true
```

### 6.2.5 动态原型模式
> 动态原型模式把所有信息都封装在了构造函数中，而通过在构造函数中初始化原型（仅在必要情况下），又保持了同时使用构造函数和原型的优点
```js{7,8,9,10,11}
function Person (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  
  // 这段代码只有在第一次调用构造函数时执行
  if (typeof this.sayName != 'function') {
    Person.prototype.sayName = function () {
      alert(this.name)
    }
  }
}

var friend = new Person('mazi', 24, 'FEE')
friend.sayName()
```
> 使用动态原型模式时，不能使用对象字面量重写原型。如果在已创建实例的情况下重写原型，那么就会切断现有实例与新原型之间的联系

### 6.2.6 寄生构造模式
> 思想：创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后返回新创建的对象
```js
function Person (name, age, job) {
  var o = new Object()
  o.name = name
  o.age = age
  o.job = job
  o.sayName = function () {
    alert(this.name)
  }
  return o
}
var per = new Person('mazi', 24, 'FEE')
per.sayName() // 'mazi'
```

### 6.2.7 稳妥构造函数模式
> 所谓稳妥对象，指的是没有公共属性，而且其方法也不引用`this`的对象
```js
function Person (name, age, job) {
  // 创建要返回的对象
  var o = new Object()
  o.sayName = function () {
    alert(name)
  }
  return o
}

var friend = Person('mazi', 24, 'FEE')
friend.sayName() // 'mazi'
```

## 6.3 继承
> ES 只支持实现继承，而且其实现继承主要主要是依靠原型链来实现的

### 6.3.1 原型链
> 原型链基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法
```js
function SuperType () {
  this.property = true
}
SuperType.prototype.getSuperValue = function () {
  return this.property
}
function SubType () {
  this.subproperty = false
}
SubType.prototype = new SuperType()
Subtype.prototype.getSubValue = function () {
  return this.subproperty
}
var instance = new SubType()
alert(instance.getSuperValue()) // true
```
:::tip 原型链
<br>

![image](/yxl.jpg)
:::

#### 1. 别忘记默认的原型
> 所有函数的默认原型都是 Object 的实例，因此默认原型都会包含一个内部指针，指向`Object.prototype`
:::tip 别忘记默认原型
<br>

![image](/bwjmryx.jpg)
:::

#### 2. 确定原型和实例的关系
> 可以通过两种方式确定原型和实例的关系：<br>
**1. 使用`instanceof`操作符，只要用这个操作符来测试实例与原型链中出现过的构造函数，结果就会返回`true`**
**2. 使用`isPrototypeOf()`方法，只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型，因此`isPrototypeOf()`方法就会返回`true`**

#### 3. 谨慎地定义方法
> **子类型有时候需要覆盖超类型**中的某个方法，或者**需要添加超类型中不存在**的某个方法
```js{11,12,13,14,15,16}
function SuperType () {
  this.property = true
}
SuperType.prototype.getSuperValue = function () {
  return this.property
}
function SubType () {
  this.subproperty = false
}
SubType.prototype = new SuperType()
Subtype.prototype.getSubValue = function () {
  return this.subproperty
}
Subtype.prototype.getSuperValue = function () {
  return false
}
var instance = new SubType()
alert(instance.getSuperValue()) // false
```
> 通过原型链实现继承时，不能使用对象字面量创建原型对象。因为这样做会重写原型链
```js{13,14,15,16,17,18,19,20}
function SuperType () {
  this.property = true
}
SuperType.prototype.getSuperValue = function () {
  return this.property
}
function SubType () {
  this.subproperty = false
}
SubType.prototype = new SuperType()

// 使用对象字面量添加新方法，会导致上一行代码无效
SubType.prototype = {
  getSubValue: function () {
    return this.subproperty
  },
  someOtherMethod: function () {
    return false
  }
}

var instance = new SubType()
alert(instance.getSuperValue()) // error
```

#### 4. 原型链的问题
>- 主要问题来自包含引用类型值得原型。包含引用类型值的原型属性会被所有实例所有共享；而这也正是为什么要在构造函数中，而不是在原型对象中定义属性的原因。在通过原型来实现继承时，原型实际上会变成另一个类型的实例
>- 第二个问题在于：创建子类型的实例时，不能向超类型的构造函数中传参
```js
function SuperType () {
  this.colors = ['red', 'green', 'blue']
}
function SubType () {}

SubType.prototype = new SuperType()

var instance1 = new SubType()
instance1.colors.push('black')
alert(instance1.colors) // ['red', 'green', 'blue', 'black']

var instance2 = new SubType()
alert(instance2.colors) // ['red', 'green', 'blue', 'black']
```

### 6.3.2 借用构造函数
> 借用构造函数：在子类型构造函数的内部调用超类型构造函数。函数只不过是在特定环境中执行代码的对象
```js{4,5,6,7}
function SuperType () {
  this.colors = ['red', 'green', 'blue']
}
function SubType () {
  // 继承了 SuperType
  SuperType.call(this)
}
var instance1 = new SubType()
instance1.colors.push('black')
alert(instance1.colors) // ['red', 'green', 'blue', 'black']

var instance2 = new SubType()
alert(instance2.colors) // ['red', 'green', 'blue']
```

#### 1. 传递参数
```js
function SuperType (name) {
  this.name = name
}
function SubType () {
  SuperType.call(this, 'mazi')
  this.age = age
}
var instance1 = new SubType()
instance1.colors.push('black')
alert(instance1.colors) // ['red', 'green', 'blue', 'black']
```

#### 2. 借用构造函数的问题
> 如果仅仅是借用构造函数，那么也将无法避免构造函数模式存在的问题--方法都在构造函数中定义，因此函数复用就无从谈起了。而且，在超类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式

### 6.3.3 组合继承
> **组合继承**，指的是将原型链和借用构造函数的技术结合到一起，从而发挥二者之长的一种继承模式。其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承
```js
function SuperType (name) {
  this.name = name
  this.colors = ['red, green', 'blue']
}
SuperType.prototype.sayName = function () {
  alert(this.name)
}
function SubType (name, age) {
  // 继承属性
  SuperType.call(this, name)
  this.age = age
}
SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType
SubType.prototype.sayAge = function () {
  alert(this.age)
}

var instance1 = new SubType('mazi', 24)
instance1.colors.push('black')
alert(instance1.colors) // ['red', 'green', 'blue', 'black']
instance1.sayName() // 'mazi'
instance1.sayAge() // 24

var instance2 = new SubType('kk', 24)
alert(instance1.colors) // ['red', 'green', 'blue']
instance1.sayName() // 'kk'
instance1.sayAge() // 24
```
>- 组合继承避免了原型链和借用构造函数的缺陷，融合了它们的优点，成为 JS 中最常用的继承模式
>- `instanceof`和`isPrototypeOf()`也能够用于识别基于组合继承创建的对象

### 6.3.4 原型式继承
```js
function object(o) {
  function F () {}
  F.prototype = o
  return new F()
}
```
> 在 object() 函数内部，先创建一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回这个临时类型的一个实例
```js
var person = {
  name: 'mazi',
  friends: ['kk', 'ax', 'zz']
}
var another = object(person)
another.name = 'mazia'
another.friends.push('yjb')

var yet = object(person)
yet.name = 'Mazi'
yet.friends.push('hz')

alert(person.friends) // 'kk, ax, zz, yjb, hz'
```
> ES5 通过新增的`Object.create()`方法规划了原型式继承。这个方法接收两个参数：`用作新对象原型的对象`和`(可选)一个为新对象定义额外属性的对象`
> 再传入一个参数时，`Object.create()`与`object()`方法的行为相同
```js{5,9}
var person = {
  name: 'mazi',
  friends: ['kk', 'ax', 'zz']
}
var another = Object.create(person)
another.name = 'mazia'
another.friends.push('yjb')

var yet = Object.create(person)
yet.name = 'Mazi'
yet.friends.push('hz')

alert(person.friends) // 'kk, ax, zz, yjb, hz'
```
> `Object.create()`方法的第二个参数与`Object.defineProperties()`方法的第二个参数格式相同：每个属性都是通过自己的描述符定义的。<Important text='这种方式指定的任何属性都会覆盖原型对象上的同名属性'/>
```js
var person = {
  name: 'mazi',
  friends: ['kk', 'ax', 'zz']
}
var other = Object.create(person, {
  name: {
    value: 'mazia'
  }
})
alert(other.name) // 'mazia'
```

### 6.3.5 寄生式模式
> **`寄生式继承`** 与原型式继承紧密相关。寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象
```js
function createAnother (origial) {
  var clone = object(origial)
  clone.sayHi = function () {
    alert('hi')
  }
  return clone
}

var person = {
  name: 'mazi',
  friends: ['kk', 'ax', 'zz']
}
var another = createAnother(person)
createAnother.sayHi() // 'hi'
```

### 6.3.6 寄生组合式继承
> 组合继承最大的问题就是无论如何，都会调用两次超类型构造函数：<br>
> 1. 在子类型构造函数内部
> 2. 子类型最终会包含超类型对象的全部实例属性，但我们不得不在调用子类型构造函数时重写这些属性
```js{10,13}
function SuperType (name) {
  this.name = name
  this.colors = ['red, green', 'blue']
}
SuperType.prototype.sayName = function () {
  alert(this.name)
}
function SubType (name, age) {
  // 继承属性
  SuperType.call(this, name) // 第二次调用 SuperType()
  this.age = age
}
SubType.prototype = new SuperType() // 第一次调用 SubType()
SubType.prototype.constructor = SubType
SubType.prototype.sayAge = function () {
  alert(this.age)
}
```
> 第一次调用`SuperType`构造函数时，`SubType.prototype`会得到两个属性：`name`和`colors`；它们都是`SuperType`的实例属性，只不过现在位于`SubType`的原型中。当调用`SubType`构造函数时，又会调用一次`SuperType`构造函数，这一次又在新对象上创建了实例属性`name`和`colors`。于是这两个属性就屏蔽了原型中的两个同名属性

> 所谓 **`寄生组合式继承`**，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。基本思路是：不必为了指定子类型的原型调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型
```js
function inheritPrototype (subType, superType) {
  var prototype = object(superType.prototype) // 创建对象
  prototype.constructor = subType // 增强对象
  subType.prototype = protptype // 指定对象
}
```
> 函数内部：<br>
> 1. 创建超类型原型的一个副本
> 2. 为创建的副本添加`constructor`属性，从而弥补因重写原型而失去的默认的`constructor`属性
> 3. 将新建的对象（即副本）赋值给子类型的原型
```js
function SuperType (name) {
  this.name = name
  this.colors = ['red, green', 'blue']
}
SuperType.prototype.sayName = function () {
  alert(this.name)
}
function SubType (name, age) {
  // 继承属性
  SuperType.call(this, name) // 第二次调用 SuperType()
  this.age = age
}
inheritPrototype(SubType, SuperType)

SubType.prototype.sayAge = function () {
  alert(this.age)
}
```
:::tip 寄生组合式继承
<br>

![image](/jszhsjc.jpg)
:::
> 这个例子的高效体现在它只调用了一次`SuperType`构造函数，并且因此避免了在`SubType.prototype`上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用`instanceof`和`isPrototypeOf()`
