import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Cadastro from './pages/cadastro';
import Login from './pages/login';
import FlashTattoo from './pages/flashtattoo';
import Portfolio from "./pages/portfolio";
import Contato from "./pages/contato";

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
            </Routes>
        </BrowserRouter>
      );
}