const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TSLintPlugin = require('tslint-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin")

const isProduction = process.env.NODE_ENV === "production"

const getStyleLoaders = (additionalLoader) => [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader",
    {
        loader: "postcss-loader",
        options: {
            postcssOptions: {
                plugins: [
                    "postcss-preset-env"
                ]
            }
        }
    },
    additionalLoader
].filter(Boolean)

module.exports = {
    entry: path.resolve(__dirname, './src/main.tsx'),
    output: {
        filename: isProduction ? 'static/js/[name].[contenthash:10].js' : 'static/js/[name].js',
        path: isProduction ? path.resolve(__dirname, './dist') : undefined,
        publicPath: isProduction ? '' :'/'
    },
    module: {
        rules: [{
            oneOf: [
                {
                    test: /\.css$/,
                    use: getStyleLoaders()
                },
                {
                    test: /\.less$/,
                    use: getStyleLoaders("less-loader")
                },
                {
                    test: /\.s[ac]ss$/,
                    use: getStyleLoaders("sass-loader")
                },
                {
                    test: /\.styl$/,
                    use: getStyleLoaders('stylus-loader')
                },
                {
                    test: /\.m?tsx?$/,
                    use: [
                        {
                            loader: "ts-loader"
                        }
                    ],
                    exclude: /node_modules/
                }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        }),
        new TSLintPlugin({
            files: ['./src/**/*.ts', './src/**/*.tsx']
        }),
        isProduction && new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:10].css',
            chunkFilename: 'static/css/[name].[contenthash:10].chunk.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "./public"),
                    to: path.resolve(__dirname, "./dist"),
                    globOptions: {
                        ignore: "**/public/index.html"
                    }
                }
            ],
        })
    ],
    devServer: {
        host: '0.0.0.0',
        port: '8080',
        historyApiFallback: true
    },
    mode: 'development',
    devtool: "cheap-module-source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".jsx", ".js", ".json"]
    }
}