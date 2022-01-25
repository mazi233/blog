# 函数式编程

## 部分函子
```js
// const fs = require('fs')

class Functor {
  constructor(val) {
    this.val = val
  }

	static of(val) {
    return new Functor(val)
  }

  map(f) {
    return new Functor(f(this.val))
  }
}

class Maybe extends Functor {
  static of(val) {
    return new Maybe(val)
  }

  map(f) {
    return this.val ? Maybe.of(f(this.val)) : Maybe.of(null)
  }
}

class Either extends Functor {
  constructor(left, right) {
    super()
    this.left = left
    this.right = right
  }

  static of(left, right) {
    return new Either(left, right)
  }

  map(f) {
    return this.right ?
      Either.of(this.left, f(this.right)) :
      Either.of(f(this.left), this.right)
  }
}

class Ap extends Functor {
  constructor(val) {
    super()
    this.val = val
  }

  static of(val) {
    return new Ap(val)
  }

  ap(F) {
    return Ap.of(this.val(F.val))
  }
}

class Monad extends Functor {
  join() {
    return this.val
  }

  map(f) {
    return new Monad(f(this.val()))
  }

  // 调用map执行一遍再包一层扔出来
  flatMap(f) {
    return this.map(f).join()
  }
}

// mock
const readFile = function() {
  return new Monad(function() {
    // mock
    return '我是你爸爸。'
    // return fs.readFileSync(filename, 'utf-8')
  })
}

// const readFile = function(filename) {
//   return new Monad(function() {
//     return fs.readFileSync(filename, 'utf-8')
//   })
// }

const tail = function(x) {
  return new Monad(function() {
    return x.substring(0, x.length - 1)
  })
}

const print = function(x) {
  return new Monad(function() {
    console.log(x)
    return x
  })
}

const content = readFile()
  .flatMap(tail)
  .flatMap(print)
  .val()

// const content = readFile('./user.txt')
//   .flatMap(tail)
//   .flatMap(print)
//   .val()

console.log(content)
```