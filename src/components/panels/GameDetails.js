var React = require('react');
var ReactDOM = require('react-dom');

var GameDetails = React.createClass({
  render: function() {
    return (

      <div className="row">
        <div className="col-lg-6">
          <div className="input-group">
            <label>Current Game</label>
            <input type="text" className="form-control" placeholder="Current Game" name="currentGame" />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="input-group">
            <label>Next Game</label>
            <input type="text" className="form-control" placeholder="Next Game" name="nextGame" />
          </div>
        </div>
      </div>

    )
  }
});

module.exports = GameDetails;
