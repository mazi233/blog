---
title: 抽象工厂模式
permalink: /design-patterns/2020/08/10/抽象工厂模式
---

# 抽象工厂模式
:::tip 抽象工厂模式
定义：为创建一组相关或相互依赖的对象提供一个接口，而且无需指定他们的具体类

优点：增加新的产品族很容易

缺点：增加新的产品结构很麻烦（违背开闭原则）

应用场景：无需关心对象创建过程、系统有多于一个的产品族且每次只需要某一个产品族，产品等级结构稳定

角色：<br>
      AbstractProduct（抽象产品类）<br>
      ConcreteProduct（具体产品类）<br>
      AbstractFactory（抽象工厂类）<br>
      ConcreteFactory（具体工厂类）
:::
```ts
// 抽象产品接口
// 抽象工厂接口
interface AbstractFactory {
  createProductA(): AbstractProductA
  createProductB(): AbstractProductB
}

// 抽象产品A接口
interface AbstractProductA {}

// 抽象产品B接口
interface AbstractProductB {}

// 具体工厂1
class ConcreteFactory1 implements AbstractFactory {
  constructor() {}
  public createProductA(): AbstractProductA {
    return new ConcreteProductA1()
  }
  public createProductB(): AbstractProductB {
    return new ConcreteProductB1()
  }
}

// 具体工厂2
class ConcreteFactory2 implements AbstractFactory {
  constructor() {}
  public createProductA(): AbstractProductA {
    return new ConcreteProductA2()
  }
  public createProductB(): AbstractProductB {
    return new ConcreteProductB2()
  }
}

// 具体产品A1
class ConcreteProductA1 implements AbstractProductA {}
// 具体产品A2
class ConcreteProductB1 implements AbstractProductB {}
// 具体产品B1
class ConcreteProductA2 implements AbstractProductA {}
// 具体产品B2
class ConcreteProductB2 implements AbstractProductB {}

const factory1: AbstractFactory = new ConcreteFactory1()
const factory2: AbstractFactory = new ConcreteFactory2()
const productA1: AbstractProductA = factory1.createProductA()
const productA2: AbstractProductA = factory2.createProductA()
const productB1: AbstractProductB = factory1.createProductB()
const productB2: AbstractProductB = factory2.createProductB()
console.log(productA1, productA2, productB1, productB2)
```
