import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Login from './Pages/Login';
import Register from './Pages/Register'
import Deshboard from './Pages/Deshboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/deshboard"
          element={
            <PrivateRoute>
              <Deshboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;