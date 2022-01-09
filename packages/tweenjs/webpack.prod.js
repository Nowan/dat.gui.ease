const webpack = require("webpack");
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const TerserPlugin = require("terser-webpack-plugin");
const fs = require("fs");

const licenseText = fs.readFileSync('./LICENSE', 'utf8');

module.exports = env => {
    return merge(common(env), {
        mode: 'production',

        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        format: {
                            comments: /@license/i,
                        },
                    },
                    extractComments: false
                })
            ],
        },

        plugins: [
            new webpack.BannerPlugin(`@license ${licenseText}`)
        ]
    });
};