# 3. 基本概念
## 3.1 语法
### 3.1.4 严格模式
```js
// 全局
'use strict'

// 函数内
function do() {
  'use strict'
}
```

## 3.2 关键字和保留字
在ES3的js引擎中使用关键字作标识符，会导致 `"Identifier Expected"错误`，而使用保留字则不会出现相同的错误

在ES5中，关键字和保留字仍不能用作标识符，但是可以作为对象的属性名

在`ES5严格模式`下，`eval`和`arguments`也不能作为标识符或属性名，否则会抛出错误

## 3.4 数据类型
### 3.4.5 Number类型
#### 2. 数值范围
如果某次计算返回了正或负的Infinity值，那么该值将无法继续参与下一次的计算，因为Infinity不是能够参与计算的数值

#### 3. NaN
NaN，即非数值（Not a Number）是一个特殊的数值，这个数值用于表示一个本来要返回数值的操作数未返回数值的情况

NaN本身有两个非同寻常的特点
1. 任何涉及到 NaN 的操作都会返回 NaN
2. NaN 与任何值都不想等，包括 NaN 本身

:::tip
isNaN()也适用于对象。在基于对象调用isNaN()函数时，会首先调用对象的valueOf()方法，然后确定该方法返回的值是否可以转换为数值。如果不能，则基于这个返回值再调用toString()方法，再测试返回值
:::

#### 4. 数值转换
Number()函数的转换规则
- 如果是 Boolean 值，true 和 false 将分别转换成 1 和 0
- 如果是数值，只做简单传入返回
- 如果是 null 值， 返回 0
- 如果是 undefined，返回 NaN
- 如果是字符串
- - 如果字符串中`只包含数字（包括前面带正号和负号的情况）`，则将其转换为`十进制数值`
- - 如果字符串中`包含有效的浮点格式`，则将其转换为对应的`浮点数`
- - 如果字符串中`包含有效的十六进制格式`，则将其转换为`相同大小的十进制整数值`
- - 如果字符串是`空的`，则将其转换为`0`
- - 如果字符串中`包含除以上格式除外的字符`，则将其转换为`NaN`
- 如果是 对象，则调用对象的`valueOf`方法，然后按照上面的规则转换返回的值。如果转换的结果是 NaN，则调用对象的`toString`方法，然后再次按照上面的规则转换返回的值

`parseInt`会忽略字符串前面的空格，直至找到`第一个非空格字符`。如果`第一个字符不是数字字符或者负号`，parseInt 就会返回 NaN

`parseInt`转换空字符串会返回 NaN（Number()对空字符串返回0）。如果第一个字符是数字字符，parseInt会继续解析第二个字符，`直到解析完所有后续字符或遇到一个非数字字符`

如果字符串中的第一个字符是数字字符，parseInt也能识别出各种整数格式

在使用 parseInt 解析像八进制字面量的字符串时，ES5 和 ES3 存在分歧

在ES3中，"070"被当成八进制解析，转换成十进制的56，在ES5中parseInt已经不具备解析八进制的能力，因此前导0会被忽略，转换成十进制的70

为了消除困惑，parseInt可以提供第二个参数，表示转换时要使用的基数（进制数）
```js
var num = parseInt('0xAF', 16) // 175
```

`parseFloat`也是从第一个字符开始解析每个字符。而且也是一直解析到字符串末尾，或者解析到`遇到一个无效的浮点数数字字符`为止

如果字符串包含的是一个可解析为整数的数（没有小数点，或者小数点后都是零），parseFloat会返回整数

### 3.4.6 String类型
#### 2. 字符串的特点
:::tip
ES中的字符串是不可变的
:::

#### 3. 转换成字符串
> null 和 undefined 值没有 toString() 方法

String() 转换遵循以下规则
- 如果值有 toString() 方法，则调用该方法（没有参数）并返回相应的结果
- 如果值是 null，则返回 "null"
- 如果值是 undefined，则返回 "undefined"

### 3.4.7 Object类型
```js
var o = new Object()

var o = new Object // 有效，但不推荐省略圆括号
```
这个语法在ES中如果不给构造函数传递参数，则可以忽略后面的那一对括号

