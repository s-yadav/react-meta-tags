const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PACKAGE = require('./package.json');
const fullYear = new Date().getFullYear();
const banner = PACKAGE.name + ' - ' + PACKAGE.version + '\n' +
  'Author : '+PACKAGE.author+'\n'+
  'Copyright (c) '+ (fullYear!== 2016 ? '2016,' : '') + fullYear + ' to ' + PACKAGE.author + ' - ignitersworld.com , released under the '+PACKAGE.license+' license.'
  /* +PACKAGE.homepage */;

module.exports = {
  mode: 'production',
  entry: {
    'dist/react-meta-tags' : [
      './src/index.js'
    ],
    'dist/react-meta-tags.min' : [
      './src/index.js'
    ]
  },
  output: {
    // publicPath: "http://localhost:8081/public/js/",
    // path: path.join(__dirname, "public","js"),
    filename: '[name].js',
    libraryTarget : 'umd',
    library : 'MetaTags'
  },
  externals: {
    react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
    'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
  },
  plugins: [
    new webpack.DefinePlugin({
      // This has effect on the react lib size.
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //       include: /\.min\.js$/,
    //       minimize: true
    // }),
    new webpack.BannerPlugin(banner),
    new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader','eslint-loader'],
        exclude: /node_modules/,
      }
    ]
  }
};
