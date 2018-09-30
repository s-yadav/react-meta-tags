module.exports = {
  entry: {
    'bundle' : [
      './examples/client.js'
    ]
  },
  devtool: "eval",
  output: {
    //publicPath: "http://localhost:9000/",
    // path: path.join(__dirname, "public","js"),
    filename: '[name].js'
  },
  devServer: {
    //contentBase: path.join(__dirname, 'dist'),
    port: 9010,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader','eslint-loader'],
        exclude: /node_modules/,
      }
    ]
  },
};
