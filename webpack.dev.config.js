var path = require('path');
const Dotenv = require('dotenv-webpack');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  // mode: 'development',
  entry: './client/src/index.jsx',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  plugins: [
    new Dotenv({
      path: './.env', // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true // hide any errors
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