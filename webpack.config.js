var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
     register: "./src/js/scenes/register/index",
     admin: "./src/js/scenes/admin/index"
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
    root: [ path.resolve('./src/js/components')]
  }
};
