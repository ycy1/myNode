const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/server.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node',
  mode:'development',  //production
  resolve: {
    extensions: ['', '.js', '.sass', '.css', '.hbs'],
    alias: {
      'handlebars': 'handlebars/dist/handlebars.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        include: path.join(__dirname, '/tpl'),
        use: ['handlebars-loader'],
      },
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './src/tpl/template.hbs',
      //hash: true,
      inject: false,
      filename: '/tpl/template.hbs'
    })

  ],
};
