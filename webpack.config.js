const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: ['css-loader', 'sass-loader'],
          publicPath: '/dist',
        }),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html',
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: false,
      allChunks: true,
    }),
  ],
};
