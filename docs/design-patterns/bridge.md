---
title: 桥接模式
permalink: /design-patterns/2020/08/11/桥接模式
---

# 桥接模式
:::tip 桥接模式
定义：将实现与抽象放在两个不同的层次中，使得两者可以独立地变化。（最主要的是将实现和抽象两个层次划分开来）

优点：实现了抽象和实现部分的分离，提高了系统的灵活性；替代了多层继承方案，减少了子类的个数

缺点：增加了系统的理解和设计模式；要求正确识别出系统中两个独立变化的维度，适用范围有一定限制性

应用场景：不希望使用继承或因为多层继承导致类爆炸的系统；JDBC驱动程序、银行转帐系统（转账分类和转账用户类型）、消息管理（消息类型、消息分类）

角色：<br>
      Abstraction（抽象类，充当桥接类，主要职责是定义出该角色的行为，同时保存一个对实现化角色的引用）<br>
      RefinedAbstraction（是Abstraction抽象类的子类）<br>
      Implementor【实现角色】（行为实现化的接口）<br>
      ConcreteImplementor【具体实现化角色】（行为的具体实现类）
:::
```ts
// 实现接口角色
interface Implementor {
  doSomething(): void
  doAnything(): void
}

// 具体实现角色
class ConcreteImplementor1 implements Implementor {
  public doSomething(): void {}
  public doAnything(): void {}
}
class ConcreteImplementor2 implements Implementor {
  public doSomething(): void {}
  public doAnything(): void {}
}

// 抽象类
abstract class Abstraction {
  private imp: Implementor
  constructor(imp: Implementor) {
    this.imp = imp
  }

  // 自身的行为和属性
  public request(): void {
    console.log('emmm')
    this.imp.doSomething()
  }
}

// 具体抽象化角色
class RefinedAbstraction extends Abstraction {
  constructor(imp: Implementor) {
    super(imp)
  }

  public request(): void {
    // 业务处理
    console.log('hhhhhh')
    super.request()
  }
}

// 定义一个实现化角色
const imp: Implementor = new ConcreteImplementor1()
// 定义一个抽象化角色
const abs: Abstraction = new RefinedAbstraction(imp)
// 执行上下文
abs.request()
```
