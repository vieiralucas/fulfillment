const path = require('path');

const config = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './src/main'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel'], include: path.join(__dirname, 'src')}
    ]
  }
};

module.exports = config;
