import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Cadastro from './pages/cliente/cadastro';
import Login from './pages/login';
import FlashTattoo from './pages/cliente/flashtattoo';
import Portfolio from "./pages/cliente/portfolio";
import Contato from "./pages/cliente/contato";
import Agenda from './pages/cliente/agenda';
import MinhasInformacoes from "./pages/cliente/perfil/informacoes";
import MeusAgendamentos from "./pages/cliente/perfil/agendamentos";
import Acessibilidade from "./pages/cliente/acessibilidade";

import CRUDadmins from './pages/admin/crudAdmin';
import CRUDportfolio from './pages/admin/crudPortfolio';
import CRUDflashTattoo from './pages/admin/crudFlashTattoo';
import CRUDagenda from './pages/admin/crudAgenda';
import CRUDestoque from './pages/admin/crudEstoque';
import CRUDclientes from './pages/admin/crudClientes';
import CRUDsolicitacoes from './pages/admin/crudSolicitacoes';
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
                <Route path="/agenda" element={<Agenda />} />
                <Route path="/perfil/informacoes" element={<MinhasInformacoes />} />
                <Route path="/perfil/agendamentos" element={<MeusAgendamentos />} />
                <Route path="/acessibilidade" element={<Acessibilidade />}></Route>

                <Route path="/dashboard/administradores" element={<CRUDadmins/>}/>
                <Route path="/dashboard/portfolio" element={<CRUDportfolio/>}/>
                <Route path="/dashboard/flashTattoo" element={<CRUDflashTattoo/>}/>
                <Route path="/dashboard/agendamentos" element={<CRUDagenda/>}/>
                <Route path="/dashboard/estoque" element={<CRUDestoque/>}/>
                <Route path="/dashboard/clientes" element={<CRUDclientes/>}/>
                <Route path="/dashboard/solicitacoes" element={<CRUDsolicitacoes/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
      );
}