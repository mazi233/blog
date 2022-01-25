---
title: 迭代器模式
permalink: /design-patterns/2020/08/13/迭代器模式
---

# 迭代器模式
:::tip 迭代器模式
定义：提供一种方法访问一个容器对象中各个元素，而不是暴露该对象的内部细节

优点：<br>
1. 提供一个统一的方法遍历对象，客户不用再考虑聚合的类型，使用一种方法就可以遍历对象了<br>
2. 隐藏了聚合的内部结构，客户端要遍历聚合的时候只能取到迭代器，而不会知道聚合的具体组成<br>
3. 提供一种设计思想，就是一个类应该只有一个引起变化的原因（单一职责原则）。在聚合类中，我们把迭代器分开，就是要把管理对象集合和遍历对象的责任分开，这样一来集合改变的话，只影响到聚合对象。而如果遍历方式改变的话，只影响到了迭代器

缺点：每个聚合对象都要一个迭代器，会生成多个迭代器不好管理类

应用场景：当要展示一组相似对象，或者遍历一组相同对象时使用

角色：<br>
      Iterator【抽象迭代器】（抽象迭代器定义负责访问和遍历元素的接口）<br>
      ConcreteIterator【具体迭代器】（实现迭代器接口，完成容器元素的遍历）<br>
      Aggregate【抽象容器】（负责创建具体迭代器角色的接口，必须提供一个类似`createIterator()`这样的方法）<br>
      ConcreteAggregate【具体容器】（实现容器接口定义的方法，创建出容纳迭代器的对象）
:::
```ts
interface AbstractIterator {
  next(): any
  hasNext(): boolean
  remove(): boolean
}

class  ConcreteIterator implements AbstractIterator {
  private list: any[]
  public cursor: number = 0
  constructor(array: any[]) {
    this.list = array
  }

  public next(): any {
    return this.hasNext() ? this.list[this.cursor++] : null
  }

  public hasNext(): boolean {
    return this.cursor < this.list.length
  }

  public remove(): boolean {
    this.list.splice(this.cursor--, 1)
    return true
  }
}

interface Aggregate {
  add(value: any): void
  remove(value: any): void
  createIterator(): AbstractIterator
}

class ConcreteAggregate implements Aggregate {
  // 容纳对象的容器
  private list: any[]
  constructor() {
    this.list = []
  }

  add(value: any): void {
    this.list.push(value)
  }

  remove(value: any): void {
    const index = this.list.findIndex((listValue: any) => {
      return value === listValue
    })
    this.list.splice(index, 1)
  }

  createIterator(): AbstractIterator {
    return new ConcreteIterator(this.list)
  }
}

;(function main() {
  const aggregate: Aggregate = new ConcreteAggregate()
  aggregate.add('1111')
  aggregate.add('2222')

  const iterator: AbstractIterator = aggregate.createIterator()
  while(iterator.hasNext()) {
    console.log(iterator.next())
  }
}())
```
