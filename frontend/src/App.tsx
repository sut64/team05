import React from 'react';
import NavBar from './components/NavBar_employee';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import HomeEmployee from './components/Home_employee';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomeEmployee />} />
          <Route path="/" element={<HomeEmployee />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
