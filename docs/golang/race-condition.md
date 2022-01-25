# 竞争状态

如果两个或者多个`goroutine`在没有互相同步的情况下，访问某个共享的资源，并试图同时读和写这个资源，就处于相互竞争的状态，这种情况被称作`竞争状态`。竞争状态的存在是让并发程序变得复杂的地方，十分容易引起潜在问题。对一个共享资源的读和写操作必须是原子化的，换句话说，同一时刻只能有一个`goroutine`对共享资源进行读和写操作

```go
package main

import (
  "fmt"
  "runtime"
  "sync"
)

var (
  counter int
  wg sync.WaitGroup
)

func main() {
  wg.Add(2)

  go incCounter(1)
  go incCounter(2)

  wg.Wait()
  fmt.Println("Final Counter:", counter)
}

func incCounter(id int) {
  defer wg.Done()
  for count := 0; count < 2; count++ {
    val := counter

    // 当前 goroutine 从线程退出，并放回到队列
    runtime.Gosched()

    val++

    counter = val
  }
}
```
