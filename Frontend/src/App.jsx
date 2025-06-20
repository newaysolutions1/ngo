import React, { useEffect, useState } from "react";
import SiteLoader from "./component/SiteLoader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import MedicalPage from './medical'
import EduicationPage from './Education'
import Home from "./home";
import ChoosePortal from "./component/chosePathCard";
import AdminDashboard from "./adminPanel";
import Login from "./component/Login";
import StudentProfile from "./component/studentSection";
function App() {
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // adjust as needed
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SiteLoader />;
  return (
   
        <Router>
        <Routes>
        <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/education" element={<EduicationPage/>} />
          <Route path="/medical" element={<MedicalPage/>} />
          {/* <Route path="/" element={<Home/>} /> */}
          <Route path="/" element={<ChoosePortal/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/studentProfile" element={<StudentProfile />} />
        </Routes>
      </Router>
  )
}

export default App
