# goroutine

```go
runtime.NumCPU() // 返回可以使用的物理处理器的数量
```

```go
package main
import (
  "fmt"
  "runtime"
  "sync"
)

func main() {
  // 分配一个逻辑处理器给调度器使用
  runtime.GOMAXPROCS(1)

  var wg sync.WaitGroup
  wg.Add(2)

  fmt.Println("xxx")
  go func() {
    defer wg.Done()

    for count := 0; count < 3; count++ {
      for char := 'a'; char < 'a'+26; char++ {
        fmt.Printf("%c ", char)
      }
    }
  }()

  go func() {
    defer wg.Done()
    for count := 0; count < 3; count++ {
      for char := 'A'; char < 'A'+26; char++ {
        fmt.Printf("%c ", char)
      }
    }
  }()

  fmt.Println("xx")
  wg.Wait()
}
```
下图从逻辑处理器的角度展示了这一场景。
1. 调度器开始运行`goroutine A`，而`goroutine B`在运行队列里等待调度
2. 调度器交互了`goroutine A`和`goroutine B`。由于`goroutinee A`并没有完成工作，因此被放回到运行队列
3. `goroutine B`完成了它的工作并被系统销毁。这也让`goroutine A`继续之前的工作

![image](/change.jpg)
