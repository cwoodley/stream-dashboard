var React = require('react');
var FormData = require('react-form-data');

var SubmissionForm = React.createClass({
  mixins: [ FormData ],

  handleSubmit: function(e) {
    e.preventDefault();

    formData = this.formData;
    console.log(formData)

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
      return React.cloneElement(child, { handleChange: that.updateFormData })
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          {childrenWithProps}
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

module.exports = SubmissionForm;
