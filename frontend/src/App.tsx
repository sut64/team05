import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import WarranteeCreate from "./components/WarranteeCreate";
import Warrantee from "./components/Warrantee";
import HomeEmployee from './components/Home_employee';
import HomeCustomer from './components/Home_Customer';
import RepairRequest from './components/RepairRequest';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomeEmployee />} />
          <Route path="/customer" element={<HomeCustomer />} />
          <Route path="/RepairRequest" element={<RepairRequest />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/warrantee" element={<Warrantee/>}/>
          <Route path="/warrantee/create" element={<WarranteeCreate/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
