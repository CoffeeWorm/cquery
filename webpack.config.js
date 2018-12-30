const path = require('path');
let env = 'development' === process.env.NODE_ENV;
module.exports = {
  entry: './index.js',
  output: {
    filename: 'cquery.js',
    path: path.join(__dirname, '/dist'),
    library: 'util',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  devtool: env ? 'eval-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  plugins: [],
  node: false,
  target: 'web'
};
