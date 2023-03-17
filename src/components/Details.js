import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { FiPlus } from 'react-icons/fi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import {AiOutlineArrowDown} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom'
import './Journeys.css';
import { useState } from "react";
import axios from "axios";
import useCollapse from 'react-collapsed';
import Button from 'terra-button/lib/Button';
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Details()
{
    const { id } = useParams();
  //Dropdown Button
  const options = ['Video', 'Link', 'Document']; // eslint-disable-next-line
  const [selectedOption, setSelectedOption] = useState("");
 // eslint-disable-next-line
  const handleOptionChange = (option) => {
    
    setSelectedOption(option);
  };
  const handleButtonClick = (index) => {
    const newIsMenuOpen = [...isMenuOpen];
    newIsMenuOpen[index] = !newIsMenuOpen[index];
    setIsMenuOpen(!isMenuOpen);
  };

  //Collapsible
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   
    //Declaring the values of form
    const [jname, setJname] = useState('');
    const [remainingChars1, setRemainingChars1] = useState(155);
    const [dname, setDname] = useState('');
    const [remainingChars2, setRemainingChars2] = useState(155);
    const [overview, setOverview] = useState('');
    const [remainingChars3, setRemainingChars3] = useState(1024);
    const [completion, setCompletion] = useState('');
    const [remainingChars4, setRemainingChars4] = useState(1024);
    const [published, setPublished] = useState('');// eslint-disable-next-line
    const [sname, setSname] = useState(''); 
    const [remainingChars5, setRemainingChars5] = useState([155]); // eslint-disable-next-line
    const [soverview, setSoverview] = useState(''); 
    const [remainingChars6, setRemainingChars6] = useState([1024]);// eslint-disable-next-line
    const [scompletion, setScompletion] = useState(''); 
    const [remainingChars7, setRemainingChars7] = useState([1024]);// eslint-disable-next-line
    const [aname, setAname] = useState('');
    const [stageForm, setStageForm] = useState([{ sname: '', soverview: '', scompletion: '', activities:[] }]);
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate()

    //Add Activities
    function handleAddActivity() {
      setActivities([...activities, { name: '', selectedOption: '' }]);
    }

    // Delete the form
    const handleremove=(index)=>{
      const list=[...stageForm];
      list.splice(index,1);
      setStageForm(list);
      const words1=[...remainingChars5]
      const words2=[...remainingChars6]
      const words3=[...remainingChars7]
 
      console.log(stageForm)
      words1[index]=155
      setRemainingChars5(words1);
      words2[index]=1024
        setRemainingChars6(words2);
        words3[index]=1024
        setRemainingChars7(words3);
    }
    // Adding multuple forms
      const handleaddmore=()=>{
        setStageForm([...stageForm,{sname:'',soverview:'',scompletion:''}]);
      }

      
      function handleChangep(event) {
        const { value } = event.target;
        setPublished(value);
      }

      function handleChange1(event) {
        const { value } = event.target;
        setJname(value);
        setRemainingChars1(155 - value.length);
       
      }

      function handleChange2(event) {
        const { value } = event.target;
        setDname(value);
        setRemainingChars2(155 - value.length);
       
      }

      function handleChange3(event) {
        const { value } = event.target;
        setOverview(value);
        setRemainingChars3(1024 - value.length);
       
      }
      function handleChange4(event) {
        const { value } = event.target;
        setCompletion(value);
        setRemainingChars4(1024 - value.length);
       
      }
      const handleChange5=(e, index) =>{
        const { name,value } = e.target;
        const list=[...stageForm]
        list[index][name]=value;
        const words=[...remainingChars5]
        words[index]=155-value.length
        setRemainingChars5(words);
        setStageForm(list);
        console.log(stageForm)
 
      }
      const handleChange6=(e,index) =>{
        const { name,value } = e.target;
        const list=[...stageForm]
        list[index][name]=value;
        const words=[...remainingChars6]
        words[index]=1024-value.length
        setRemainingChars6(words);
        setStageForm(list);
        console.log(stageForm)
 
      }
      const handleChange7=(e,index)=> {
        const { name,value } = e.target;
        const list=[...stageForm]
        list[index][name]=value;
        const words=[...remainingChars7]
        words[index]=1024-value.length
        setRemainingChars7(words);
        setStageForm(list);
        console.log(stageForm)
      }
      function handleActivityNameChange(index, value) {
        setActivities(activities.map((activity, i) => {
          if (i === index) {
            return { ...activity, name: value };
          } else {
            return activity;
          }
        }));  
       
      }
      function handleActivityOptionChange(index, option) {
        setActivities(activities.map((activity, i) => {
          if (i === index) {
            return { ...activity, selectedOption: option };
          } else {
            return activity;
          }
        }));
      }

     

      useEffect(() => {
        axios.get(`http://localhost:3005//get_journeyid/${id}`).then(response => {
            console.log(response.data);
            const data = response.data;
            setJname(data.journey_name);
            setDname(data.display_name);
            setOverview(data.overview_message);
            setCompletion(data.complete_message);
            setPublished(data.journey_status);
            setSname(data.stage_name);
            setSoverview(data.overview_message);
            setScompletion(data.comletion_message)
            
        });
      }, [id]);

      const data = {
        journey: {
         journey_name: jname,
         display_name: dname,
         overview_message: overview,
         complete_message: completion,
         journey_status: published,
        
        stages: stageForm.map((stage, index) => ({
        stage_name: stage.sname,
        overview_message: stage.soverview,
        comletion_message: stage.scompletion,
        activities: activities.map(activity => ({
        name: activity.name,
        activity_type: activity.selectedOption
        
     }))
   }))}
   };
     const [isSubmitted, setIsSubmitted] = useState(false);
     const submitHandler = (e) => {
      e.preventDefault();  
      setIsSubmitted(true);

      axios.post('http://localhost:3005/post_journey', data)
        .then(response => {
         console.log(response.data);
         console.log(data)
         navigate('/journeys')
      })
        .catch(error => {
         console.log(error);
      });
    }
    return(
       <div className="jbox">
        <div><div className="jform">  
      
      
      <div className="insideform">
      {isSubmitted ? (
      <p className="jbox"></p>
    ) : (
          <form onSubmit={submitHandler} >
    
          <div className="journeyform">
          <h4>Journey Details</h4>
          <hr/>
          <div className="form-group">
          <label htmlFor="journeyname"><span className="star">*</span> Journey Name </label><br/>
          <input className="jname" type="text" name="journeyname" id="journeyname" value= {jname} onChange={handleChange1} required/>
          <p>Characters remaining:<span className="remchars">{remainingChars1}</span> </p>
          </div>
          
      
          <div className="form-group">
          <label htmlFor="displayname"><span className="star">*</span> Display name </label><br/>
          <input className= "display" type="text" name="displayname" id="displayname" value= {dname} onChange={handleChange2} required/>
          <p>Characters remaining: <span className="remchars">{remainingChars2}</span></p>
          </div>

          <div className="form-group">
          <label htmlFor="overview_message"><span className="star">*</span> Overview Message </label><br/>
          <input className="overview" type="text" name="overview_message" id="overview_message" value= {overview} onChange={handleChange3} required/>
          <p>Characters remaining: <span className="remchars">{remainingChars3}</span></p>
          </div>
      
          <div className="form-group">
          <label htmlFor="completion_message"><span className="star">*</span> Completion Message </label><br/>
          <input  className="completion" type="text" name="completion_message" id="completion_message" value= {completion} onChange={handleChange4} required/>
          <p>Characters remaining:<span className="remchars"> {remainingChars4}</span></p>
          </div>
         
          <div className="form-group">
          <label htmlFor="journeyname"><span className="star">*</span> Journey Status </label><br/>
          <input className="jstatus" type="text" name="jstatus" id="status" value= {published} onChange={handleChangep} required/>
          </div>

          {stageForm.map((input, index) => {
            return (
          <div className="sform">
          <form>
            
          <div className="collapsible" key={index}>
          <div className="collapse" {...getToggleProps()}>
          {isExpanded ? <Link><FiPlus />Add Stage</Link> : <Link><FiPlus />Add Stage</Link>}
          <Link style={{ pointerEvents: "none" }}><FiPlus />Add Journey Resources</Link>
          <Link style={{ pointerEvents: "none" }}><AiOutlineCloudUpload />Copy Stage</Link>
          </div>
          <div {...getCollapseProps()}>
          <div className="content">
         <div className="stagetitle"><h4><AiOutlineArrowDown/>Untitled Stages{index+1}<span className="delete"><AiFillDelete onClick={() => handleremove(index)}/></span></h4>
          </div>
          <div className="stageform">
          <div className="form-group">
          <label htmlFor="sname"><span className="star">*</span> Stage Name </label><br></br>
          <input className="sname" type="text" name="sname" id="sname" onChange={ e => handleChange5(e,index)}  required/>
          <p>Characters remaining: <span className="remchars">{remainingChars5[index]} </span></p>
          </div>

          <div className="form-group">
          <label htmlFor="soverview"><span className="star">*</span> Overview Message </label><br></br>
          <input className="overview" type="text" name="soverview" id="soverview"  onChange={ e => handleChange6(e,index)} required />
          <p>Characters remaining:<span className="remchars">{remainingChars6[index]}</span> </p>
          </div>
      
          <div className="form-group">
          <label htmlFor="scompletion"><span className="star">*</span> Completion Message </label><br></br>
          <input  className="completion" type="text" name="scompletion" id="scompletion" onChange={ e => handleChange7(e,index)} required/>
          <p>Characters remaining: <span className="remchars">{remainingChars7[index]}</span></p>
          </div>

          <div>
          {activities.map((activity, index) => (
          <form key={index}>
          <div className="form-group">
          <label htmlFor={`actname-${index}`}><span className="star">*</span> Activity Name </label><br></br>
          <input className="aname" type="text" name={`actname-${index}`} id={`actname-${index}`} value={activity.name} onChange={(e) => handleActivityNameChange(index, e.target.value)} required/>
          </div>
        <br></br>
        <div className="dropdown">
          <Link className="dropdown-button" onClick={handleButtonClick}><FiPlus />Add Activity</Link>
          <div className={`dropdown-menu ${isMenuOpen ? 'dropdown-menu--open' : 'dropdown-menu--closed'}`}>
            {options.map((option) => (
              <Link key={option}
                onClick={() => {
                  handleActivityOptionChange(index, option);
                  setIsMenuOpen(false);
                }}
                className={`dropdown-menu-item ${
                  activity.selectedOption === option ? 'dropdown-menu-item--active' : ''
                }`} >
                {option}
              </Link>
            ))}
          </div>
          {activity.selectedOption} 
        </div>
      </form>
    ))}
    <br></br><br></br>
    <br></br><br></br>
    <Button onClick={handleAddActivity} text="Add Activity" variant="action"  className={('button')} />
  </div>
   <br/><br/><br/><br/>
      
        <div>
        <table>
        <thead>
          <tr>
           <th>Activity Name</th>
           <th>Activity Type</th>
         </tr>
        </thead>
        <tbody>
           {activities.map((activity, index) => (
            <tr key={index}>
            <td>{activity.name}</td>
            <td>{activity.selectedOption}</td>
            </tr>
        ))}
       </tbody>
      </table>
      </div>
      </div>
      </div>
      </div>
      </div>  
       
        </form> 
        </div>
        )})}
         
         <br></br>
          <Link onClick={handleaddmore}><FiPlus />Add Stage</Link>
          <Link style={{ pointerEvents: "none" }}><FiPlus />Add Journey Resources</Link>
          <Link style={{ pointerEvents: "none" }}><AiOutlineCloudUpload />Copy Stage</Link>
          <div className="status">
      <h4>Publish</h4>
      <hr />
      <h5>Status:Draft</h5>
      <Button isDisabled text="Save Draft" className={('button')} />
      <Button isDisabled text="Preview" className={('button')} />
      <br/>
      <hr/>
      <Button isDisabled text="Discard Updates" className={('button')} />
      <Button text="Publish" type="submit" variant="emphasis" className={('button')} />
      </div>
      <div className="notes">
      <h4>Notes</h4>
      <hr />
      <br/>
      <p>No Notes to Display</p>
      <p>Notes can be added to a journey in draft or published status</p>
      <br/><hr/>
      <span className="addbtn"><Button isDisabled text="Add" className={('button')} /></span>
      </div>
          </div>
          
          </form>
    )}
    
          </div>
       
      </div>

    </div>
        <Footer />
        </div>
    );
}
export default Details;

  
