const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJSON = require('./package.json');

module.exports = {
    mode: 'development',
    output: {
        publicPath: "http://localhost:8090/"
    },
    devServer: {
        port: 8090,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'Container',
            remotes: {
                marketing: 'marketing@http://localhost:8091/remoteEntry.js',
                auth: 'auth@http://localhost:8092/remoteEntry.js',
                dashboard: 'dashboard@http://localhost:8093/remoteEntry.js'
            },
            shared: packageJSON.dependencies
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}