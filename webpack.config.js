module.exports = {
  entry: './dist/webpack',
  output: {
    path: __dirname,
    filename: 'tweed-router.min.js',
    library: 'TweedRouter',
    libraryTarget: 'umd'
  },
  devtool: 'source-map'
}
