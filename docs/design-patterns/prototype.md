# 原型模式
:::tip 原型模式
定义：用原型实例指定创建对象的种类，并且通过拷贝这些原型，创建新的对象

优点：简化创建对象的过程并提高效率；可动态获取对象运行时的状态；原始对象变化（增加或减少属性）相应克隆对象也会变化

缺点：对已有类修改时，需要修改源码，违背开闭原则

应用场景：创建成本比较大的场景；需要动态获取当时的对象运行状态的场景

角色：<br>
      Prototype（抽象原型对象）<br>
      ConcretePrototype（具体原型角色【被复制的对象】）
:::
```ts
interface Prototype {
  clone(): Prototype
}

class Person implements Prototype {
  public name: string
  public birthYear: number
  public sex: string
  public presentYear: number

  constructor() {
    this.name = 'kaikai'
    this.birthYear = 1995
    this.sex = 'female'
    this.presentYear = 2020
  }

  public getDiscription(): string {
    return `大傻瓜叫${this.name},性别${this.sex},${this.presentYear}年${this.presentYear - this.birthYear}岁了`
  }

  public clone(): Prototype {
    return Object.create(this)
  }
}

const person = new Person()
console.log(person.getDiscription())
person.presentYear = 2021
const person2 = Object.create(person)
console.log(person2.getDiscription())
```
