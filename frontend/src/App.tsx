import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import Home from './components/Home';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
