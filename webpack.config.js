const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve('./dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: ['babel-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: { jsx: true }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    open: true
  }
};
