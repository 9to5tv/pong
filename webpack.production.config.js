const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const config = require('./env.config.js').production;

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  context: path.resolve(__dirname, 'src'),
  entry: [
    './js/index.js',
    './styles/main.scss'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader?presets[]=es2015'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name]-[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'PUSHER_KEY': JSON.stringify(config.PUSHER_KEY),
        'SERVER_URL': JSON.stringify(config.SERVER_URL),
        'CHANNEL_NAME': JSON.stringify(config.CHANNEL_NAME)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' }),
    new ExtractTextPlugin('styles.css'),
    new StyleExtHtmlWebpackPlugin(),
    new webpack.optimize.UglifyJsPlugin({ output: { ascii_only: true } })
  ],
};