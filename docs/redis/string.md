---
title: String类型
permalink: /redis/2019/08/22/String类型
---
# String类型操作
## set (添加)
> set key value
```
set str1 str
set str2 1
```

## get (获取)
> get key
```
get str1
```

## val为数字时的一些方法
### incr (+1)
> incr str2

### decrby (-2)
> decrby str2 2
