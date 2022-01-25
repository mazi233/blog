# 通道

你不仅可以使用原子函数和互斥锁来保证对共享资源的安全访问以及消除竞争状态，还可以使用通道，通道发送和接受需要共享的资源，在`goroutine`之间做同步

当一个资源需要在`goroutine`之间共享时，通道在`goroutine`之间架起了一个管道，并提供了确保同步交换数据的机制。声明通道时，需要指定将要被共享的数据的类型。可以通过通道共享内置类型、命名类型、结构类型和引用类型的值或者指针

```go
// 使用make创建通道
// 无缓冲通道
unbuffered := make(chan int)
// 有缓冲通道
buffered := make(chan string, 10)

// 向通道发送值
buffered <- "Gopher"

// 从通道里接收值
val := <-buffered
```

## 无缓冲通道
`无缓冲通道`是指在接收前没有能力保存任何值的通道。这种类型的通道要求`发送goroutine`和`接收goroutine`同时准备好，才能完成发送和接收操作。如果`两个goroutine`没有同时准备好，通道会导致先执行发送或接收操作的`goroutine`阻塞等待。这种对通道进行发送和接收的交互行为本身就是同步的。其中任意一个操作都无法离开另一个操作单独存在

![image](/unbuffered_channel.jpg)

```go
// ...
var wg sync.WaitGroup

func init() {
  rand.Seed(time.Now().UnixNano())
}

func main() {
  court := make(chan int)
  wg.Add(2)

  go player("mazi", court)
  go player("kaikai", court)

  court <- 1
  wg.Wait()
}

func player(name string, court chan int) {
  defer wg.Done()

  for {
    ball, ok := <-court
    if !ok {
      fmt.Printf("Player %s Won\n", name)
      return
    }

    n := rand.Intn(100)
    if n % 13 == 0 {
      fmt.Printf("Player %s Missed\n", name)

      close(court)
      return
    }

    fmt.Printf("Player %s Hit %d\n", name, ball)
    ball++

    court <- ball
  }
}
// ..
```

```go
// ...
var wg sync.WaitGroup

func main() {
	baton := make(chan int)

	wg.Add(1)
	go Runner(baton)

	baton <- 1

	wg.Wait()
}

func Runner(baton chan int) {
	var newRunner int

	runner := <- baton
	fmt.Printf("Runner %d Running With Baton\n", runner)

	if runner != 4 {
		newRunner = runner + 1
		fmt.Printf("Runner %d To The Line\n", runner)
		go Runner(baton)
	}

	time.Sleep(100 * time.Millisecond)

	if runner == 4 {
		fmt.Printf("Runner %d Finished, Race Over\n", runner)
		wg.Done()
		return
	}
	fmt.Printf("Runner %d Exchange With Runner %d\n", runner, newRunner)
	baton <- newRunner
}
// ...
```

## 有缓冲通道
`有缓冲的通道`是一种在被接收前能存储一个或多个值的通道。这种类型的通道并`不强制要求goroutine之间必须同时完成发送和接收`。通道会阻塞发送和接收动作的条件也不同。只有在通道中没有要接收的值时，接收动作才会阻塞。只有在通道没有可用缓冲区容纳被发送的值时，发送动作才会阻塞

无缓冲的通道保证进行发送和接收的goroutine会在同一时间进行数据交换；有缓冲的通道没有这种保证

![image](/buffered_channel.jpg)

```go
// ...
const (
	numberGoroutines = 4
	taskLoad = 10
)

var wg sync.WaitGroup

func init() {
	rand.Seed(time.Now().UnixNano())
}

func main() {
	tasks := make(chan string, taskLoad)

	wg.Add(numberGoroutines)
	for gr := 1; gr <= numberGoroutines; gr++ {
		go worker(tasks, gr)
	}

	for post := 1; post <= taskLoad; post++ {
		tasks <- fmt.Sprintf("Task : %d", post)
	}
	close(tasks)
	wg.Wait()
}

func worker(tasks chan string, worker int) {
	defer wg.Done()

	for {
		task, ok := <-tasks
		if !ok {
			fmt.Printf("Worker: %d : Shutting Down\n", worker)
			return
		}

		fmt.Printf("Wroker: %d : Started %s\n", worker, task)

		sleep := rand.Int63n(100)
		time.Sleep(time.Duration(sleep) * time.Millisecond)

		fmt.Printf("Worker: %d : Completed %s\n", worker, task)
	}
}
// ...
```

当通道关闭后，goroutine依旧可以从通道接收数据，但是不能再向通道里发送数据。能够从已经关闭的通道接收数据这一点非常重要，因为这允许通道关闭后依旧能取出其中缓冲的全部值，而不会有数据丢失。`从一个已经关闭且没有数据的通道里获取数据，总会立刻返回，并返回一个通道类型的零值`
