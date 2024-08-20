import React from 'react';
import LandingPage from "./components/LandingPage";
import Bookings from './components/Bookings';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  "./App.css"
import BookingCenter from './components/BookingCentre';
function App() {
  return (
    
      <Routes>
                 <Route path="/" element={<LandingPage />} />

        <Route path="/find-doctors" element={<LandingPage />} />
      

      </Routes>
      
    
  );
}

export default App;
