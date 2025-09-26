import React from 'react';
import "./App.css"; 
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from './app/Home/Home'
import AboutMe from './app/AboutMe/AboutMe'
import Globe from './app/Globe/Globe'
import Header from './app/Header/Header'

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/globe" element={<Globe />} />


          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
