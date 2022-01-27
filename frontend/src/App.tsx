import React,{ useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import WarranteeCreate from "./components/WarranteeCreate";
import Warrantee from "./components/Warrantee";
import HomeEmployee from './components/Home_employee';
import HomeCustomer from './components/Home_Customer';
import RepairRequest from './components/RepairRequest';
import NavBar_Employee from "./components/NavBar_employee";
import PartsPurchase from './components/PartsPurchase';
import CreatePartsPurchase from './components/CreatePartsPurchase';

function App() {

  const [token, setToken] = React.useState<String>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomeEmployee />} /> 
          <Route path="/customer" element={<HomeCustomer />} />
          <Route path="/RepairRequest" element={<RepairRequest />} />
          <Route path="/PartsPurchase" element={<PartsPurchase />} />
          <Route path="/PartsPurchase/create" element={<CreatePartsPurchase />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/warrantee" element={<Warrantee/>}/>
          <Route path="/warrantee/create" element={<WarranteeCreate/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
