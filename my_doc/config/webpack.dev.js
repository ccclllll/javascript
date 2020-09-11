const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const devConfig = {
    devServer: {
        port: '3000', //默认是8080
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: "silent", //日志等级
        compress: true //是否启用 gzip 压缩
    },
    devtool: 'cheap-module-eval-source-map', //开发环境下使用 none source-map
}
module.exports = merge.merge(common,devConfig);