import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import MedicalPage from './medical'
import EduicationPage from './Education'
import Home from "./home";
import AdminDashboard from "./adminPanel";
import Login from "./component/Login";
import StudentProfile from "./component/studentSection";
function App() {

  return (
   
        <Router>
        <Routes>
        <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/education" element={<EduicationPage/>} />
          <Route path="/medical" element={<MedicalPage/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/studentProfile" element={<StudentProfile />} />
        </Routes>
      </Router>
  )
}

export default App
