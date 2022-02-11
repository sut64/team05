import React,{ useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import WarranteeCreate from "./components/WarranteeCreate";
import Warrantee from "./components/Warrantee";
import HomeEmployee from './components/Home_employee';
import RepairRequest from './components/RepairRequest';
import PartsPurchase from './components/PartsPurchase';
import CreatePartsPurchase from './components/CreatePartsPurchase';
import RepairHis from "./components/RepairHis";
import RepairHisCreate from "./components/RepairHisCreate";
import RecieptTable from './components/RecieptTable'
import RecieptCreate from './components/RecieptCreate'
import WorkReceive from './components/WorkReceive';
import WorkReceive_C from './components/WorkReceive_Create';
import RepairRequestTable from './components/RepairRequestTable';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createTheme({
  palette: {
      primary: {
          main: '#181a52',
      },
  },
});

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
      <ThemeProvider theme={theme}> 
        <Routes>
          <Route path="/" element={<HomeEmployee />} /> 
          <Route path="/RepairRequest" element={<RepairRequest />} /> 
          <Route path="/RepairRequestTable" element={<RepairRequestTable />} /> 
          <Route path="/PartsPurchase" element={<PartsPurchase />} /> 
          <Route path="/PartsPurchase/create" element={<CreatePartsPurchase />} />
          <Route path="/warrantee" element={<Warrantee/>}/> 
          <Route path="/warrantee/create" element={<WarranteeCreate/>}/>
          <Route path="/repair_histories" element={<RepairHis/>}/> 
          <Route path="/repair_histories/create" element={<RepairHisCreate/>}/>
          <Route path="/reciept_histories" element={<RecieptTable/>}/> 
          <Route path="/reciept_histories/create" element={<RecieptCreate/>}/>
          <Route path="/WorkReceive" element={<WorkReceive />} />
          <Route path="/WorkReceive_C" element={<WorkReceive_C />} />
          



        </Routes>
        </ThemeProvider> 
      </div>
    </Router>
  );
}

export default App;
