var React = require('react');

var InputText = React.createClass({
  render: function(){
    return (
      <div className="col-lg-6">
        <div className="input-group">
          <label>{this.props.label}</label>
          <input key={this.props.key} type="text" className="form-control" placeholder={this.props.placeholder} name={this.props.name} onChange={this.props.handleChange} />
        </div>
      </div>
    )
  }
});

module.exports = InputText;
