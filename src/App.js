/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayGrid from './components/grid/grid';
import TestPage from './components/test/test';
import Checkout from './components/muiForm/Checkout';
import ReactHookFormAdvanced from './components/ReactHookForm/ReactHookForm';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DisplayGrid />} exact />
        <Route path="/test-page" element={<TestPage/>} exact />
        <Route path="/asset-form" element={<Checkout/>} exact />
        <Route path="/react-hook-form" element={<ReactHookFormAdvanced/>} exact />
      </Routes>
    </Router>
  );
}