Object 的每个实例都具有下列属性和方法
- constructor：保存着用于创建当前对象的函数（上面例子构造函数(constructor)就是 Object()）
- hasOwnProperty(propertyName)：用于检查给定的属性在当前对象实例中（而不是在实例的原型中）是否存在。propertyName必须以字符串的形式指定
- isPropertypeOf(object)：用于检查传入的对象是否是当前对象的原型
- propertyIsEnumerable(propertyName)：用于检查给定的额属性是否能够使用for-in语句来枚举
- toLocaleString()：返回对象的字符串表示，该字符串与执行环境的地区对应
- toString()：返回对象的字符串表示
- valueOf()：返回对象的字符串、数值或布尔值表示。通常与`toString()`方法的返回值相同

## 3.5 操作符

### 3.5.1 一元运算符
#### 1. 递增和递减操作符
运用于不同值的递增和递减操作遵循以下规则
- 在应用于一个包含有效数字字符的字符串时，先将其转换成数字值，再执行加减1的操作。字符串变量变成数值变量
- 在应用于一个不包含有效数字字符的字符串时，将变量的值设置为 NaN，字符串变量变成数值变量
- 在应用于布尔值 false 时，先将其转换成 0 再执行加减 1 的操作。布尔值变量变成数值变量
- 在应用于布尔值 true 时，先将其转换成 1 再执行加减 1 的操作。布尔值变量变成数值变量
- 在应用于浮点数值时，执行加减 1 的操作
- 在应用于对象时，先调用对象的 valueOf() 方法以取得一个可供操作的值。然后对该值应用前述规则。如果转换结果为 NaN，则在调用 toString() 方法后在应用前述规则。对象变量变成数值变量

#### 2. 一元加和减操作符
在对`非数值`应用一元加操作符时，该操作符会像`Number()`转换函数一样对这个值执行转换
当应用于`非数值`时，一元减操作符遵循与一元加操作符相同的规则，最后再将得到的数值转换成负数

### 3.5.2 位操作符
ES中的所有数值都以`IEEE-754 64位`格式存储，但位操作符`并不直接操作 64 值的数`。而是先将 64位的值转换成 32位的整数，然后执行操作，最后再将结果转换回 64位

:::tip
负数同样以二进制编码存储，但使用的格式是 `二进制补码`
:::

计算一个数值的二进制补码
1. 求这个数值绝对值的二进制码
2. 求二进制反码，即将 0 替换成 1，即将 1 替换成 0
3. 得到的二进制反码加 1

> 在处理有符号整数时，是`不能访问位31`的

:::warning
对特殊的`NaN`和`Infinity`值应用位操作时，这两个值都会被`当成0来处理`
:::

如果对`非数值`应用位操作符，会先使用`Number()`函数将该值转换为一个数值（自动完成），然后再应用位操作。得到的结果将是一个数值

#### 1. 按位非(NOT)
按位非操作符由一个波浪线（～）表示，执行按位非的结果就是返回数值的反码

:::tip
按位非操作的本质：操作数的负值减1
:::

#### 4. 按位异或(XOR)
按位异或操作在两个数值对应位上只有一个1时才返回1，如果对应的两位都是1或都是0，则返回0

#### 5. 左移(<<)
在向左移位后，原数值的右侧多出空位。左移操作会以0来填充这些空位
左移不会影响操作数的符号位。换言之，如果-2左移5位，结果将是-64，而非64

#### 6. 有符号右移(>>)
有符号右移会将数值向右移动，但保留符号位

#### 7. 无符号右移(>>>)
这个操作会将数值的所有32位都向右移动
无符号右移是以0来填充空位的

### 3.5.3 布尔操作符
#### 1. 逻辑非
逻辑非操作符首先会将它的操作数转换为一个布尔值，然后再对其求反
- 如果操作数是一个对象，返回false
- 如果操作数是一个空字符串，返回true
- 如果操作数是一个非空字符串，返回false
- 如果操作数是数值0，返回true
- 如果操作数是任意非0数值（包括Infinity），返回false
- 如果操作数是null，返回true
- 如果操作数是NaN，返回true
- 如果操作数是undefined，返回true

#### 2. 逻辑与
- 如果第一个操作数是对象，则返回第二个操作数
- 如果第二个操作数是对象，则只有在第一个操作数的求值结果为true的情况下才会返回该对象
- 如果两个操作数都是对象，则返回第二个操作数
- 如果第一个操作数是null，则返回null
- 如果第一个操作数为NaN，则返回NaN
- 如果第一个操作数为undefined，则返回undefined

