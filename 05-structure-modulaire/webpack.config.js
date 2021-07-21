const webpack = require('webpack');
const HttpsProxyAgent = require('https-proxy-agent');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const fs = require('fs');

let proxyAgent = !!process.env.http_proxy ? new HttpsProxyAgent(process.env.http_proxy) : null;
let apiHost = process.env.API_HOST;
let isProdBuild = process.env.NODE_ENV === 'production';

const srcDir = './src',
      outDir = './dist';

let webpackConfig = {
  entry: path.join(path.resolve(srcDir), 'app.js'),
  output: {
    path: path.resolve(outDir),
    filename: 'dist/app.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
         {
            loader: 'css-loader',
            options: {
              minify: isProdBuild
            }
          }
        ]
      },
      {
        test: /\.(html|png|gif|jpg|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /index\.html/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          context: 'src'
        }
      },
      {
        test: /index\.html/,
        loader: 'file-loader',
        options: {
          name: 'index.html'
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  },
    plugins: [
    new Dotenv({
      path: './.env', // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
      defaults: false // load '.env.defaults' as the default values if empty.
    }),
    new CleanWebpackPlugin(outDir),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ['popper.dist', 'default']
    })
  ],
  devtool: isProdBuild ? 'source-map' : '#inline-source-map',
  devServer: {
    port: 4200,
    proxy: {
      "/api": {
        target: `http://${apiHost}`,
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
        agent: proxyAgent
      }
    }
  }
}

if ( isProdBuild ) {
  webpackConfig.plugins.push(
    new UglifyJsPlugin({
      sourceMap: true
    })
  )
}

module.exports = webpackConfig
