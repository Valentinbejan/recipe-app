// RouterSetup.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './AdminPage'; // Asigură-te că calea este corectă
import App from '../App'; // Asigură-te că calea este corectă

const RouterSetup = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminPage />} />
        {/* Alte rute aici */}
      </Routes>
    </Router>
  );
};

export default RouterSetup;
