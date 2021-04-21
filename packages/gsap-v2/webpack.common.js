const packageConfig = require("./package.json");
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {
    const isDevMode = !!env.dev;

    return {
        entry: {
            [packageConfig.name]: path.join(__dirname, 'src', 'index.js')
        },

        output: {
            library: 'datGuiEaseGsapV2',
            libraryTarget: 'umd',
            filename: '[name].min.js',
            clean: true
        },

        resolve: {
            modules: [
                'node_modules',
                path.join(__dirname, 'src')
            ]
        },

        externals: {
            "dat.gui.ease": {
                commonjs: 'dat.gui.ease',
                commonjs2: 'dat.gui.ease',
                amd: 'dat.gui.ease',
                root: 'datGuiEase'
            },
            "gsap": {
                commonjs: 'gsap',
                commonjs2: 'gsap',
                amd: 'gsap',
                root: 'window'
            }
        },

        module: {
            rules: [
                {
                    test: /\.?js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            compact: !isDevMode
                        }
                    }
                }
            ]
        },

        plugins: [
            new CleanWebpackPlugin()
        ]
    };
};
