const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// webpack.config.js
const webpack = require('webpack')

//Переменные
const appPath = path.join(__dirname);
// Основной JS файл в который мы будем подключать все, что нам необходимо
const jsPath = path.join(appPath, "./src/index.js");

module.exports = {
  entry:{
    main: jsPath,
  },
  output:{
    filename: '[name].bundle.js',
    path: appPath + '/build',
  },
  // loaders:[

  // ],
  plugins:[
    new HtmlWebpackPlugin({
      title: 'React Test',
      template: path.resolve(appPath, './src/index.html'), // шаблон
      filename: 'index.html', // название выходного файла
    }),
    new CleanWebpackPlugin(),
    // применять изменения только при горячей перезагрузке
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
        // JavaScript
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        },
          // CSS, PostCSS, Sass
          {
            test: /\.(scss|css)$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        },
         // изображения
         {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          // type: 'asset/resource',
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
        // шрифты и SVG
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
    ],
  },
  mode: 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(appPath, './src'),
        open: true,
        compress: true,
        hot: true,
        port: 3228,
    },
}
