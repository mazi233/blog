---
title: Docker容器
permalink: /docker/2019/11/24/docker-container

---

# Docker容器
容器是镜像的一个运行实例。不同的是镜像是静态的只读文件，而容器带有运行时需要的可写文件层，同时，容器中的应用进程属于运行状态

## 创建容器
### 新建容器
```bash
# 新建的容器处于停止状态
docker [container] create
```

### 启动容器
```bash
# 启动一个已经存在的docker容器
docker [container] start
# 查看运行中的一个容器
docker ps
```

### 创建并启动容器
```bash
# 创建并启动容器
docker [container] run

# eg
docker run ubt:lts echo 'laji'

# 启动一个bash终端执行
docker run -it ubt:lts bash
```

### 守护态运行
```bash
docker run -d ubt:lts /bin/sh -c 'while true; do echo hello world;sleep 1;done'
```

### 查看容器输出
```bash
docker logs xxx
```

## 停止容器
### 暂停容器
```bash
# 暂停
docker pause xx

# 恢复
docker unpause xx
```

### 终止容器
```bash
# 会先发送SIGTERM信号，默认10秒后发送SIGKILL信号终止容器
docker stop xx

# 直接发送SIGKILL信号终止容器
dockr kill x x

# 自动清除所有处于停止状态的容器
docker container prune

# 关闭再启动
docker restart xx

# 只查看id
docker ps -aq
```

### 进入容器
1. attach命令
```bash
docker [container] attach [--detach-keys[=[]]] [--no-stdin] [--sig-proxy[=true]] CONTAINER

- args
> - --detach-keys[=[]] # 指定退出attach模式的快捷键序列，默认是 CTRL-p CTRL-q
> - --no-stdin=true|false # 是否关闭标准输入，默认保持打开
> - --sig-proxy=true|false # 是否代理收到的系统信号给应用程序，默认为true
```
:::warning
多个窗口attach到同一个容器时，所有窗口都会同步
:::
2. exec命令
```bash
docker [container] exec [-d|--detach] [--detach-keys[=[]]] [-i|--interactive] [--privileged] [-t|--tty] [-u|--user[=USER]] CONTAINER COMMAND [ARG...]

- args
> - -d|--detach # 在容器中后台执行命令
> - --detach-keys="" # 指定将容器且会后台的按键
> - -e|--env=[] # 指定环境变量列表
> - -i|--interactive=true|false # 打开标准输入接受用户输入命令，默认为false
> - --privileged=true|false # 是否给执行命令以高权限，默认为false
> - -t|--tty=true|false # 分配伪终端，默认为false
> - -u|--user="" # 执行命令的用户名或ID

docker exec -it xx /bin/bash
```

### 删除容器
```bash
docker [container] rm [-f|--force] [-l|--link] [-v|--volumes] CONTAINER [CONTAINER...]

- args
> - -f|--force=false # 是否强制终止并删除一个运行中的容器
> - -l|--link=false # 删除容器的连接，但保留容器
> - -v|--volumes=false # 删除容器挂载的数据卷
```

### 导入和导出容器
1. 导出容器
```bash
# -o指定导出的tar文件名
docker [container] export [-o|--output[=""]] CONTAINER
```

2. 导入容器
```bash
docker import [-c|--change[=[]]] [-m|--message[=MESSAGE]] file|URL| -- [REPOSITORY[:TAG]]
```

### 查看容器
1. 查看容器详情
```bash
docker container inspect [OPTIONS] CONTAINER [CONTAINER...]

# eg
docker container inspect 07a1f461d4ab
```

2. 查看容器内进程
```bash
docker [container] top [OPTIONS] CONTAINER [CONTAINER...]

# eg
docker top 07a1f461d4ab
```

3. 查看统计信息
```bash
docker [container] stats [OPTIONS] [CONTAINER...]

- args
> - -a|--all # 输出所有容器统计信息，默认仅在运行中
> - -format string # 格式化输出信息
> - -no-stream # 不持续输出，默认会自动更新持续实时结果
```

## 其他容器命令
1. 复制文件
```bash
docker [container] cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH| -
- args
> - -a|-archive # 打包模式，复制文件会带有原始的uid/gid信息
> - -L|-follow-link # 跟随软链接。当原路径为软链接时，默认只复制链接信息，使用该选项会复制链接的目标地址
```

2. 查看变更
```bash
docker [container] diff CONTAINER
```

3. 查看端口映射
```bash
docker container port CONTAINER [PRIVATE_PORT[/PROTO]]
# eg
docker container port 07a1f461d4ab
```

4. 更新配置
```bash
docker [container] update [OPTIONS] CONTAINER [CONTAINER...]
```
