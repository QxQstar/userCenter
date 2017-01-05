/**
 * Created by Administrator on 2016/10/19.
 */
/**
 * Created by Administrator on 2016/10/19.
 */
var extractTextWebpack = require('extract-text-webpack-plugin');
var webpack = require('webpack');
module.exports = {
    entry:{
        'buildBase':'./app/js/base.js',
        'jQuery':['jquery']
    },
    output:{
        path:'./app/',
        filename:'js/[name].js',
        library:'jQuery',
        libraryTarget:'umd'
    },
    module:{
        loaders:[
            {
                test:/\.css/,
                loader:extractTextWebpack.extract('style','css')
            },
            {
                test:/\.(png|jpg|jpge)$/,
                loader:'url?limit=5000&name=img/[name].[ext]'
            }
        ]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:'jQuery',
            filename:'js/webpackJquery.js'
        })
    ]
};