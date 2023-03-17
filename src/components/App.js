import React from 'react';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import Footer from './Footer';
import Journeys from './Journeys';
import Addjourney from './Addjourney';
import Addstage from './Addstage';
import { Routes, Route} from 'react-router-dom'
import Users from './Users';
import Adduser from './Adduser';
import Details from './Details';


function App() {

  return (
    
      <div className="App">
      <Footer />
      <>
      <div className="page">
        <Routes>
           <Route path='/' element={<Login/>}></Route>
           <Route path='signup' element={<Signup/>}></Route>
           <Route path='journeys' element={<Journeys/>}></Route>
           <Route path='addjourney' element={<Addjourney/>}></Route>
           <Route path='addstage' element={<Addstage/>}></Route>
           <Route path='users' element={<Users/>}></Route>
           <Route path='adduser' element={<Adduser/>}></Route>
           <Route path='details/:id' element={<Details/>}></Route>

        </Routes>
       </div>
       </>
       </div>
  );
}

export default App;
