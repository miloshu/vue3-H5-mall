h5商城
vue3.0 + vite + vant3.0 + TypeScript

1. vite proxy不生效
   解决方案：
   vite版本升级，由^1.0.0-rc.1升级至^1.0.0-rc.9

2. 适配方案： postcss-pxtorem

3. vant3.0 按需引入
 |———— public index.html文件
 |———— src
 |     |———— api        #api接口请求
 |     |———— assets     #资源目录
 |     |———— components #公共组件封装
 |     |———— config     #环境变量配置
 |     |———— layout     #主目录
 |     |———— router     #路由
 |     |———— store      #状态管理
 |     |———— util       #工具类
 |     |———— views      #组件以及页面文件目录
 |     |———— App.vue    #项目入口文件
 |     |———— main.js    #项目核心文件
 |———— .env.development #本地环境配置
 |———— .env.production.js #正式环境配置
 |———— postcss.config   #PostCSS 配置
 |———— babel.config.js  #babel常用配置
 |———— vite.config.js    #vite常用配置项
 |———— package.json     #项目配置文件
 |———— README.md        #项目的说明文档，markdown 格式
<!-- 文章

1. [Module 'xxx' has no default export. ](https://github.com/xcatliu/typescript-tutorial/issues/19)

2. [学习Vue3.0，先从搭建环境开始](https://juejin.im/post/6864324361621995533)

   解决`ts`还没有识别`vue`文件问题

3. [Vue3实战系列：Vue3.0 + Vant3.0 搭建种子项目](https://juejin.im/post/6887590229692121096#heading-2)

4. [10分钟体验Vue3全家桶(Vue3 + VueRouter4 + Vuex4)](https://juejin.im/post/6844904150082256903)
   https://juejin.im/post/6876775762662424590
   拥有不错的实例

5. devtools新版：https://github.com/vuejs/vue-devtools/releases/tag/v6.0.0-beta.1
   旧版是5.3.3

6. [跨域报错： The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.](https://segmentfault.com/q/1010000016904795/a-1020000016904951)

7. [前后端分离后如何继续使用session](http://jimolonely.github.io/2019/09/23/java/072-cors-keep-session/)

8. [js json数组根据相同key值进行分类](https://blog.csdn.net/weixin_41604225/article/details/85060923?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param)
9. [https://github.com/newbee-ltd/newbee-mall-vue3-app](新蜂商城 Vue3 )

10. [https://www.jianshu.com/p/7405a6762e4b](swiper动态渲染数据无法左右滑动（vue）)

11. [https://blog.csdn.net/weixin_41602509/article/details/86661758](Vue 无法读取HTMLCollection列表的length解决)

12. [https://blog.csdn.net/qq_37800886/article/details/102934319](TypeScript报错解决--Property 'target' does not exist on type 'typeof Dep'.ts(2339)) -->
