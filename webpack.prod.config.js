var path = require('path');
var webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  // mode: 'production',
  devtool: 'source-map',

  entry: './client/src/index.jsx',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'DB_USER': JSON.stringify('dbGoodFlix'),
        'DB_PASS': JSON.stringify('helloworld1'),
        'DB_SERVER': JSON.stringify('ds133601.mlab.com:33601/heroku_pn2wqhdh')
      }
    })
  ],
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
  },
  // "url" loader works like "file" loader except that it embeds assets
  // smaller than specified limit in bytes as data URLs to avoid requests.
  // A missing `test` is equivalent to a match.
  {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: require.resolve('url-loader'),
    options: {
      limit: 10000,
      name: 'static/media/[name].[hash:8].[ext]',
    },
  },
  // "file" loader makes sure assets end up in the `build` folder.
  // When you `import` an asset, you get its filename.
  {
    test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
    loader: require.resolve('file-loader'),
    options: {
      name: 'static/media/[name].[hash:8].[ext]',
    },
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
