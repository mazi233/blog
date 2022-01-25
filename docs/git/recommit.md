# 修改某次commit message

```bash
# 修改前面第三个提交
git rebase -i HEAD~3

# 把某次message前面的pick改为edit

git commit --amend

# 修改信息

git rebase --continue
```