var React = require('react');
var update = require('immutability-helper');

var TickerItem = React.createClass({
  render: function() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" id={this.props.idNum} placeholder="Ticker Item" name={'tickerItem' + this.props.id} onChange={this.props.handleChange} />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={this.props.handleDelete}>Remove</button>
        </span>
      </div>
    )
  }
})

var Ticker = React.createClass({
  getInitialState: function() {
    return {
      items: [{value: ''}]
    }
  },
  handleInputChange: function(event) {
    var index = event.target.getAttribute('id');
    var value = event.target.value;
    var data = this.state.items;


    var newData = update(data, {[index]: {$set: value}});

    this.setState({items: newData})


  },
  addTickerItem: function(item) {
    var items = this.state.items.concat();
    var id = items.length + 1;
    var newItem = {value: ''}
    items.push(newItem);
    this.setState({ items: items, });

  },
  removeTickerItem: function(item) {
    var items = this.state.items.concat();
    items.splice(item,1);
    this.setState({ items: items });

  },
  handleSubmit: function(e) {
    e.preventDefault();

    formData = {tickerItems: this.state.items};

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
        <TickerItem key={index} idNum={index} handleDelete={this.removeTickerItem.bind(this, index)} handleChange={this.handleInputChange} />
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
