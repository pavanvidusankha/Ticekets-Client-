import React, { Component } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Images/dialog.png";

import swal from 'sweetalert';



class MBuy extends Component {

  
  constructor(props) {
    super(props);

    this.setCustomerPhoneNo=this.setCustomerPhoneNo.bind(this);
    this.onSubmit=this.onSubmit.bind(this);

    this.state = {
      ticket_description: "",
      ticket_name: "",
      ticket_price: "",
      price: "",
      TicketsPrice: 0,
      Discount:0,
      TotalPrice:0,
      count: "",
      NICs:"961110700"
    };
  }

  componentDidMount() {
    
    document.title="Book using Mobile";
    console.log(this.props.match.params.id);
    Axios.get("http://localhost:4000/ticket/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          ticket_description: response.data.ticket_description,
          ticket_name: response.data.ticket_name,
          ticket_price: response.data.ticket_price
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  calculate = event => {
     event.preventDefault();
    const value =
      (parseFloat(event.target.value) * parseFloat(this.state.ticket_price));

      const value1=(parseFloat(event.target.value) * parseFloat(this.state.ticket_price))-(parseFloat(this.state.Discount));
    console.log(value);
    if (value === "NaN") {
      this.setState({
        TicketsPrice: "0"
      });
    } else {
      this.setState({
        TicketsPrice: value,
        TotalPrice:value1
      });
    }
  };

  SaveNIC =event=>{
    const discountValue=100;
       event.preventDefault();
     const no=event.target.value;
     
     if(no==this.state.NICs){
       this.setState({
         Discount:discountValue,
         TotalPrice:this.state.TicketsPrice-this.state.Discount
       });
     }
     


  };

   ValidateNIC=()=>{

    if(this.state.Discount==0){
     
      swal("Sorry !", "Invalid NIC No or Not a rewarded NIC  ", "error");

    }
    else{
      swal({
        title: "You are Lucky!",
        text: "Your Discount has claimed!",
        icon: "success",
        button: "Yes",
      });

    }

  };

  setCustomerName(e){
    this.setState({
      Customer_name:e.target.value
    });
  }

  setCustomerPhoneNo(e){
    this.setState({
      Customer_PNo:e.target.value
    });
  }

  sendSMS(){

    //hence, this is a dummy service procedure will not included in this service 
    swal("SMS Sended", "SMS has just send check it out", "info");
  }
 
  onSubmit(e){

    e.preventDefault();



    const payment={
      pay_type:"mobile",
      Customer_PNo:this.state.phone_no,
      payment:this.state.TotalPrice,
      payment_time:Date.now(),
      train:this.state.ticket_name
    }

    Axios.post('http://localhost:4000/ticket/add/mobilepay',payment)
    .then(res=>console.log(res.data)); 
    this.sendSMS();

    swal("Congratulations!", "You have just booked your tickets!", "success");
  }
  

  render() {
    return (
      <div>
        <h3 align="center">Book Tickets </h3>
        <img src={logo} class="rounded mx-auto d-block" height="230" width="400" alt="Dialog Axiata" />
        <h5 align="center">Dialog Gateway </h5>

        <form name="payform" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Train :</label>
            <input
              type="text"
              className="form-control"
              value={this.state.ticket_name}
            />
          </div>

          <div className="form-group">
            <label>Description :</label>
            <input
              type="text"
              className="form-control"
              value={this.state.ticket_description}
            />
            <label value={this.state.ticket_description} />
          </div>
          <label>Ticket Price :</label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Rs.</span>
            </div>
            <input
              type="text"
              class="form-control"
              value={this.state.ticket_price}
              
            />
            <div class="input-group-append">
              <span class="input-group-text">.00</span>
            </div>
          </div>

          <div className="form-group">
            <label># of Tickets:</label>

            <input
              type="number"
              className="form-control"
              onChange={this.calculate}
           required />
            <div class="invalid-feedback">
                  Count is required
                </div>
          </div>
<div className="row">
          <div className="col-md-7 col-md-offset-4 text-left">
            <label>Phone Number:</label>

            <input
              type="number"
              className="form-control"
              onChange={this.setCustomerPhoneNo}
           required />
            <div class="invalid-feedback">
                  Phone no is required
                </div>
          </div>

          <div className="col-md-4 col-md-offset-4 text-left">
            <label>PIN:</label>

            <input
              type="number"
              className="form-control"
              
           required />
            <div class="invalid-feedback">
                  Phone no is required
                </div>
          </div>
          </div>
         
             
              
             
             
              <div class="col-md-7 mb-8">
              <label ><b>Wanna a discount ?</b></label><br></br>
              <div class="input-group mb-3">
              <label>(government users can get a discount of tickets.Enter your NIC here to verify)</label>
              <div class="input-group mb-7">
              <input name="NIC"  onChange={this.SaveNIC}></input>
              
              <div class="input-group-append">
              <span class="input-group-text">V</span>
            </div>
            </div>
              </div>
              </div>
            <button className="btn btn-success mx-2" onClick={this.ValidateNIC}>Verify</button>
              
            



          <div className="form-group ">
            <h4 style={{color:'blue'}}>
              <h4 align='center'>
                Ticket Price Rs : {this.state.TicketsPrice}
              </h4>
            </h4>
          </div>

          <div className="form-group ">
            <h4 style={{color:'green'}}>
              <h4 align='center'>
                Discount Rs : {this.state.Discount}
              </h4>
            </h4>
          </div>

          <div className="form-group ">
            <h4 style={{color:'red'}}>
              <h4 align='center'>
                Total Price Rs : {this.state.TotalPrice}
              </h4>
            </h4>
          </div>

          <div class="row">
            <div class="col-md-6 col-md-offset-4 text-right">
              <button
                align="center"
                value="credit"
                class="btn btn-primary btn-lg "
                onClick={this.submit}
              >
                Buy
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default MBuy;
