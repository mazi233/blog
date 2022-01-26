# 命令模式
:::tip 命令模式
定义：讲一个请求封装成一个对象，从而让你使用不同的请求把客户端参数化，对请求排队或者记录请求日志（使用不同参数来表示不同的请求），可以提供命令的撤销和恢复功能

优点：<br>
1. 命令模式使得请求发送者和请求接收者消除彼此之间的耦合<br>
2. 可扩展性。Command子类可以非常容易地扩展

缺点：可能导致某些系统有过多的具体命令类，增加了系统的复杂度

应用场景：命令模式适合用在需要将请求调用者和请求接收者进行解耦的场景，经典的应用场景：界面的一个按钮都是一条命令，可以采用命令模式；模拟CMD（DOS命令）；订单的撤销/恢复；触发-反馈机制

角色：<br>
      Invoker【调用者角色】（通过它来调用命令）<br>
      Receiver【接受者角色】（命令的真正执行者）<br>
      Command【命令角色】（需要执行的所有命令都在这里声明）<br>
      ConcreteCommand【具体命令角色】（将一个接收者对象和一个动作绑定，调用接收者相应的操作，实现execute）
:::
```ts
interface Command {
  execute(): void
  undo(): void
}

// 开启命令
class ConcreteCommandOn implements Command {
  private receiver: Receiver
  constructor(receiver: Receiver) {
    this.receiver = receiver
  }

  // 执行命令的方法
  public execute(): void {
    this.receiver.actionOn()
  }

  // 撤销命令的方法
  public undo(): void {
    this.receiver.actionOff()
  }
}

// 关闭命令
class ConcreteCommandOff implements Command {
  private receiver: Receiver
  constructor(receiver: Receiver) {
    this.receiver = receiver
  }
  
  // 执行命令的方法
  public execute(): void {
    this.receiver.actionOff()
  }

  // 撤销命令的方法
  public undo(): void {
    this.receiver.actionOn()
  }
}

// 空命令（省去判空操作）
class NoCommand implements Command {
  public execute(): void {}
  public undo(): void {}
}

class Receiver {
  public actionOn(): void {
    console.log('我是命令接收者，开启了某动作')
  }

  public actionOff(): void {
    console.log('我是命令接收者，关闭了某动作')
  }
}

class Invoker {
  private onCommands: Array<Command>
  private offCommands: Array<Command>
  private undoCommand: Command
  private slotNum: number = 7
  constructor() {
    this.undoCommand = new NoCommand()
    this.onCommands = []
    this.offCommands = []

    for (let i = 0; i < this.slotNum; i++) {
      this.onCommands[i] = new NoCommand()
      this.offCommands[i] = new NoCommand()
    }
  }

  public setCommand(index: number, onCommand: Command, offCommand: Command) {
    this.onCommands[index] = onCommand
    this.offCommands[index] = offCommand
  }

  // 开启
  public on(index: number): void {
    this.onCommands[index].execute() // 调用相应方法
    // 记录这次操作，用于撤销
    this.undoCommand = this.onCommands[index]
  }

  // 关闭
  public off(index: number): void {
    this.offCommands[index].execute()
    this.undoCommand = this.offCommands[index]
  }

  // 撤销
  public undo(): void {
    this.undoCommand.undo()
  }
}

;(function main() {
  // 创建接收者
  const receiver: Receiver = new Receiver()

  // 创建命令
  const commandOn: Command = new ConcreteCommandOn(receiver)
  const commandOff: Command = new ConcreteCommandOff(receiver)

  // 创建调用者
  const invoker: Invoker = new Invoker()
  invoker.setCommand(0, commandOn, commandOff)

  invoker.on(0)
  invoker.off(0)
  invoker.undo()
})()
```
