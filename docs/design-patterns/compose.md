---
title: 组合模式
permalink: /design-patterns/2020/08/11/组合模式
---

# 组合模式
:::tip 组合模式
定义：也叫合成模式或部分-整体模式，主要用来描述部分和整体的关系。将对象组合成树形结构以表示`部分-整体`的层次结构，使得用户对单个对象和组合对象的使用具有一致性

优点：<br>
1. 调用简单。只需要面对一致的对象而不用考虑整体部分或者叶子节点的问题<br>
2. 扩展性强。一方面，当更改组合对象时，只需要调整内部的层次关系，用户不用作出任何改动；另一方面，容易增加节点，只要找到它的父节点即可

缺点：要求较高的抽象性，如果节点和叶子节点有很多差异性的话（比如很多方法和属性不同），不适合使用组合模式

应用场景：<br>
1. 需要遍历组织结构或者处理的对象具有树形结构时，非常适合使用组合模式<br>
2. 维护和展示部分-整体的关系的场景，如树形菜单、文件和文件夹管理<br>
3. 一句话就是组合模式是应树形结构而生，所以组合模式的使用场景就是出现树形结构的地方

角色：<br>
      Component【抽象构件角色】（定义参加组合对象的共有方法和属性，可以定义一些默认的行为或属性）<br>
      Leaf【叶子构件角色】（在组合中表示叶子节点）<br>
      Composite【树枝构件角色】（非叶子节点，主要作用是存储和管理子部件，通常包含Add()、Remove()、GetChild()等方法）
:::
```ts
abstract class Component2 {
  protected name: string
  constructor(name: string) {
    this.name = name
  }

  public abstract doOperation(): void

  public add(component: Component2): void {}

  public remove(component: Component2): void {}

  public getChildren(): Array<Component2> {
    return []
  }
}

class Composite extends Component2 {
  // 构件容器
  private componentList: any
  constructor(name: string) {
    super(name)
    this.componentList = []
  }

  public doOperation(): void {
    console.log(`这是容器${this.name}, 处理一些业务逻辑`)
  }

  public add(component: Component2): void {
    this.componentList.push(component)
  }

  public remove(component: Component2): void {
    const componentIndex = this.componentList.findIndex((value: Component2, index: number) => {
      return value == component
    })
    this.componentList.splice(componentIndex, 1)
  }

  public getChildren(): Array<Component2> {
    return this.componentList
  }
}

class Leaf extends Component2 {
  constructor(name: string) {
    super(name)
  }

  public doOperation(): void {
    console.log(`这是叶子节点${this.name}, 处理一些业务逻辑`)
  }
}

;(function main() {
  const root: Component2 = new Composite('root')
  const node1: Component2 = new Leaf('1')
  const node2: Component2 = new Composite('2')
  const node3: Component2 = new Leaf('3')

  root.add(node1)
  root.add(node2)
  root.add(node3)

  const node2_1: Component2 = new Leaf('2_1')
  node2.add(node2_1)
  console.log(root)

  const children1 = root.getChildren()
  console.log(children1)

  root.remove(node2)

  const children2 = root.getChildren()
  console.log(children2)
})()
```
