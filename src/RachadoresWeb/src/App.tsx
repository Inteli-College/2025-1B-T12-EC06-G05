import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VisaoGeral from "./pages/AnaliseFissuras";
import Predio from "./pages/Predio";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/analise-de-fissuras/:numeroPredio" element={<VisaoGeral />} />
        <Route path="/login" element={<Login />} />
        <Route path="/predio/:expeditionId" element={<Predio />} />{" "}
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
};

export default App;
