import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Cadastro from './pages/cadastro';

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Cadastro />} />
            </Routes>
        </BrowserRouter>
      );
}