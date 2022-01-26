# Docker数据管理
生产环境下使用docker，往往需要对数据进行持久化，或者需要在多个容器之间进行数据共享，这必然涉及容器的数据管理操作

:::tip
容器中的管理数据主要有两种方式
- 数据卷：容器内数据直接映射到本地主机环境
- 数据卷容器：使用特定容器维护数据卷
:::

## 数据卷
数据卷是一个可供容器使用的特殊目录，它将主机操作系统目录直接映射进容器，类似于Linux中的mount

> 容器卷可以提供很多有用的特性
- 数据卷可以在容器之间共享和重用，容器间传递数据将变得高效和方便
- 对数据卷内数据的修改会立马生效，无论是容器内操作还是本地操作
- 对数据卷的更新不会影响镜像，解耦开应用和数据
- 卷会一直存在，知道没有容器使用，可以安全地卸载它

### 创建数据卷
```bash
docker volume create -d local test
> others
inspect prune ls rm
```

### 绑定数据卷
-mount 支持三种类型的数据卷
- volume：普通数据卷，映射到主机 /var/lib/docker/volumes路径下
- bind：绑定数据卷，映射到主机指定路径下
- tmpfs：临时数据卷，只存在于内存中
```bash
docker [container] run -mount xx

# eg
docker run -d -P --name web --mount type=bind,source=/webapp,destination=/opt/webapp training/webapp python app.py
docker run -d -P --name web -v /weebapp:/opt/webapp training/webapp python app.py

# docker挂在数据卷的默认权限是读写(rw)，用户也可以通过ro指定为只读
docker run -d -P --name web -v /webapp:/opt/webapp:ro training/weebapp python app.py
```

## 数据卷容器
数据卷容器也是一个容器，但是它的目的是专门提供数据卷给其他容器挂载
```bash
# 创建一个数据卷容器dbdata，并在其中创建一个数据卷挂载到 /dbdata
docker run -it -v /dbdata --name dbdata ubuntu
# 在其他容器中使用--volumes-from来挂载dbdata容器中的数据卷
docker run -it --volumes-from dbdata --name db1 ubuntu
docker run -it --volumes-from dbdata --name db2 ubuntu
```
> 可以多次使用--volumes-from参数从多个容器挂载多个数据卷，还可以从其他已挂载了容器卷的容器来挂在数据卷
```bash
docker run -it --volumes-from db1 training/postgres --name db3
```
> 使用--volumes-from参数所挂载数据卷的容器自身并不需要保持在运行状态

:::warning
如果删除了挂载的容器（包括dbdata、db1和db2），数据卷并不会被自动删除。如果要删除一个数据卷，必须在删除最后一个还挂载着它的容器时显式地使用`docker rm -v`命令来指定同时删除关联的容器
:::

## 利用数据卷容器来迁移数据
### 备份
```bash
docker run --volumes-from dbdata -v $(pwd):/backup --name worker ubuntu tar cvf /backup/backup.tar /dbdata
```

### 恢复
```bash
docker run -v /dbdata --name dbdata2 ubuntu /bin/bash

docker run --volumes-from dbdata2 -v $(pwd):/backup busybox tar xvf /backup/backup.tar
```