import React from "react";
import {  Link } from "react-router-dom";
import './App.css'
import { NavLink } from "react-router-dom";

class Navbar extends React.Component {

  render() {
  return(
   
  <div className="nav">
    <nav>
    <ul>
    <div className="title">
    <li>Cerner Learning</li></div>
    <li><NavLink to="/journeys">Builder</NavLink></li>
    <li><NavLink to="/users">User</NavLink></li>
    <li><NavLink to="/reports" style={{pointerEvents: "none"}}>Reports</NavLink></li>
    <div className="logout"><li>
      <Link to="/">Logout</Link>
    </li></div>
    </ul>
    </nav>
   
  </div>
  );
}
}
export default Navbar;