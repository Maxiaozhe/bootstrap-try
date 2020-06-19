const path=require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports=(env,options)=>{
    return {
        devtool: "source-map",
        mode:process.env.mode,
        entry:{
            sample: "./src/sample.js"
        },
        resolve: {
            extensions: [".html", ".js"]
        },
        module: {
            rules: [
              {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
              },
              {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: {
                  loader: "file-loader",
                  query: {
                    name: "assets/[name].[ext]"
                  }
                }
              }
            ]
          },
          plugins: [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin([
              {
                to: "sample.css",
                from: "./src/sample.css"
              }
            ]),
            new HtmlWebpackPlugin({
              filename: "sample.html",
              template: "./src/sample.html",
              chunks: ["sample"]
            })
          ],
        devServer: {
            port: process.env.npm_package_config_dev_server_port || 3000,
            disableHostCheck: true
          }
    }
}