---
title: 观察者模式
permalink: /design-patterns/2020/08/13/观察者模式
---

# 观察者模式
:::tip 观察者模式
定义：定义对象间一种一对多的依赖关系，当一个对象改变状态，则所有依赖于它的对象都会得到通知并被自动更新

优点：<br>
1. 在被观察者和观察者之间建立一个抽象的耦合<br>
2. 观察者模式支持广播通讯，被观察者会向所有的登记过的观察者发出通知

缺点：观察者模式需要考虑一下开发效率和运行效率，一个被观察者，多个观察者，开发和调试就会比较复杂

应用场景：<br>
1. 对一个对象状态的更新，需要其他对象的同步更新，而且其他对象的数量动态可变<br>
2. 对象仅需要将自己的更新通知给其他对象而不需要知道其他对象的细节

角色：<br>
      Subject【被观察者】（定义被观察者实现的职责，用于管理观察者并通知观察者）<br>
      Observer【观察者】（观察者收到消息后进行update操作）<br>
      ConcreteSubject【具体的被观察者】（具体实现）<br>
      ConcreteObserver【具体的观察者】（具体实现）
:::

:::tip 与发布订阅模式区别
观察者模式存在问题：目标无法选择自己想要的消息发布，观察者会接收所有消息

发布订阅模式：发布/订阅模式在观察者模式的基础上，在目标和观察者之间增加一个调度中心。订阅者（观察者）把自己想要订阅的事件注册到调度中心，当该事件触发的时候，发布者（目标）发布该事件到调度中心，由调度中心统一调度订阅者注册到注册中心的处理代码

区别：观察者模式是由目标调度的，而发布/订阅模式是统一由调度中心调度的，所以观察模式的订阅者与发布者之间是存在依赖的，而发布/订阅模式则不会，所以发布订阅模式的组件是松散耦合的
:::

```ts
// 观察者模式
interface AbstractSubject {
  registerObserver(observer: Observer): void
  remove(observer: Observer): void
  notifyObservers(): void
}

class ConcreteSubject implements AbstractSubject {
  private observers: Array<Observer>

  constructor() {
    this.observers = []
  }

  public registerObserver(observer: Observer): void {
    this.observers.push(observer)
  }

  public remove(observer: Observer): void {
    const observerIndex = this.observers.findIndex(value => {
      return value === observer
    })

    observerIndex >= 0 && this.observers.splice(observerIndex, 1)
  }

  public notifyObservers(): void {
    this.observers.forEach(observer => observer.update())
  }
}

interface Observer {
  update(): void
}

class ConcreteObserver1 implements Observer {
  public update(): void {
    console.log('已经执行更新操作1，值为')
  }
}

class ConcreteObserver2 implements Observer {
  public update(): void {
    console.log('已经执行更新操作2，值为')
  }
}

;(function main() {
  const subject: AbstractSubject = new ConcreteSubject()
  const observer1: Observer = new ConcreteObserver1()
  const observer2: Observer = new ConcreteObserver2()

  subject.registerObserver(observer1)
  subject.registerObserver(observer2)

  subject.notifyObservers()
})()
```

```ts
// 发布订阅模式
interface Publish {
  registerObserver(eventType: string, subscribe: Subscribe): void
  remove(eventType: string,  subscribe?: Subscribe): void
  notifyObservers(eventType: string): void
}

interface SubscribesObject {
  [key: string]: Array<Subscribe>
}

class ConcretePublish implements Publish {
  private subscribes: SubscribesObject

  constructor() {
    this.subscribes = {}
  }

  registerObserver(eventType: string, subscribe: Subscribe): void {
    if (!this.subscribes[eventType]) {
      this.subscribes[eventType] = []
    }

    this.subscribes[eventType].push(subscribe)
  }

  remove(eventType: string, subscribe?: Subscribe): void {
    const subscribeArray = this.subscribes[eventType]
    if (subscribeArray) {
      if (!subscribe) {
        delete this.subscribes[eventType]
      } else {
        for (let i = 0; i < subscribeArray.length; i++) {
          if (subscribe === subscribeArray[i]) {
            subscribeArray.splice(i, 1)
          }
        }
      }
    }
  }

  notifyObservers(eventType: string, ...args: any[]): void {
    const subscribes = this.subscribes[eventType]
    if (subscribes) {
      subscribes.forEach(subscribe => subscribe.update(...args))
    }
  }
}

interface Subscribe {
  update(...value: any[]): void
}

class ConcreteSubscribe1 implements Subscribe {
  public update(...value: any[]): void {
    console.log('已经执行更新操作1，值为', ...value)
  }
}

class ConcreteSubscribe2 implements Subscribe {
  public update(...value: any[]): void {
    console.log('已经执行更新操作2，值为', ...value)
  }
}

;(function main() {
  const publish = new ConcretePublish()
  const subscribe1 = new ConcreteSubscribe1()
  const subscribe2 = new ConcreteSubscribe2()

  publish.registerObserver('1', subscribe1)
  publish.registerObserver('2', subscribe2)

  publish.notifyObservers('2', '2222222')
  publish.notifyObservers('1', '1111111')
}())
```
