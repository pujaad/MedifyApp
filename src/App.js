import React from 'react';
import LandingPage from "./components/LandingPage";
import Bookings from './components/Bookings';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  "./App.css"
function App() {
  return (
    
      <Routes>
      <Route path="/" element={<LandingPage />} />
      </Routes>
    
  );
}

export default App;
