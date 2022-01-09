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
            library: 'datGuiEaseAnimeJS',
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
            "@tweenjs/tween.js": {
                commonjs: '@tweenjs/tween.js',
                commonjs2: '@tweenjs/tween.js',
                amd: '@tweenjs/tween.js',
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
