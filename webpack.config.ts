import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";
import * as path from "path";
import * as CopyWebpackPlugin from "copy-webpack-plugin";

const config: webpack.Configuration = {
    mode: "development",
    output: {
        publicPath: "/",
        filename: "bundle.js",
    },
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".png"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                    from: "public/assets",
                    to: "assets"
                }
            ]
        })
    ],
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "build"),
        historyApiFallback: true,
        port: 4001,
        open: true,
        hot: true,
    },
};

export default config;