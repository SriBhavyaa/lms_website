import axios from 'axios';
import Sidebar from './Sidebar';
function Adduser() {
   
  return (
    <div> 
       
        <Sidebar/>
        
    <div className="adduser">
       
    <form>
        <div className ="form-inner">
        <h2>Add User</h2>
       
        <div className="form-group">
            <label htmlFor="fname">First Name:   </label>
            <input type="text" name="fname" id="fname" />
        </div>
       
        
        <div className="form-group">
            <label htmlFor="lname">Last Name:   </label>
            <input type="text" name="lname" id="lname"/>
        </div>
        

        <div className="form-group">
            <label htmlFor="email">email:   </label>
            <input type="email" name="email" id="email"/>
        </div>
       

        <div className="form-group">
            <label htmlFor="email">Confirm Email:   </label>
            <input type="email" name="email" id="email" />
        </div>
        

        
        <div className="form-group">
            <label htmlFor="lname">User Name:   </label>
            <input type="text" name="uname" id="uname"/>
        </div>
        <hr />
       

        <input type="submit" value ="Add"></input>
        <a href="/users">Cancel</a> 
        <br/>
    
        </div>
        </form>
        </div>
        </div>
  )
}

export default Adduser;











   
   


  
