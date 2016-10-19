var React = require('react');

var GameDetails = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    var data = [
      {
        emitter: 'currentGame',
        data: this.refs.currentGame.value
      },
      {
        emitter: 'nextGame',
        data: this.refs.nextGame.value
      },
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

  render: function() {
    return (
      <form onSubmit={this.handleSubmit} id="comment-form">
        <div className="row">
          <div className="col-lg-6">
            <div className="input-group">
              <label>Current Game</label>
              <input type="text" className="form-control" placeholder="Current Game" ref="currentGame" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-group">
              <label>Next Game</label>
              <input type="text" className="form-control" placeholder="Next Game" ref="nextGame" />
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

module.exports = GameDetails;
