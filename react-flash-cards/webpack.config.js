var HTMLWebpackPlugin=require('html-webpack-plugin');
var HTMLWebpackPluginConfig=NEW HTMLWebpackPlugin({
  template: __dirname + 'dist/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: __dirname + '/dist/script.js',
  module: {
    loaders:[
      {
        loader:'babel-loader'
      }
    ]
  },
  output:{
    filename: 'transformed.js',
    path: __dirname + '/build'
  },
  plugins:[HTMLWebpackPluginConfig]
};
