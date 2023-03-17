import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { FiPlus } from 'react-icons/fi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useState } from "react";
import useCollapse from 'react-collapsed';

function Addstage()
{
  const options = [' Video', 'Link', 'Document'];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    const [sname, setSname] = useState('');
    const [remainingChars1, setRemainingChars1] = useState(155);
    const [overview, setOverview] = useState('');
    const [remainingChars2, setRemainingChars2] = useState(155);
    const [completion, setCompletion] = useState('');
    const [remainingChars3, setRemainingChars3] = useState(155);
    

    function handleChange1(event) {
        const { value } = event.target;
        setSname(value);
        setRemainingChars1(155 - value.length);
       
      }

      function handleChange2(event) {
        const { value } = event.target;
        setOverview(value);
        setRemainingChars2(155 - value.length);
       
      }
      function handleChange3(event) {
        const { value } = event.target;
        setCompletion(value);
        setRemainingChars3(155 - value.length);
       
      }

    return(
       <div>
       <div className="box">  
       <div className="collapsible">
    <div className="collapse" {...getToggleProps()}>
        {isExpanded ? 'Collapse' : 'Expand'}
    </div>
    <div {...getCollapseProps()}>
        <div className="content">
        <div>
            <form>
            <h4>Untitled Stages</h4>
            <div className="journeyform">
            <div className="form-group">
            <label htmlFor="stagename">Stage Name </label>
            <input className="sname" type="text" name="stagename" id="stagename" value= {sname} onChange={handleChange1} required/>
            <p>Characters remaining: {remainingChars1}</p>
            </div>

            <div className="form-group">
            <label htmlFor="overview_message">Overview Message </label>
            <input className="overview" type="text" name="overview_message" id="overview_message" value= {overview} onChange={handleChange2}/>
            <p>Characters remaining: {remainingChars2}</p>
            </div>
        
            <div className="form-group">
            <label htmlFor="completion_message">Completion Message </label>
            <input  className="completion" type="text" name="completion_message" id="completion_message" value= {completion} onChange={handleChange3}/>
            <p>Characters remaining: {remainingChars3}</p>
            </div>
            <div className="dropdown">
            <Link className="dropdown-button" onClick={handleButtonClick}><FiPlus />Add Activity</Link>
            <div className={`dropdown-menu ${isMenuOpen ? 'dropdown-menu--open' : 'dropdown-menu--closed'}`}>
            {options.map((option) => (
            <Link
            key={option}
            onClick={() => handleOptionChange(option)}
            className={`dropdown-menu-item ${
              selectedOption === option ? 'dropdown-menu-item--active' : ''}`} >
            {option}
          </Link>
           ))}
           </div>
          </div>
            </div>
            </form>
            </div>
            

            <br/><br/>
            <div>
      <table>
        
          <tr>
          <th><input type="checkbox" />Activity</th>
            <th>Type</th>
            <th>Required</th>
            <th>Reorder</th>
            <th>Associate Rubric  </th>
            <th>Actions</th>
          </tr>
        
   
          <tr>
          <td><input type="checkbox" /></td>
            <td> </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
          <td><input type="checkbox" /></td>
            <td> </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
         
        
      </table>
    </div>
            <div>
        <ul>
            <Link to="/addstage"><FiPlus />Add Stage</Link>
            <Link to="/addjourneyresources"><FiPlus />Add Journey Resources</Link>
            <Link to="/copystage"><AiOutlineCloudUpload />Copy Stage</Link>
            </ul>
        </div>

        </div>

    <br/>
    <br/>
    <br/>
    
    </div>

</div>


        </div>
        <Footer />
        </div>
    );
}
export default Addstage