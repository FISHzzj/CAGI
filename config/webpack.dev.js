const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const os = require("os");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const px2rem = require('postcss-px2rem');
const autoprefixer = require("autoprefixer");


module.exports = {
  entry: {
    app: [
      "babel-polyfill",
      "./src/index.js",
      "./src/pages/home/index.jsx",
      "./src/pages/home/categorys/index.jsx"
    ],
    vendor: ["react", "better-scroll", "react-redux", "react-lazyload"]
  },
  output: {
    filename: "[name].[hash:8].js",
    path: resolve(__dirname, "../build")
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        include: resolve(__dirname, "/src/js"),
        loader: "eslint-loader"
      },
      {
        oneOf: [
          {
            test: /\.(html)$/,
            loader: "html-loader"
          },
          {
            test: /\.(js|jsx)$/,
            use: [
              // {
              //   loader: "thread-loader",
              //   options: {
              //     workers: os.cpus().length
              //   }
              // },
              {
                loader: "babel-loader",
                options: {
                  //jsx语法
                  presets: [
                    
                    "@babel/preset-react",
                    //tree shaking 按需加载babel-polifill
                    [
                      "@babel/preset-env",
                      { modules: false, useBuiltIns: "entry", corejs: 2 }
                    ]
                  ],
                  plugins: [
                    //支持import 懒加载
                    "@babel/plugin-syntax-dynamic-import",
                    //andt-mobile按需加载  true是less，如果不用less style的值可以写'css'
                    ["import", { libraryName: "antd-mobile", style: true }],
                    //识别class组件
                    ["@babel/plugin-proposal-class-properties", { loose: true }]
                  ],
                  cacheDirectory: true
                }
              }
            ],
          },
          {
            test: /\.(less|css)$/,
            use: [
              { loader: "style-loader" },
              {
                loader: "css-loader",
                options: {
                  modules: false,
                  localIdentName: "[local]--[hash:base64:5]"
                }
              },
              {
                loader: "less-loader",
                options: { javascriptEnabled: true }
              }
            ]
          },
          {
            test: /\.(jpg|jpeg|bmp|svg|png|webp|gif)$/,
            loader: "url-loader",
            options: {
              limit: 200000,
              name: "[name].[hash:8].[ext]"
            }
          },
          {
            exclude: /\.(js|json|less|css|jsx)$/,
            loader: "file-loader",
            options: {
              outputPath: "media/",
              name: "[name].[hash].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HardSourceWebpackPlugin()
  ],
  mode: "development",
  devServer: {
    contentBase: "../public",
    open: true,
    port: 9000,
    hot: true,
    // proxy:{
    //   '/api':{
    //     target: 'http://cagi.315red.com.cn',
    //     pathRewrite:{
    //       '^/api':'' //替换代理地址中的/api
    //     },
    //     secure:false, //设置证书免校验
    //     changeOrigin:true, //确保请求主机名是：http://cagi.315red.com.cn
    //   }
    // }

  },
  resolve: {
    extensions: [".js", ".json", ".jsx"],
    alias: {
      '@src': resolve('src'),
      '@component': resolve('src/components'),
      '@api': resolve('src/api'),
      '@static': resolve('static'),
    }
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: "all"
    }
  },
};
