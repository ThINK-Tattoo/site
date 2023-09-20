import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Cadastro from './pages/cliente/cadastro';
import Login from './pages/login';
import FlashTattoo from './pages/cliente/flashtattoo';
import Portfolio from "./pages/cliente/portfolio";
import Contato from "./pages/cliente/contato";
import MinhasInformacoes from "./pages/cliente/perfil/informacoes";
import MeusAgendamentos from "./pages/cliente/perfil/agendamentos";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Cadastro />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/flashtattoo" element={<FlashTattoo />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/perfil/informacoes" element={<MinhasInformacoes />} />
                <Route path="/perfil/agendamentos" element={<MeusAgendamentos />} />

            </Routes>
        </BrowserRouter>
      );
}