---
title: 状态模式
permalink: /design-patterns/2020/08/13/状态模式
---

# 状态模式
:::tip 状态模式
定义：当一个对象内在状态改变时允许其改变行为，这个对象看起来像改变了其类

优点：<br>
1. 代码有很强的可读性。状态模式将每个状态的行为封装到对应的一个类中<br>
2. 方便维护。将容易产生问题的if-else语句删除了，如果把每个状态的行为都放到一个类中，每次调用方法时都要判断当前是什么状态，不但会产出很多if-else语句，而且容易出错<br>
3. 符合开闭原则，容易增删状态

缺点：会产生很多类。每个状态都要一个对应的类，当状态过多会产生很多类，加大维护难度

应用场景：<br>
1. 行为随状态改变而改变的场景。当一个事件或者对象有很多中状态，状态之间会相互转换，对不同的状态要求有不同的行为的时候，可以考虑使用状态模式<br>
2. 条件、分支判断语句的替代者。在程序中大量使用switch语句或if判断语句会导致程序结构不清晰，使用状态模式，通过扩展子类实现了条件的判断处理

角色：<br>
      State【抽象状态角色】（接口或抽象类，负责对象状态定义，并且封装环境角色以实现状态切换）<br>
      ConcreteState【具体状态角色】（每一个具体状态必须完成两个职责：本状态的行为管理以及趋向状态处理）<br>
      Context【环境角色】（定义客户端需要的接口，并且负责具体状态的切换）
:::
```ts
abstract class State {
  public abstract handle1(): void
  public abstract handle2(): void
}

class ConcreteState1 extends State {
  private context: Context
  constructor(context: Context) {
    super()
    this.context = context
  }

  // 本状态下需要处理的逻辑
  public handle1(): void {
    console.log('State1的状态需要处理的逻辑')
  }

  // 进行状态转移
  public handle2(): void {
    this.context.currentState = this.context.STATE2
    console.log('由状态state1转为state2')
  }
}

class ConcreteState2 extends State {
  private context: Context
  constructor(context: Context) {
    super()
    this.context = context
  }

  // 本状态下需要处理的逻辑
  public handle1(): void {
    this.context.currentState = this.context.STATE1
    console.log('由状态state2转为state1')
  }
  
  // 进行状态转移
  public handle2(): void {
    console.log('State2的状态需要处理的逻辑')
  }
}

class Context {
  public STATE1: State = new ConcreteState1(this)
  public STATE2: State = new ConcreteState2(this)
  public currentState: State

  constructor() {
    this.currentState = this.STATE1
  }

  public doOperation1() {
    this.currentState?.handle2()
  }

  public doOperation2() {
    this.currentState?.handle1()
  }
}

;(function main() {
  const context: Context = new Context()
  context.doOperation1()
  context.doOperation2()
}())
```
