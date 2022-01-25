---
title: 工厂方法模式
permalink: /design-patterns/2020/08/10/工厂方法模式
---

# 工厂方法模式
:::tip 工厂方法模式
定义：定义一个创建对象的抽象方法，由子类来决定要实例化的类

优点：用户只需关心产品对应的工厂；添加新产品只要添加一个具体工厂和具体产品（符合开闭原则）

缺点：类个数成倍增加（增加一个产品就会增加具体类和实现工厂）

应用场景：所有生成对象的地方都可以使用（权衡代价）、需要灵活且可扩展的框架时

角色：<br>
      Creator（抽象工厂类）<br>
      ConcreteCreator（具体工厂类）<br>
      Product（抽象产品类）<br>
      ConcreteProduct（具体产品类）
:::
```ts
// 抽象产品接口
interface Product2 {
  method1(): void
  method2(): void
}

// 具体产品1
class ConcreteProduct_1 implements Product2 {
  constructor() {}
  method1() {}
  method2() {}
}

// 具体产品2
class ConcreteProduct_2 implements Product2 {
  constructor() {}
  method1() {}
  method2() {}
}

// 抽象工厂
abstract class Creator {
  public abstract createProduct(type: number): Product2
}

// 具体工厂
class ConcreteCreator extends Creator {
  constructor() {
    super()
  }

  public createProduct(type: number): Product2 {
    let product: Product2 | null = null
    switch (type) {
      case 1:
        product = new ConcreteProduct_1()
        break
      case 2:
        product = new ConcreteProduct_2()
        break
    }
    return product!
  }
}

const creator: Creator = new ConcreteCreator()
const myProduct: Product2 = creator.createProduct(1)
const myProduct2: Product2 = creator.createProduct(2)
console.log(myProduct)
console.log(myProduct2)
```
