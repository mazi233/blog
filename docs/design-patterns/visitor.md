---
title: 访问者模式
permalink: /design-patterns/2020/08/12/访问者模式
---

# 访问者模式
:::tip 访问者模式
定义：封装一些作用于某些数据结构中的各元素的操作，它可以在不改变数据结构的前提下定义作用于这些元素的新的操作。（主要将数据结构于数据操作分离，解决数据结构和操作耦合性问题）

优点：<br>
1. 访问者模式符合单一职责原则、让程序具有优秀的扩展性、灵活性非常高<br>
2. 访问者模式可以对功能进行统一，可以做报表、UI、拦截器与过滤器，适用于数据结构相对稳定的系统

缺点：<br>
1. 具体元素对访问者公布细节，也就是说访问者关注了其他类的内部细节，这是迪米特法则所不建议的，这样造成了具体元素变更比较困难<br>
2. 违背了依赖倒转原则。访问者依赖的是具体元素，而不是抽象元素<br>
3. 因此，如果一个系统有比较稳定的数据结构，又有经常变化的功能需求，那么访问者模式就是比较合适的

应用场景：访问者模式主要应用场景是：需要对一个对象结构中的对象进行很多不同操作（这些操作彼此没有关联），同时需要避免让这些操作 “污染” 这些对象的类，可以选择访问者模式解决。

角色：<br>
      Visitor【抽象访问者】（抽象类或接口，声明访问者可以访问哪些元素。为该对象结构中的ConcreteElement的每一个类声明一个visit操作）<br>
      ConcreteVisitor【具体访问者】（实现每个有Visitor声明的操作，是每个操作实现的部分）<br>
      Element【抽象元素】（接口或抽象类，定一个accept方法，接收一个访问者对象）<br>
      ConcreteElement【具体元素】（实现了accept方法）<br>
      ObjectStruture【结构对象】（是一个包含元素角色的容器，提供让访问者对象遍历容器中的所有元素的方法）
:::
```ts
abstract class AbstractElement {
  // 定义业务逻辑
  public abstract doSomething(): void
  // 允许谁来访问
  public abstract accept(visitor: Visitor): void
}

class ConcreteElement1 extends AbstractElement {
  public doSomething(): void {
    console.log('ConcreteElement1执行的业务逻辑')
  }

  public accept(visitor: Visitor): void {
    visitor.visit1(this)
  }
}

class ConcreteElement2 extends AbstractElement {
  public doSomething(): void {
    console.log('ConcreteElement2执行的业务逻辑')
  }

  public accept(visitor: Visitor): void {
    visitor.visit2(this)
  }
}

abstract class Visitor {
  public abstract visit1(element1: ConcreteElement1): void
  public abstract visit2(element2: ConcreteElement2): void
}

class ConcreteVisitor extends Visitor {
  public visit1(element1: ConcreteElement1): void {
    console.log('进入处理element1')
    element1.doSomething()
  }

  public visit2(element2: ConcreteElement2): void {
    console.log('进入处理element2')
    element2.doSomething()
  }
}

// 数据结构，管理很多元素（ConcreteElement1， ConcreteElement2）
class ObjectStructure {
  private listSet: Set<AbstractElement>
  constructor() {
    this.listSet = new Set()
  }

  // 增加
  public attach(element: AbstractElement): void {
    this.listSet.add(element)
  }

  // 删除
  public detach(element: AbstractElement): void {
    this.listSet.delete(element)
  }

  // 显示
  public display(visitor: Visitor): void {
    for (let element of this.listSet.values()) {
      element.accept(visitor)
    }
  }
}

;(function main() {
  const objectStructure: ObjectStructure = new ObjectStructure()
  objectStructure.attach(new ConcreteElement1())
  objectStructure.attach(new ConcreteElement2())
  objectStructure.detach(new ConcreteElement2())

  const visitor: Visitor = new ConcreteVisitor()

  objectStructure.display(visitor)
})()
```
