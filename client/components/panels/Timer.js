var React = require('react');
var DateTime = require('react-datetime');
var moment = require('moment');

require('react-datetime/css/react-datetime.css');

var Timer = React.createClass({
  handleInputChange: function(data) {
    var timedateFormatted = moment(data).format('YYYY-MM-DD HH:mm')
    this.setState({
      emit: {
        endDateTime: timedateFormatted
      }
    })
  },
  handleSubmit: function(e) {
    e.preventDefault();

    formData = this.state.emit;

    console.log(formData);

    fetch('http://localhost:3000/update',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    }).then(function(response){
      console.log(response.status)
    }).catch(function(err) {
      console.log(err)
    });
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <div className="input-group">
              <label>End Date & Time</label>
              <DateTime onChange={this.handleInputChange} defaultValue={moment()} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <button type="submit" className="btn btn-default"> Save </button>
          </div>
        </div>
      </form>
    )
  }
});

module.exports = Timer;
