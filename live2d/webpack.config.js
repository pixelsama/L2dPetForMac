
var path = require('path');

module.exports = {
  target:'electron-renderer',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@framework': path.resolve(__dirname, './Framework/src')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '.'),
    watchContentBase: true,
    inline: true,
    hot: true,
    port: 5000,
    host: '0.0.0.0',
    compress: true,
    useLocalIp: true,
    writeToDisk: true
  },
  devtool: 'inline-source-map'
}
