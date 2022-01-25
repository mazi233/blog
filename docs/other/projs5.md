# 5. 引用类型
> - 引用类型的值（对象）是`引用类型`的一个实例
> - `引用类型`是一种数据结构，用于将数据和功能组织在一起。也常被称为`类`，但这种称呼并不妥当
> - 引用类型有时候也被称为`对象定义`，因为它们描述的是一类对象所具有的属性和方法
> - 对象是某个特定引用类型的`实例`。新对象是使用 `new 操作符`后跟一个`构造函数`来创建的。构造函数本身就是一个函数，只不过该函数是出于创建对象的目的而定义的
```js
var person = new Object()
// 这行代码创建了 Object 引用类型的一个新实例，然后把该实例保存在了变量 person 中。
// 使用的构造函数是 Object，它只为新对象定义了默认的属性和方法
```

## 5.1 Object类型

```js
var person = {
  'name': 'mazi',
  'age': 23,
  5: true
}
// 上面的数值属性名会自动转换为字符串
```
:::tip 提醒
- 在通过对象字面量定义对象时，实际上不会调用`Object`构造函数（Firefox2及更早版本会调用 Object 构造函数）
- 一般来说，访问对象属性时使用点表示法。不过，在 JavaScript 也可以使用方括号表示法来访问对象的属性、在使用方括号语法时，<Important text='应该将要访问的属性以字符串的形式放在方括号中' />
- <Important text='方括号语法的主要优点是可以通过变量来访问属性' />
- <Important text='如果属性名中包含会导致语法错误的字符，或者属性名使用的是关键字或保留字，也可以使用方括号表示法' />
- <Important text='属性名中是可以包含非字母非数字的，这时候就可以使用方括号表示法来访问他们' />
```js
alert(person['name']) // mazi
alert(person.name) //mazi

var propertyName = 'name'
alert(person[propertyName]) // mazi

person['first name'] = 'mazi'
```
:::

## 5.2 Array类型
```js
var colors = new Array(3) // 创建一个包含3项的数组
var names = new Array('mazi') // 创建一个包含1项，即字符串 "mazi" 的数组

var colors = Array(3) // 创建一个包含3项的数组
var names = Array('mazi') // 创建一个包含1项，即字符串 "mazi" 的数组

var values = [1, 2, ] // 会创建一个包含2或3项的数组
// IE8 以下会创建3项，即 1,2,undefined； IE9 以上和其他浏览器会创建2项   下同
var options = [, , , , ,] // 会创建一个5或6项的数组
```
> - 与对象一样，在使用数组字面量表示法时，也不会调用`Array`构造函数（Firefox 3 及更早版本除外）
> - 数组的`length`属性很有特点 -- 它不是只读的。因此，可以设置这个属性，可以从数组的末尾移除项或向数组中添加新项
> - <Important text='数组最多可以包含 4 294 967 295个项' />
```js
var colors = ['red', 'blue', 'green']
colors.length = 2
alert(colors[2]) // undefined

var colors = ['red', 'blue', 'green']
colors.length = 4
alert(colors(3)) // undefined

// 在数组末端插入新值，并增加数组长度
var colors = ['red', 'blue', 'green']
colors[colors.length] = 'black' // 位置3插入
colors[colors.length] = 'brown' // 位置4插入

var colors = ['red', 'blue', 'green']
colors[99] = 'black'
alert(colors.length) // 100
```

### 5.2.1 检测数组
> - ES3 做出规定后，就出现了确定某个对象是不是数组的经典问题。对于<Important text='同一个网页，或者一个全局作用域' />而言，使用`instanceof`操作符就能得到满意的结果
> - `instanceof`操作符的问题在于，他假定只有一个全局执行环境。如果网页中包含多个框架，那实际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的 `Array 构造函数`
> - 为了解决上面的问题，ES5 新增了 `Array.isArray()`方法。这个方法的目的是最终确定某个值到底是不是数组，而不管它是在哪个全局执行环境中创建的
```js
if (value instanceof Array) {
  // 执行操作
}

if (Array.isArray(value)) {
  // 执行操作
}
```

### 5.2.2 转换方法
> - 每个对象都有`toLocalString()、toSrting() 和 valueOf()`方法。调用`valueOf()`方法返回的还是数组本身，调用`toString()`方法会返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串。实际上，为了创建这个字符串会调用数组每一项的`toString()`方法
```js
var colors = ['red', 'blue', 'green']
alert(colors.toString()) // red, blue, green
alert(colors.valueOf())  // red, blue, green
alert(colors)            // red, blue, green
```
```js
// toLocalString()
var person1 = {
  toLocalString: function () {
    return 'mazi'
  },
  toString: function () {
    return 'Mazi'
  }
}
var person2 = {
  toLocalString: function () {
    return 'kaikai'
  },
  toString: function () {
    return 'Kaikai'
  }
}

var people = [person1, person2]
alert(people) // mazi, kaikai
alert(people.toString()) // mazi, kaikai
alert(people.toLocalString()) // Mazi, Kaikai
```
> - 数组继承的`toLocalString()、toString()、valueOf()`方法，在默认情况下都会以逗号分隔的字符串的形式返回数组项。而如果使用 `join()`方法，则可以使用不同的分隔符来构建这个字符串
> - 如果不给`join()`方法传入任何值，或给它传入`undefined`，则使用逗号作为分隔符。IE7 及更早版本会错误的使用`字符串 undefined`作为分隔符
> - 如果数组中的某一项的值是`null`或`undefined`，那么该值在`join()、toLocalString()、toString()、valueOf()`方法返回的结果中以<Important text='空字符串' />表示

### 5.2.3 栈方法
> - 数组可以表现得像栈一样，后者是一种可以限制插入和删除项的数据结构。<Important text='栈是一种 LIFO (last-In-First-Out, 后进先出)' /> 的数据结构，也就是最新添加的项最早被移除。而栈中项的插入（叫做`推入`）和 移除（叫做`弹出`），只发生在一个位置--栈的顶部
> - ES 为数组专门提供了 `push()`和`pop()`方法，以便实现类似栈的行为
> - `push()`方法可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度
> - `pop()`方法则从数组末尾移除最后一项，减少数组的`length`值，然后返回移除的项
```js
var colors = new Array()
var count = colors.push('red', 'blue')
alert(count) // 2

count = colors.push('blcak')
alert(count) // 3

var item = colors.pop()
alert(item) // black
alert(colors.length) // 2
```

### 5.2.4 队列方法
> - 栈数据结构的访问规则是`LIFO（后进先出）`，而队列数据结构的访问规则是`FIFO（First-In-First-Out, 先进先出）`。队列在列表的末端添加项，从列表的前端移除项。由于`push()`是向数组末端添加项的方法，因此要模拟队列只需一个从数组前端取得项的方法。实现这一操作的数组方法就是`shift()`，它能够移除数组中的第一个项并返回该项，同时将数组长度减 1。结合`shift()`和`push()`方法，可以像使用队列一样使用数组
> - ES还为数组提供了一个`unshift()`方法。`unshift()`与`shift()`的用途相反：它能在数组前端添加任意个项并返回新数组的长度。同时使用`unshift()`和`pop()`方法，可以从相反的方向来模拟队列，即在数组的前端添加项，在数组末端移除项
```js
var colors = new Array()
var count = colors.push('red', 'green')
alert(count) // 2
count = colors.push('black')
alert(count) // 3
var item = colors.shift()
alert(item) // red
alert(colors.length) // 2

var colors = new Array()
var count = colors.push('red', 'green')
alert(count) // 2
count = colors.unshift('black')
alert(count) // 3
var item = colors.pop()
alert(item) // green
alert(colors.length) // 2
```
:::danger
:exclamation:IE7 及更早版本对 JavaScript 的实现中存在一个偏差，其`unshift()`方法总是返回`undefined`而不是数组的新长度<br>
:exclamation:。IE8在非兼容模式下会返回正确的长度值
:::

