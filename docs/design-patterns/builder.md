---
title: 建造者模式
permalink: /design-patterns/2020/08/10/建造者模式
---

# 建造者模式
:::tip 建造者模式
定义：将一个复杂对象的构建与它的表现分离，使得同样的构建过程可以创建不同的表示

优点：将产品本身与产品构建过程解耦，使得相同创建过程可创建不同产品；具体建造者相互独立，扩展容易；可以精确控制产品创建过程

缺点：适用范围受限（要求所创建产品一般具有较多共同点）；产品内部变化复杂会导致具体创建者过多

应用场景：要求按照指定的蓝图创建产品，通过组装零配件产生一个新产品（产品对象具备共性）

角色：<br>
      Product（产品角色，一个具体的产品对象）<br>
      Builder（抽象创建者）<br>
      ConcreteBuilder（具体建造者，构建和装配各个部件）<br>
      Director（指挥者，创建一个复杂的对象）
:::
```ts
// 抽象创建者
abstract class Builder {
  public abstract buildPartA(): void
  public abstract buildPartB(): void
  public abstract buildPartC(): void
  public abstract buildProduct(): Product_
}

// 具体建造者
class ConcreteBuilder extends Builder {
  private product: Product_
  constructor(product: Product_) {
    super()
    this.product = product
  }

  public buildPartA(): void {}
  public buildPartB(): void {}
  public buildPartC(): void {}

  public buildProduct(): Product_ {
    return this.product
  }
}

// 产品角色
class Product_ {
  public doSomething(): void {
    // 独立业务
  }
}

// 指挥者
class Director {
  private _builder: Builder
  constructor(build: Builder) {
    this._builder = build
  }

  set builder(builder: Builder) {
    this._builder = builder
  }

  public constructorProduct() {
    this._builder.buildPartA()
    this._builder.buildPartB()
    this._builder.buildPartC()
    return this._builder.buildProduct()
  }
}

const builder: Builder = new ConcreteBuilder(new Product_())
const director: Director = new Director(builder)
const product_: Product_ = director.constructorProduct()
console.log(product_)
```
