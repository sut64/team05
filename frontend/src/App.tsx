import React, { useEffect } from "react";
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import Home from './components/Home';
import ReciptTable from './components/ReciptTable'
import ReciptCreate from './components/ReciptCreate'


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
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipt_histories" element={<ReciptTable />} />
          <Route
            path="recipt_histories/create"
            element={<ReciptCreate />} 
          />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
