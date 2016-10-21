var React = require('react');
var DatePicker = require('react-datepicker');
var TimePicker = require('rc-time-picker');
var moment = require('moment');


require('react-datepicker/dist/react-datepicker.css');
require('rc-time-picker/assets/index.css');

var Timer = React.createClass({
  handleInputChange: function(e) {
    console.log(e.target.value)
  },
  handleSubmit: function(e) {
    e.preventDefault();

    formData = this.formData;

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
              <label>End Time</label>
              <TimePicker showSecond={false} format="HH:mm" name="timeEnd" onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-group">
              <label>End Date</label>
              <DatePicker dateFormat="YYYY-DD-MM" name="dateEnd" onChange={this.updateFormData} />
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
