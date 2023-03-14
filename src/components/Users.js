import React,{ useState, useEffect } from "react";
import {  Link } from "react-router-dom";
import './App.css'
import './Journeys.css';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { FiPlus } from 'react-icons/fi';
import { AiOutlineImport } from 'react-icons/ai';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Overlay from 'terra-overlay';
import OverlayContainer from 'terra-overlay/lib/OverlayContainer';
import classNames from 'classnames/bind';
import styles from './OverlayDocCommon.module.scss';
import axios from "axios";

const cx = classNames.bind(styles);
function TablePaginator({ itemsPerPage, totalItems, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1);
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  }

  return (
    <nav>
    <div className="page">
      <ul className="pagination">
        <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
          <a onClick={prevPage} href="#" className='page-link'>
            Previous
          </a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
            <a onClick={() => paginate(number)} href="#" className='page-link'>
              {number}
            </a>
          </li>
        ))}
        <li className={currentPage === pageNumbers.length ? 'page-item disabled' : 'page-item'}>
          <a onClick={nextPage} href="#" className='page-link'>
            Next
          </a>
        </li>
      </ul>
    </div>
  </nav>
  );
}

function Users()
{
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [cemail, setCemail] = useState('');
  const [password, setPassword] = useState('');
  const [ustatus, setUstatus] = useState('');
  const [uaccess, setUAccess] = useState('');
  const [organization_id, setOrgid] =useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const [data,setData] = useState([])
  useEffect ( () => {
      getUsers()
  },[])
 
  const [isSubmit, setIsSubmit] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  
    
    axios.post('http://localhost:3005/post_user', {users: {
            fname : fname, 
            lname: lname, 
            email: email, 
            password: password,
            user_status: ustatus,
            useraccess: uaccess,
            organization_id: organization_id
            }
            }
            ).then((response) => {
                console.log(response);
                alert("User Created")
                }, (error) => {
                console.log(error);}
            );
  };
  const getUsers = () => {
    axios.get ('http://localhost:3005///get_user').then( json => setData(json.data))
  }
 
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.filter((user) => {
    if (searchTerm === '') return true;
    return user.fname.toLowerCase().includes(searchTerm.toLowerCase());
  }).slice(indexOfFirstItem, indexOfLastItem);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderTable = () => {
    return currentItems.map(user => {
      return (
        <tr>
          <td>{user.fname}</td>
          <td>{user.lname}</td>
          <td>{user.email}</td>
          <td>{user.updated_at}</td>
          <td>{user.user_status}</td>
          <td>{user.useraccess}</td>
        </tr>
      )
    })
  }
  
  function handleChange1(event) {
    const { value } = event.target;
    setFname(value);
  }
  function handleChange2(event) {
    const { value } = event.target;
    setLname(value);
  }
  function handleChange3(event) {
    const { value } = event.target;
    setEmail(value);
  }
  function handleChange4(event) {
    const { value } = event.target;
    setCemail(value);
  }
  function handleChange8(event) {
    const { value } = event.target;
    setPassword(value);
  }
  function handleChange5(event) {
    const { value } = event.target;
    setUstatus(value);
  }
  function handleChange6(event) {
    const { value } = event.target;
    setUAccess(value);
  }
  function handleChange7(event) {
    const { value } = event.target;
    setOrgid(value);
  }



  const [show, setShow] = useState(false);
  const [relative, setRelative] = useState(true);
  const handleTriggerFullScreenOverlay = () => {
    setShow(true);
    setRelative(false);
  };

  const handleOnRequestESC = () => {
    setShow(false);
  };
  const addOverlay = () => {
    return (
      <Overlay isOpen={show} isRelativeToContainer={relative} isScrollable={true} zIndex="6000">
        <div className="adduser">
          <form onSubmit={submitHandler}>
            <div className="form-inner">
              <h2>Add User</h2>
              <div className="form-group">
                <label htmlFor="fname">First Name: </label>
                <input type="text" name="fname" id="fname" value={fname} onChange={handleChange1} />
              </div>
              <div className="form-group">
                <label htmlFor="lname">User Name </label>
                <input type="text" name="lname" id="lname" value={lname} onChange={handleChange2}/>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email </label>
                <input type="email" name="email" id="email"  value={email} onChange={handleChange3}/>
              </div>
              <div className="form-group">
                <label htmlFor="email">Confirm Email </label>
                <input type="email" name="cemail" id="cemail"  value={cemail} onChange={handleChange4}/>
              </div>
              <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" value={password} onChange={handleChange8}/>
            </div>
              <div className="form-group">
            <label htmlFor="ustatus">User Status </label>
            <select name="ustatus" id="ustatus"  value={ustatus} onChange={handleChange5}>
            <option value="" disabled>
             Select
            </option>
            <option value="active">Active</option>
            <option value="active">Inactive</option>
            </select>
            </div>
            
            <div className="form-group">
            <label htmlFor="uaccess">User Access </label>
            <select name="uaccess" id="uaccess" value={uaccess} onChange={handleChange6}>
            <option value="" disabled>
             Select
            </option>
            <option value="Admin">Admin</option>
            <option value="Learner">Learner</option>
            <option value="Instructor">Instructor</option>
            </select>
            </div>

            <div className="form-group">
            <label htmlFor="organization_id">organization: </label>
            <select name="organization_id" id="organization_id" value={organization_id} onChange={handleChange7}>
            <option value="" disabled>
             Select
            </option>
            <option value="1">Cerner-NorthGate</option>
            <option value="2">Cerner-Manyatha</option>
            
            </select>
        </div>
              <hr />
              <input type="submit" value="Add"></input>
              <Link to="/users" onClick={handleOnRequestESC} >Cancel</Link>
              
              <br />
            </div>
          </form>
        </div>
      </Overlay>
    );
  };

    return(
       <div>
       <Navbar />
       <Sidebar />
       <div className="main">  
       <h4>Import User Instructions</h4>
        <ul>
        <OverlayContainer className={cx('overlay-container')} overlay={addOverlay()}>
        <li><Link onClick={handleTriggerFullScreenOverlay}><FiPlus />Add User</Link></li>
       
        <li><Link to=""><AiOutlineImport />Import Users</Link></li>
        <li><Link to=""><AiOutlineCloudUpload />Export Users</Link></li>
        <li><input type="text" className="search" placeholder="Search By User First Name" onChange={(e) => setSearchTerm(e.target.value)} /></li>
        </OverlayContainer></ul>
        <div>
      <table>
            <thead >
              <tr>
                <th>Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Last Updated</th>
                <th>User Status</th>
                <th>User Access</th>

              </tr>
            </thead>
            <tbody >{renderTable()}</tbody>
          </table>
          <TablePaginator
              itemsPerPage={itemsPerPage}
              totalItems={data.length}
              paginate={paginate}
              currentPage={currentPage}
            />
    </div>
        </div>
        
        <Footer />
        </div>
    );
}

export default Users;