// postcss.config.js 用于将单位转化为 rem lib-flexible 用于设置 rem 基准值
// 用 vite 创建项目，配置 postcss 需要使用 post.config.js
// 具体配置可以去 postcss-pxtorem 仓库看看文档
// PostCSS 配置
// module.exports = {
//   "plugins": {
//     "autoprefixer": {
//       "browsers": ['Android >= 4.0', 'iOS >= 8'],
//     },
//     "postcss-pxtorem": {
//       rootValue: 16,
//       propList: ['*'],
//       selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
//     }
//   }
// }