const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'cquery.js',
    path: path.join(__dirname, '/dist'),
    library: 'cquery',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  devtool: 'source-map',
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
  resolve: {
    alias: {
      '@': path.join(__dirname, './src')
    }
  },
  plugins: [],
  node: false,
  target: 'web'
};
