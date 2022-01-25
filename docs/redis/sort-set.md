---
title: Sort Set类型
permalink: /redis/2019/08/22/Sort Set类型
---
# Sort Set类型操作 (ks对,k不允许重复,s相同比较k,还有一个隐藏rank属性[0,1,2...])
## zadd (添加)
> zadd zset score key
```
zadd zset1 11.1 val1
zadd zset1 11.1 val2
zadd zset1 11.2 val3
```

## zrank (获取kv对在其中的排序大小)
> zrank zset key
```
zrank zset1 val1
```

## zrange (查看排序)
> zrange zset 区间[0 x] [withscores]
```
zrange zset1 0 2 withscores
```

## zcard (长度)
> zcard zset
```
zcard zset1
```
