import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/icones/logo-removebg-preview 1.png';
import '../../../styleGlobal.css';
import './index.css';
import BarraAcessibilidade from "../../barraAcessibilidade";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

export default function Menu(){
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const navigate = useNavigate();

    const [client, setClient] = useState({
        id: 0,
        nome: '',
        telefone: '',
        email: '',
        idade: 0,
        senha: '',
    });

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };
    
    const handleLogout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userType");
        navigate('/');
        window.location.reload();
    }

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
    
        const clienteLog = localStorage.getItem('user');
        const clientData = clienteLog ? JSON.parse(clienteLog) : null;
        
        let idClientToDelete;
    
        if (clientData && clientData[0]) {
            setClient(clientData[0]);
            idClientToDelete = clientData[0].id;
    
            try {
                const response = await axios.delete(`http://localhost:3636/cliente/deleteclientes/${idClientToDelete}`);
    
                if (response.status === 200) {
                    console.log(response.data);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    localStorage.removeItem("userType");
    
                    await toast.success('Conta excluída com sucesso. Lamentamos sua ida, até logo!', {
                        position: toast.POSITION.TOP_CENTER,
                        className: 'custom-toast-success',
                        progressClassName: 'custom-toast-progress-bar',
                    });
    
                    setTimeout(() => {
                        navigate('/');
                        window.location.reload();
                    }, 3000);
                } else {
                    console.error('Erro ao excluir usuário:', response.data.message);
                    toast.error('Erro ao excluir usuário. Tente novamente mais tarde.', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            } catch (error) {
                console.log("Erro ao excluir usuário: ", error);
                toast.error(`Erro ao excluir usuário. Detalhes: ${error.message}`, {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } else {
            console.error('ID do cliente não encontrado.');
        }
    };
    

    return(
        <div className='menu-container'>
            <BarraAcessibilidade />
            <nav className="menu">
                <Link to="/"><img className="logo-menuLog" src={logo} alt="Logo do projeto com o nome ThINK"/></Link>
                <ToastContainer position="top-center" />
                <div id="menu-normal">      
                    <ul>
                        <li><Link to="/portfolio">Portfólio</Link></li>
                        <li><Link to="/flashtattoo">FlashTattoo</Link></li>
                        <li><Link to="/agenda">Agenda</Link></li>
                        <li><Link to="/contato">Contato</Link></li>
                        <li className="submenu-parent" onMouseEnter={toggleSubMenu} onMouseLeave={toggleSubMenu}>Meu Perfil {isSubMenuOpen && (
                            <ul className="submenu">
                                <li><Link to="/perfil/informacoes">Minhas Informações</Link></li>
                                <li><Link to="/perfil/agendamentos">Meus Agendamentos</Link></li>
                                <li onClick={handleDeleteAccount}><button>Excluir Conta</button></li>
                                <li onClick={handleLogout}><button>Sair</button></li>
                            </ul>
                            )}
                        </li>
                    </ul>
                </div>

                <div id="menu-drop-down">
                    <div className="menu-header">
                        <button className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                            {menuOpen ? <span className="icon-close">X</span> : (
                                <>
                                    <span className="icon-lines"></span>
                                    <span className="icon-lines"></span>
                                    <span className="icon-lines"></span>
                                </>
                            )}
                        </button>
                    </div>

                    <ul className={`menu-list ${menuOpen ? 'open' : ''}`}>
                        {menuOpen && (
                        <>
                            <li><Link to="/portfolio">Portfólio</Link></li>
                            <li><Link to="/flashtattoo">Flash Tattoo</Link></li>
                            <li><Link to="/agenda">Agenda</Link></li>
                            <li><Link to="/contato">Contato</Link></li>
                            <li><Link to="/">Sobre Nós</Link></li>
                            <br></br>
                            <li>Meu Perfil</li>
                            <li><Link to="/perfil/informacoes">Minhas Informações</Link></li>
                            <li><Link to="/perfil/agendamentos">Meus Agendamentos</Link></li>
                            <li onClick={handleDeleteAccount}><button>Excluir Conta</button></li>
                            <li onClick={handleLogout}><button>Sair</button></li>
                        </>
                        )}
                    </ul>
                </div>
            </nav>
            
        </div>
    )
}
