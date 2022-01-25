---
title: 中介者模式
permalink: /design-patterns/2020/08/13/中介者模式
---

# 中介者模式
:::tip 中介者模式
定义：用一个中介对象封装一系列的对象交互，中介者使各种对象不需要显式地相互作用，从而使其耦合松散，而且可以独立地改变他们之间的交互

优点：<br>
1. 多个类相互耦合，会形成网状结构，使用中介者模式将网状结构分离为星型结构，进行解耦<br>
2. 减少类间依赖，降低了耦合，符合迪米特法则

缺点：<br>
1. 中介者承担了较多的责任，一旦中介者出现了问题，整个系统就会受到影响<br>
2. 设计不当会使中介者对象本身变得过于复杂

应用场景：<br>
1. 适用于多个对象之间紧密耦合的情况（紧密耦合的标准是：在类图中出现了蜘蛛网状结构），这种情况要考虑中介者模式，将蜘蛛网梳理为星型结构<br>
2. 机场调度中心、MVC框架、媒体网关、中介服务等

角色：<br>
      Mediator【抽象中介者角色】（抽象中介者角色定义统一的接口，用于各同事角色之间的通信）<br>
      ConcreteMediator【具体中介者角色】（通过协调各同事角色实现协作作用）<br>
      Colleague【抽象同事角色】<br>
      ConcreteColleague【具体同事角色】（每个同事只知道自己的行为，与其他同事角色通信的时候一定要通过中介者角色协作）
:::
```ts
abstract class Colleague {
  public abstract onEvent(envetType: string): void
}

class ConcreteColleagueA extends Colleague {
  private mediator: Mediator

  constructor(mediator: Mediator) {
    super()
    this.mediator = mediator
  }

  public onEvent(eventType: string): void {
    this.mediator.doEvent(eventType)
  }

  public doSomething(): void {
    console.log('A被运行了')
  }
}

class ConcreteColleagueB extends Colleague {
  private mediator: Mediator

  constructor(mediator: Mediator) {
    super()
    this.mediator = mediator
  }

  public onEvent(eventType: string): void {
    this.mediator.doEvent(eventType)
  }

  public doSomething(): void {
    console.log('B被运行了')
  }
}

abstract class Mediator {
  protected _colleagueA ?: ConcreteColleagueA
  protected _colleagueB ?: ConcreteColleagueB

  set colleagueA(colleagueA: ConcreteColleagueA) {
    this._colleagueA = colleagueA
  }

  set colleagueB(colleagueB: ConcreteColleagueB) {
    this._colleagueB = colleagueB
  }

  public abstract doEvent(eventType: string): void
}

class ConcreteMediator extends Mediator {
  // 1. 根据得到的消息，完成对应任务
  // 2. 中介者在这个方法，协调各个具体的同事对象，完成任务
  public doEvent(eventType: string): void {
    switch (eventType) {
      case 'A': {
        this.doColleagueAEvent()
        break
      }
      case 'B': {
        this.doColleagueBEvent()
        break
      }
      default: {}
    }
  }

  // 相应业务逻辑
  public doColleagueAEvent(): void {
    super._colleagueA && super._colleagueA.doSomething()
    super._colleagueB && super._colleagueB.doSomething()
    console.log('A-B执行完毕')
  }
  public doColleagueBEvent(): void {
    super._colleagueB && super._colleagueB.doSomething()
    super._colleagueA && super._colleagueA.doSomething()
    console.log('B-A执行完毕')
  }
}

;(function main() {
  const mediator: Mediator = new ConcreteMediator()
  const myColleagueA: ConcreteColleagueA = new ConcreteColleagueA(mediator)
  const myColleagueB: ConcreteColleagueB = new ConcreteColleagueB(mediator)
  mediator.colleagueA = myColleagueA
  mediator.colleagueB = myColleagueB

  myColleagueA.onEvent('A')
  myColleagueB.onEvent('B')
}())
```
