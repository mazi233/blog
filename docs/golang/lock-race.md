# 锁住共享资源

## 原子函数
```go
// ...
var (
  counter int64
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
    atomic.AddInt64(&counter, 1)

    // 当前 goroutine 从线程退出，并放回到队列
    runtime.Gosched()
  }
}
// ...
```

## 互斥锁
```go
// ...
var (
  counter int
  wg sync.WaitGroup
  mutex sync.Mutex
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
    mutex.Lock()
    {
      val := counter

      // 当前 goroutine 从线程退出，并放回到队列
      runtime.Gosched()

      val++

      counter = val
    }
    mutex.Unlock()
  }
}
// ...
```
