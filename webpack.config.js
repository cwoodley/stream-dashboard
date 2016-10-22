
module.exports = {
  entry: [
    './client/views/dashboard.js'
  ],
  output: {
    path: __dirname + '/server/public/build',
    filename: "dashboard_bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
}
