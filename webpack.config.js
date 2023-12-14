const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
    },
    devServer: {
        static: [
            {
                directory: path.join(__dirname, "build"),
            },
            "./src",
            "./public",
        ],
        compress: true,
        port: 3000,
        open: true,
        hot: true,
    },
    watchOptions: {
        poll: 500, // Check for changes every 500ms
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    {
                        loader: "style-loader",
                        options: {
                            insert: "head", // insert style tag inside of <head>
                            injectType: "singletonStyleTag", // this is for wrap all your style in just one style tag
                        },
                    },
                    // Translates CSS into CommonJS
                    "css-loader",
                    "resolve-url-loader",
                    // Compiles Sass to CSS
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true, // <-- !!IMPORTANT!!
                        },
                    },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
            {
                test: /\.(svg|jpg|jpeg|gif|mp3)$/i,
                type: "asset/resource",
                generator: {
                    filename: "[name][ext]",
                },
            },
            {
                test: /\.webp$/i,
                type: "asset/resource",
                generator: {
                    filename: "[name][ext]",
                },
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    sources: {
                        list: [
                            "...",
                            {
                                tag: "a",
                                attribute: "href",
                                type: "srcset",
                            },
                        ],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            inject: 'head',
            scriptLoading: 'blocking',
        }),
    ],
};
