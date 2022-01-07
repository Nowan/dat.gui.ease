const packageConfig = require("./package.json");
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
    const isDevMode = !!env.dev;

    return {
        entry: {
            [packageConfig.name]: path.join(__dirname, 'src', 'index.js')
        },

        output: {
            library: 'datGuiEase',
            libraryTarget: 'umd',
            filename: '[name].min.js',
            clean: true
        },
    
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css',
            })
        ],

        resolve: {
            modules: [
                'node_modules',
                path.join(__dirname, 'src')
            ]
        },

        externals: {
            "dat.gui": {
                commonjs: 'dat.gui',
                commonjs2: 'dat.gui',
                amd: 'dat.gui',
                root: 'dat'
            }
        },

        module: {
            rules: [
                {
                    test: /\.?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            compact: !isDevMode
                        }
                    }
                },

                {
                    test: /\.s?css/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: isDevMode
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevMode
                            }
                        }
                    ]
                },

                {
                    test: /\.html$/i,
                    loader: 'html-loader'
                }
            ]
        }
    };
};
