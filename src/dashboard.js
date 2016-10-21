var React = require('react');
var ReactDOM = require('react-dom');

var Panel = require('./components/panels/Panel');
var SubmissionForm = require('./components/SubmissionForm');
var DonationInfo = require('./components/panels/DonationInfo');

var InputText = require('./components/InputText.js');


var Dashboard = React.createClass({

  render: function() {
    return (
      <div>
        <Panel title="Game Details">
          <SubmissionForm>
            <InputText label="Current Game" placeholder="Current Game" name="currentGame" />
            <InputText label="Next Game" placeholder="Next Game" name="nextGame" />
          </SubmissionForm>
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
