import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from './app/Home/Home'
import AboutMe from './app/AboutMe/AboutMe'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          {/* Default route -> Home */}
          <Route path="/" element={<Home />} />

          {/* About Me page */}
          <Route path="/about" element={<AboutMe />} />

          {/* Redirect all unknown routes back to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
