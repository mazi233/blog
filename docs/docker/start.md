---
title: Docker起步
permalink: /docker/2019/11/22/docker-start
---
# Docker起步
```bash
docker pull rep[:tag]
- args
> - -a / --all-tags
> - --disable-content-trust

docker run -it ubuntu bash

docker images / docker image ls
- args
> - -a / --all
> - --digests
> - -f / --filter
> - --format
> - --no-trunc
> - -q / --quiet

docker tag rep[:tag] newRep[:newTag]

docker inspect rep[:tag] [-f]


docker history rep[:tag]

docker search [option] keyword
- args
> - -f / --filter
> - --format
> - --limit int
> - --no-trunc

docker search -f=is-official=true nginx

docker rmi img [img...] / docker image rm img [img...] //img也可以是id
- args
> - -f / --force
> - -no-prune

docker ps -a

docker rm container

docker stop container

docker image prune [option]
- args
> - -a / -all
> - -filter
> - -f / -force

docker [container] commit [option]
- args
> - -a / --author
> - -c / --change
> - -m / --message
> - -p / --pause

docker [container] import [option]

docker [img] build -t xx

docker [img] save -o xx

docker [img] load -i / < xx

docker [img] push
```
