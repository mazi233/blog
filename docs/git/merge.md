# 强制合并

两种方式
```bash
git push origin develop:master -f
```

```bash
git checkout master #切换分支至master分支

git reset -hard develop #并将master分支重置为develop

git push origin master -force #将重置后的master分支强制推送更新

# 相当于删除master分支，test将其覆盖，并推送远程仓库。
```