var React = require('react');
var DateTime = require('react-datetime');
var moment = require('moment');
var countdown = require('moment-countdown');

require('react-datetime/css/react-datetime.css');

var Timer = React.createClass({
  getInitialState: function(){
    return {
      endTime: moment().add(24, 'hours').format('YYYY-MM-DD HH:mm'),
      timeRemaining: '',
      countdownEnabled: true,
    }
  },
  handleInputChange: function(data) {
    var timedateFormatted = moment(data).format('YYYY-MM-DD HH:mm')
    
    this.setState({
      endTime: timedateFormatted
    })
  },
  setTimeRemaining:function() {
    // e.preventDefault();
    if (this.state.countdownEnabled) {
      var endTime = this.state.endTime;
      var timeRemaining = moment(endTime).countdown();
      var formData = {};

      timeRemaining = timeRemaining.hours + 'h ' + timeRemaining.minutes + 'm';

      // debug
      // timeRemaining = timeRemaining.hours + 'h ' + timeRemaining.minutes + 'm ' + timeRemaining.seconds + 's' ;
      
      this.setState({
        timeRemaining: timeRemaining,
        timerRunning: true
      });

      formData = {timeRemaining: timeRemaining}
   
      fetch('http://localhost:3000/update',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      }).then(function(response){
        console.log('timeRemaining: ' + response.status)
      }).catch(function(err) {
        console.log(err)
      });
    } else {
      console.log('countdown is stopped');
    }
  },
  runCountdown: function(e) {
    e.preventDefault();
    this.setState({
      countdownEnabled: true
    });
    this.setTimeRemaining();
    setInterval(this.setTimeRemaining, 60000);

    // debug
    // setInterval(this.setTimeRemaining, 2000);
    
  },
  stopCountdown: function(){
    this.setState({
      countdownEnabled: false
    });
  },

  render: function(){
    return (
      <form onSubmit={this.runCountdown}>
        <div className="row">
          <div className="col-lg-6">
            <div className="input-group">
              <label>End Date & Time</label>
              <DateTime onChange={this.handleInputChange} defaultValue={moment().add(24, 'hours')} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <button type="submit" className="btn btn-default"> Start </button>
            <button type="button" onClick={this.stopCountdown} className="btn btn-default"> Stop </button>
          </div>
        </div>
      </form>
    )
  }
});

module.exports = Timer;
