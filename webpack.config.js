const Path = require('path'); // 从node上导入path
const VueLoaderPlugin = require('vue-loader/lib/plugin');  // webpack 4版本之后加的，之前的版本不需要这个
const isDev = process.env.NODE_ENV === 'development';
const Webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin'); // 引入模板渲染插件

let config = {
    target: 'web',
    entry: Path.resolve(__dirname, './src/index.js'), // 以join拼接path的形式配置绝对路径,相对路径打包后找不到会报错
    output: {
        filename: 'vendor.build.js',
        path: Path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1024, // 判断图片的大小   如果小于1024就会转换成base64
                    name: '[name].[ext]' // 输出图片的名字  ext是扩展名
                }
            }
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new Webpack.DefinePlugin({
            'process-env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: Path.resolve(__dirname, './index.html'),
            hash: true
        })
    ]
};

if (isDev) {
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
        port: 8088,
        host: '127.0.0.1',
        overlay: {
            errors: true
        },
        compress: true,
        hot: true,
        hotOnly: true
    };
    config.plugins.push(new Webpack.HotModuleReplacementPlugin());
}

module.exports = config;