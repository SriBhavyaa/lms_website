import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
  return[
    <div className="nav">
    <ul>
    <div className="title">
    <li>Cerner Learning</li></div>
    <li>
      <Link to="/">Login</Link>
    </li>
    <li>
      <Link to="/signup">Signin</Link>
    </li>
   
    </ul>
    </div>
  
  ]
}
}
export default Header;