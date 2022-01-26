# 适配器模式
:::tip 适配器模式
定义：适配器模式（变压器模式、包装模式）是将一个类的接口变换为客户端所期待的另一种接口，从而使原本因接口不匹配而无法在一起工作的两个类能够在一起工作

优点：将两个没关系类可以一起运行；提高类的复用性（源角色在原有系统还可以使用）

缺点：<br>
1. 【类适配器】不支持多重继承语言一次只能适配一个被适配者类，而且目标抽象类不能为接口，有一定局限性；被适配者类的方法在Adapter中都有暴露出来<br>
2. 【对象适配器】与类适配器模式相比，要想置换被适配者类的方法就不容易

应用场景：<br>
1. 【类适配器和对象适配器】接口不符合规范，通过适配后变成符合规范的接口进行使用<br>
2. 【接口适配器】适用于一个接口不想使用其所有的方法的情况

角色：<br>
      Target（目标对象，定义把其他类转换为何种接口）<br>
      Adaptee（被适配者，就是源角色）<br>
      Adapter（适配者，负责将Adaptee的接口转换为Target的接口）
:::
```ts
// 类适配器
// 目标对象
interface Target {
  request(): void
}

// 被适配者
class Adaptee {
  constructor() {}
  // 这是源角色，有自己的业务逻辑
  public specificRequest(): void {}
}

// 适配器
class Adapter extends Adaptee implements Target {
  constructor() {
    super()
  }

  public request(): void {
    super.specificRequest()
  }
}

const target: Target = new Adapter()
target.request()


// 对象适配器
// 目标对象
interface Target1 {
  request(): void
}

// 被适配者
class Adaptee1 {
  constructor() {}

  // 这是源角色，有自己的的业务逻辑
  public specificRequest(): void {}
}

// 适配器
class Adapter1 implements Target1 {
  private adaptee: Adaptee1
  constructor(adaptee: Adaptee1) {
    this.adaptee = adaptee
  }

  public request(): void {
    this.adaptee.specificRequest()
  }
}

const target1: Target1 = new Adapter1(new Adaptee1())
target1.request()


// 接口适配器
interface Adaptee2 {
  operation1(): void
  operation2(): void
}

abstract class AbsAdapter implements Adaptee2 {
  public operation1(): void {}
  public operation2(): void {}
}

class UseClass extends AbsAdapter {
  public operation1(): void {} // 重写该类
}
```
