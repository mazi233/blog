---
title: 代理模式
permalink: /design-patterns/2020/08/11/代理模式
---

# 代理模式
:::tip 代理模式定义
为其他对象提供一种代理以控制对这个对象的访问
:::

:::tip 代理模式实现分类（静态代理）
定义：在使用时，需要定义接口或父类，被代理对象（即目标对象）与代理对象一起实现相同的接口或者是继承相同的父类

优点：在不修改目标对象的功能前提下，能通过代理对象对目标功能扩展

缺点：<br>
1. 因为代理对象需要与目标对象实现一样的接口，所以会有很多代理类<br>
2. 一旦接口增加方法，目标对象与代理对象都要维护<br>
3. 增加代理类之后明显会增加处理时间，拖慢处理时间

角色：<br>
      Subject【抽象主题角色】（是抽象类也可以是接口）<br>
      RealSubject【具体主题角色、被委托角色、被代理角色】（是业务逻辑的具体执行者）<br>
      Proxy【代理主题角色、委托类、代理类】（负责对真实角色的应用，把所有抽象主题类定义的方法限制委托给真实主题角色并实现，而且在真实主题角色处理完毕前后做预处理和善后处理工作）
:::

:::tip 代理模式实现分类（动态代理）【JDK代理、接口代理】
定义：代理对象不需要实现接口，当时目标对象要实现接口，否则不能动态代理。其中代理对象的生成，是利用JDK的API动态的在内存中构建代理对象

优点：代理对象不需要实现接口

缺点：增加代理类之后明显会增加处理时间，拖慢处理时间

角色：ProxyFactory（代理工厂角色）
:::

:::tip 代理模式实现分类（Cglib代理）【子类代理】
定义：在内存中创建一个子类对象从而实现对目标对象功能的扩展
:::

:::tip 代理模式应用场景
远程代理（Remote Proxy）：控制对远程对象（不同地址空间）的访问，它负责将请求及其参数进行编码，并向不同地址空间中的对象发送已经编码的请求

虚拟代理（Virtual Proxy）：根据需要创建开销很大的对象，它可以缓存实体的附加信息，以便延迟对它的访问，例如在网站加载一个很大的图片时，不能马上完成，可以用虚拟代理缓存图片的大小信息，然后生成一张临时图片替代原始图片

保护代理（Protection Proxy）：按权限控制对象的访问，它负责检查调用者是否具有实现一个请求所必须的访问权限

智能代理（Smart Proxy）：取代了简单的指针，它在访问对象时执行一些附加操作，记录对象的引用次数；当第一次引用一个对象时，将它装入内存；在访问一个实际对象前，检查是否已经锁定了它，以确保其他对象不能改变它
:::

```ts
// 静态代理
interface Subject {
  doOperation(): void
}

class RealSubject implements Subject {
  public doOperation() {
    console.log('我是RealSubject类，正在执行')
  }
}

class MyProxy implements Subject {
  private target: Subject
  constructor(realSubject: Subject) {
    this.target = realSubject
  }

  public doOperation() {
    console.log('我是代理类')
    this.target.doOperation()
  }
}

;(function main() {
  const realSubject: Subject = new RealSubject()
  const myProxy: Subject = new MyProxy(realSubject)

  myProxy.doOperation()
}())



// 动态代理
interface Subject2 {
  doOperation(): void
}

class RealSubject2 implements Subject2 {
  constructor() {}

  public doOperation(): void {
    console.log('我是RealSubject2类，正在执行')
  }
}

class ProxyFactory {
  private target: any
  constructor(target: any) {
    this.target = target
  }

  public getProxyInstance(): any {
    return new Proxy(this.target, {
      get: (target, propKey) => {
        // 做一些拦截处理
        return target[propKey]
      }
    })
  }
}

;(function main() {
  const target: Subject2 = new RealSubject2()
  const proxyInstance: Subject2 = <Subject2>new ProxyFactory(target).getProxyInstance()

  proxyInstance.doOperation()
}())
```
