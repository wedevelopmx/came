var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

console.log('Searching', path.resolve('./src/js/components'))

module.exports = {
  entry: {
     support: "./src/js/scenes/support/index",
     register: "./src/js/scenes/register/index",
     admin: "./src/js/scenes/admin/index",
     reports: "./src/js/scenes/reports/index"
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
    modules: [path.resolve('./src/js/components'), "node_modules"]
  }
};
