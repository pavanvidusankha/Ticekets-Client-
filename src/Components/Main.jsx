import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Ticket=props=>(
      <tr>
        <td>{props.ticket.ticket_name}</td>
        <td>{props.ticket.ticket_description}</td>
        <td>{props.ticket.ticket_count}</td>
        <td>
            <button vtype="button" class="btn btn-primary float-right" align='right'><Link  to={"/Mbuy/"+props.ticket._id} style={{textDecoration:'none'}}><a style={{color:'white'}}>Book by Mobile</a></Link></button>
        
        
            <button vtype="button" class="btn btn-success mx-2 float-right"><Link  to={"/Mbuy/"+props.ticket._id} style={{textDecoration:'none'}}><a style={{color:'white'}}>Book by Credit Card</a></Link></button>
            </td>

    </tr>
)

export default class  Main extends Component {

    constructor(props){
        super(props);
        this.state={tickets:[]};
    }

    componentDidMount(){
        axios.get('http://localhost:4000/ticket/')
        .then(response =>{
            this.setState({tickets:response.data});
            
        
        }).catch(function(error){
            console.log(error); 
        })

        }


        componentDidUpdate(){

            axios.get('http://localhost:4000/ticket/')
            .then(response =>{
                this.setState({tickets:response.data});
            
            }).catch(function(error){
                console.log(error); 
            })
        }
        ListTickets(){
            return this.state.tickets.map(function(temp,i){
                return <Ticket ticket={temp} key={i} />;
            });

        }
    
    render() { 
        return (
            <div>
                <h3>Tickets</h3>
                <table className="table table-striped" style={{marginTop:20}}>
                <thead>
                    <tr>
                        <th>Train</th>
                        <th>Description</th>
                        <th>Train</th>
                        <th><p align='center'>Actions</p></th>
                    </tr>
                </thead>
                <tbody>
                    {this.ListTickets()}
                </tbody>
                </table>
            </div>
          );
    }
}
 

