# 3. 远程仓库
- 生成SSH Key
```bash
ssh-keygen -t rsa -C "youremail@example.com"
```
- 上传公钥
> 如果一切顺利的话，可以在用户主目录里找到`.ssh`目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是SSH Key的秘钥对，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人

>- 登陆GitHub，打开“Account settings”，“SSH Keys”页面
>- 点“Add SSH Key”，填上任意Title，在Key文本框里粘贴`id_rsa.pub`文件的内容

## 添加远程仓库
```bash
$ git remote add origin git@github.com:metokk/learngit.git
```
- 添加后，远程库的名字就是`origin`，这是Git默认的叫法，也可以改成别的，但是`origin`这个名字一看就知道是远程库
```bash
$ git push -u origin master
Counting objects: 20, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (15/15), done.
Writing objects: 100% (20/20), 1.64 KiB | 560.00 KiB/s, done.
Total 20 (delta 5), reused 0 (delta 0)
remote: Resolving deltas: 100% (5/5), done.
To github.com:michaelliao/learngit.git
  * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.
```
>- 把本地库的内容推送到远程，用`git push`命令，实际上是把当前分支`master`推送到远程
>- 由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令
- 从现在起，只要本地作了提交，就可以通过命令
```bash
$ git push origin master
```
:::tip 小结
- 要关联一个远程库，使用命令`git remote add origin git@server-name:path/repo-name.git`
- 关联后，使用命令`git push -u origin master`第一次推送`master`分支的所有内容
- 此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改
:::
