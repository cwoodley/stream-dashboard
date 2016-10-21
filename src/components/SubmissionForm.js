var React = require('react');
var FormData = require('react-form-data');


var SubmissionForm = React.createClass({
  mixins: [ FormData ],
  // handleInputChange: function(e){
  //   console.log(e.target.value)
  //   this.setState({
  //     emitter: {
  //       emitterName: e.target.name,
  //       content: e.target.value
  //     }
  //   })
  // },
  handleSubmit: function(e) {
    e.preventDefault();

    formData = this.formData;

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
  render: function() {
    var that = this;

    var childrenWithProps = React.Children.map(this.props.children, function(child, i) {
      console.log(i);
      return (
        <div className="row">{React.cloneElement(child, { handleChange: that.updateFormData })}</div>
      );
    });

    return (
      <form onSubmit={this.handleSubmit}>
        {childrenWithProps}

        <div className="row">
          <div className="col-lg-6">
            <button type="submit" className="btn btn-default"> Save </button>
          </div>
        </div>
      </form>
    )
  }
});

module.exports = SubmissionForm;