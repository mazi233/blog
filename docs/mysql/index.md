# Mysql相关
<!-- mysql -->
```sql
-- 用于去重
SELECT DISTINCT name FROM pet;


-- 查询区间
-- between and 包括两端
SELECT * FROM pet WHERE birth BETWEEN '1995-02-10' AND '1995-02-11';
SELECT * FROM pet WHERE birth > '1995-02-10' AND birth < '1995-02-11';


-- 表示或者关系的查询	in
SELECT * FROM pet WHERE birth IN('1995-02-10', '1995-05-08');
-- or 表示或者
SELECT * FROM pet WHERE owner='hhh' OR sex='f';


-- 升序，降序
SELECT * FROM pet ORDER BY birth;
SELECT * FROM pet ORDER BY name ASC, SEX DESC;


-- 统计 count
SELECT COUNT(*) FROM pet WHERE name='mmm';


-- 子查询
SELECT name, owner FROM pet WHERE birth=(SELECT MAX(birth) FROM pet);
-- 排序法
SELECT name, owner FROM pet ORDER BY birth DESC LIMIT 0, 1;


-- avg
SELECT AVG(birth) FROM pet WHERE name='mmm';


-- group by
SELECT AVG(birth) FROM pet GROUP BY birth;


-- 查询score表中至少有2名学生选修并以3开头的课程的平均分数
-- having 过滤
SELECT cno FROM score GROUP BY cno HAVING COUNT(cno) >=2 AND cno LIKE '3%';


SELECT sno, degree FROM score WHERE degree>70 AND degree<90;
SELECT sno, degree FROM score WHERE degree BETWEEN 70 AND 90;


SELECT sname, cno, degree FROM student WHERE student.sno = score.sno;


SELECT cno, AVG(degree) FROM score WHERE sno IN (SELECT sno FROM student WHERE class='95031') GROUP BY cno;


-- 查新 “计算机系” 与 “电子工程系” 不同职称的教师的 tname 和 prof

SELECT * FROM teacher WHERE depart='计算机系' AND prof NOT IN(SELECT prof FROM teacher WHERE depart='电子工程系')
UNION
SELECT * FROM teacher WHERE depart='电子工程系' AND prof NOT IN(SELECT prof FROM teacher WHERE depart='计算机系');


-- 查询选修编号为 “3-105” 课程切成绩至少高于选修编号为 “3-245” 的同学的cno，sno和degree并按degree从高到低次序排序
-- any 表示任意      all表示所有
SELECT * FROM score WHERE cno='3-105' AND degree>ANY(SELECT degree FROM score WHERE cno = '3-245') ORDER BY DESC;


-- SQL 的四种连接查询

-- 内连接
-- INNER JOIN 或者 JOIN

-- 外连接
-- 1. 左连接 LEFT JOIN 或者 LEFT OUTER JOIN

-- 2. 右连接 RIGHT JOIN 或者 RIGHT OUTER JOIN

-- mysql不支持全连接，可以使用左连接和右连接配合union实现全连接
-- 3. 完全外连接 FULL JOIN 或者 FULL OUTER JOIN




-- 事务的四大特征
-- A 原子性：事务是最小的单位，不可以再分割
-- C 一致性：事务要求，同一事务中的sql语句，必须保证同时成功或者同时失败
-- I 隔离性：事务1和事务2之间是具有隔离性的
-- D 持久性：事务一旦结束（commit，rollback），就不可以返回

-- 事务开启：
--   1. 修改默认提交 set autocommit=0;
--   2. begin;
--   3. start transaction;

-- 事务手动提交：
--   commit;

-- 事务手动回滚：
--   rollback;


-- 事务的隔离性：
-- 1、 read uncommitted;  读未提交的
-- 2、 read commited;     读已经提交的
-- 3、 repeatable read;   可以重复读
-- 4、 serializable;      串行化

-- 1- read uncommitted
-- 如果有事务a，和事务b，
-- a事务对数据进行操作，在操作的过程中，事务没有被提交，但是b可以看到a操作的结果
-- 脏读：一个事务读到了另一个事务没有提交的数据，就叫脏读
```