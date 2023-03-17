import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './App.css'
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import './Journeys.css';
import { FiPlus } from 'react-icons/fi';
import { AiOutlineImport } from 'react-icons/ai';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import axios from "axios";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'

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
    // eslint-disable-next-line
    <nav>
    <div className="page">
      <ul className="pagination">
        <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>{/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a onClick={prevPage} href="#" className='page-link'>
            Previous
          </a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
            {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={() => paginate(number)} href="#" className='page-link'>
              {number}
            </a>
          </li>
        ))}
        <li className={currentPage === pageNumbers.length ? 'page-item disabled' : 'page-item'}>{/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a onClick={nextPage} href="#" className='page-link'>
            Next
          </a>
        </li>
      </ul>
    </div>
  </nav>
  );
}
function Journeys() {
  const [journeys, setJourneys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn || false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/journeys');
      getJourneys();
    } else {
      navigate('/');
      
    }
  }, [isLoggedIn, navigate]);

  const getJourneys = () => {
    axios.get('http://localhost:3005/get_journey').then((json) => setJourneys(json.data));
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get Search items
  const currentItems = journeys.filter((journey) => {
    if (searchTerm === '') return true;
    return journey.journey_name.toLowerCase().includes(searchTerm.toLowerCase());
  }).slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Display api data in table
  const renderTable = () => {
    if (currentItems.length === 0) {
      return (
        <tr>
          <td colSpan="3">Journey not found</td>
        </tr>
      )
    } else {
      return currentItems.map(journey => {
        return (
          <tr key={journey.id}>
            <td><Link to={`/details/${journey.id}`}>{journey.journey_name}</Link></td>
            <td>{journey.journey_status}</td>
            <td>{journey.updated_at}</td>
          </tr>
        )
      })
    }
  }

  return (
    <div>
      <div id="navbar"><Navbar /></div>
      <div id="sidebar"><Sidebar /></div>
      <div id="maincontent">
        <div className="main" >
          <h4>Add Journey Instructions</h4>
         
          <div>
            <ul>
              <Link to="/addjourney"><FiPlus />Add Journey</Link>
              <Link to="" style={{ pointerEvents: "none" }}><AiOutlineImport />Import Journeys</Link>
              <Link to="" style={{ pointerEvents: "none" }}><AiOutlineShareAlt />Share Preview</Link>
              <Link to="" style={{ pointerEvents: "none" }}><AiOutlineCloudUpload />Content Report</Link>
              <li><input type="text" className="search" placeholder="Search By User First Name" onChange={(e) => setSearchTerm(e.target.value)} /></li>
            </ul>
          </div>
         
          <div>
            <table>
              <thead>
                <tr>
                  <th>Journey</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                </tr>
                <tr>
                  <tr className="searchname"><input type="text" className="search" placeholder="Search By User First Name" onChange={(e) => setSearchTerm(e.target.value)} /></tr>
                </tr>
              </thead>
              <tbody>{renderTable()}</tbody>
            </table>

            <TablePaginator
              itemsPerPage={itemsPerPage}
              totalItems={journeys.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Journeys;