#### 3. 逻辑或
- 如果第一个操作数是对象，则返回第一个操作数
- 如果第一个操作数求值结果为false，则返回第二个操作数
- 如果两个操作数都是对象，则返回第一个操作数
- 如果两个操作数都是null，则返回null
- 如果两个操作数都是NaN，则返回NaN
- 如果两个操作数都是undefined，则返回undefined

### 3.5.4 乘性操作符
#### 1. 乘法
- 如果操作数都是数值，执行常规的乘法计算，即两个正数或两个负数相乘的结果还是正数。如果乘积超过了ES数值的范围，则返回Infinity或-Infinity
- 如果有一个操作数是NaN，则结果是NaN
- 如果是Infinity与0相乘，则结果为NaN
- 如果是Infinity与非0数值相乘，则结果是Infinity或-Infinity
- 如果是Infinity与Infinity相乘，则结果是Infinity
- 如果有一个操作数不是数值，则在后台调用Number()将其转换为数值，然后在运用上述规则

#### 2. 除法
- 如果操作数都是数值，执行常规的除法计算，即两个正数或两个负数除法的结果还是正数。如果商超过了ES数值的范围，则返回Infinity或-Infinity
- 如果有一个操作数是NaN，则结果是NaN
- 如果是Infinity被Infinity除，则结果为NaN
- 如果是零被零除，则结果是NaN
- 如果是非零的有限数被零除，则结果是Infinity或-Infinity
- 如果是Infinity被任何非零数值除，则结果是Infinity或-Infinity
- 如果有一个操作数不是数值，则在后台调用Number()将其转换为数值，然后在运用上述规则

#### 3. 求模
- 如果操作数都是数值，执行常规的除法运算，返回除得的余数
- 如果被除数是无穷大值而除数是有限大的数值，则结果是NaN
- 如果被除数是有限大的数值而除数是零，则结果是NaN
- 如果是Infinity被Infinity除，则结果为NaN
- 如果被除数是有限大的数值而除数是无穷大的数值，而结果是被除数
- 如果被除数是零，则结果是零
- 如果有一个操作数不是数值，则在后台调用Number()将其转换为数值，然后在运用上述规则

### 3.5.5 加性操作符
> 1.加法
+ `操作数有一个是NaN，则结果为NaN`
+ `Infinity + Infinity => Infinity`
+ `-Infinity + -Infinity => -Infinity`
+ `Infinity + -Infinity => NaN`
+ `+0 + +0 => +0`
+ `-0 + -0 => -0`
+ `+0 + -0 => +0`
::: warning 提醒
:warning:如果有一个是字符串，则运用如下规则: <br>
`如果两个操作数都是字符串，则将第一个和第二个操作数连接起来.`<br>
`如果有一个操作数是字符串，则将另一个操作数转换为字符串，然后连接起来.`<br>

如果有一个是`对象、数值或布尔值`，则先调用他们的`toString()`方法取得相应的字符串值，然后在应用前面关于字符串的规则<br>

对于`undefined`和`null`，则分别调用`String()`函数并取得字符串`"undefined"`和`"null"`
:::

<br/>

> 2.减法
- `操作数有一个是NaN，则结果为NaN`
- `Infinity - Infinity => NaN`
- `-Infinity - -Infinity => NaN`
- `Infinity - -Infinity => Infinity`
- `-Infinity - Infinity => -Infinity`
- `+0 - +0 = +0`
- `-0 - 0 = -0`
- `-0 - -0 = +0`
::: warning 提醒
:warning:如果有一个操作数是`字符串、布尔值、null 或 undefined`，则先在后台调用`Number()`函数将其转换为数值，
然后再根据上面的规则执行计算。如果转换结果是`NaN`，则减法结果为NaN<br>

:warning:如果有一个操作数是`对象`，则调用对象的`valueOf()`方法以取得表示该对象的数值。如果得到的是NaN，则减法结果为NaN，如果对象`没有 valueOf()`方法，则调用其`toString()`方法并得到字符串转换为数值
:::

