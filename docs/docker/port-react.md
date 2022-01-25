---
title: 端口映射和容器互联
permalink: /docker/2019/11/27/port_react
---

# 端口映射和容器互联
1. 允许映射容器内应用的服务端口到本地宿主主机
2. 互联机制实现多个容器间通过容器名来快速访问

## 端口映射实现容器访问
### 从外部访问容器应用
> 使用 -P （大写）标记时，Docker会随机映射一个`49000 - 49900`的端口到内部容器开放的网络端口
```bash
docker run -d -P training/webapp python app.py
```
> 小写 -p 这可以指定要映射的端口
> 1. IP:HostPort:ContainerPort
> 2. IP::ContainerPort
> 3. HostPort:ContainerPort

### 映射所有接口端口
```bash
docker run -d -p 5000:5000 trainging/webapp python app.py
# 多次使用-p映射多个端口
docker run -d -p 5000:5000 -p 3000:80 training/webapp python app.py
```

### 映射到指定地址的指定端口
```bash
docker run -d -p 127.0.0.1:5000:5000 training/webapp python app.py
```

### 映射到指定地址的任意端口
```bash
docker run -d -p 127.0.0.1::5000 training/webapp python app.py
# 使用udp端口
docker run -d -p 127.0.0.1::5000/udp training/webapp python app.py
```

### 查看映射端口配置
```bash
docker port CONTAINER ContainerPort
```
:::tip
容器有自己的内部网络和IP地址，使用`docker [container] inspect ContainerId`来获取容器的具体内容
:::

## 互联机制实现便捷访问
> 容器的互联是一种让多个容器中的应用进行快速交互的方式。它会在源和接受容器之间创建连接关系，接受容器可以通过容器名快速访问到源容器，而不用指定具体的IP地址

### 自定义容器命名
:::tip 自定义容器名的好处
- 自定义的命名，比较好记
- 当要连接其他容器时候（即便重启），也可以使用容器名而不用改变
:::
```bash
docker run -d -P --name web training/webapp python app.py

# 查看容器的名字
docker [container] inspect -f "{{ .Name }}" ContainerId
```
:::tip
执行`docker [container] run`的时候如果添加 `--rm` 标记，则容器在终止后会立即删除， `--rm` 和 `-d` 参数不能同时设置
:::

### 容器互联
> 使用 `--link` 参数可以让容器之间安全地进行交互

:::tip --link格式
--link name:alias
> name为要链接的容器的名称，alias识别名
:::
```bash
docker run -d --name db training/postgres

docker rm -f web

docker run -d -P --name web --link db:db training/webapp python app.py

# 此时，db容器和web容器建立互联关系
```

:::tip
Docker通过两种方式来查看web容器的环境变量
1. 更新环境变量
2. 更新 /etc/hosts 文件
:::