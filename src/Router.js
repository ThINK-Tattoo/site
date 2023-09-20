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

import CRUDadmins from './pages/admin/crudAdmin';
import CRUDportfolio from './pages/admin/crudPortfolio';
import CRUDflashTattoo from './pages/admin/crudFlashTattoo';
import CRUDagenda from './pages/admin/crudAgenda';
import CRUDestoque from './pages/admin/crudEstoque';
import CRUDclientes from './pages/admin/crudClientes';
import Dashboard from './pages/admin/homeDashboard';

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

                <Route path="/dashboard/administradores" element={<CRUDadmins/>}/>
                <Route path="/dashboard/portfolio" element={<CRUDportfolio/>}/>
                <Route path="/dashboard/flashTattoo" element={<CRUDflashTattoo/>}/>
                <Route path="/dashboard/agendamentos" element={<CRUDagenda/>}/>
                <Route path="/dashboard/estoque" element={<CRUDestoque/>}/>
                <Route path="/dashboard/clientes" element={<CRUDclientes/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
      );
}