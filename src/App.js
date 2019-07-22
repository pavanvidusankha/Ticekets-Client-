import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Main from "./Components/Main";
import MBuy from "./Components/MBuy";
import CBuy from "./Components/CBuy";
import About from "./Components/about";
import logo from "./images.jpg";



function App() {


 
  return (
    <Router>
      <div className="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a
            className="navbar-brand"
            href="localhost:3000"
            target="_blank"
          >
            <img src={logo} width="40" height="40" alt="Coding" />
          </a>
          <Link to="/" className="navbar-brand">
            E-Tickets
          </Link>
          
          <div className="collapse navbar-collapse"> 
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">
                  Tickets
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/about/" className="nav-link">
                 About
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Route path="/" exact component={Main} />
        <Route path="/Mbuy/:id"  component={MBuy} />
        <Route path="/Cbuy/:id"  component={CBuy} />
        <Route path="/about"  component={About} />
      </div>
    </Router>
  );
}

export default App;
