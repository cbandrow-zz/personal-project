const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: '#source-map',
  context: __dirname,
   entry: {
     index: ['./app/index.js', 'webpack-hot-middleware/client', 'webpack/hot/dev-server'],
   },
   devtool: 'source-map',
   target: 'web',

   output: {
     path: '/',
     filename: 'bundle.js',
     publicPath: 'http://localhost:3000/app/',
   },

   plugins: [
        new webpack.HotModuleReplacementPlugin()
  ],

   module: {
     loaders: [{
       test: /.jsx?$/,
      //  loader: 'babel-loader',
       loaders: [
                'react-hot',
                'babel?presets[]=react,presets[]=es2015'
            ],
       include: path.join(__dirname, 'app'),
       exclude: /node_modules/,
       query: {
         presets: ['es2015', 'react']
       }
     }]
   },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css']
  }
};
