---
title: 解释器模式
permalink: /design-patterns/2020/08/13/解释器模式
---

# 解释器模式
:::tip 解释器模式
定义：给定一门语言，定义它的文法的一种表示，并定义一个解释器，该解释器使用该表示来解释语言中的句子

优点：扩展性好，修改语法规则只要修改相应的非终结符表达式就可以，若扩展语法，则只需要增加非终结符类就可以

缺点：<br>
1. 解释器模式会引起类膨胀（非终结符表达式）<br>
2. 解释器模式采用递归调用方法，将会导致调试非常复杂<br>
3. 效率可能降低（因为使用了大量的循环和递归）

应用场景：<br>
1. 应用可以将一个需要执行的语言中的句子表示为一个抽象语法树<br>
2. 重复发生的问题可以使用解释器模式，例如多个服务器产生的日志进行分析（各个服务器的日志时间不同，但是数据要素是相同的）<br>
3. 一个简单语法需要解释的场景<br>
4. 编译器、运算表达式计算、正则表达式、机器人等

角色：<br>
      AbstractExpression【抽象解释器】（具体的解释任务由各个实现类完成，具体的计时器分别由TerminalExpression和NonTerminalExpression完成）<br>
      TerminalExpression【终结符表达式】（实现与文法中多大的元素相关联的解释操作，通常一个解释器模式中只有一个终结符表达式，但有多个实例，对应不同的终结符）<br>
      NonTerminalExpression【非终结符表达式】（文法中的每条规则对应于一个非终结符表达式，具体到四则运算中就是加减法规则分别对应到AddExpression和SubExpression两个类）<br>
      Context【环境角色】（含有解释器之外的全局信息）
:::
```ts
// 以下是一个规则校验器实现，具有 and 和 or规则，
// 通过规则可以构建一棵解析树，用来检验一个文本是否满足解析树定义的规则

// 例如一棵解析树为 D And （A Or （B C）），文本 “D A”满足该解析树定义的规则
abstract class Expression {
  public abstract interpreter(str: string): boolean
}

class TerminalExpression extends Expression {
  private literal: string
  constructor(str: string) {
    super()
    this.literal = str
  }

  public interpreter(str: string): boolean {
    for (let charVal of str) {
      if (charVal === this.literal) {
        return true
      }
    }

    return false
  }
}

class AndExpression extends Expression {
  private expression1: Expression
  private expression2: Expression

  constructor(expression1: Expression, expression2: Expression) {
    super()
    this.expression1 = expression1
    this.expression2 = expression2
  }

  public interpreter(str: string): boolean {
    return this.expression1.interpreter(str) && this.expression2.interpreter(str)
  }
}

class OrExpression extends Expression {
  private expression1: Expression
  private expression2: Expression

  constructor(expression1: Expression, expression2: Expression) {
    super()
    this.expression1 = expression1
    this.expression2 = expression2
  }

  public interpreter(str: string): boolean {
    return this.expression1.interpreter(str) || this.expression2.interpreter(str)
  }
}

function buildInterpreterTree() {
  const terminal1: Expression = new TerminalExpression('A')
  const terminal2: Expression = new TerminalExpression('B')
  const terminal3: Expression = new TerminalExpression('C')
  const terminal4: Expression = new TerminalExpression('D')

  // B and C
  const alternation1: Expression = new AndExpression(terminal2, terminal3)
  // A Or (B C)
  const alternation2: Expression = new OrExpression(terminal1, alternation1)
  // D And (A Or (B C))
  return new AndExpression(terminal4, alternation2)
}

;(function main() {
  const define: Expression = buildInterpreterTree()
  const context1: string = 'D A'
  const context2: string = 'D B C'
  console.log(define.interpreter(context1))
  console.log(define.interpreter(context2))
}())
```
