var React = require('react');
var update = require('react-addons-update');

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
    // var data = this.state.data.concat();
    // // data.splice(index, 1);
    // // data.apply(data, [index, 1]).concat()
    // data.push(
    //   [index, {index: e.target.value}]
    // );
    // this.setState({ data: data });
    // // console.log(e.target.value);
    // var data = this.state.data.concat();
    // console.log(data);

    this.setState({
      items: update(this.state.items[index].value, {$set: [value]})
    })
    //
    // this.state.items[index].value = value;
    // console.log(this.state.items[index].value);

  },
  addTickerItem: function(item) {
    var items = this.state.items.concat();
    var id = items.length + 1;
    var newItem = {value: ''}
    items.push(newItem);
    this.setState({ items: items, });

  },
  removeTickerItem: function(item) {
    // var data = this.state.data.concat();
    // var index = data.indexOf(item)
    // data.splice(item, 1);
    // this.setState({ data: data })
    //
    // var items = this.state.items.concat();
    // items.splice(item,1);
    // this.setState({ items: items });
  },
  handleSubmit: function(e) {
    e.preventDefault();

    formData = {tickerItems: this.state.data};

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
