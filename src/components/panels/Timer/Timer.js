var React = require('react');

var Timer = React.createClass({
  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <div className="input-group">
              <label>End Time</label>
              <input type="text" className="form-control" placeholder="" ref="endTime" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-group">
              <label>End Date</label>
              <input type="text" className="form-control" placeholder="" ref="endDate" />
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
