# 职责链模式
:::tip 职责链模式
定义：使多个对象都有机会处理请求，从而避免了请求的发送者和接收者之间的耦合关系。将这些对象连成一条链，并沿着这条链传递该请求，直到有对象处理它为止

优点：<br>
1. 将请求和处理分开，实现解耦，提高系统的灵活性<br>
2. 简化了对象，是对象不需要知道链的结构

缺点：<br>
1. 性能会受到影响，特别是在链比较长的时候，因此需要控制链中最大节点数量<br>
2. 调试不方便。采用了类似递归的方式，调试时逻辑可能比较复杂

应用场景：最佳应用场景：有多个对象可以处理同一个请求时，例如多级请求、请假审批流程、拦截器等

角色：<br>
      Handler【抽象的处理者】（定义了一个处理请求的接口，同时包含另外的Handler）<br>
      ConcreteHandler【具体的处理者】（处理它自己负责的请求，可以访问它的后继者`即下一个处理者`，如果可以处理当前请求，则处理，否则就将该请求交给后继者去处理，从而形成一个责任链）<br>
      Request【请求】（包含多个属性，表示一个请求）
:::
```ts
abstract class Handler {
  // 下一个处理者
  public successor ?: Handler
  public name: string
  constructor(name: string) {
    this.name = name
  }

  public abstract handleRequest(request: MyRequest): void

  public setNext(successor: Handler): void {
    this.successor = successor
  }
}

class ConcreteHandler1 extends Handler {
  constructor(name: string) {
    super(name)
  }

  public handleRequest(request: MyRequest): void {
    // 首先判断当前级别是否能够处理，不能够处理则交给下一级别处理
    if (request.level <= 1) {
      console.log('被一级处理')
    } else {
      // 交给下一级处理
      this.successor && this.successor.handleRequest(request)
    }
  }
}

class ConcreteHandler2 extends Handler {
  constructor(name: string) {
    super(name)
  }

  public handleRequest(request: MyRequest): void {
    // 首先判断当前级别是否能够处理，不能够处理则交给下一级别处理
    if (request.level > 1 && request.level <= 2) {
      console.log('被二级处理')
    } else {
      // 交给下一级处理
      this.successor && this.successor.handleRequest(request)
    }
  }
}

class ConcreteHandler3 extends Handler {
  constructor(name: string) {
    super(name)
  }

  public handleRequest(request: MyRequest): void {
    // 首先判断当前级别是否能够处理，不能够处理则交给下一级别处理
    if (request.level > 2) {
      console.log('被三级处理')
    } else {
      // 交给下一级处理
      this.successor && this.successor.handleRequest(request)
    }
  }
}

class MyRequest {
  private _level: number
  constructor(level: number) {
    this._level = level
  }

  get level(): number {
    return this._level
  }

  set level(value: number) {
    this._level = value
  }
}

;(function main() {
  // 创建一个请求
  const request: MyRequest = new MyRequest(5)

  // 创建相关处理人
  const handler1: Handler = new ConcreteHandler1('lili')
  const handler2: Handler = new ConcreteHandler2('linlin')
  const handler3: Handler = new ConcreteHandler3('shunshun')

  // 设置下级别审批，构成环形结构
  handler1.setNext(handler2)
  handler2.setNext(handler3)
  handler3.setNext(handler1)

  handler1.handleRequest(request)
}())
```
