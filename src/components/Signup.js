import axios from 'axios';
import React, {useState, useEffect} from 'react'
import Header from './Header';

function Signup({ Login, error }) {
    const [details, setDetails] = useState({fname: "",lname: "", email: "", password:"", organization_id:""});
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
      };

  const submitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validate(details));
    setIsSubmit(true);
  
    
    axios.post('http://localhost:3005/post_user', {users: {
            fname : details.fname, 
            lname: details.lname, 
            email: details.email, 
            password: details.password,
            organization_id: details.organization_id 
            }
            }
            ).then((response) => {
                console.log(response);
                alert("User Created")
                }, (error) => {
                console.log(error);}
            );
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(details);
    }
  }, [formErrors]);

  
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.fname) {
      errors.fname = "First name is required!";
    }
    if (!values.lname) {
        errors.lname = "Last name is required!";
      }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div> <Header />
    <div className="container">
       
    <form onSubmit={submitHandler}>
        <div className ="form-inner">
        <h2>Register</h2>
        {(error !="")?(<div className="error">{error}</div>) : ""}
        <div className="form-group">
            <label htmlFor="fname">First Name:   </label>
            <input type="text" name="fname" id="fname" onChange={e => setDetails({...details, fname: e.target.value})} value={details.fname}/>
        </div>
        <p>{formErrors.fname}</p>
        
        <div className="form-group">
            <label htmlFor="lname">Last Name:   </label>
            <input type="text" name="lname" id="lname" onChange={e => setDetails({...details, lname: e.target.value})} value={details.lname}/>
        </div>
        <p>{formErrors.lname}</p>

        <div className="form-group">
            <label htmlFor="email">email:   </label>
            <input type="email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
        </div>
        <p>{formErrors.email}</p>
        <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
        </div>
        <p>{formErrors.password}</p>

        <div className="form-group">
            <label htmlFor="organization_id">organization: </label>
            <select name="organization_id" id="organization_id" onChange={e => setDetails({...details, organization_id: e.target.value})} value={details.organization_id} >
            <option value="" disabled>
             Select
            </option>
            <option value="1">Cerner-NorthGate</option>
            <option value="2">Cerner-Manyatha</option>
            
            </select>
        </div>

        <input type="submit" value ="Signup"></input>
        <br/>
    
        </div>
        </form>
        </div>
        </div>
  )
}

export default Signup;











   
   


  
