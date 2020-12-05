module.exports = {
    // 基本路径  
    publicPath: '',
    // 输出路径   
    outputDir: 'dist',
    // 静态资源    
    assetsDir: './',
    // eslint-loader是否在保存时候检查  
    lintOnSave: true,
    // 服务项配置    
    devServer: {
        host: 'localhost',
        port: 8080,
        https: false,
        open: true,
        // 设置代理proxy
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: process.env.VUE_APP_SERVICE_URL, //localhost:3000',
                changeOrigin: true, //表示是否跨域，
                pathRewrite: { //表示需要rewrite重写的
                    ["^" + process.env.VUE_APP_BASE_API]: ""
                }
            }
        }
    },
    //关闭esLint
    lintOnSave: false,
    // 打包时不会生成 .map 文件，加快打包速度
    productionSourceMap: false
}