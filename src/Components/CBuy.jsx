import React, { Component } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Images/sampath.jpg";
import swal from 'sweetalert';

class CBuy extends Component {
  constructor(props) {
    super(props);
    

    this.setCustomerName=this.setCustomerName.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.setCustomerEmail=this.setCustomerEmail.bind(this);
    this.SaveNIC=this.SaveNIC.bind(this);
    this.ValidateNIC=this.ValidateNIC.bind(this);
   

    this.state = {
      ticket_description: "",
      ticket_name: "",
      ticket_price: "",
      price: "",
      TicketsPrice: 0,
      Discount:0,
      TotalPrice:0,
      count: "",
      Customer_name:"",
      Customer_email:"",
      NICs:"961110700"
      
    };
  }

  componentDidMount() {
    
    document.title="Book using Credit Card";
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

 setCustomerEmail(e){
  this.setState({
    Customer_email:e.target.value
  });
}



 onSubmit(e){

  e.preventDefault();



  const payment={
    pay_type:"credit",
    Customer_name:this.state.Customer_name,
    Customer_email:this.state.Customer_email,
    payment:this.state.TotalPrice,
    payment_time:Date.now(),
    train:this.state.ticket_name
  }

  Axios.post('http://localhost:4000/ticket/add/bankpay',payment)
  .then(res=>console.log(res.data)); 
  

  swal("Congratulations!", "You have just booked your tickets!", "success");
}


  

  render() {
    return (
      <div>
        <h3 align="center">Book Tickets </h3>
        <img src={logo} class="rounded mx-auto d-block" alt="Sampath Bank" />
        <h5 align="center">Sampath Gateway </h5>

        <form onSubmit={this.onSubmit}>
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

          <div class="mb-3">
              <label for="email">Email <span class="text-muted"></span></label>
              <input type="email" class="form-control" id="email" placeholder="you@example.com"  onChange={this.setCustomerEmail}required/>
              <div class="invalid-feedback">
                Please enter a valid email address for invoices.
              </div>
            </div>

          <div class="row">
              <div class="col-md-6 mb-3">
                <label for="cc-name">Name on card</label>
                <input type="text" class="form-control" id="cc-name" placeholder="" onChange={this.setCustomerName} required/>
                <small class="text-muted">Full name as displayed on card</small>
                <div class="invalid-feedback">
                  Name on card is required
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="cc-number">Credit card number</label>
                <input type="text" class="form-control" id="cc-number" placeholder="" required/>
                <div class="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 mb-3">
                <label for="cc-expiration">Expiration</label>
                <input type="text" class="form-control" id="cc-expiration" placeholder="" required/>
                <div class="invalid-feedback">
                  Expiration date required
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <label for="cc-expiration">CVV</label>
                <input type="text" class="form-control" id="cc-cvv" placeholder="" required/>
                <div class="invalid-feedback">
                  Security code required
                </div>
              </div>
              <div class="col-md-5 mb-5">
              <label ><b>Wanna a discount ?</b></label><br></br>
              <div class="input-group mb-3">
              <label>(government users can get a discount of tickets.Enter your NIC here to verify)</label>
              <input onChange={this.SaveNIC}></input>
              <div class="input-group-append">
              <span class="input-group-text">V</span>
            </div>
            <button className="btn btn-success mx-2" onClick={this.ValidateNIC}>Verify</button>
              </div>
              </div>
            </div>
           
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
            <div class="col-md-4 col-md-offset-4 text-right">
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

export default CBuy;
