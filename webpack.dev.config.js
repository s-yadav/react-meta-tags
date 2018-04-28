module.exports = {
  entry: {
    'bundle' : [
      './examples/client.js'
    ]
  },
  devtool: "eval",
  debug: true,
  output: {
    publicPath: "http://localhost:9000/",
    // path: path.join(__dirname, "public","js"),
    filename: '[name].js'
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  resolve: {
    extensions: ['','.js'] //can add jsx also but not required
  },
  module: {
    loaders: [
      {test: /\.js$/, loaders:['babel','eslint-loader'], exclude: /node_modules/},
    ]
  }
};
