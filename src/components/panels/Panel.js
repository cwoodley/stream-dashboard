var React = require('react');
// var ReactDOM = require('react-dom');

var Panel = React.createClass({
  handleSubmit: function(e) {
    var self;
    self = this;

    e.preventDefault();


    fetch('/update',{
      method: 'post',
      body: {
        hello: 'hi'
      },
    }).then(function(response){
      console.log(response.status)
    }).catch(function(err) {
    	console.log(err)
    });
  },

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {this.props.title}
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit} id="comment-form">
            <div className="row">
              <input type="text" ref="inputName" name="inputName" />
              {/* {this.props.children} */}
            </div>
            <div className="row">
              <button type="submit" className="btn btn-default"> Save </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
});

module.exports = Panel;
