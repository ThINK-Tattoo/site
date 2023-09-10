import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Cadastro from './pages/cadastro';
import FlashTattoo from './pages/flashtattoo';

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Cadastro />} />
                <Route path="/flashtattoo" element={<FlashTattoo />} />
            </Routes>
        </BrowserRouter>
      );
}