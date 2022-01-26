# 装饰者模式
:::tip 装饰者模式
定义：动态的将新功能附加到对象上。在对象功能扩展方便，它比继承更有弹性，装饰者模式也体现了开闭原则

优点：<br>
1. 装饰类和被装饰类可以独立发展，而不会相互耦合<br>
2. 装饰器模式是继承关系的一个替代方案，当时装饰者模式比继承更灵活<br>
3. 装饰者模式可以动态地扩展一个实现类的功能

缺点：多层的装饰比较复杂。由于装饰者模式会导致设计中出现很多小对象，过度使用，会让程序变得更复杂

应用场景：<br>
1. 需要扩展一个类的功能，或给一个类增加附加功能<br>
2. 需要动态地给一个对象增加功能。这些功能可以再动态地撤销<br>
3. 需要增加一些基本功能的排序组合而产生的非常大量的功能

角色：<br>
      Component【抽象构件】（一个接口或一个抽象类，定义最核心的对象）<br>
      ConcreteComponent【具体构件】（最核心、最原始、最基本的接口或抽象类大的实现，要装饰的对象）<br>
      Decorator【装饰角色】（持有一个构件[Component]对象的实例，并定义一个与抽象构件接口一致的接口）<br>
      ConcreteDecoratorA和ConcreteDecoratorB【具体装饰角色】（两个具体的装饰类）
:::
```ts
// 抽象构件
abstract class Component {
  public abstract operate(): void
}

// 具体构件
class ConcreteComponent extends Component {
  public operate(): void {
    console.log('do something')
  }
}

// 装饰角色
abstract class Decorator extends Component {
  private component: Component
  constructor(component: Component) {
    super()
    this.component = component
  }

  public operate(): void {
    this.component.operate()
  }
}

// 具体装饰者
class ConcreteDecoratorA extends Decorator {
  constructor(component: Component) {
    super(component)
  }

  // 定义自己的修饰方法
  private methodA(): void {
    console.log('methodA修饰')
  }

  // 重写父类方法
  public operate(): void {
    this.methodA()
    super.operate()
  }
}

class ConcreteDecoratorB extends Decorator {
  constructor(component: Component) {
    super(component)
  }

  // 定义自己的修饰方法
  private methodB(): void {
    console.log('methodB修饰')
  }

  // 重写父类方法
  public operate(): void {
    this.methodB()
    super.operate()
  }
}

;(function main() {
  let component: Component = new ConcreteComponent()
  // 第一次装饰
  component = new ConcreteDecoratorA(component)
  // 第二次装饰
  component = new ConcreteDecoratorB(component)

  console.log(component)

  component.operate()
})()
```
