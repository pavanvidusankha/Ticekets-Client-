import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Main from "./Components/Main";
import MBuy from "./Components/MBuy";
import logo from "./images.jpg";
function App() {
  return (
    <Router>
      <div className="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a
            className="navbar-brand"
            href="https://codingthesmartway.com"
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
                <Link to="/buy" className="nav-link">
                  Buy
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Route path="/" exact component={Main} />
        <Route path="/Mbuy/:id"  component={MBuy} />
      </div>
    </Router>
  );
}

export default App;
