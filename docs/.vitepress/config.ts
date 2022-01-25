import { defineConfig } from 'vitepress'

export default defineConfig({
  // base: '/blogs/',
  title: '闹够了没',
  description: "It's never too late to learn. It's the best time to start.",
  head: [
    // ['link', { rel: 'icon', href: '/blogs/favicon.ico' }],
    // ['link', { rel: 'apple-touch-icon', href: '/blogs/favicon.ico' }],
    // ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/blogs/favicon.ico' }],
    // ['link', { rel: 'mainfest', href: '/blogs/mainfest.json' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon.ico' }],
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'mainfest', href: '/mainfest.json' }]
  ],
  themeConfig: {
    // algolia,
    lastUpdated: '上次更新',
    prevLinks: true,
    nextLinks: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog',
        activeMatch: `^/(web|css|golang|git|redis|interview|other|docker|mysql|algorithm|design-patterns|vue|functional|others)/`,
        items: [
          { text: 'Web', link: '/web/web-worker', activeMatch: `^/web/` },
          { text: 'CSS', link: '/css/', activeMatch: `^/css/` },
          { text: 'Golang', link: '/golang/concurrency', activeMatch: `^/golang/` },
          { text: 'Git', link: '/git/create-repo', activeMatch: `^/git/` },
          { text: 'Redis', link: '/redis/basic', activeMatch: `^/redis/` },
          { text: 'Interview', link: '/interview/2019-01-09', activeMatch: `^/interview/` },
          { text: 'Other', link: '/other/projs1', activeMatch: `^/other/` },
          { text: 'Docker', link: '/docker/start', activeMatch: `^/docker/` },
          { text: 'Mysql', link: '/mysql/', activeMatch: `^/mysql/` },
          { text: 'Algorithm', link: '/algorithm/signal-chain-list', activeMatch: `^/algorithm/` },
          { text: 'DesignPatterns', link: '/design-patterns/tutorial', activeMatch: `^/design-patterns/` },
          { text: 'Vue', link: '/vue/hooks-calling-order', activeMatch: `^/vue/` },
          { text: 'Functional', link: '/functional/', activeMatch: `^/functional/` },
          { text: 'Others', link: '/others/', activeMatch: `^/others/` },
        ]
      },
      { text: 'About', link: '/about/' },
      { text: 'Github', link: 'https://www.github.com/mazi233' },
    ],
    sidebar: {
      '/web/': [
        {
          text: 'Web',
          collapsable: true,
          children: [
            { text: 'Web Worker', link: '/web/web-worker' },
            { text: 'Shared Worker', link: '/web/shared-worker' },
            { text: 'Service Worker', link: '/web/service-worker' },
            { text: 'Worklet', link: '/web/worklet' },
            { text: 'Flip', link: '/web/flip' },
            { text: 'Video', link: '/web/video' },
            { text: 'Canvas', link: '/web/canvas' },
            { text: 'Wechat H5', link: '/web/wechat-h5' },
          ]
        },
        {
          text: 'Web安全',
          collapsable: true,
          children: [
            { text: 'Secure', link: '/web/secure' },
          ]
        }
      ],
      '/css/': [
        {
          text: 'CSS',
          collapsable: true,
          children: [
            { text: 'CSS', link: '/css/' },
          ]
        }
      ],
      '/golang/': [
        {
          text: 'Golang',
          collapsable: true,
          children: [
            { text: '并发和并行', link: '/golang/concurrency' },
            { text: 'goroutine', link: '/golang/goroutine' },
            { text: '竞争状态', link: '/golang/race-condition' },
            { text: '锁住共享资源', link: '/golang/lock-race' },
            { text: '通道', link: '/golang/channel' },
          ]
        }
      ],
      '/other/': [
        {
          text: '高程总结',
          collapsable: true,
          children: [
            { text: 'JavaScript简介', link: '/other/projs1' },
            { text: '在HTML中使用JavaScript', link: '/other/projs2' },
            { text: '基本概念', link: '/other/projs3' },
            { text: '变量、作用域和内存问题', link: '/other/projs4' },
            { text: '引用类型', link: '/other/projs5' },
            { text: '面向对象的程序设计', link: '/other/projs6' },
            { text: '函数表达式', link: '/other/projs7' },
          ]
        }
      ],
      '/git/': [
        {
          text: 'Git使用教程',
          collapsable: true,
          children: [
            { text: '创建版本库', link: '/git/create-repo' },
            { text: '时光穿梭机', link: '/git/timetrans' },
            { text: '远程仓库', link: '/git/remoterepo' },
            { text: '分支管理', link: '/git/branchmange' },
            { text: '贮存', link: '/git/stash' },
            { text: '关联远程', link: '/git/relate-to-remote' },
            { text: '删除已有', link: '/git/rm-has-pushed' },
            { text: '强制合并', link: '/git/merge' },
            { text: '删除远程分支', link: '/git/delete-remote-branch' },
            { text: 'git文件/文件夹大小写问题', link: '/git/ignorecase' },
            { text: '修改某次commit message', link: '/git/recommit' },
          ]
        }
      ],
      '/redis/': [
        {
          text: 'Redis简单了解',
          collapsable: true,
          children: [
            { text: 'Redis数据类型', link: '/redis/basic' },
            { text: 'String类型', link: '/redis/string' },
            { text: 'List类型', link: '/redis/list' },
            { text: 'Set类型', link: '/redis/set' },
            { text: 'Hash类型', link: '/redis/hash' },
            { text: 'Sort Set类型', link: '/redis/sort-set' },
            { text: '其他内容（String类型）', link: '/redis/other' },
          ]
        }
      ],
      '/docker/': [
        {
          text: 'Docker',
          collapsable: true,
          children: [
            { text: 'Docker起步', link: '/docker/start' },
            { text: 'Docker容器', link: '/docker/container' },
            { text: 'Docker数据管理', link: '/docker/datamanage' },
            { text: '端口映射和容器互联', link: '/docker/port-react' },
            { text: '使用Dockerfile创建镜像', link: '/docker/dockerfile' },
          ]
        }
      ],
      '/algorithm/': [
        {
          text: 'Algorithm',
          collapsable: true,
          children: [
            { text: '单向链表', link: '/algorithm/signal-chain-list' },
            { text: '刷题方法', link: '/algorithm/other' },
          ]
        }
      ],
      '/design-patterns/': [
        {
          text: 'DesignPatterns',
          collapsable: true,
          children: [
            { text: '设计模式', link: '/design-patterns/tutorial' },
            { text: '单例模式', link: '/design-patterns/singleton' },
            { text: '简单工厂模式', link: '/design-patterns/simple-factory' },
            { text: '工厂方法模式', link: '/design-patterns/factory-method' },
            { text: '抽象工厂模式', link: '/design-patterns/abstract-factory' },
            { text: '原型模式', link: '/design-patterns/prototype' },
            { text: '建造者模式', link: '/design-patterns/builder' },
            { text: '适配器模式', link: '/design-patterns/adaptor' },
            { text: '桥接模式', link: '/design-patterns/bridge' },
            { text: '装饰者模式', link: '/design-patterns/decorator' },
            { text: '组合模式', link: '/design-patterns/compose' },
            { text: '外观模式', link: '/design-patterns/facade' },
            { text: '享元模式', link: '/design-patterns/flyweight' },
            { text: '代理模式', link: '/design-patterns/proxy' },
            { text: '模板方法模式', link: '/design-patterns/template' },
            { text: '命令模式', link: '/design-patterns/command' },
            { text: '迭代器模式', link: '/design-patterns/iterator' },
            { text: '观察者模式', link: '/design-patterns/observer' },
            { text: '中介者模式', link: '/design-patterns/mediator' },
            { text: '备忘录模式', link: '/design-patterns/memento' },
            { text: '解释器模式', link: '/design-patterns/expression' },
            { text: '状态模式', link: '/design-patterns/state' },
            { text: '策略模式', link: '/design-patterns/strategy' },
            { text: '职责链模式', link: '/design-patterns/chain-of-responsibility' },
          ]
        }
      ],
      '/mysql/': [
        {
          text: 'Mysql',
          collapsable: true,
          children: [
            { text: 'Mysql相关', link: '/mysql/' },
          ]
        }
      ],
      '/interview/': [
        {
          text: '面试总结',
          collapsable: true,
          children: [
            { text: '2019-01-09', link: '/interview/2019-01-09' },
            { text: '2020-08-30', link: '/interview/2020-08-30' },
          ]
        }
      ],
      '/vue/': [
        {
          text: 'Vue',
          collapsable: true,
          children: [
            { text: 'hook执行顺序', link: '/vue/hooks-calling-order' },
            { text: 'vue生命周期', link: '/vue/lifecycle' },
          ]
        }
      ],
      '/functional/': [
        {
          text: 'Functional',
          collapsable: true,
          children: [
            { text: '函数式编程', link: '/functional/' },
          ]
        }
      ],
      '/others/': [
        {
          text: 'Others',
          collapsable: true,
          children: [
            { text: 'Mac降级问题', link: '/others/' },
          ]
        }
      ],
    }
  }
})
