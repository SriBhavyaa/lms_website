import React from "react";
import {  Link } from "react-router-dom";
import './App.css'

class Sidebar extends React.Component {
  render() {
  return(
  <div className="sidebar">
    <div className="nav">
    <ul>
    <li>
      <Link to="/journeys">Journeys</Link>
    </li>
    <li>
      <Link to="">Activities</Link>
    </li>
    <li>
      <Link to="">Events</Link>
    </li>
    <li>
      <Link to="/users">Users</Link>
    </li>
    <li>
      <Link to="">Groups</Link>
    </li>
    <li>
      <Link to="">Session Rosters</Link>
    </li>
    </ul>
    </div>
  </div>
  );
}
}
export default Sidebar;