### 5.2.5 重排序方法（会改变原始数组）
> - 数组中已经存在两个可以直接用来重排序的方法：`reverse()`和`sort()`。`reverse()`方法会反转数组项的顺序
> - `sort()`方法会调用每个数组项的`toString()`转型方法，然后比较得到的字符串，以确定如何排序
> - 比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回0，如果第一个参数应该位于第二个之后则返回一个正数
> - 如果只想反转数组原来的顺序，使用`reverse()`方法要快一些
> - `reverse()`和`sort()`方法的返回值是经过排序后的数组
> - 对于数值类型或者其 `valueOf()`方法会返回数值类型的对象类型，可以使用一个更简单的比较函数，这个函数只要第二个值减去第一个值即可
```js
var values = [1, 2, 3, 4, 5]
values.reverse()
alert(values) // 5, 4, 3, 2, 1

function compare (value1, value2) {
  if (value1 < value2) {
    return -1
  } else if (value1 > value2) {
    return 1
  } else {
    return 0
  }
}
var values = [0, 1, 5, 10, 15]
values.sort(compare)
alert(values) // 0, 1, 5, 10, 15

function compare (value1, value2) {
  return value1 - value2
}
```

### 5.2.6 操作方法
> - `concat()`方法可以基于当前数组中的所有项创建一个新数组。这个方法会先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组
> - 在没有给`concat()`方法传递参数的情况下，它只是复制当前数组并返回副本。如果传递给`concat()`方法的是一或多个数组，则该方法会将这些数组中的每一项都添加到结果数组中。如果传递的值不是数组，这些值就会被简单地添加到结果数组的末尾
```js
var colors = ['red', 'green', 'blue']
var colors2 = colors.concat('yellow', ['black', 'brown'])

alert(colors) // red, green, blue
alert(colors2) // red, green, blue, yellow. black, brown
```
> - `slice()`方法能够基于当前数组中的一或多个项创建一个新数组。`slice()`方法可以接受一或两个参数，即要返回项的起始和结束位置
> - 在只有一个参数的情况下，`slice()`方法返回从该参数指定位置开始到当前数组末尾的所有项。
> - 如果有两个参数，该方法返回起始和结束位置之间的项--但<Important text='不包括结束位置的项'/>
> - <Important text='slice() 方法不会影响原始数组'/>
```js
var colors = ['red', 'green', 'blue', 'yellow', 'purple']
var colors2 = colors.slice(1)
var colors3 = colors.slice(1, 4)

alert(colors2) // green, blue, yellow, purple
alert(colors3) // green, blue, yellow
```
> - 如果`slice()`方法的参数中有一个负值，则用数组长度加上该数来确定相应的位置。`如果结束位置小鱼起始位置，则返回空数组`

> - `splice()`方法有很多种用法。`splice()`的主要用途是向数组的中部插入项
>> + 删除：可以删除任意数量的项，只需指定 2 个参数: 要删除的第一项的位置和要删除的项数
>> + 插入：可以向指定位置插入任意数量的项，只需指定 3 个参数: 起始位置、0（要删除的项数）和要插入的项。如果要插入多项，可以再传入第四、第五，以至于任意多个项
>> + 替换：可以向指定位置插入任意数量的项，同时删除任意数量的项，只需指定 3 个参数: 起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等
> - `splice()`方法始终会返回一个数组，该数组中 <Important text='包含从原数组中删除的项（如果没有删除任何项，则返回一个空数组）'/>
> - <Important text='splice() 方法会改变原始数组'/>
```js
var colors = ['red', 'green', 'blue']
var removed = colors.splice(0, 1)
alert(colors) // green, blue
alert(removed) // red

removed = colors.splice(1, 0, 'yellow', 'orange')
alert(colors) // green, yellow, orange, blue
alert(removed) // []

removed = colors.splice(1, 1, 'red', 'purple')
alert(colors) // green, red, purple, orange, blue
alert(removed) // yellow
```

### 5.2.7 位置方法
> - ES5 为数组实例添加了两个位置方法：`indexOf()`和`lastIndexOf()`。这两个方法都接收两个参数: 要查找的项和（可选的）表示查找起点位置的索引
> - `indexOf()`方法从数组的开头（位置 0）开始向后查找，`lastIndexOf()`方法则从数组的末尾开始向前查找
> - 这两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回 -1。`在比较第一个参数与数组中的每一项时，会使用`<Important text='全等操作符'/>。也就是说，要查找的项 `必须严格相等（就像使用 === 一样）`
> - <Important text='这两个方法在查找到匹配的项后不会再继续查找'/>
```js
var numbers = [1,2,3,4,5,4,3,2,1]
alert(numbers.indexOf(4)) // 3
alert(numbers.lastIndexOf(4)) // 5

alert(numbers.indexOf(4, 4)) // 5
alert(numbers.lastIndexOf(4, 4)) // 3

var person = { name: 'mazi' }
var people = {[ name: 'mazi' ]}
var morePeople = [person]
alert(people.indexOf(person)) // -1
alert(morePeople.indexOf(person)) // 0    引用类型
```

### 5.2.8 迭代方法
> - ES5 为数组定义了 5 个迭代方法。每个方法都接收两个参数：要在每一项上运行的函数和（可选的）运行该函数的作用域对象--`影响 this 的值`
> - 传入这些方法中的函数会接收三个参数：数组项的值、该项在数组中的位置和数组本身
>> + `every()`: 对数组中的每一项运行给定函数，如果该函数对每一项都返回`true`，则返回`true`
>> + `filter()`: 对数组中的每一项运行给定函数，如果该函数会返回`true`的项组成的`数组`
>> + `forEach()`: 对数组中的每一项运行给定函数，没有返回值
>> + `map()`: 对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组
>> + `some()`: 对数组中的每一项运行给定函数，如果该函数对任一项都返回`true`，则返回`true`
```js
var numbers = [1,2,3,4,5,4,3,2,1]
var everyResult = numbers.every(function (item, index, array) {
  return (item > 2)
})
alert(everyResult) // false

var someResult = numbers.some(function (item, index, array) {
  return (item > 2)
})
alert(someResult) // true

var filterResult = numbers.filter(function (item, index, array) {
  return (item > 2)
})
alert(filterResult) // [3,4,5,4,3]

var mapResult = numbers.map(function (item, index, array) {
  return item * 2
})
alert(mapResult) // [2,4,6,8,10,8,6,4,2]

numbers.forEach(function (item, index, array) {
  // do something
})
```

### 5.2.9 归并方法
> - ES5 新增了两个归并数组的方法：`reduce()`和`reduceRight()`。这两个方法都会迭代数组的所有项，然后构建一个最终返回的数组
> - `reduce()`方法从数组的第一项开始，逐个遍历到最后。而`reduceRight()`则从数组的最后一项开始，向前遍历到最后一项
> - 这两个方法都接收两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值。传给`reduce()`和`reduceRight()`的函数接收 4 个参数: `前一个值、当前值、项的索引和数组对象`。这个函数返回的任何值都会作为第一个参数自动传递给下一项。第一次迭代发生在数组的第二项上，因此第一个参数是数组的第一项，第二个参数就是数组的第二项
> - 使用`reduce()`还是`reduceRight()`，主要取决于要从哪头开始遍历数组。除此之外，它们完全相同
```js
var values = [1,2,3,4,5]
var sum = values.reduce(function (prev, cur, index, array) {
  return prev + cur
})
alert(sum) // 15

var sum = values.reduceRight(function (prev, cur, index, array) {
  return prev + cur
})
alert(sum) // 15
```

## 5.3 Date类型
> - ES 中的`Date`类型是在早期 Java 中的 java.util.Date 类基础上构建的。`Date`类型使用自`UTC（Coordinated Universal Time, 国际协调时间） 1997 年 1 月 1 日午夜（零点）开始经过的毫秒数来保存日期`
> - 在使用这种数据结构存储格式的条件下，`Date`类型保存的日期能够精确到 1970 年 1 月 1 日之前或之后的 `100 000 000`年
> - 要创建一个日期对象，使用`new`操作符和`Date`构造函数即可
```js
var now = new Date()
```

