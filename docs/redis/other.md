# 其他内容（String类型）

set key value

sexnx key value（若已存在不会覆盖）

get key

mget key [key2]

get range key start end

getset key value（获取并赋值）

keys *

del key

dump key

exists key

expire key seconds

pexpires key millseconds

ttl key (查看当前key剩余有效时常（-1为永不过期，-2为已过期）)

pttl key

persist key (设置已设置过期时间的key为永久有效)

keys pattern（keys user:? -> users:1）

randomkey

select db

rename key newkey

move key db

type key

strlen key

incr key（自增1，没有的话先赋值0）

decr key（自减1，没有的话先赋值0）

incrby key step

decrby key step

append key value









# Hash类型

hset key field value

hmset key field value [field value...]

hget key field

hmget key field [field1...]

hgetall key

hkeys key

hlen key

hdel key field [field1...]

hsetnx key field value

hincrby key field step

hincrbyfloat key field step

hexists key field





# list类型

lpush key value [value1...]

rpush key value [value1...]

lpushx key value （如果list不存在则操作无限）

rpushx key value （如果list不存在则操作无限）

llen key

lindex key index

lrange key start end （start、end都可以使用负数）

lpop key

rpop key

blpop key1 [key2] timeout （移出并获取列表的第一个元素，如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止）

brpop key1 [key2] timeout

ltrim key start end （修剪，只保留区间内元素，不在区间之内的都删除）

lset key index value

linsert key before|after word value

rpoplpush source destination （移除列表的最后一个元素，并将该元素添加到另一个列表并返回）

brpoplpush source destination timeout





# Set类型

sadd key value [value...]

scard key

smembers key

sismember key value

srandmember key [count]

seem ley member [member1...]

spop key [count]

smove source destination member

sdiff key1 [key2...] （左差集）

sdiffstore destination key1 [key2...] （将差集存储在destination中）

sinter key1 [key2...] （交集）

sinterstore destination key1 [key2...]

sunion key1 [key2...] （并集）

sunionstore destination key1 [key2...]





# zset类型

zadd key socre1 member1 [score2 memeber2...]

zcard key

zcount key min max

zrank key member

zrange key start end [withscores] （低到高）

zrevrange key start end [withscores] （高到低）

zrem key member [member...]

zremrangebyrank key start end

zremrangebyscore key min max





# pubsub

subscribe channel [channel1...]

psubscribe pattern [pattern1...] （订阅给定模式的频道）

publish channel message

unsubscribe [channel [channel1...]]

punsubscribe [pattern [pattern1...]]





# 多数据库管理

select 数据库

move key 数据库

flushdb （清除当前数据库所有key）

flushall （清除整个redis数据库中的所有key）





# Redis事务

discard （取消事务，放弃执行事务块内的所有命令）

exec （执行所有事务块内的命令）

multi （标记一个事务块的开始）

unwatch （取消watch命令对所有key的监视）

watch key [key1...] （监视一个或多个key，如果在事务执行之前这些key被其他命令所改动，那么事务将被打断）





# Redis数据淘汰策略 redis.conf







# Redis持久化

1. RDB
2. AOF







# Redis缓存和数据库一致性

## 1. 实时同步



## 2. 异步队列

> 使用kafka等做消息队列



## 3. 使用阿里的同步工具 canal



## 4. 采用UDF自定义函数的方式





#### 缓存穿透

> ​		缓存穿透是指查询一个一定不存在的数据，由于缓存未命中时需要从数据库查询，查不到数据则不写入缓存，这将导致这个不存在的数据每次请求都要去数据库去查询，造成缓存穿透

**解决办法:** 持久层查询不到就缓存空结果，查询时先判断缓存中是否存在key，如果有直接返回空，没有则查询后返回，注意insert时需要清除查询的key，否则即便数据库中有值也查询不到（当然也可以设置空缓存的过期时间）



#### 缓存雪崩

> ​		如果缓存集中在一段时间内失效，发生大量的缓存穿透，所有的查询都落在数据库上，就造成了缓存雪崩
>
> ​		这个没有完美解决方法，但可以分析用户行为，尽量让失效时间点均匀分布。大多数系统设计者考虑用加锁或队列的方式保证缓存的单线程写，从而避免失效时大量的并发请求落到底层存储系统上

**解决方法：**

1. 加锁
2. 队列



#### 热点Key

> ​		某个key访问非常频繁，当key失效的时候有大量线程来构建缓存，导致负载增加，系统崩溃

**解决方法：**

1. 使用锁，单机用synchronized，lock等，分布式用分布式锁
2. 缓存过期时间不设置，而是设置在key对应的value里，如果检查到存的时间超过过期时间则异步更新缓存
3. 在value设置一个比过期时间t0小的过期时间值t1，当t1过期的时候，延长t1并做更新缓存操作
4. 设置标签缓存，标签缓存设置过期时间，标签缓存过期后，需一部更新实际缓存





# Redis高级

### 高可用



### 高并发

**响应时间（Response Time）**、**吞吐量（Throughput）**、**每秒查询率QPS（Query Per Second）**、**并发用户数**



##### 提高系统的并发能力

1. 垂直扩展（提升单机处理能力）

>1. 增强单机硬件能力
>2. 增强单机架构性能

2. 水平扩展



### 3. 主从复制

### 4. Redis Cluster集群

> 至少三主三从