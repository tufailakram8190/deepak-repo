// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';


import Swc from './components/Swc';
import NavButton from './components/NavButton';

const AppRouter = () => {
  return (
    <Router>
      <NavButton />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/swc" element={<Swc />} />

      </Routes>
    </Router>
  );
};

export default AppRouter;