> - 在调用`Date`构造函数而不传递参数的情况下，新创建的对象自动获取当前日期和时间。如果想根据特定的日期和时间创建日期对象，必须传入表示该日期的毫秒数（即从 UTC 时间 1970 年 1 月 1 号午夜起至该日期止经过的毫秒数）
> - ES 提供了两个方法：`Date.parse()`和`Date.UTC()`
> - `Date.parse()`方法接收一个表示日期的字符串参数，然后尝试根据这个字符串返回相应日期的毫秒数。 ECMA-262 没有定义 `Date.parse()`应该支持那种日期格式，因此这个方法的行为因实现而异，而且通常是因地区而异。
> - 将地区设置为美国的浏览器通常都接收下列日期格式
>> - '月/日/年'，如 6/13/2004
>> - '英文月 日，年'，如 January 12，2004
>> - '英文星期几 英文月名 日 年 时:分:秒 时区'，如 Tue May 25 2004 00:00:00 GMT-0700
>> - ISO 8601 扩展格式 YYYY-MM-DDTHH:mm:ss.sssZ（例如 2004-05-25T00:00:00）。只有兼容 ES5 的实现支持这种格式

> - 如果传入`Date.parse()`方法的字符串不能表示日期，那么它会返回`NaN`。实际上，如果直接将表示日期的字符串传递给`Date构造函数`，也会在后台调用`Date.parse()`
```js
var someDate = new Date(Date.parse('May 25, 2004'))
var someDate = new Date('May 25, 2004')
```

> - 日期对象及其在不同的浏览器中的实现有很多奇怪的行为。其中有一种倾向是 <Important text='将超出范围的值替换成当前的值，以便生成输出'/>；而 Opera 则倾向于<Important text='插入当前月份的当前日期'/>
> - `Date.UTC()`方法同样也返回表示日期的毫秒数，但它与`Date.parse()`在构建值时使用不同的信息。
> - `Date.UTC()`的参数分别是`年份、基于 0 的月份（一月是0，二月是1，以此类推）、月中的哪一天（1到31）、小时数（0到23）、分钟、秒 以及 毫秒数`。在这些参数中，只有前两个参数（年和月）是必须的。如果没有提供月中天数，则假设天数是 1；如果省略其他参数，则统统假设为 0
```js
// GMT 时间 2000 年 1 月 1 日 午夜零点
var y2k = new Date(Date.UTC(2000, 0))

// GMT 时间 2005年 5 月 5 日下午 5:55:55
var allFives = new Date(Date.UTC(2005, 4, 5, 17, 55, 55))
```

> - 如同模仿`Date.parse()`一样，`Date`构造函数也会模仿`Date.UTC()`，但有一点明显不同：日期和时间基于本地市区而非`GMT`来创建。不过，`Date`构造函数接收的参数仍然与`Date.UTC()`相同
> - 如果第一个参数是数值，`Date`构造函数就会假设该值是日期中的年份，而第二个参数是月份，以此类推
```js
// GMT 时间 2000 年 1 月 1 日 午夜零点
var y2k = new Date(2000, 0)

// GMT 时间 2005年 5 月 5 日下午 5:55:55
var allFives = new Date(2005, 4, 5, 17, 55, 55)
```
> - ES5 添加了`Date.now()`方法，返回表示调用这个方法时的日期和时间的毫秒数
> - 在不支持`Date.now()`方法的浏览器中，使用`+ 操作符`获取 `Date对象的时间戳`

### 5.3.1 继承的方法
> - 与其他引用类型一样，`Date`类型也重写了`toLocalString()、toString() 和 valueOf()`方法
> - `toLocalString()`方法会按照与浏览器的设置的地区相适应的格式返回日期和时间。这大致意味着时间格式中会包含AM或PM，但不会包含市区信息（当然，具体的格式会因浏览器而异）
> - `toString()`方法则通常返回带有时区信息的日期和时间，其中时间一般以军用时间（即小时的范围是 0-23）表示
> - `valueOf()`方法，不返回字符串，而是返回日期的毫秒表示。因此，可以方便使用比较操作符比较日期值
```js
var date1 = new Date(2007, 0, 1)
var date2 = new Date(2007, 1, 1)
alert(date1 < date2) // true
```

### 5.3.2 日期格式化方法
> - `toDateString()`--以特定于实现的格式显示星期几、月、日和年
> - `toTimeString()`--以特定于实现的格式显示时、分、秒和时区
> - `toLocalDateString()`--以特定于地区的格式显示星期几、月、日和年
> - `toLocalTimeString()`--以特定于实现的格式显示时、分、秒和时区
> - `toUTCString()`--以特定于实现的格式完整的UTC日期
> - 与`toLocalString()`和`toString()`方法一样，以上这些字符串格式方法的输出也是因浏览器而异的
> - `toGTMString()`是一个与`toUTCString()`等价的方法，其存在的目的在于确保向后兼容。不过，ES推荐现在编写的代码一律用`toUTCString()`方法

### 5.3.3 日期/时间组件方法
> - UTC日期指的是在没有时区偏差的情况下（将日期转换为GMT时间）的日期值
:::tip 日期/时间方法
<br>

![image](/rqff.jpg)
:::

## 5.4 RegExp类型
> ES 通过`RegExp`类型来支持正则表达式
```js
var expression = / pattern / flags 
```
> - 其中的模式（pattern）部分可以是任何简单或复杂的正则表达式，可以包含字符串、限定符、分组、向前查找以及反向引用。每个正则表达式都可带一个或多个标志（flags），用以标明正则表达式的行为。
> - 正则表达式的匹配模式支持下列 3 个标志
>> - g: 表示全局（global）模式，即模式将被运用于所有字符串，而非在发现第一个匹配项时立即停止
>> - i: 表示不区分大小写（case-insensitive）模式，即在确定匹配项时忽略模式与字符串的大小写
>> - m: 表示多行（multiline）模式，即在到达一行文本末尾时还会继续查找下一行中是否存在于模式匹配的项
> - 一个正则表达式就是一个模式与上述 3 个标志的组合体
```js
// 匹配字符串中所有的 `at` 的实例
var pat1 = /at/g

// 匹配第一个 `bat` 或 `cat`，不区分大小写
var pat2 = /[bc]at/i

// 匹配所有以 `at` 结尾的 3 个字符的组合，不区分大小写
var pat3 = /.at/gi
```
> - 与其他语言的正则表达式一样，模式中使用的所有`元字符`都必须转义
```js
( [ { \ ^ $ | ) ? * + . ] }
```
```js
// 匹配第一个 `bat` 或 `cat`，不区分大小写
var pat1 = /[bc]at/i

// 匹配第一个 `[bc]at`，不区分大小写
var pat2 = /\[bc\]at/i

// 匹配所有以 `at` 结尾的 3 个字符的组合，不区分大小写
var pat3 = /.at/i

// 匹配所有 `.at`，不区分大小写
var pat4 = /\.at/i
```
> - 另一种创建正则表达式的方式是使用 RegExp 构造函数，它接收两个参数：一个是要匹配的字符串模式，另一个是可选的标志字符串。
> - 可以使用字面量定义的任何表达式，都可以使用构造函数来定义
```js
var pat1 = /[bc]at/i

var pat2 = new RegExp('[bc]at', 'i')
```

:::warning 提醒
> - 要注意传递给`RgeExp`构造函数的两个参数都是字符串。由于`RegExp`构造函数的模式是字符串，所以在某些情况下要对字符进行双重转义。所有元字符都必须进行双重转义，那些已经转义过的字符也是如此

