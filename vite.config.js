const { resolve } = require('path');
const proxyPlugin = require('vite-plugin-proxy')
const path = require('path')
const vantTheme = path.resolve(__dirname, "../style/var.scss")
export default {
  alias: {
    '/@/': resolve(__dirname, 'src')
  },
  proxy: {
    '/api': {
      target: 'http://api-hmugo-web.itheima.net',
      changeOrigin: true,
      // ws: true,
      // rewrite: path => path.replace(/^\/api/, ''),
      // pathRewrite: {
      //   '/api': ''
      // },
      // secure: false
    },
    // '/test': {
    //   target: 'https://hn.algolia.com/api/get/',
    //   changeOrigin: true,
    //   secure: false,
    // }
  },
  outDir: 'dist', // 构建输出将放在其中。如果目录存在，它将在构建之前被删除。@default 'dist'
  minify: 'esbuild',// 压缩
  hostname: "localhost",// ip地址
  port: 3001, // 端口号
  open: true, // 是否自动在浏览器打开
  https: false,// 是否开启 https
  ssr: false,//是否服务端渲染
  optimizeDeps: { // 引入第三方的配置
    include: ["vant", "axios"]
  },
  // css相关配置
  css: {
    // 开启 CSS source maps?
    sourceMap: true,
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
    // css预设器配置项
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 'font-size-sm': '13px',
            // 'font-size-md': '15px',
            // 'font-size-lg': '17px',
            'color': '#7232dd',
            'text-color': '#7232dd',
            'border-color': '#7232dd',
            'background-color': '#7232dd',
            'goods-action-button-danger-color': '#7232dd',
            // 'goods-action-button-warning-color': '#3eaf7c'
            // 或者可以通过 scss 文件覆盖（文件路径为绝对路径）
            // hack: `true; @import "your-less-file-path.less";`,
            hack: `true; @import "${vantTheme}"`
          }
        }
      }
    }
  } 
}