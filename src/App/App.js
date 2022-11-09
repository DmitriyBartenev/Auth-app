import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Users from '../pages/Users/Users';
import TestPage from '../pages/TestPage/TestPage';
import Login from '../pages/Login/Login';
import useToken from '../hooks/useToken';
import './App.scss';


function App() {

  const { token, setToken } = useToken();


  if(!token){
    return <Login setToken={setToken}/>
  }

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Users/>}/>
            <Route path='/test' element={<TestPage/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
