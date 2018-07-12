var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  // mode: 'development',
  entry: './client/src/index.jsx',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module : {
  rules: [{
    test: /\.jsx?/,
    exclude: /node_modules/,
    include :SRC_DIR,
    use: [{
      loader: 'semantic-ui-react-less-loader'
    }, {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        presets: [
          'es2015',
          'react'
        ]
      }
    }]
  },
  {
    test: /\.css?$/,
    loaders: [ 'style-loader', 'css-loader' ]
  }]


    // loaders : [
    //   {
    //     test : /\.jsx?/,
    //     include: [/node_modules[\/\\]semantic-ui-react/, SRC_DIR],
    //     loaders: ['babel-loader?presets[]=react, presets[]=es2015', 'semantic-ui-react-less-loader']

    //     // loader : 'babel-loader',
    //     // query: {
    //     //   presets: ['react', 'es2015']
    //     // }
    //   },
    //   {
    //     test: /\.css?$/,
    //     loaders: [ 'style-loader', 'css-loader' ]
    //   }
    // ]
  }
  // resolve: {
  //      extensions: ['', '.js', '.jsx', '.css'],
  //      modulesDirectories: [
  //        'node_modules'
  //      ]
  // }
};