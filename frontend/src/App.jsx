import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom"; 

// Components
import NavBar from './components/ui/componentslite/NavBar.jsx';
import Home from './components/ui/componentslite/Home.jsx';
import PrivacyPolicy from './components/ui/componentslite/PrivacyPolicy.jsx';
import Jobs from './components/ui/componentslite/Jobs.jsx';
import Profile from './components/ui/componentslite/Profile.jsx'; 

// Dashboards
import StudentDashboard from './components/ui/componentslite/StudentDashboard.jsx';
import AlumniDashboard from './components/ui/componentslite/AlumniDashboard.jsx';
import AdminDashboard from './components/ui/componentslite/AdminDashboard.jsx';


// Authentication
import Login from './components/ui/authentication/Login.jsx';
import Register from './components/ui/authentication/Register.jsx';

// ✅ Job Detail
import JobDetail from './components/ui/componentslite/JobDetail.jsx';

// ⭐ नवीन इम्पोर्ट्स
import JobApplicationForm from './components/ui/componentslite/JobApplicationForm.jsx'; 

function App() {
  return (
    <HashRouter>
      <NavBar /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} />      
        
        <Route path="/jobs" element={<Jobs />} /> 
        <Route path="/jobs/:id" element={<JobDetail />} /> 
        
        <Route path="/apply/:jobId" element={<JobApplicationForm />} /> 

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/profile" element={<Profile />} /> 
        
        <Route path="/student/dashboard" element={<StudentDashboard />} /> 
        <Route path="/alumni/dashboard" element={<AlumniDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
      </Routes>
    </HashRouter>
  );
}

export default App;