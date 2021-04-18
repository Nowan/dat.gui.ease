const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = env => {
    return merge(common(env), {
        mode: 'development',
        devtool: 'eval'
    });
};