|字面量模式 |等价的字符串  |
|---------|------------|
|/\[bc]at/|'\\[bc\\]at'|
|/\.at/   |'\\.at'     |
|/name\/age/|'name\\/age'|
|/\d.\d(1,2)/|'\\d.\\d(1,2)'
|/\w\hello\\123/|'\\w\\\\hello\\\\123'|
:::
> - 使用正则表达式字面量和使用`RegExp`构造函数创建的正则表达式不一样。在 ES3 中，正则表达式字面量始终会共享同一个`RgeExp`实例，而使用构造函数创建的每一个新`RgeExp`实例都是一个新实例
> - ES5 明确规定，使用正则表达式字面量必须像直接调用`RegExp`构造函数一样，每次都创建新的`RegExp`实例

### 5.4.1 实例属性
> - `RegExp`的每个实例都有下列属性: 
>> - global: 布尔值，表示是否设置了 g 标志
>> - ignoreCase: 布尔值，表示是否设置了 i 标志
>> - lastIndex: 整数，表示开始搜索下一个匹配项的字符位置，从 0 算起
>> - multiline: 布尔值，表示是否设置了 m 标志
>> - source: 正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回
```js
var pat1 = /\[bc\]at/i
alert(pat1.global) // false
alert(pat1.ignoreCase) // true
alert(pat1.lastIndex) // 0
alert(pat1.multiline) // false
alert(pat1.source) // '\[bc\]at'

var pat2 = new RegExp('\\[bc\\]at', 'i')
alert(pat2.global) // false
alert(pat2.ignoreCase) // true
alert(pat2.lastIndex) // 0
alert(pat2.multiline) // false
alert(pat2.source) // '\[bc\]at'
```

### 5.4.2 RegExp实例方法
> - `RegExp`对象的主要方法是`exec()`，该方法专门为捕获组而设计。`exec()`接受一个参数，即要应用模式的字符串，然后返回包含第一个匹配项信息的数组；或者在没有匹配项的情况下返回 null
> - 返回的数组虽然是 Array 的实例，但包含两个额外的属性：`index`和`input`。其中，`index`表示匹配项在字符串中的位置，而`input`表示应用正则表达式的字符串。在数组中，第一项是与整个模式匹配的字符串，其他项是与模式中的捕获组匹配的字符串（如果模式没有捕获组，则该数组只包含一项）
```js
var text = 'mom and dad and baby'
var pat = /mom( and dad( and baby)?)?/gi

var matches = pat.exec(text)
alert(matches.index) // 0
alert(matches.input) // 'mom and dad and baby'
alert(matches[0]) // 'mom and dad and baby'
alert(matches[1]) // ' and dad and baby'
alert(matches[2]) // ' and baby'
```

> - 对于`exec()`方法而言，即使在模式中设置了全局标志（g），它每次也只会返回一个匹配项。在不设置全局标志的情况下，在同一个字符串上多次调用`exec()`将始终返回第一个匹配项的信息。而在设置全局标志的情况下，每次调用`exec()`则都会在字符串中继续查找新匹配项
```js
var text = 'cat, bat, sat, fat'
var pat1 = /.at/

var matches = pat1.exec(text)
alert(matches.index) // 0
alert(matches[0]) // 'cat'
alert(pat1.lastIndex) // 0

matches = pat1.exec(text)
alert(matches.index) // 0
alert(matches[0]) // 'cat'
alert(pat1.lastIndex) // 0

var pat2 = /.at/g

var matches = pat1.exec(text)
alert(matches.index) // 0
alert(matches[0]) // 'cat'
alert(pat1.lastIndex) // 3

matches = pat1.exec(text)
alert(matches.index) // 5
alert(matches[0]) // 'bat'
alert(pat1.lastIndex) // 8
```
> - 在全剧匹配模式下，lastIndex 的值在每次调用 exec() 后都会增加，而在非全局模式下则始终保持不变
> - <Important text='IE 的 JavaScript 实现在 lastIndex 属性上存在偏差，即使在非全局模式下，lastIndex属性每次也会变化'/>

> - 正则表达式的第二个方式是 `text()`，它接受一个字符串参数。在模式与该参数匹配的情况下返回 true；否则，返回 false
> - 在只想知道目标字符串与某个模式是否匹配，但不需要知道其文本内容的情况下，使用这个方法非常方便
```js
var text = '000-00-0000'
var pat = /\d{3}-\d{2}-\d{4}/

if (pat.test(text)) {
  //
}
```
> - RegExp 实例继承的 toLocalString() 和 toString() 方法都会返回正则表达式的 <Important text='字面量'/>，与创建正则表达式的方式无关
```js
var pat = new RegExp('\\[bc\\]at', 'gi')
alert(pat.toString()) // \[bc\]at/gi
alert(pat.toLocalString()) // \[bc\]at/gi
```
> - 正则表达式的 valueOf() 方法返回正则表达式本身

### 5.4.3 RegExp构造函数属性
> - 这些属性适用于作用域中的所有正则表达式，并且基于所执行的最后一次正则表达式操作而变化。关于这些属性的另一个独特之处，就是可以通过两种方式来访问它们。换句话说，这些属性分别有一个 长属性名 和一个 短属性名（Opera除外，它不支持短属性名）

|长属性名     |短属性名|说明                                                    |
|----------- |-------|--------------------------------------------------------|
|input       |$_     |最近一次要匹配的字符串。Opera未实现此操作                     |
|lastMatch   |$&     |最后一次的匹配项。Opera未实现此操作                          |
|lastParen   |$+     |最后一次匹配的捕获组。Opera未实现此操作                       |
|leftContext |$`     |input字符串中lastMatch之前的文本                           |
|multiline   |$*     |布尔值，表示是够所有表达式都使用多行模式。IE 和 Opera 未实现此操作|
|rightContext|$'     |input字符串中lastMatch之后的文本                           |
- 使用这些属性可以从 exec() 或 test() 执行的操作中提取出更具体的信息
```js
var text = 'this has been a short summer'
var pat = /(.)hort/g

/*
 * 注意： Opera 不支持 input、lastMatch、lastParen 和 multiline 属性
 * IE 不支持 multiline 属性
 */
if (pat.test(text)) {
  alert(RegExp.input) // this has been a short summer
  alert(RegExp.leftContext) // this has been
  alert(RegExp.rightContext) // summer
  alert(RegExp.lastMatch) // short
  alert(RegExp.lastParen) // s
  alert(RegExp.multiline) // false
}

if (pat.test(text)) {
  alert(RegExp.$_) // this has been a short summer
  alert(RegExp['$`']) // this has been
  alert(RegExp["$'"]) // summer
  alert(RegExp['$&']) // short
  alert(RegExp['$+']) // s
  alert(RegExp['$*']) // false
}
```
> - 除了上面介绍的几个属性之外，还有多达 9 个用于存储捕获组的构造函数属性，访问这些属性的语法是 RegExp.$1、RegExp.$2 ... RegExp.$9，分别用于存储 第一、第二 ... 第九个匹配的捕获项。在调用`exec()`或`test()`方法时，这些属性会被自动填充
```js
var text = 'this has been a short summer'
var pat = /(..)or(.)/g

if (pat.test(text)) {
  alert(RegExp.$1) // sh
  alert(RegExp.$2) // t
}
```

### 5.4.4 模式的局限性
:::warning ES 不支持的高级用法
- 匹配字符串开始和结束的 \A 和 \Z 锚（但支持以`插入符号(^)`和 `美元符号($)来匹配字符串的开始和结尾`）
- 向后查找（但完全支持向前查找）
- 并集和交集
- 原子组
- Unicode支持（单个字符除外，如 \uFFFF）
- 命名捕获组（但支持编号的捕获组）
- s（single，单行）和 x（free-spacing，无间隙）匹配模式
- 条件匹配
- 正则表达式注释
:::

## 5.5 Function类型
> - ES 中的函数实际上是对象。每个函数都是`Function`类型的实例，而且都与其他引用类型一样具有属性和方法
> - 由于`函数是对象`，因此函数名实际上也是一个指向函数对象的指针，不会与某个函数绑定
> - 函数的三种声明方式：
>> - 函数声明语法
>> - 函数声明表达式语法
>> - `Function`构造函数
```js
function sum (num1, num2) {
  return num1 + num2
}

var sum = function (num1, num2) {
  return num1 + num2
}

