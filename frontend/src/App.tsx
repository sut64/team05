import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import WarranteeCreate from "./components/WarranteeCreate";
import Warrantee from "./components/Warrantee";

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/"/>
          <Route path="/warrantee" element={<Warrantee/>}/>
          <Route path="/warrantee/create" element={<WarranteeCreate/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
