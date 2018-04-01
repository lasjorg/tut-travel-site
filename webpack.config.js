const path = require('path');

module.exports = {
  entry: {
    App: './app/assets/scripts/App.js',
    Vendor: './app/assets/scripts/Vendor.js'
  },
  output: {
    path: path.resolve(__dirname, './app/temp/scripts'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
  /* https://babeljs.io/docs/setup
   * https://webpack.js.org/guides/migrating/#module-loaders-is-now-module-rules
   * https://webpack.js.org/guides/migrating/#what-are-options-
  */
/*   module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  } */
}