module.exports = {
  entry: [
    './client/dashboard/dashboard.js'
  ],
  output: {
    path: __dirname + '/client/dashboard/build',
    filename: "dashboard_bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
}
