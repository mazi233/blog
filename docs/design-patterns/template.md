---
title: 模板方法模式
permalink: /design-patterns/2020/08/12/模板方法模式
---

# 模板方法模式
:::tip 模板方法模式
定义：定义一个操作中的算法的框架，而将一些步骤延迟到子类中，使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤

优点：<br>
1. 既统一了算法，也提供了很大的灵活性。父类的模板方法确保了算法的结构保持不变，同时由子类提供部分步骤的实现<br>
2. 实现了最大化代码复用。父类的模板方法和已实现的某些步骤会被子类继承而直接使用

缺点：每一个不同的实现都需要一个子类实现，导致类的个数增加，使得系统更加庞大

应用场景：<br>
1. 当要完成某个过程，该过程要执行一系列步骤，这一系列的步骤基本相同，但个别步骤在实现时可能不同，通常考虑使用过模板方法模式来处理<br>
2. 重构时。把相同的代码抽取到父类中，然后通过钩子函数约束其行为

角色：<br>
      AbstractClass【抽象模板】（它的方法分为两类：`基本方法和模板方法`。基本方法是由子类实现的方法，并且在模板方法中调用；模板方法定义算法的骨架）<br>
      ConcreteClass【具体模板】（实现父类抽象方法或按需重写方法）
:::
```ts
abstract class AbstractClass {
  constructor() {}

  // 模板方法
  public template(): void {
    this.operation1()
    this.hookMethod() && this.operation2()
    this.operation3()
  }

  // 基本方法
  protected operation1(): void {
    console.log('使用了方法operation1')
  }

  protected operation2(): void {
    console.log('使用了方法operation2')
  }

  protected operation3(): void {
    console.log('使用了方法operation3')
  }

  // 钩子方法
  protected hookMethod(): boolean {
    return true
  }
}

class ConcreteClassA extends AbstractClass {
  protected operation2(): void {
    console.log('对该方法operation2进行了修改再使用')
  }

  protected operation3(): void {
    console.log('对该方法operation3进行了修改再使用')
  }
}

class ConcreteClassB extends AbstractClass {
  // 覆盖钩子方法
  protected hookMethod(): boolean {
    return false
  }
}

;(function main() {
  const class1: AbstractClass = new ConcreteClassA()
  const class2: AbstractClass = new ConcreteClassB()

  class1.template()
  class2.template()
}())
```
