const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
    rules: [
        {
        test: /\.css/,
        use: [
            'css-hot-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
        ],
        },
    ] // end rules
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'src/style.css'
        })
    ],
};