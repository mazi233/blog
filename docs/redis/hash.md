---
title: Hash类型
permalink: /redis/2019/08/22/Hash类型
---
# Hash类型操作 (kv对,k不允许重复)
## hset (添加)
> hset hash key value
```
hset hash1 k1 1
hset hash1 k2 1
```

## hget (获取)
> hget hash key
```
hget hash1 k1
```

## hmget (查看多个)
> hmget hash key [key2 key3 ...]
```
hmget hash1 k1 k2
```

## hlen (长度)
> hlen hash
```
hlen hash1
```
