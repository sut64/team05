import React from 'react';
import NavBar from './components/NavBar_employee';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import HomeEmployee from './components/Home_employee';
import WarranteeCreate from "./components/WarranteeCreate";
import Warrantee from "./components/Warrantee";



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomeEmployee />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/warrantee" element={<Warrantee/>}/>
          <Route path="/warrantee/create" element={<WarranteeCreate/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
