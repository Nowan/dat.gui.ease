const packageConfig = require("./package.json");
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {
    const IS_DEV = !!env.dev;

    return {
        entry: {
            [packageConfig.name]: path.join(__dirname, 'src', 'index.js')
        },

        output: {
            library: 'datGUI_Ease',
            libraryTarget: 'umd',
            filename: '[name].min.js'
        },
    
        plugins: [
            new CleanWebpackPlugin()
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
                    exclude: /(node_modules|demo)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            compact: true
                        }
                    }
                },

                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: IS_DEV
                            }
                        },
                    ]
                },

                {
                    test: /\.scss/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: IS_DEV
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: IS_DEV
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