### 3.5.6 关系操作符
+ `如果两个操作数都是数值，则执行数值比较。`
+ `如果两个操作数都是字符串，则比较两个字符串对应的`<Important text="字符串编码值" />
+ `如果一个操作数都是数值，则将另一个操作数转换为一个数值，然后执行数值比较`
+ `如果一个操作数是对象，则先调用他的 valueOf() 方法，用得到的结果按前面的规则执行比较。如果没有valueOf() 方法，则调用 toString() 方法，并用得到的结果根据前面的规则进行比较`
+ `如果一个操作数是布尔值，则先将其指转换为数值，在进行比较`
::: warning 提醒
:warning:任何数和NaN比较，结果都是NaN
:::

### 3.5.7 相等操作符
1. 相等与不想等
  
    `== 和 != 都会发生类型转换`
    > - 如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值---`false` 转为 0， `true` 转为 1
    > - 如果一个操作数为字符串，另一个为数值，在比较相等性之前先将字符串转换为数值
    > - 如果一个操作数是对象，另一个不是，则调用对象的`valueOf()`方法，用得到的基本类型值按前面的规则比较
    
    `两个操作符进行比较时`
    > - `null`和`undefined` 是<Important text="相等的" />
    > - 要比较相等性之前，<Important text="不能" />将`null`和`undefined`<Important text="转换成其他任何值" />
    > - 如果有一个操作数是`NaN`，则相等操作符返回`false`，而不相等操作符返回`false`
    > <Important text="重要提示："/> 即使两个操作数都是NaN，则相等操作符也返回NaN。<Important text="因为 NaN 不等于 NaN" />
    > - 如果两个操作数都是对象，则比较他们是不是同一个对象。如果两个操作数都<Important text="指向同一个对象" />，则相等返回`true`，否则返回`false`

    |表达式             |值    |表达式             |值    |
    |:----------------:|:----:|:----------------:|:----:|
    |null == undefined | true |true == 1         |true  |
    |"NaN" == NaN      |false |true == 2         |false |
    |5 == NaN          |false |undefined == 0    |false |
    |NaN == NaN        |false |null == 0         |false |
    |NaN != NaN        |true  |"5" == 5          |true  |
    |false == 0        |true  |
2. 全等和不全等
    
    `=== 和 !== 不会发生类型转换`
    ::: tip 建议
    因为全等和不全等不会发生类型转换，所以建议在代码中尽量使用全等与不全等
    :::

### 3.5.8 条件操作符
```js
variable = boolean_expression ? true_value : false_value
```

### 3.5.9 赋值操作符
- 乘/赋值 ( <Important text="*=" /> )
- 除/赋值 ( <Important text="/=" /> )
- 模/赋值 ( <Important text="%=" /> )
- 加/赋值 ( <Important text="+=" /> )
- 减/赋值 ( <Important text="-=" /> )
- 左移/赋值 ( <Important text="<<=" /> )
- 有符号右移/赋值 ( <Important text=">>=" /> )
- 无符号右移/赋值 ( <Important text=">>>=" /> )

## 3.6 语句

### 3.6.5 for-in语句
> for-in 语句是一种精准的迭代语句，可以用来枚举对象的属性
:::warning 提醒
1. 如果表示要迭代的对象的变量值为 `null` 或 `undefined`，for-in 语句会抛出异常。ES5 更正了这一行为，对这种情况抛出错误，而是不执行循环体
2. 为了保证最大限度的兼容性，建议在使用 for-in 循环之前，先检查确认该对象的值不是 `null` 或 `undefined`
:::

### 3.6.6 label语句
> 使用 label 语句可以在代码中添加标签，以便将来使用。
```js
label: statement

// eg:
start: for(var i = 0; i < count; i++) {
  alert(i)
}
// start 标签可以在将来由 break 或 continue 语句引用。加标签的语句一般要与 for 语句等循环语句配合使用
```

### 3.6.7 break和continue语句
> `break` 和 `continue` 语句用于在循环中精确地控制代码的执行。<br>
> `break` 语句会立即退出循环后面的语句。而 `continue` 语句虽然也是立即退出循环，但退出循环后会从循环对的顶部继续执行

```js
// break & label
var sum = 0
outermost:
for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      break outermost;
    }
    num++
  }
}
alert(num) // 55

var sum = 0
outermost:
for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      continue outermost;
    }
    num++
  }
}
alert(num) // 95
```

