const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    entry: "./src/server.ts",
    mode: "production",
    target: "node",
    output: {
        path: path.resolve(__dirname, '.'),
        filename: "server.bundle.js"
    },
    module: {
        rules: [
            {
            test: /\.ts$/,
            exclude: /node_module/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-typescript"],
                }
            },
            }]
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [
         // read the process.env
         new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
         }),
    ],
    externals: {
        "express": "commonjs express",
    }
    
    
}