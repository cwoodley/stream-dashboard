var React = require('react');
var ReactDOM = require('react-dom');

var Panel = require('./components/panels/Panel');
var GameDetails = require('./components/panels/GameDetails')

var Dashboard = React.createClass({
  render: function() {
    return (
      <Panel title="Game Details">
        <GameDetails />
      </Panel>
    )
  }
});

ReactDOM.render(
  <Dashboard />,
  document.getElementById('app')
)
