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
            library: 'datGuiEaseVelocityJS',
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
            "velocity-animate": {
                commonjs: 'velocity-animate',
                commonjs2: 'velocity-animate',
                amd: 'velocity-animate',
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
