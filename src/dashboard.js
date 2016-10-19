var React = require('react');
var ReactDOM = require('react-dom');

var Panel = require('./components/panels/Panel');
var GameDetails = require('./components/panels/GameDetails');
var DonationInfo = require('./components/panels/DonationInfo');


var Dashboard = React.createClass({
  render: function() {
    return (
      <div>
        <Panel title="Game Details">
          <GameDetails />
        </Panel>
        <Panel title="Donation Details">
          <DonationInfo />
        </Panel>
        <Panel title="Timer">

        </Panel>
      </div>
    )
  }
});

ReactDOM.render(
  <Dashboard />,
  document.getElementById('app')
)
