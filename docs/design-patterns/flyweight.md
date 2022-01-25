---
title: 享元模式
permalink: /design-patterns/2020/08/11/享元模式
---

# 享元模式
:::tip 享元模式
定义：享元模式也叫蝇量模式，使用共享对象可有效地支持大量的细粒度的对象，是池技术的重要实现方式

扩展：<br>
1. 总：享元模式提出了两个要求：`细粒度和共享对象`。这里就涉及到内部状态和外部状态了，即将对象的信息分为两个部分：`内部状态和外部状态`<br>
2. 内部状态指对象共享出来的信息，存储在享元对象内部且不会随环境的改变而改变<br>
3. 外部状态指对象得以依赖的一个标记，是随环境改变而改变的、不可共享的状态

优点：享元模式大大减少了对象的创建，降低了程序内存的占用，提高效率

缺点：提高了系统复杂性，需要分离出外部状态和内部装填，而且外部状态具有固化特性，不应该随内部状态改变而改变，否则会导致系统的逻辑混乱

应用场景：<br>
1. 最典型的应用场景是需要缓存池的场景，比如String常量池、数据库连接池<br>
2. 系统中存在大量的相似对象<br>
3. 细粒度的对象都具备较接近的外部状态，而且内部状态与环境无关，也就是说对象没有特定身份

角色：<br>
      FlyWeight【抽象享元角色】（一个产品的抽象类，同时定义出对象的内部状态和外部状态的接口或实现）<br>
      ConcreteFlyweight【具体享元角色】（具体的一个产品类，实现抽象角色定义的业务）<br>
      unsharedConcreteFlyweight【不可共享的享元角色】（该对象一般不会出现在享元工厂中）<br>
      FlyweightFactory【享元工厂】（用于构建一个池容器[集合]，同时提供从池中获取对象方法）
:::
```ts
abstract class Flyweight {
  public abstract doOperation(extrinsicState: string): void
}

class ConcreteFlyweight extends Flyweight {
  private intrinsicState: string
  constructor(intrinsicState: string) {
    super()
    this.intrinsicState = intrinsicState
  }

  public doOperation(extrinsicState: string): void {
    console.log(`这是具体享元角色，内部状态为${this.intrinsicState}，外部状态为${extrinsicState}`)
  }
}

interface flyweightObject {
  [key: string]: Flyweight
}

class FlyweightFactory {
  private flyweights: flyweightObject
  constructor() {
    this.flyweights = {}
  }

  public getFlyweight(intrinsicState: string): Flyweight {
    if (!this.flyweights[intrinsicState]) {
      const flyweight: Flyweight = new ConcreteFlyweight(intrinsicState)
      this.flyweights[intrinsicState] = flyweight
    }

    return this.flyweights[intrinsicState]
  }
}

;(function main() {
  const factory: FlyweightFactory = new FlyweightFactory()
  const flyweight1: Flyweight = factory.getFlyweight('aa')
  const flyweight2: Flyweight = factory.getFlyweight('bb')
  flyweight1.doOperation('x')
  flyweight2.doOperation('y')
}())
```
