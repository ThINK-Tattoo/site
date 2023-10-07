import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/icones/logo-removebg-preview 1.png';
import '../../../styleGlobal.css';
import './index.css';


export default function Menu(){
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userType");
        navigate('/');
    }
    return(
        <div className='menu-containerCrud'>
            <div className="sidebar">
                <Link to="/"><img className="logo-menuAdmin" src={logo} alt="Logo do projeto com o nome ThINK"/></Link>
                
                <div className="nav-links">      
                    <ul>
                        <li><Link to="/dashboard"><a>Página Inicial</a></Link></li>
                        <li><Link to="/dashboard/administradores"><a>Administradores</a></Link></li>
                        <li><Link to="/dashboard/clientes"><a>Clientes</a></Link></li>
                        <li><Link to="/dashboard/portfolio"><a>Portfolio</a></Link></li>
                        <li><Link to="/dashboard/flashTattoo"><a>FlashTattoo</a></Link></li>
                        <li><Link to="/dashboard/agendamentos"><a>Agendamentos</a></Link></li>
                        <li><Link to="/dashboard/solicitacoes"><a>Solicitações</a></Link></li>
                        <li><Link to="/dashboard/estoque"><a>Estoque</a></Link></li>
                    </ul>
                </div>
                <div className="liBtn">
                <li onClick={handleLogout}><button className="btn-sair">Sair</button></li>
                </div>
            </div>
            
        </div>
    )
}