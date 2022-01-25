#!/usr/bin/env sh

set -e

cd docs/.vitepress
rm -rf dist
cd -

pnpm run build

cd docs/.vitepress/dist

git init
git add -A
git commit -m 'update'

git push -f git@github.com:mazi233/blog.git main

git push -f git@gitee.com:mazi233/blogs.git main

cd -
