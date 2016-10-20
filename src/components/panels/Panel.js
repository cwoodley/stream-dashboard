var React = require('react');

var Panel = React.createClass({


  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {this.props.title}
        </div>
        <div className="panel-body">
          {this.props.children}
        </div>
      </div>
    )
  }
});

module.exports = Panel;
