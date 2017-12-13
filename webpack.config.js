const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // Each entry in here would declare a file that needs to be transpiled
    // and included in the extension source.
    // For example, you could add a background script like:
    // background: './src/background.js',
    popup: ['babel-polyfill', './src/popup.js'],
    content: './src/content.js',
    background: ['babel-polyfill', './src/background.js'],
  },
  output: {
    // This copies each source entry into the extension dist folder named
    // after its entry config key.
    path: 'extension/dist',
    filename: '[name].js',
  },
  module: {
    // This transpiles all code (except for third party modules) using Babel.
    loaders: [
        {
          exclude: /node_modules/,
          test: /\.js$/,
          // Babel options are in .babelrc
          loader: 'babel-loader',
          query: {
            presets:[ 'es2015', 'stage-2', 'react' ]
          }
        },
        { test: /\.css$/, loader: "style-loader!css-loader" },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
          loader: 'base64-font-loader'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        }
    ],
  },
/*  babel: {
    presets: ["es2015", "stage-2"],
    plugins: ['transform-object-rest-spread']
  },*/
  resolve: {
    // This allows you to import modules just like you would in a NodeJS app.
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve(__dirname),
    ],
    modulesDirectories: [
      'src',
      'node_modules',
    ],
  },
  plugins: [
    // Since some NodeJS modules expect to be running in Node, it is helpful
    // to set this environment var to avoid reference errors.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  ],
  // This will expose source map files so that errors will point to your
  // original source files instead of the transpiled files.
  devtool: 'sourcemap',
  //devtool: false,
};
