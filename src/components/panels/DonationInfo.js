var React = require('react');

var DonationInfo = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    var data = [
      {
        emitter: 'donatorTop',
        data: this.refs.donatorTop.value
      },{
        emitter: 'donatorTopAmount',
        data: this.refs.donatorTopAmount.value
      },{
        emitter: 'donationsRec',
        data: this.refs.donationsRec.value
      },{
        emitter: 'donationsGoal',
        data: this.refs.donationsGoal.value
      }
    ];

    fetch('http://localhost:3000/update',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
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
              <label>Top Donator</label>
              <input type="text" className="form-control" placeholder="Name" ref="donatorTop" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-group">
              <label>Top Donation Amount</label>
              <input type="text" className="form-control" placeholder="100" ref="donatorTopAmount" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="input-group">
              <label>Donations Received (total)</label>
              <input type="text" className="form-control" placeholder="100" ref="donationsRec" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-group">
              <label>Donation Goal</label>
              <input type="text" className="form-control" placeholder="1000" ref="donationsGoal" />
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

module.exports = DonationInfo;
