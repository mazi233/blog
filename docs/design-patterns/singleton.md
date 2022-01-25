---
title: 单例模式
permalink: /design-patterns/2020/08/10/单例模式
---

# 单例模式
:::tip 单例模式
定义：一个类仅有一个实例，并提供一个访问它的全局访问点（静态方法）

优点：减少开销（内存、系统性能...）；优化和共享资源访问

缺点：扩展困难；对测试不利；与单一职责原则冲突

应用场景：需要频繁的进行创建和销毁的对象、创建对象耗时或耗资源过多但又经常用到

角色：Singleton：单例
:::
```ts
// 饿汉式
// 初始化时就创建实例
class Singleton1 {
  // 1, 构造器私有化，外部不能new
  private constructor() {}

  // 2. 本类内部创建对象实例化
  private static instance: Singleton1 = new Singleton1()

  // 3. 提供一个共有的静态方法，返回实例对象
  public static getInstance(): Singleton1 {
    return this.instance
  }
}

console.log(Singleton1.getInstance(), '111')


// 懒汉式
// 第一次使用时创建实例
class Singleton2 {
  private constructor() {}

  private static instance: Singleton2 | null = null

  public static getInstance(): Singleton2 {
    if (!this.instance) {
      this.instance = new Singleton2()
    }
    return this.instance
  }
}

console.log(Singleton2.getInstance(), '222')
```
