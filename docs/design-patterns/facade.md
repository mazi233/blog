# 外观模式
:::tip 外观模式
定义：要哭一个子系统的外部与内部的通信必须通过一个统一的对象进行。外观模式提供一个高层次的接口，使得子系统更易于使用。（简言之就是提供一个统一的接口，用来访问子系统中的一群接口，从而让子系统更容易使用）

优点：<br>
1. 外观模式最大的优点就是使复杂系统的接口变得简单可用，减少了客户端对子系统的依赖，达到了解耦的效果<br>
2. 让子系统内部的模块更易维护和扩展<br>
3. 遵循迪米特法则，对内封装具体细节，对外只暴露必要的接口<br>

缺点：不符合开闭原则，如果要修改某一个子系统的功能，通常外观类也要一起修改

应用场景：<br>
1. 为一个复杂的模块或子系统提供一个供外界访问的接口<br>
2. 子系统相对独立----外界对子系统的访问只要黑箱操作即可<br>
3. 维护一个大型遗留系统的时候，可能这个系统已经非常难以维护和扩展，此时可以考虑为新系统开发一个Facade类，来提供遗留系统的比较清晰简单的接口，让新系统与Facade类交互，提供复用性<br>
4. 当系统需要进行分层设计时，可以考虑使用Facade模式

角色：<br>
      Facade【门面角色】（提供一个外观接口，对外，它提供一个易于客户端访问的接口，对内，它可以访问子系统中的所有功能）<br>
      SubSystem【子系统角色】（实现系统的部分功能，客户可以通过外观角色访问它）<br>
:::
```ts
abstract class Component2 {
  protected name: string
  constructor(name: string) {
    this.name = name
  }

  public abstract doOperation(): void

  public add(component: Component2): void {}

  public remove(component: Component2): void {}

  public getChildren(): Array<Component2> {
    return []
  }
}

class Composite extends Component2 {
  // 构件容器
  private componentList: any
  constructor(name: string) {
    super(name)
    this.componentList = []
  }

  public doOperation(): void {
    console.log(`这是容器${this.name}, 处理一些业务逻辑`)
  }

  public add(component: Component2): void {
    this.componentList.push(component)
  }

  public remove(component: Component2): void {
    const componentIndex = this.componentList.findIndex((value: Component2, index: number) => {
      return value == component
    })
    this.componentList.splice(componentIndex, 1)
  }

  public getChildren(): Array<Component2> {
    return this.componentList
  }
}

class Leaf extends Component2 {
  constructor(name: string) {
    super(name)
  }

  public doOperation(): void {
    console.log(`这是叶子节点${this.name}, 处理一些业务逻辑`)
  }
}

;(function main() {
  const root: Component2 = new Composite('root')
  const node1: Component2 = new Leaf('1')
  const node2: Component2 = new Composite('2')
  const node3: Component2 = new Leaf('3')

  root.add(node1)
  root.add(node2)
  root.add(node3)

  const node2_1: Component2 = new Leaf('2_1')
  node2.add(node2_1)
  console.log(root)

  const children1 = root.getChildren()
  console.log(children1)

  root.remove(node2)

  const children2 = root.getChildren()
  console.log(children2)
})()
```
