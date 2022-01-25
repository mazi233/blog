---
title: 备忘录模式
permalink: /design-patterns/2020/08/13/备忘录模式
---

# 备忘录模式
:::tip 备忘录模式
定义：在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样以后就可以将该对象恢复到原来保存的状态

优点：<br>
1. 给用户提供了一种可以恢复状态的机制，可以使用户能够比较方便地回到某个历史的状态<br>
2. 实现了信息的封装，使得用户不需要关心状态的保存细节

缺点：如果类的成员变量过多，势必会占用比较大的资源，而且每一次保存都会消耗一定的内存，这个需要注意

应用场景：<br>
1. 需要保存和恢复数据的相关状态场景，例如Word中`CTRL+Z`组合键，IE浏览器中的后退按钮，文件管理器上的backspace键等<br>
2. 需要监控的副本场景中<br>
3. 数据库连接的事务管理就是用的备忘录模式

角色：<br>
      Originator【发起人角色】（记录当前时刻的内部状态，负责定义哪些属于备份范围的状态，负责创建和恢复备忘录数据）<br>
      ConcreteMediator【具体中介者角色】（通过协调各同事角色实现协作作用）<br>
      Memento【备忘录角色】（负责存储Originator发起人对象的内部状态，在需要的时候提供发起人需要的内部状态）<br>
      Caretaker【守护者角色】（负责保存多个备忘录对象，使用集合管理，提高效率）
:::
```ts
class Originator {
  private _state: string = ''

  constructor() {}

  get state() {
    return this._state
  }

  set state(value) {
    this._state = value
  }

  // 创建一个备忘录
  public createMemento(): Memento {
    console.log('创建了一个备忘录!')
    return new Memento(this._state)
  }

  // 恢复一个备忘录
  public recoverMemento(memento: Memento) {
    console.log('恢复了一个备忘录!')
    this.state = memento.state
  }
}

class Memento {
  private _state: string
  constructor(state: string) {
    this._state = state
  }

  get state(): string {
    return this._state
  }
}

class Caretaker {
  // 保存一次状态在此，保存多次用数组
  private memento ?: Memento

  public getMemento(): Memento | undefined {
    return this.memento
  }

  public setMemento(memento: Memento): void {
    this.memento = memento
  }
}

;(function main() {
  // 定义发起人
  const originator: Originator = new Originator()
  // 定义守护者
  const caretaker: Caretaker = new Caretaker()
  // 创建一个备忘录
  const memento: Memento = originator.createMemento()
  // 将备忘录存储到守护者
  caretaker.setMemento(memento)
  // 恢复一个备忘录
  originator.recoverMemento(memento)
}())
```
