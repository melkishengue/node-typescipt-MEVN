const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: '[name].[hash].js',
      path: resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'assets/index.html',
      favicon: 'assets/images/icons8-coollector-48.png'
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      use: [
        "style-loader", // creates style nodes from JS strings
        "css-loader", // translates CSS into CommonJS
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]
    },
    {
      test: /\.vue$/,
      use: 'vue-loader'
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      ]
    },]
  },
  resolve: {
    alias: {
      Components: __dirname + '/src/components/',
      Models: __dirname + '/src/models/',
      Services: __dirname + '/src/services/',
      Src: __dirname + '/src/',
      Assets: __dirname + '/src/assets/'
    }
  },
  devServer: {
    contentBase: join(__dirname, 'dist'),
    port: 9000,
    host: '0.0.0.0',
    inline: true,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },

    // show compile errors
    overlay: true,

    watchContentBase: true,

    // enable HMR on the server
    hot: true,
    // webpack build logs config
    stats: {
      colors: true,
      chunks: false
    }
  },
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000
  }
};