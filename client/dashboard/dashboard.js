var React = require('react');
var ReactDOM = require('react-dom');

var Panel = require('./components/panels/Panel');
var SubmissionForm = require('./components/SubmissionForm');
var InputText = require('./components/InputText.js');

var CountDown = require('./components/panels/Timers/CountDown');
var Ticker = require('./components/panels/Ticker');

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
        <Panel title="Ticker">
          <Ticker />
        </Panel>
        <Panel title="Donation Details">
          <SubmissionForm>
            <InputText label="Top Donator" placeholder="Top Donator" name="donatorTop" />
            <InputText label="Top Donation Amount" placeholder="100" name="donatorTopAmount" />
            <InputText label="Donation Goal" placeholder="2000" name="donationsGoal" />
            <InputText label="Donations Received (amount)" placeholder="200" name="donationsRec" />
            <InputText label="Campaign Page" placeholder="" name="campaignPage" />
          </SubmissionForm>
        </Panel>
        <Panel title="Timers">
          <CountDown />
        </Panel>
      </div>
    )
  }
});

ReactDOM.render(
  <Dashboard />,
  document.getElementById('app')
)
