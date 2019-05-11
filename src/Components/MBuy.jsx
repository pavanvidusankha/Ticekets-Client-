import React, { Component } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


class MBuy extends Component {
  constructor(props) {
    super(props);
    
    
    this.state = {
      ticket_description: "",
      ticket_name: "",
      ticket_count: "",
      price:"",
      activeItem: "1"
    };
  }

  toggle = tab => () => {
    if (this.state.activeItem !== tab) {
    this.setState({
      activeItem: tab
    });
    }
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    Axios.get('http://localhost:4000/ticket/'+this.props.match.params.id)
      .then(response => {
        
        this.setState({
          ticket_description: response.data.ticket_description,
          ticket_name: response.data.ticket_name,
          ticket_count: response.data.ticket_count
        })
      
      })
      .catch(function(error) {
        console.log(error);
      })
  }



 
  render() {
    return (


      

      <div>
        <h3 align="center">Buy Tickets </h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Train :</label>
            <input type="text"  className="form-control"  value={this.state.ticket_name}/>
          </div>
          

<div className="form-group">
<label>Description :</label>
<input type="text"  className="form-control" value={this.state.ticket_description}/>
<label value={this.state.ticket_description} />
</div>

<div className="form-group">
<label>Ticket Price Rs:</label>
<label value={this.state.ticket_count} />
<input type="text"  name ="tprice"className="form-control"  value={this.state.ticket_count}/>
</div>

<div className="form-group">
<label># of Tickets:</label>

<input type="text"  className="form-control"        />
</div>

<div class="btn-group btn-group-toggle" data-toggle="buttons">
  <label class="btn btn-secondary active">
    <input type="radio" name="options" id="option1" autocomplete="off" checked/>Pay by Credit Card
  </label>
  <label class="btn btn-secondary">
    <input type="radio" name="options" id="option2" autocomplete="off"/>Pay by Phone
  </label>
</div>


<div class="row">
    <div class="col-md-4 col-md-offset-4 text-right">

<button   align="center"   value="credit"   class="btn btn-primary btn-lg" onClick={this.submit} >Buy</button>
</div>
</div>

</form>
</div>
    );
  }
}

export default MBuy;
