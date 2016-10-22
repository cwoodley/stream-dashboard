var React = require('react');
var FormData = require('react-form-data');
var update = require('react-addons-update');

var TickerItem = React.createClass({
  render: function() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" data-idNum={this.props.id} placeholder="Ticker Item" name={'tickerItem' + this.props.id} onBlur={this.props.handleChange} />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={this.props.handleDelete}>Remove</button>
        </span>
      </div>
    )
  }
})

var Ticker = React.createClass({
  mixins: [ FormData ],
  getInitialState: function() {
    return {
      items: [],
      data: []
    }
  },
  handleInputChange: function(e) {
    var index = e.target.getAttribute('data-idNum');
    var data = this.state.data.concat();
    data.splice(index, 1);
    data.push(e.target.value);
    this.setState({ data: data });
  },
  addTickerItem: function(item){
    var items = this.state.items.concat();
    items.push(item);
    this.setState({ items: items });

  },
  removeTickerItem: function(item){
    var data = this.state.data.concat();
    var index = data.indexOf(item)
    data.splice(item, 1);
    this.setState({ data: data })

    var items = this.state.items.concat();
    items.splice(item,1);
    this.setState({ items: items });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    formData = {tickerItems: this.state.data};

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
  render: function() {
    var items = this.state.items;
    var list = items.map((item, index) => {
      return (
        <TickerItem key={index} id={index} value={item.text} handleDelete={this.removeTickerItem.bind(this, index)} handleChange={this.handleInputChange} />
      )
    });

    return (
      <form onChange={this.updateFormData} onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-sm-6">
            {list}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <button type="button" className="btn btn-default" onClick={this.addTickerItem} > Add </button>
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

module.exports = Ticker;
