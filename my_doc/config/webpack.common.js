const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); // 清理dist


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'), //必须是绝对路径
        filename: 'bundle.[hash].js',
        publicPath: '/' //通常是CDN地址
    },
    mode: isDev ? 'development' : 'production',

    devtool: 'cheap-module-eval-source-map', //开发环境下使用  正式none source-map
    module: {
        rules: [{
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.txt$/,
                use: [{
                    loader: path.resolve(__dirname, './src/txt-loader.js'),
                    options: {
                        name: '17'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240, //10K 资源大小小于 10K 时，将资源转换为 base64
                        esModule: false
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        //数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
            hash: true, //是否加上hash，默认是 false
            config: {
                title: '测试',
                needCommonCsss: false
            }
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin({
            //cleanOnceBeforeBuildPatterns:['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
        })
    ]
}