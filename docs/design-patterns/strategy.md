---
title: 策略模式
permalink: /design-patterns/2020/08/13/策略模式
---

# 策略模式
:::tip 策略模式
定义：定义一组算法，将每个算法都封装起来，并且使它们之间可以互换

优点：<br>
1. 算法可以自由切换。只要实现抽象策略，它就成为策略家族的一个成员，通过封装角色对齐进行封装，保证对外提供 “可自由切换” 的策略<br>
2. 避免使用多重条件判断<br>
3. 扩展性好。客户端增加行为不用修改原有代码，只要添加一种策略即可

缺点：<br>
1. 策略类数量增多，会导致类数量庞大<br>
2. 所有的策略类都需要对外暴露，对于这个缺陷可通过工厂方法模式，代理模式或享元模式修正

应用场景：<br>
1. 多个类只有在算法或行为上稍有不同的场景<br>
2. 算法需要自由切换的场景<br>
3. 需要屏蔽算法规则的场景

角色：<br>
      Context【上下文角色】（起承上启下封装作用，屏蔽高层模块对策略、算法的直接访问，封装可能存在的变化）<br>
      Strategy【抽象策略角色】（策略、算法家族的抽象，通常为接口，定义每个策略或算法必须具有的方法和属性）<br>
      ConcreteStrategy【具体策略角色】（实现抽象策略中的操作）
:::
```ts
interface Strategy {
  // 策略模式运算法则
  doSomething(): void
}

class ConcreteStrategy1 implements Strategy {
  public doSomething(): void {
    console.log('使用的策略1')
  }
}

class ConcreteStrategy2 implements Strategy {
  public doSomething(): void {
    console.log('使用的策略2')
  }
}

class ContextOfStrategy {
  private _strategy: Strategy
  constructor(strategy: Strategy) {
    this._strategy = strategy
  }

  set strategy(strategy: Strategy) {
    this._strategy = strategy
  }

  // 封装后的策略方法
  doOperation(): void {
    this._strategy.doSomething()
  }
}

;(function main() {
  const strategy1: Strategy = new ConcreteStrategy1()
  const strategy2: Strategy = new ConcreteStrategy2()
  const context: ContextOfStrategy = new ContextOfStrategy(strategy1)
  context.doOperation()
  context.strategy = strategy2
  context.doOperation()
}())
```