var sum = new Function('num1', 'num2', 'return num1 + num2')
```
:::warning 提示
- `Function`构造函数可以接收任意数量的参数，但最后一个参数始终都被看成是函数体，而前面的参数则枚举了新函数的参数
- 不推荐使用`Function`构造函数这种方式定义函数，因为这种语法会导致<Important text='解析两次'/>（第一次是解析 ES 代码，第二次是解析传入构造函数中的字符串），从而影响性能
- 由于函数名仅仅是一个指向函数的指针，因此函数名和包含对象指针的其他变量没有什么不同。换句话说，一个函数可能有多个名字
:::

### 5.5.1 没有重载（深入理解）
```js
function addSomeNum (num) {
  return num + 100
}
function addSomeNum (num) {
  return num + 200
}
var result = addSomeNum(100) // 300

// 函数名被指向其他的函数
var addSomeNum = function (num) {
  return num + 100
}
addSomeNum = function (num) {
  return num + 200
}
var result = addSomeNum(200) // 300
```

### 5.5.2 函数声明与函数表达式
>- 实际上，解释器在向执行环境中加载数据时，对函数声明和函数表达式并非一视同仁。
>- 解释器会率先读取函数声明，并使其在执行任何代码之前可用（可以访问）
>- 函数表达式则必须等到解释器执行到它所在的代码行，才会真正被解释执行
```js
alert(sum(10, 10))
function sum (num1, num2) {
  return num1 + num2
}
```
> - 上面代码开始执行之前，解释器就已经通过一个名为函数声明提升（funtion declaraction hoisting）的过程，读取并将函数声明添加到执行环境中。对代码求值时，JavaScript 引擎在第一遍会声明函数并将它们放到源代码树的顶部。所以，即使声明函数的代码在调用它的代码后面，JavaScript 引擎也能把函数声明提升到顶部
```js
alert(sum(10, 10))
var sum = function (num1, num2) {
  return num1 + num2
}
```
> - 以上代码之所以会在运行时产生错误，原因在于函数位于一个初始化语句中，而不是一个函数声明。换句话说，在执行到函数所在的语句之前，变量 sum 中不会保存有对函数的引用；而且，由于第一行代码就会导致 "unexpected identifier"（意外标识符）错误，实际上也不会执行到下一行
>- 除了什么时候都可以通过变量访问函数这一点区别之外，函数声明和函数表达式的语法其实是等价的
:::warning 提醒
:warning:也可以同时使用函数声明和函数表达式，例如 `var sum = function sum () {}`，不过这种语法在 Safari 中会导致报错
:::

### 5.5.3 作为值得函数
>- 因为 ES 中的函数名本身就是变量，所以函数也可以作为值来使用。不仅可以像传递参数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回
```js
function callSomeFun (someFun, someArg) {
  return someFun(someArg)
}

function add10 (num) {
  return num + 10
}
var res1 = callSomeFun(add10, 10)
alert(res1) // 20

function getGreeting (name) {
  return 'Hello, ' + name
}
var res2 = callSomeFun(getGreeting, 'mazi')
alert(res2) // Hello, mazi
```
>- 要访问函数的指针而不执行函数的话，必须去掉函数名后面的那对大括号

```js
function createComparFun (propertyName) {
  return function (obj1, obj2) {
    var val1 = obj1[propertyName]
    var val2 = obj2[propertyName]
    return val1 < val2 ? -1 : val1 > val2 ? 1 : 0
  }
}
var data = [{ name: 'mazi', age: 28 }, { name: 'kaikai', age: 29 }]
data.sort(createComparFun('name'))
alert(data[0].name) // kaikai

data.sort(createComparFun('age'))
alert(data[0].name) // mazi
```

### 5.5.4 函数内部属性
> 在函数内部，有两个特殊的对象：`arguments`和`this`。`arguments`是一个类数组对象，包含着传入函数的所有参数。虽然`arguments`的主要用途是保存函数的参数，但这个对象还有一个名叫`callee`的属性，该属性是一个`指针`，`指向拥有这个 arguments 对象的函数`
```js
function factorial (num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * factorial(num-1)
  }
}

function factorial (num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num-1)
  }
}
```
```js
var trueFactorial = factorial
factorial = function () {
  return 0
}
alert(trueFactorial(5)) // 120
alert(factorial(5)) // 0
```
> 变量 trueFactorial 获得了 factorial 的值，实际上是在另一个位置上保存了一个函数的指针

> 函数内部的另一个特殊对象是 `this`，`this`引用的是函数执行的环境对象--或者也可以说是 `this` 值（当在网页的全局环境中调用函数时，`this`对象引用的就是 `window`）
```js
window.color = 'red'
var o = { color: 'blue' }

function sayColor () {
  alert(this.color)
}
sayColor() // 'red'
o.sayColor = sayColor
o.sayColor() // 'blue'
```
:::tip 提示
:tada:函数的名字仅仅是一个包含指针的变量而已。因此，即使是在不同的环境中执行，全局的 sayColor() 函数与 o.sayColor()指向的仍然是同一个函数
:::

> ES5 也规范化了另一个函数对象的属性：caller。这个属性中保存着调用当前函数的函数的引用，如果是全局作用域中调用当前函数，它的值为 `null`

```js
function outer () {
  inner()
}
function inner () {
  alert(inner.caller)
}

function inner () {
  alert(arguments.callee.caller)
}
outer()
```
> 以上代码会导致警告框中显示 `outer()` 函数的`源代码`。因为`outer()`调用了`inner()`，所有`inner.caller`就指向`outer()`。为了降低耦合，可以通过使用`arguments.callee.caller`来访问相同的信息

:::warning 提醒
:warning:在函数在严格模式下运行时，访问`arguments.callee`会导致错误。 ES5 还定义了`arguments.caller`属性，但在严格模式下访问它也会报错，而在非严格模式下这个属性始终是`undefined`。定义`arguments.callee`属性时为了分清`arguments.caller`和函数的`caller`属性

:warning:严格模式还有一个限制：不能为函数的`caller`属性赋值，否则会导致报错
:::

### 5.5.5 函数属性和方法
:::tip 介绍
:tada:ES 中的函数是对象，因此函数也有属性和方法。每个函数都包含两个属性：`length`和`prototype`。其中`length`属性表示函数希望接收的命名参数的个数
:::
```js
function sayName (name) {
  alert(name)
}
function sayHi () {
  alert('hi')
}
alert(sayName.length) // 1
alert(sayHi.length) // 0
```
>- ES 核心所定义的全部属性中，最耐人寻味的就要数`prototype`属性了。对于 ES 中的引用类型而言， `prototype`是保存它们所有实例方法的真正所在。`toString()`、`valueOf()`等方法都保存在`prototype`名下，只不过是通过各自对象的实例访问罢了
>- 在创建自定义引用类型以及实现继承时，`prototype`属性的作用是极为重要的。在 ES5 中，`prototype`属性是不可枚举的，因此使用`for-in`无法发现

:::tip apply() 和 call()
:tada:每个函数都包含两个非继承而来的方法：`apply()`和`call()`。这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内`this`对象的值

`apply()`方法接收两个参数: 一个是在其中运行函数的作用域，另一个是参数数组。第二个可以是`Array`的实例，也可以是`arguments`对象

`call()`方法与`apply()`方法的作用相同，它们的区别仅在于接收参数的方式不同。对于`call()`方法而言，第一个参数是`this`，其余参数都是直接传递给函数
:::
```js
function sum (num1, num2) {
  return num1 + num2
}
function callSum1 (num1, num2) {
  return sum.apply(this, arguments)
}
function callSum2 (num1, num2) {
  return sum.apply(this, [num1, num2])
}
alert(callSum1(10, 10)) // 20
alert(callSum2(10, 10)) // 20

