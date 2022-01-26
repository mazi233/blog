# 简单工厂模式
:::tip 简单工厂模式
定义：定义一个创建对象的类，由这个类来封装实例化对象的行为

优点：客户类与具体子类解耦；客户类不需要知道所有子类细节

缺点：工厂类职责过重；增加工厂类增加了系统复杂度l；系统扩充困难（会修改工厂逻辑）

应用场景：工厂类负责创建的对象较少、客户端对如何创建对象不关心

角色：<br>
      SimpleFactory（简单工厂类）<br>
      Product（抽象产品类）<br>
      ConcreteProduct（具体产品类）
:::
```ts
// 抽象产品接口
interface Product {}

// 具体产品1
class ConcreteProduct1 implements Product {
  constructor() {}
}

// 具体产品2
class ConcreteProduct2 implements Product {
  constructor() {}
}

// 简单工厂
class SimpleFactory {
  public static createProduct(type: number): Product {
    let product: Product | null = null
    switch (type) {
      case 1:
        product = new ConcreteProduct1()
        break
      case 2:
        product = new ConcreteProduct2()
        break
    }
    return product!
  }
}

let product = SimpleFactory.createProduct(1)
console.log(product)

let product2 = SimpleFactory.createProduct(2)
console.log(product2)
```
