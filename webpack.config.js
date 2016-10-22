
module.exports = {
  entry: [
    './src/dashboard.js'
  ],
  output: {
    path: __dirname + '/public/build',
    filename: "dashboard_bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
}
