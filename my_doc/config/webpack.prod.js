const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const prodConfig = {
    devtool: 'none', //开发环境下使用 none source-map
}
module.exports = merge.merge(common,prodConfig);