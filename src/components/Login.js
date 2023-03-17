import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom'
import Header from "./Header";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";


function Login() {
    const [credentials, setCredentials] = useState({email: "", password:""});
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
 // eslint-disable-next-line
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
      };
     
      const dispatch = useDispatch(); 
     
      const submitHandler = (e) => {
          e.preventDefault();
          setFormErrors(validate(credentials));
          setIsSubmit(true);
         
         
          axios.post('http://localhost:3005/post_login_user', {users: {
                 
                  email: credentials.email, 
                  password: credentials.password,
                 
                  }
                  }
                  ).then((response) => {
                      console.log(response);
                      console.log("Loggedin")
                      alert("Logged in")
                      dispatch(loginSuccess()); // dispatch the loginSuccess action
                      navigate('/journeys')
                      }, (error) => {
                      console.log(error);
                    console.log("incorrect email id or password")
                    alert("Enter correct email id or password")
                }
                  );
        };
    const navigate=useNavigate()
    
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          console.log(credentials);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      }, [formErrors]);
    
      
      const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
       
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
      
      }
    
    
    return(
        <div><Header />
        <div className="login">
      

      <h1>Login</h1>
      <form onSubmit={submitHandler}>
       
      <div className="form-group">
            <label htmlFor="email">email:   </label>
            <input type="email" name="email" id="email" onChange={e => setCredentials({...credentials, email: e.target.value})} value={credentials.email}/>
        </div>
        
        <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" onChange={e => setCredentials({...credentials, password: e.target.value})} value={credentials.password}/>
        </div>
        <input type="submit" value ="Login"></input>
       {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">Forgot Password?</a>
        <br/>
        First time users <a href="/signup">Click</a> here
      </form>
    </div>
    </div>
    )
}

export default Login