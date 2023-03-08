const path = require('path');

module.exports = {
  mode: 'production',
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'easy-storage.min.js',
    libraryTarget: 'umd',
  },
};