function callSum (num1, num2) {
  return sum.call(this, num1, num2)
}
alert(callSum(10, 10)) // 20
```
> 在严格模式下，未指定环境对象而调用函数，则`this`值不会转型为 window。除非明确把函数添加到某个对象或者调用`apply()`和`call()`，否则`this`值将是`undefined`

> 事实上，传递参数并非`apply()`和`call()`真正的用武之地；它们真正强大的地方在于能够扩充函数赖以运行的作用域
```js
window.color = 'red'
var o = { color: 'blue' }

function sayCol () {
  alert(this.color)
}
sayCol() // red
sayCol.call(this) // red
sayCol.call(window) // red
sayCol.call(o) // blue
```

> 使用 `call()`（或`apply()`）来扩充作用域的最大好处，就是对象不需要与方法有任何耦合关系

> ES5 还定义了一个方法: `bind()`。这个方法会`创建一个函数的实例`。其`this`值会被绑定传给`bind()`函数的值
```js
window.color = 'red'
var o = { color: 'blue' }

function sayColor () {
  alert(this.color)
}
var objSayColor = sayColor.bind(o)
objSayColor() // blue
```

## 5.6 基本包装类型
:::tip 介绍
:tada:ES 有 3 个特殊的包装类型：`Boolean、Number、String`。实际上，每当读取一个基本类型值的时候，后台就会创建一个对应的包装类型的对象，从而让我们能够调用一些方法来操作这些数据
:::
```js
var s1 = 'some text'
s1.substring(2)
```
>- 基本类型值不是对象，因而从逻辑上讲它们不应该有方法（尽管如我们所愿，它们确实有方法）
>- 为了能让我们实现这种直观的操作，后台已经自动完成了一系列的处理。当第二行代码访问 s1 时，访问过程处于一种读取模式，也就是从内存中读取这个字符串的值
:::tip 后台自动完成的操作
1. 创建`String`类型的一个实例
2. 在实例上调用指定的方法
3. 销毁这个实例
```js
var s = new String('some text')
var s2 = s.substring(2)
s = null
```
:::

:::warning 引用类型和基本包装类型的生命周期
:warning:引用类型与基本包装类型的主要区别就是对象的生存期。使用`new`操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁
```js
var s1 = 'some text'
s1.color = 'red'
alert(s1.color) // undefined
```
> 第二行创建的`String`对象在执行第三行代码时已经被销毁了。第三行代码又创建自己的`String`对象，而该对象没有`color`属性
:::

> 当然可以显式地调用`Boolean、Number、String`来创建基本包装类型的对象。不过，应该在绝对必要的情况下再这么做，因为这种做法很容易让人分不清自己是在处理基本类型还是引用类型的值

>- 对基本包装类型的实例用`typeof`会返回`object`，而且所有基本类型的对象在转换成布尔值时值都是`true`
>- `Object 构造函数`也会像工厂方法一样，根据传入值得类型的返回相应基本包装类型的实例
```js
var obj = new Object('some text')
alert(obj instanceof String) // true
```

:::warning 告知
:warning:使用`new`调用基本包装类型的构造函数，与直接调用同名的转型函数是不一样的
```js
var value = '25'
var number = Number(value)
alert(typeof number) // 'number'

var obj = new Number(value)
alert(typeof obj) // 'Object'
```
:::

### 5.6.1 Boolean类型
>- Boolean类型是与布尔值对应的引用类型。要创建Boolean对象，可以像下面这样调用Boolean构造函数并传入`true`或`false`值
>- Boolean类型的实例重写了`valueOf()`方法，返回基本类型值`true`或`false`；重写了`toString()`方法，返回字符串`'true'`或`'false'`。`Boolean`对象在 ES 中的用处不大，因为它经常会造成人们的误解。其中最常见的问题就是在布尔表达式中使用`Boolean`对象
>- 布尔表达式中的所有对象都会被转换成`true`，因此 falseObj 对象在布尔值表达式中代表的是 `true`
```js
var falseObj = new Boolean(false)
var res = falseObj && true
alert(res) // true

