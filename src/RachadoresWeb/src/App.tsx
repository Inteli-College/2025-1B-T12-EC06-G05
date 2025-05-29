import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import VisaoGeral from './pages/AnaliseFissuras';
import Predio from './pages/Predio';
import Cadastro from './pages/Cadastro';
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analise-de-fissuras" element={<VisaoGeral />} />
        <Route path="/login" element={<Login />} />
        <Route path="/predio" element={<Predio />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
};

export default App;
