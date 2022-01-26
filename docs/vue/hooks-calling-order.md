# hook执行顺序

## 组件hook 
:::tip 执行顺序
parent beforeCreate -> parent created -> parent beforeMount -> child beforeCreate -> child created -> child beforeMount -> child mounted -> parant mounted -> beforeUpdate（更新阶段调用）-> updated（更新阶段调用）-> parent beforeDestroy -> child beforeDestroy -> child destroyed -> parent destoryed（若多个子组件则按顺序解析、执行）
:::

## 组件hook + 路由hook（全局、独享、组件）

:::tip 执行顺序
beforeEach（全局）-> beforeRouteUpdate（组件）-> route hook（路由）-> beforeRouteEnter（组件）-> beforeResolve（全局）-> afterEach（全局）-> beforeUpdate（更新阶段 组件hook）-> updated（更新阶段 组件hook）-> 组件hook（更新阶段不调用） -> beforeRouteLeave（组件）
:::

## 组件hook + 路由hook + keep-alive

:::tip 执行顺序
加入keep-alive只会在第一次挂载时执行beforeCreate、created、beforeMount、mounted，不会执行beforeDestory、destoryed等钩子，路由、beforeUpdate、updated等钩子正常执行（包括其子组件都会被缓存）
:::
