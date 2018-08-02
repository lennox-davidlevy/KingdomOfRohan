var path = require('path');
var SRC_DIR = path.join(__dirname, '/client');
var DIST_DIR = path.join(__dirname, '/dist');

module.exports = {
    entry: `${SRC_DIR}/index.jsx`,
    output: {
        filename: 'bundle.js',
        path: DIST_DIR
    },
    node: {
      console : false,
      fs: 'empty'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: SRC_DIR,
                loaders: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
            }
        ]
    }
}
