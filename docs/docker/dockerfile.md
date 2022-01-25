---
title: 使用Dockerfile创建镜像
permalink: /docker/2019/11/27/dockerfile
---

# 使用Dockerfile创建镜像
Dockerfile是一个文本格式的配置文件，用户可以使用Dockerfile来创建自定义的镜像

## 基本结构
Dockerfile由一行行命令语言组成，并且支持以#开头的注释行
:::tip
Dockerfile主体内容分为四部分：基础镜像信息、维护者信息、镜像操作指令、容器启动时执行命令
:::

```bash
# Dockerfile
FROM debian:jessie

LABEL maintainer docker_user<docker_user@email.com>

ENV NGINX_VERSION 1.10.1-1~jessie

RUN apt-key adv --keyserver hkp://pgp.mitt.edu:80 --recv-keys xxx \
  && echo "deb http://nginx.org/packages/debian jessie nginx" >> /etc/apt/sources.list \
  && apt-get update \
  && apt-get install --no-install-recommends --no-install-suggests -y \
  ca-certificates \
  nginx=${NGINX_VERSION} \
  nginx-module-xslt \
  nginx-module-geoip \
  nginx-module-image-filter \
  nginx-module-perl \
  nginx-module-njs \
  gettext-base \
  && rm -rf /var/lib/apt/lists/*

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
```

## 指令说明
### 配置指令
1. ARG
> 定义创建镜像过程中使用的变量（格式：ARG \<name\> \[\=\<default value\>\]）

> 在执行`docker build`时，可以通过`-build-arg[=]`来为变量赋值。当镜像编译成功后，ARG指定的变量将不再存在（ENV指定的变量将在镜像中保留）

> Docker内置变量（HTTP_PROXY，HTTPS_PROXY，FTP_PROXY，NO_PROXY）

2. FROM
> 指定所创建镜像的基础镜像

> FROM \<image\> [AS \<name\>] 或 FROM \<image\>:\<tag\> [AS \<name\>] 或 FROM \<image\>@\<digest\> [AS \<name/>]

> 任何Dockerfile中第一条指令必须为FROM指令。如果在同一个Dockerfile中创建多个镜像时，可以使用多个FROM指令（每个镜像一次）

3. LABEL
> LABEL指令可以为生成的镜像添加元数据标签信息。这些信息可以用来辅助过滤出特定镜像

> LABEL \<key>=\<value>  \<key>=\<value> \<key>=\<value> ...

4. EXPOSE
> 声明镜像内服务监听的端口

> EXPOSE \<port> [\<port>/\<protocol>...]

> 该指令只是起到声明作用，并不会自定完成端口映射。如果要映射端口出来，在启动容器时可以设置`-P`或`-p HOST_PORT:CONTAINER_PORT`

5. ENV
> 指定环境变量，在镜像生成过程中会被后续RUN指令使用，在镜像启动的容器中会存在

> ENV \<key> \<value> 或 ENV \<key>=\<value>...

> docker run --env \<key>=\<value> 可以覆盖ENV的变量

6. ENTRYPOINT
> 指定镜像的默认入口命令，该入口命令会在启动容器时作为根命令执行，所有传入值作为该命令的参数

> ENTRYPOINT ["executable", "param1", "param2"]: exec调用执行<br>
> ENTRYPOINT command param1  param2: shell中执行<br>
> 此时，CMD指令指定值将作为根命令的参数

> 每个Dockerfile中只能有一个ENTRYPOINT，当指定多个时，只有最后一个起效<br>
> 运行时，可以被`--entrypoint`参数覆盖掉

7. VOLUME
> 创建一个数据卷挂载点

> VOLUME ["/data"]

> 运行容器时可以从本地主机或其他容器挂在数据卷，一般用来存放数据库和需要保持的数据

8. USER
> 指定运行容器时的用户名或UID，后续的RUN等指令也会使用特定的用户身份

> USER daemon

> 当服务不需要管理员权限时，可以通过该命令指定运行用户，并且可以在Dockerfile中创建所需要的用户<br>
> RUN groupadd -r postagres && useradd --no-log-init -r -g postgres postgres<br>
> 要临时获取管理员权限可以使用gosu命令

9. WORKDIR
> 为后续的RUN、CMD、ENTRYPOINT指定配置工作目录

> WORKDIR /path/to/workdir

> 使用多个WORKDIR指令，后续命令如果参数时相对路径，则会基于之前命令指定的路径<br>
> WORKDIR /a<br>
> WORKDIR b<br>
> WORKDIR c<br>
> RUN pwd（/a/b/c）

> 为了避免出错，推荐WORKDIR指令中只使用绝对路径

10. ONBUILD
> 指定当基于所生成镜像创建子镜像时，自动执行的操作指令

> ONBUILD [INSTRUCTION]

> 由于ONBUILD指令时隐式执行的，推荐在使用它的镜像标签中进行标注，如 ruby:2.1-onbuild<br>
> ONBUILD指令在创建专门用于自动编译、检查等操作的基础镜像时，十分有用

11. STOPSIGNAL
> 指定所创建镜像启动的容器接收退出的信号值

> STOPSIGNAL signal

12. HEALTHCHECK
> 配置所启动容器如何进行健康检查（如何判断健康与否）

> HEALTHCHECK [OPTIONS] CMD command: 根据所执行命令返回值是否为0判断<br>
> HEALTHCHECK NONE: jin zhi ji chu jing xiang zhong 的健康检查

> OPTION支持如下参数
> -interval=DURATION （default: 30s）：过多久检查一次
> -timeout=DURATION （default: 30s）：每次检查等待结果的超时
> -retries=N（default: 3）：如果失败了，重试几次才最终确定失败

13. SHELL
> 指定其他命令使用shell时的默认shell类型

> SHELL ["executable", "parameters"]  （默认值  ["/bin/sh", "-c"]）

### 操作指令
1. RUN
> RUN \<command> 或 RUN ["executable", "param1", "param2"] 前者默认将在shell终端中运行，即`/bin/sh -c`，后者则使用exec执行，不会启动shell环境<br>
> 指定使用其他终端类型可以通过第二种方式实现，例如 RUN ["/bin/bash", "-c", "echo hello"]

> 每条RUN指令将在当前镜像基础上执行指定命令，并提交为新的镜像层。当命令较长时可以使用\来换行

2. CMD
> CMD指令用来指定启动容器时默认执行的命令

三种格式
> CMD ["executable", "param1", "param2"]: 相当于执行 `exectuable param1 param2`，推荐方式<br>
> CMD command param1 param2: 在默认的Shell中执行，提供给需要交互的应用<br>
> CMD ["param1", "param2"]: 提供给你ENTRYPOINT的默认参数

> 每个Dockerfile只能有一条CMD命令。如果制定了多条命令，只有最后一条会被执行。<br>
> 如果用户启动容器时候手动指定了运行的命令（作为run命令的参数），则会覆盖掉CMD指定的命令

3. ADD
> 添加内容到镜像

> ADD \<src> \<dest>（该命令将复制指定的\<src>路径下内容到容器中的\<dest>路径下）

> 路径支持正则  （ADD *.c /code/）

4. COPY
> 复制内容倒入容器

> COPY \<src> \<dest>

> COPY与ADD指令功能类似，当使用本地目录为源目录时，推荐使用COPY
