module.exports = {
    entry:{
        index:'./src/js/index.js',
        goods:'./src/js/goods.js'

    },

    output:{
        filename:'[name].js',
        path:__dirname + '/out',
        publicPath:'http://localhost:8080/out',
    },

    module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.(jpg|png|svg|ttf|woff|eot)$/,use:['url-loader']},
            {test:/\.js$/,use:['babel-loader']},
            
            ],

    },

    plugins:[],

    mode:'development',
}