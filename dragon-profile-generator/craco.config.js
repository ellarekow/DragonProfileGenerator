const CracoRawLoaderPlugin = require('craco-raw-loader');

module.exports = {
    plugins: [
        {
            plugin: CracoRawLoaderPlugin,
            options: {
                test: /\.(txt)$/,
            },
        },
    ],
};