var falseVal = false
var res1 = falseVal && true
alert(res1) // false
```

:::tip 基本类型和引用类型布尔值的区别
1. `typeof`操作符对基本类型返回`boolean`，而对引用类型返回`object`
2. 由于`Boolean对象`是`Boolean类型`的实例，所以使用`instanceof`操作符测试`Boolean`对象会返回`true`，而测试基本类型的布尔值则返回`false`
```js
alert(typeof falseObj) // 'object'
alert(typeof falseVal) // 'boolean'
alert(falseObj instanceof Boolean) // true
alert(falseVal instanceof Boolean) // false
```
:::

### 5.6.2 Number类型
>- Number是与数字值对应的引用类型。要创建 Number 对象，可以在调用 Number 构造函数时向其中传递相应的数值
>- Number类型重写了`valueOf()、toLocalString()、toString()`方法。重写后的`valueOf()`方法返回对象表示的基本类型的数值，另外两个方法则返回字符串形成的数值。 可以为`toString()`方法传递一个表示基数的参数，告诉它返回几进制熟知的字符串形式
```js
var num = 10
alert(num.toString(2)) // '10.00'
```
>- 如果函数本身包含的小数位比指定的多，那么接近指定的最大小数位的值就会四舍五入
```js
var num = 10.005
alert(num.toFixed(3))
```
>- 能够四舍五入的特性，使得`toFixed()`方法很适合处理货币值。但需要注意的是，不同浏览器给这个方法设定的舍入规则可能会有不同。在给`toFixed()`传入参数 0 的情况下，IE8及之前版本不能正确舍入范围`{(-0.94, -0.5], [0.5, 0.94)`之间的值。对于这个范围的值，IE会返回 0，而不是`-1`或`1`。其他浏览器都能返回正确的值。 IE9修复了这个问题
:::tip 提示
:tada:`toFixed()`方法可以表示带有 0 到 20 个小数位的数值。但这只是标准实现的规范，有些浏览器可能支持更多位数
:::

>- 另外可用于格式化数值的方法是`toExponenttial()`，该方法返回以指数表示法（也称 e 表示法）表示的数值的字符串形式。与 `toFixed()`一样，`toExponential()`也接收一个参数，而且参数同样也是指定输出结果中的小数位
```js
var num = 10
alert(num.toExponential(1)) // 1.0e+1
```
>- 如果你想得到表示某个数值的最合适的格式，就应该使用`toPrecision()`方法
>- 对于一个数值来说，`toPrecision()`方法可能会返回固定大小（fixed）格式，也可能返回指数（exponential）格式；具体规则是看哪种格式最合适。这个方法接收一个参数，即表示数值的所有数字的位数（不包括指数部分）
```js
var num = 99
alert(num.toPrecision(1)) // '1e+2'
alert(num.toPrecision(2)) // '99'
alert(num.toPrecision(3)) // '99.0'
```
:::warning 提示
:warning:实际上，`toPrecision()`会根据要处理的数值决定到底是调用`toFixed()`还是`toPrecision()`，而这三个方法都可以通过向上或向下舍入，做到以最准确的形式来表示带有正确小数位的值<br>
:warning:`toPrecision()`方法可以表现`1`到`21`位小数。某些浏览器支持的范围更大，但这是典型实现的范围
:::

:::tip 基本类型数值和Number类型值的区别
1. `typeof`操作符对基本类型返回`number`，而对引用类型返回`object`
2. 由于`Number对象`是`Number类型`的实例，所以使用`instanceof`操作符测试`Number`对象会返回`true`，而测试基本类型的数值则返回`false`
```js
var numObj = new Number(10)
var numVal = 10
alert(typeof numObj) // 'object'
alert(typeof numVal) // 'number'
alert(numObj instanceof Number) // true
alert(numVal instanceof Number) // false
```
:::

### 5.6.3 String类型
>- String类型是字符串的包装对象类型
```js
var strObj = new String('hello world')
```
>- String对象的方法也可以在所有基本的字符串值中访问到。其中，继承的`valueOf()、toLocalString()、toString()`方法，都返回对象所表示的基本字符串值
>- String类型的每个实例都有一个`length`属性，表示字符串中包含多个字符
```js
var strVal = 'hello world'
alert(strVal.length) // 11
```
:::tip 提示
:tada:即使字符串中包含双字节字符（不是占一个字节的 ASCII 字符），每个字符也仍然算一个字符
:::

#### 1. 字符方法
>- 两个用于访问字符串特定字符的方法是：`charAt()`和`chartCodeAt()`。这两个方法都接收一个参数，即基于`0`的字符位置。其中，`charAt()`方法以单字符字符串的形式返回给定位置的那个字符（ES 中没有字符类型），`charCodeAt()`返回的是字符编码
>- ES5 还定义了另一个访问个别字符的方法。在支持此方法的浏览器中，可以使用方括号加数字索引来访问字符串中的特定字符
```js
var strVal = 'hello world'
alert(strVal.charAt(1)) // 'e'

alert(strVal.charCodeAt(1)) // '101'

alert(strVal[1]) // 'e'
```
:::danger 方括号方式访问字符提醒
:exclamation:在 IE7 及更早版本中使用这种语法，会返回`undefined`值（尽管根本不是特殊的`undefined`值）
:::

#### 2. 字符串操作方法
>- `concat()`方法将一或多个字符串拼接起来，返回拼接得到的字符串
>- 虽然`concat()`是专门用来拼接字符串的方法，但实践中使用更多的还是`加号操作符 (+)`
```js
var strVal = 'hello '
var res = strVal.concat('world', '!')
alert(strVal) // 'hello '
alert(res) // 'hello world!'
```
>- ES还提供了三个基于子字符串创建的创建新字符串的方法：`slice()、substr()、substring()`。这三个方法都会返回被操作字符串的一个子字符串，而且也接受一或两个参数。第一个参数`指定字符串的开始位置`，第二个参数（在指定的情况下）`表示子字符串到哪里结束`
>- `slice()`和`substring()`的第二个参数指定的是子字符串最后一个字符后面的位置。而`substr()`的第二个参数指定的则是`返回字符个数`
>- 与`concat()`方法一样，`slice()、substr()、substring()`也不会修改字符串本身的值--它们只是返回一个基本类型的字符串值，对原始字符串没有任何影响。`slice()、substring()截取的位置包括第一个参数的位置，不包括第二个参数的位置`
```js
var strVal = 'hello world'
alert(strVal.slice(3, 7)) // 'lo w'
alert(strVal.substring(3, 7)) // 'lo w'
alert(strVal.substr(3, 7)) // 'lo worl'
```
:::tip 反向操作
:tada:在传递给这些方法的参数是`负值`的情况下，它们的行为就不尽相同了。其中，`slice()`方法会`将传入的负值与字符串的长度相加`，`substr()`方法`将负的第一个参数加上字符串的长度，而将负的第二个参数转换为 0`，最后，`substring()`方法`会把所有负值参数都转换为 0`
```js
var strVal = 'hello world'
alert(strVal.slice(-3)) // 'rld'
alert(strVal.substring(-3)) // 'hello world'
alert(strVal.substr(-3)) // 'rld'

alert(strVal.slice(3, -4)) // 'lo w'
alert(strVal.substring(3, -4)) // 'hel'
alert(strVal.substr(3, -4)) // ''(空字符串)
```
:::
:::warning 提醒
:warning:IE 的JavaScript实现在处理向`substr()`方法传递负值的情况时存在问题，它会返回原始的字符串。IE9 修复了这个问题
:::
> `substring()`方法会把第二个参数转换为 0，使调用变成了 `substring(3, 0)`，而由于这个方法会将较小的数作为开始位置，将较大的数作为结束位置，因此最终相当于调用了`substring(0, 3)`

#### 3. 字符串位置方法
>- `indexOf()、lastIndexOf()`：找到第一个匹配项后不再进行匹配
>- 这两个方法都可以接收可选的第二个参数，表示从字符串的哪个位置开始搜索
```js
var strVal = 'hello world'
alert(strVal.indexOf('o', 6)) // 7
alert(strVal.lastIndexOf('o', 6)) // 4
```

```js
var strVal = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
var poss = []
var pos = strVal.indexOf('e')
while(pos > -1) {
  poss.push(pos)
  pos = strVal.indexOf('e', pos + 1)
}
alert(poss) // '3, 24, 32, 35, 52'
```

#### 6. 字符串的模式匹配方法
>- `match()`方法，在字符串上调用这个方法，本质上与调用`RegExp 的 exec()`方法相同。`match()`方法只接受一个参数，要么是一个正则表达式，要么是一个`RegExp`对象
>- 另一个用于查找模式的方法是`search()`。这个方法的唯一参数与`match()`方法的参数相同：由字符串或`RegExp`对象指定的一个正则表达式。`search()`方法返回字符串中`第一个匹配项的索引`，如果没有找到匹配项则返回 `-1`
>- 为了简化替代子字符串的操作，ES 提供了`replace()`方法。这个方法接受两个参数：第一个参数可以是一个`RegExp`对象或者一个字符串（这个字符串不会被转换成正则表达式），第二个参数可以是一个字符串或者一个函数。如果第一个参数是字符串，那么只会替换第一个子字符串。要想替换所有子字符串，唯一的做法就是提供一个正则表达式，而且要`指定全局（g）标志`
```js
var text = 'cat, bat, sat, fat'
var pattern = /.at/

// 与 pattern.exec(text) 相同
var matches = text.match(pattern)
alert(matches.index) // 0
alert(matches[0]) // 'cat'
alert(pattern.lastIndex) // 0

var pos = text.search(/at/)
alert(pos) // 1

var res = text.replace('at', 'ond')
alert(res) // 'cond, bat, sat, fat'
res = text.replace(/at/g, 'ond')
alert(res) // 'cond, bond, sond, fond'
```
>- 本例中的`match()`方法返回了一个数组；如果是调用`RegExp`对象的`exec()`方法并传递本例中的字符串作为参数，那么也会得到于此相同的数组：数组的第一项是与整个模式匹配的字符串，之后的每一项（如果有）保存着与正则表达式中的捕获组匹配的字符串

>- 如果第二个参数是字符串，那么还可以使用一些特殊的字符序列，将正则表达式操作得到的值插入到结果字符串中
>- `replace()`方法的第二个参数也可以是一个函数。在只有一个匹配项（即与模式匹配的字符串）的情况下，会向这个函数传递3个参数：`模式的匹配项、模式匹配项在字符串中的位置、原始字符串`。在正则表达式中定义了多个捕获组的情况下，传递给函数的参数一次是`模式的匹配项、第一个捕获组的匹配项、第二个捕获组的匹配项......`，但`最后两个参数仍然分别是模式的匹配项在字符串中的位置和原始字符串`。`这个函数应该返回一个字符串，表示应该被替代的匹配项`。使用函数作为`replace()`方法的第二个参数可以实现更加精细的替换操作
![image](/strmspp.jpg)
```js
var text = 'cat, bat, sat, fat'
res = text.replace(/(.at)/g, 'word {$1}')
alert(res) // word (cat)，word (bat)，word (sat)，word (fat)，
```
>- 最后一个与模式匹配有关的方式是`split()`，这个方法可以基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放到一个数组里。分隔符可以是`字符串`、也可以是`RegExp`对象（这个方法不会将字符串看成是正则表达式）。`split()`方法可以接受可选的第二个参数，用于指定数组的大小，以便确保返回的数组不会超过既定大小
```js
var colorText = 'red,blue,green,yellow'
var cols1 = colorText.split(',') // ['red','blue','green','yellow']
var cols2 = colorText.split(',', 2) // ['red','blue']
var cols3 = colorText.split(/[^\,]+/) // ['', ',', ',', ',', '']
```
:::warning 提醒
:warning:对`split()`中正则表达式的支持因浏览器而异。尽管对于简单的模式没有什么区别，但对于未发现匹配项以及带有捕获组的模式，匹配的行为就大不相同了<br>
+ IE8 及之前版本会忽略捕获组。 ECMA-262 规定应该把捕获组拼接到结果数组中。IE9 能正确地在结果中包含捕获组
+ Firefox 3.6 及版本在捕获组未找到匹配项时，会在结果数组中包含字符串；ECMA-262 规定没有匹配项的捕获组在结果数组中应该用`undefined`表示
:::

#### 7. localeCompare()方法
:::tip 介绍
:tada:与操作字符串有关的最后一个方法是`localeCompare()`，这个方法比较两个字符串，并返回下列值得一个：
- 如果字符串在字母表中应该排在字符串参数之前，则返回一个负数（大多数情况下是 -1，具体的值要视实现而定）
- 如果字符串等于字符串参数，则返回 0
- 如果字符串在字母表中应该排在字符串参数之后，则返回一个正数（大多数情况下是 1，具体的值要视实现而定）
```js
var strVal = 'yellow'
alert(strVal.localeCompare('brick')) // 1 ( > 0 )
alert(strVal.localeCompare('yellow')) // 0 ( = 0 )
alert(strVal.localeCompare('zoo')) // -1 ( < 0 )
```
:::
>- `localeCompare()` 方法比较与众不同的地方，就是实现所支持的地区（国家和语言）决定了这个方法的行为。比如 美国 以英文作为 ES 实现的标准语言，因此 `localeCompare()`就是区分大小写的，于是大写字母在字母表中排在小写字母前头就成了一项决定性的比较规则。不过在其他地区恐怕就不是这种情况了

#### 8. fromCharCode()方法
:::tip 介绍
:tada:`String`构造函数本身还有一个静态方法：fromCharCode()。这个方法的任务是接收一或多个字符编码，然后将他们转换成一个字符串。这个方法和实例方法 `charCodeAt()`执行的是相反的操作
```js
alert(String.fromCharCode(104, 101, 108, 108, 111)) // 'hello'
```
:::

## 5.7 单体内置对象
### 5.7.1 Global对象
#### 1. URI编码方法
>- 所有在全局作用域中定义的属性和和函数，都是 `Global`对象的属性
>- Global 对象的`encodeURI()`和`encodeURIComponent()`方法可以对`URI（Uniform Resource Identifiers，通用资源标识符）`进行编码，以便发送给浏览器。有效的`URI`中不能包含某些字符，例如空格。而这两个编码方法就可以对`URI`进行编码，它们用特殊的`UTF-8`编码替换所有无效的字符，从而让浏览器能够接受和理解
>- `encodeURI()`主要用于整个`URI`，而`encodeURIComponent()`主要用于对`URI`中的某一段进行编码。它们的主要区别在于，`encodeURI()`不会对本身属于`URI`的特殊字符进行编码，例如冒号、正斜杠、问号和井字号；而`encodeURIComponent()`则会对它发现的任何非标准字符进行编码
>- 与`encodeURI()`和`encodeURIComponent()`方法对应的两个方法分别是`decodeURI()`和`decodeURIComponent()`。其中，`decodeURI()`只能对使用`encodeURI()`替换的字符进行解码。同样的，`decodeURIComponent()`能够解码使用`encodeURIComponent()`编码的所有字符，即它可以解码任何特殊字符的编码
```js
var uri = 'http://www.meetou.cn/illegal value.html#start'
alert(encodeURI(uri)) // 'http://www.meetou.cn/illegal%20value.html#start'
alert(encodeURIComponent(uri)) // 'http%3A%2F%2Fwww.meetou.cn%2Fillegal%20value.html%23start'

var uri2 = 'http%3A%2F%2Fwww.meetou.cn%2Fillegal%20value.html%23start'
alert(decodeURI(uri2)) // 'http%3A%2F%2Fwww.meetou.cn%2Fillegal value.html%23start'
alert(decodeURIComponent(uri2)) // 'http://www.meetou.cn/illegal value.html#start'
```
:::warning 提示
:warning:URI 方法`encodeURI、encodeURIComponent、decodeURI、decodeURIComponent`用于替代已经被 ECMA-262 第三版废弃的`escape()`和`unescape()`方法。<br>
:warning:URI 方法能够编码所有 Unicode 字符，而原来的方法只能正确地编码 ASCII 字符。
:::

#### 2. eval()方法
>- ES 语言中最强大的一个方法：`eval()`，`eval()`方法就像是一个完整的 ES 解析器，它只接受一个参数，即要执行的 ES(或JS)字符串
```js
eval('alert("hi")')
// 等价于: 
alert('hi')
```
>- 当解析器发现代码中调用`eval()`方法时，它会将传入的参数当作实际的 ES 语句来解析，然后把执行结果插入到原位置。通过`eval()`执行的代码被认为是包含该次调用的执行环境的一部分，因此<Important text='被执行的代码具有与该执行环境相同的作用域链'/>，这意味着通过`eval()`执行的代码可以引用在包含环境中定义的变量
```js
var msg = 'hello world'
eval('alert(msg)') // 'hello world'
```
>- 可见，变量msg是在`eval()`调用的环境之外定义的，但其中调用的`alert()`仍然能够显示`'hello world'`。这是因为上面第二行代码最终被替换成了一行真正的代码。同样的，我们也可以在`eval()`调用中定义一个函数，然后再在该调用的外部代码中引用这个函数
```js
eval('function sayHi () { alert("hi") }')
sayHi() // 'Hi'

eval('var msg = "hello world!"')
alert(msg) // 'hello world'
```
>- 在`eval()`中创建的任何变量或函数都不会被提升，因为在解析代码的时候，他们被包含在一个字符串中；它们只在`eval()`执行的时候创建
>- 严格模式下，在外部访问不到`eval()`中创建的任何变量和函数，因此前面两个例子都会导致错误。同样，在严格模式下，为`eval`赋值也会导致错误
```js
'use strict'
eval = 'hi' // causes error
```

#### 3. Global对象的属性
:::warning 提醒
:warning: ES5 明确禁止给`undefined、NaN、Infinity`赋值，这样做即使在非严格模式下也会导致错误
:::

:::tip Global对象的全部属性
<br>

![image](/global.jpg)
:::

#### 4. window对象
>- ES 虽然没有指出如何直接访问 Global 对象，但web浏览器都是将这个全局对象作为window对象的一部分加以实现。因此，在全局作用域中声明的所有变量和函数，就都成了window对象的属性了
```js
var color = 'red'

function sayColor () {
  alert(window.color)
}
window.sayColor() // 'red'

var global = function () {
  return this
}()
```
>- 以上代码创建了一个立即调用的函数表达式，返回`this`的值。在没有给函数明确指定`this`值得情况下（无论是通过将函数添加为对象的方法，还是通过调用`call()`或`apply()`），`this`值等于 Global 对象。而像这样简单地返回`this`来获取 Global 对象，在任何执行环境下都是可行的

### 5.7.2 Math对象
#### 1. Math对象的属性
:::tip Math对象的属性
<br>

![image](/mathobj_attr.jpg)
:::

#### 2. min()和max()方法
> `min()`和`max()`方法用于确定一组数值中的最小值和最大值。这两个方法可以接收任意多个数值参数

#### 3. 舍入方法
:::tip 舍入方法
:tada:`Math.ceil()`执行向上舍入，即它总是将数值向上舍入为最接近的整数<br>
:tada:`Math.floor()`执行向下舍入，即它总是将数值向下舍入为最接近的整数<br>
:tada:`Math.round()`执行标准舍入，即它总是将数值四舍五入为最接近的整数<br>
```js
alert(Math.ceil(25.9)) // 26
alert(Math.ceil(25.5)) // 26
alert(Math.ceil(25.1)) // 26

alert(Math.floor(25.9)) // 25
alert(Math.floor(25.5)) // 25
alert(Math.floor(25.1)) // 25

alert(Math.round(25.9)) // 26
alert(Math.round(25.5)) // 26
alert(Math.round(25.1)) // 25
```
:::

#### 4. random()方法
> Math.random()方法返回一个<Important text='大于等于0小于1'/>的一个随机数

#### 5. 其他方法
:::tip 其他方法
<br>

![image](/othmeth.jpg)
:::
