const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = require('./env.config.js').development;

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  context: path.resolve(__dirname, 'src'),
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    './js/index.js',
    './styles/main.scss'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
        use: ['style-loader', 'css-loader', 'sass-loader']
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
        'NODE_ENV': JSON.stringify('development'),
        'PUSHER_KEY': JSON.stringify(config.PUSHER_KEY),
        'SERVER_URL': JSON.stringify(config.SERVER_URL),
        'CHANNEL_NAME': JSON.stringify(config.CHANNEL_NAME)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' })
  ],
  devServer: {
    contentBase: './dist',
    watchOptions: {
      aggregateTimeout: 100,
      poll: 300
    },
    historyApiFallback: {
      index: 'index.html'
    },
    hot: true,
    host: '0.0.0.0',
    port: 8080
  }
};