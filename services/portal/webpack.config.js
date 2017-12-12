var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

console.log('Searching', path.resolve('./src/js/components'))

module.exports = {
  entry: {
     support: "./src/js/scenes/support",
     register: "./src/js/scenes/register",
     catalog: "./src/js/scenes/catalog",
     user: "./src/js/scenes/user",
     reports: "./src/js/scenes/reports"
  },
  output: {
     path: path.join(__dirname, "dist/js"),
     filename: "[name].bundle.js"
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    modules: ['node_modules', path.resolve('./src/js/components')],
    // extension: ['', '.js', '.scss']
  }
};
