module.exports = {
  outputDir: 'vue3Test', // 包名
  // publicPath: process.env.NODE_ENV === 'production' ? '/vue3TS/' : '/',
  // pages: {
  //   index: {
  //     entry: 'src/main.ts' //入口
  //   }
  // },
  lintOnSave: false, //关闭语法检查
  // 代理
  devServer: {
    // open: true, // 是否自动弹出浏览器页面
    // host: "localhost",
    // host: '0.0.0.0',
    // port: '8080',
    // https: false, // 是否使用https协议
    // hotOnly: false, // 是否开启热更新
    // lintOnSave: false,       //关闭eslint
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        pathRewrite: { '^/api': '' },
        // ws:true, //用于支持websocket
        // changeOrigin:true //用于控制请求头中的host值
      },
      '/api2': {
        target: 'http://localhost:5001',
        pathRewrite: { '^/api2': '' },
        // ws:true, //用于支持websocket
        // changeOrigin:true //用于控制请求头中的host值
      }
    }
  }
}