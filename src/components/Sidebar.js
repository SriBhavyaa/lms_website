import React from "react";
import './App.css'
import { NavLink } from "react-router-dom";

class Sidebar extends React.Component {
  render() {
  return(
  <div className="sidebar">
    <div className="nav">
    <ul>
    <li>
      <NavLink to="/journeys">Journeys</NavLink>
    </li>
    <li>
      <NavLink to="" style={{pointerEvents: "none"}}>Activities</NavLink>
    </li>
    <li>
      <NavLink to="" style={{pointerEvents: "none"}}>Events</NavLink>
    </li>
    <li>
      <NavLink to="/users">Users</NavLink>
    </li>
    <li>
      <NavLink to="" style={{pointerEvents: "none"}}>Groups</NavLink>
    </li>
    <li>
      <NavLink to ="" style={{pointerEvents: "none"}}>Session Rosters</NavLink>
    </li>
    </ul>
    </div>
  
  </div>
  );
}
}
export default Sidebar;