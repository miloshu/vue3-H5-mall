# h5商城
vue3.0 + vite + vant3.0 + TypeScript

### 1. vite proxy不生效
   解决方案：
   vite版本升级，由^1.0.0-rc.1升级至^1.0.0-rc.9

### 2. 适配方案： postcss-pxtorem

### 3. vant3.0 按需引入
 ```
 |———— public
 |     |———— favicon    #网站icon图标
 |———— src
 |     |———— api        #api接口请求
 |     |———— assets     #静态资源目录
 |     |———— components #公共组件封装
 |     |———— layout     #主目录
 |     |———— plugin     #插件(vant)
 |     |———— router     #路由
 |     |———— store      #状态管理
 |     |———— util       #工具类
 |     |———— views      #组件以及页面文件目录
 |     |———— App.vue    #项目入口文件 使用标签<route-view>渲染整个工程的.vue组件
 |     |———— main.ts    #项目核心文件
 |———— postcss.config   #PostCSS 配置
 |———— babel.config.js  #babel常用配置
 |———— vite.config.js   #vite常用配置项 
 |———— index.html       #设置项目的一些meta头信息和提供<div id="app">用于挂载 vue 节点。
 |———— package.json     #项目配置文件 用于node_modules资源包和启动、打包项目的npm命令管理
 |———— README.md        #项目的说明文档，markdown 格式
 |———— tsconfig.json    #编译typeScript语言时遵循的编译规则配置。
 |———— shim.d.ts        #是为typescript做的适配定义文件，让 ts 识别 .vue 文件

 ```

 编译typeScript语言时遵循的编译规则配置。

### 4.1. 首页
   4.1.1 头部搜索
   点击搜索框进入搜索中心页面, 输入内容, 按下键盘后调用后台模糊搜索接口, 获取到相关内容后, 下方显示商品列表名称, 点击某一项内容带上商品id跳转到商品列表详情页面, 点击取消按钮则返回上一级页面。
   4.1.2 轮播图
   使用vantUI 轮播图组件<van-swipe>, 展示轮播图指示器小圆点, 默认循环播放
   点击图片, 跳转商品列表详情。
   4.1.3 分类
   1. 使用flex弹性布局, 一行展示,  点击图标跳转商品分类列表页面;
   2. 楼层数据展示, 点击图片携带分类名称, 进入商品列表页;

### 4.2. 商品分类列表
   头部搜索, 点击跳转搜索中心, 搜索内容点击某项商品跳转商品详情, 点击取消返回上一级页面, 左侧展示分类名称, 右侧为分类的商品,  点击左侧商品分类名称, 则右侧展示该类数据, 每次点击分类右侧列表滚动条滚至最上方, 点击右侧分类产品携带goods_id,跳转至商品列表详情页。
   由于分类列表数据量大, 为了提高性能, 加快页面加载速度, 更好的用户体验, 在onMounted钩子函数里面处理数据逻辑: 
   1. 获取缓存的数据, 判断有无旧数据 { time: Date.now(), data: [...] } 
   2. 没有旧数据则发送新的请求获取新数据
   3. 有旧数据, 且旧数据没有过期, 定义过期时间为60s, 如已过期, 则发送请求, 
   否则就用本地存储中的旧数据
### 4.2.1 商品列表
   进入该页面后隐藏tab-bar导航栏, 点击左上方返回按钮, 返回上一页, tab切换, 分别为: 综合、销量、价格。点击选中的行数据则跳转商品列表详情页。
   4.2.2 商品列表详情
   进入该页面后隐藏tab-bar导航栏, 点击左上方返回按钮, 返回上一页, 页面功能有轮播图、收藏、联系客服(只展示按钮)、分享、购物车、加入购物车、立即购物(只展示按钮), 点击轮播图, 预览大图, 点击购物车则跳转购物车页, 点击分享按钮显示分享弹窗, 点击加入购物车, 则往购物车添加一条该商品, 购物车图标右上方显示微标数量红色字体显示;
   功能实现: 
   进入页面后, onMounted钩子函数中先获取缓存中的商品列表数据, 然后判断当前商品是否已加入到购物车里, 同时加载缓存中的商品收藏数据, 再判断当前商品是否已被收藏;
   点击轮播图的图片, 大图弹窗展示, 绑定点击事件, 调用previewImage组件, 左右滑动可快速预览上一张, 下一张图片;
   点击收藏图标, 判断当前商品如果已收藏, 则展示实底红色样式图标, 获取缓存中的商品数据, 判断该商品是否被收藏过, 如已被收藏, 在数组中删除该商品, 弹窗提示, 如未被收藏, 则往数组中push, 最后把收藏数组存入到缓存中;
### 4.3购物车
   头部为收货地址, 下方为购物车列表, 点击+-按钮可增减商品数量,多选框勾选商品, 可点击全选切换反选, 合计所选商品价格总计, 提交订单到订单付款页面;
   功能实现: 
   页面加载完毕, 先判断用户是否成功登录, 登录成功则返回token令牌, 否则显示添加收货地址按钮进行添加地址, 获取本部存储中的地址数据, 把数据设置给data中的一个变量, 最后把购物车的数据填充回data中; 
   全选功能逻辑实现: 1). 首先取缓存中的购物车商品数据; 2). 如所有的商品都被选中, checked为true 则全选被选中; 
   总价格和总数量实现: 1). 都需商品被勾选中才去计算; 2). 获取购物车数据后遍历, 判断该商品是否被选中; 3). 总价格 = 总价格 + 商品单价 * 商品数量; 4). 总数量 = 总数量 + 商品数量; 5) 把计算后的数量和价格设置回数据中; 
   商品的选中功能逻辑: 1). 绑定change事件; 2). 获取到被修改的商品对象; 3). 商品对象的选中状态 进行取反 4).重新填充回data和缓存中 5). 重新计算总价格和总数量
### 4.4 收货地址
   进入购物车页先判断改用户是否已成功登陆, 未登陆则显示添加地址按钮, 点击按钮跳转地址新增页, 点击提交订单判断是否登陆, 否则跳转登陆页, 点击添加地址按钮进入收货地址主页, 上方展示地址信息列表, 下方展示添加新地址按钮, 点击新地址按钮后进入地址新增页, 保存或点击返回按钮则返回地址列表, 点击列表右侧编辑图标则跳转地址编辑页; 选中地址列表某一项时则跳至购物车页, 填充回收货人地址信息;
### 4.5 订单支付
   用户成功登陆后, 进入购物车, 选购商品, 点击提交订单, 跳转支付订单页面; 
   逻辑处理: 
   1.判断有没有收货地址信息;  
   2.判断用户有没有选购商品到购物车; 
   3.满足条件1和2后, 则跳转到支付订单页面;

### 4.6 我的页
我的页(个人中心)包含用户头像、历史足迹、我的订单、收货地址管理、应用信息相关三部分组成。历史足迹分为: 收藏的店铺、收藏的商品、关注的店铺、我的足迹; 我的订单分为: 全部订单、待付款、待收货、退款/退货; 应用信息分为: 联系客服, 意见反馈, 关于我们。
## 文章
```
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

12. [https://blog.csdn.net/qq_37800886/article/details/102934319](TypeScript报错解决--Property 'target' does not exist on type 'typeof Dep'.ts(2339))
```