### 3.6.8 with语句
> `with` 语句的作用是将代码的作用域设置到一个特定的对象中
```js
with (expression) statement;

var qs = location.search.querystring(1)
var hostName = location.hostName
var url = location.href

with (location) {
  var qs = search.querystring(1)
  var hostName = hostName
  var url = href
}
```
> 使用 `with` 语句关联了 location 对象，这意味着在 `with` 语句的代码块内部，每个变量首先被认为是一个局部变量，而如果在局部环境中找不到该变量的定义，就会查询location对象中是否有同名的属性，如果发现了同名属性，则以 location 对象属性的值作为变量的值
::: danger 警告
:exclamation:严格模式下不允许使用 `with` 语句，否则将视为语法错误<br>

:exclamation:由于大量使用 `with` 语句会导致性能下降，同时也会给调试代码造成困难，因此在开发大型应用时，不建议使用 with 语句
:::

### 3.6.9 switch语句
> + `switch` 可以用任何数据类型 (在很多其它语言中只能使用数值)<br>
> + 每个 `case` 的值不一定是常量，可以是变量，甚至是表达式
```js
switch ('hello world') {
  case 'hello' + ' world':
    alert('Greeting was found.')
    break;
  case 'goodbye':
    alert('Closing was found.')
    break;
  default:
    alert('Unexpected mesage was found.')
}

var sum = 25
switch (true) {
  case num < 0:
    alert('Less than 0.')
    break;
  case num >= 0 && num <= 10:
    alert('Between 0 and 10.')
    break;
  case num > 10 && num <= 20:
    alert('Between 10 and 20.')
    break;
  default:
    alert('More than 20.')
}
```
> <Important text='switch 语句在比较值时使用的是全等操作符，因此不会发生类型转换'/>


## 3.7 函数
```js
/* 执行完 return 语句后 停止 并 立即退出，位于 return 后面的任何代码都永远不会执行*/
function sum (num1, num2) {
  return num1 + num2
  alert('Hello world') // 永远不会执行
}
```
::: warning 提醒
- `return`语句也可以不带任何返回值，这种情况下，函数在停止执行后将返回 `undefined`，这种做法一般用在需要提前停止函数执行而又不需要返回值的情况下
```js
function sayHi (name, message) {
  return;
  alert('Hello ' + name + ',' + message) // 永远不会调用
}
```
- 严格模式对函数有一些限制:
    1. 不能把函数命名为`eval`或`arguments`
    2. 不能把参数命名为`eval`或`arguments`
    3. 不能出现两个命名参数同名的情况
    > 发生以上情况，就会导致语法错误，代码无法执行
:::

### 3.7.1 理解参数
> js 函数中不限制传递参数的多少，可以多传，也可以少传，因为它的参数是一个数组，即`arguments`对象
```js
function sayHi () {
  // arguments 对象是 参数的集合，它是一个类数组对象，非 Array 的实例
  alert('Hello ' + arguments[0] + ',' + arguments[1])
}
```
> `arguments`的值永远与对应命名参数的值保持一致
```js
function doAdd (num1, num2) {
  arguments[1] = 10
  alert(arguments[0] + num2)
}
```
:::warning 提醒
- arguments对象 和 命名参数 <Important text='并不是访问共同的内存空间'/>，他们的内存空间是独立的，但他们的值是同步的
- 如果只传入了一个参数，那么为 arguments[1] 设置的值将不会反映到命名参数中。这是因为 <Important text='arguments 对象的长度是由传入的参数个数决定的，不是由定义函数时的命名参数的个数决定的'/>
- 没有传递值的命名参数将自动被赋予 `undefined` 值，这就跟定义了变量但又没初始化一样

- 严格模式对如何使用`arguments`对象做了一些限制:
    1. 像前面那样即使把 arguments[1]设置为 10，num2 的值仍然还是 undefined
    2. 重写 arguments 的值会导致语法错误 (代码将不会执行)
:::
> <Important text='ES 中的所有参数传递的都是值，不可能通过引用传递参数'/>

### 3.7.2 没有重载
> ES 函数没有签名，因为其参数是由包含`零`或`多个`值的数组来表示的。而没有函数签名，真正的重载是不可能做到的
```js
function addSomeNumber (num) {
  return num + 100
}

function addSomeNumber (num) {
  return num + 200
}

var result = addSomeNumber(100) // 300
```
> 通过检查传入函数中参数的类型和数量并作出不同的反应，可以模仿方法的重载
