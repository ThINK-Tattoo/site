import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import '../../../styleGlobal.css';
import './index.css';

import logo from "../../../assets/icones/logo.png";
import BarraAcessibilidade from "../../barraAcessibilidade";

export default function Menu(){
    const [isSubMenuOpen, setSubMenuOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const [client, setClient] = useState({
        id: 0,
        nome: '',
        telefone: '',
        email: '',
        idade: 0,
        senha: '',
    });

    const toggleSubMenu = () => {
        setSubMenuOpen(!isSubMenuOpen);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const mobileMenuButtonClass = `menu-icon ${isMobileMenuOpen ? 'open' : ''}`;

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        window.addEventListener('resize', closeMobileMenu);
        
        return () => {
            window.removeEventListener('resize', closeMobileMenu);
        };
    }, []);
    
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
    }

    return(
        <div className={`menuHome ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            <BarraAcessibilidade />
            <ToastContainer position="top-center" />
            <div className="desktop-menuHome">
                <ul>
                    <li className="main-menu-item"><Link to="/portfolio">Portfolio</Link></li>
                    <li className="main-menu-item"><Link to="/flashtattoo">Flash tattoo</Link></li>
                    <li className="main-menu-item"><Link to="/agenda">Agenda</Link></li>
                </ul>
                <Link to="/"><img src={logo} alt="Logo do projeto com o nome ThINK" /></Link>
                <ul>
                    <li className="main-menu-item"><Link to="/contato">Contato</Link></li>
                    <li className="main-menu-item"><Link to="/">Sobre nós</Link></li>
                    <li className="main-submenu-item" onClick={toggleSubMenu}><Link to="">Meu perfil</Link>
                        {isSubMenuOpen && (
                        <ul className="sub-menuHome">
                            <li className="sub-menu-item"><Link to="/perfil/informacoes">Minhas informações</Link></li>
                            <li className="sub-menu-item"><Link to="/perfil/agendamentos">Meus agendamentos</Link></li>
                            <li onClick={handleDeleteAccount}><button>Excluir Conta</button></li>
                            <li onClick={handleLogout}><button>Sair</button></li>
                        </ul>
                        )}
                    </li>
                </ul>
            </div>
            <div className="mobile-menu">
                <Link to="/"><img src={logo} alt="Logo do projeto com o nome ThINK" /></Link>
                <button className={mobileMenuButtonClass}  onClick={toggleMobileMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                {isMobileMenuOpen && (
                <ul className="mobile-menu-list">
                    <li className="main-menu-item"><Link to="/portfolio">Portfolio</Link></li>
                    <li className="main-menu-item"><Link to="/flashtattoo">Flash tattoo</Link></li>
                    <li className="main-menu-item"><Link to="/agenda">Agenda</Link></li>
                    <li className="main-menu-item"><Link to="/contato">Contato</Link></li>
                    <li className="main-menu-item"><Link to="/">Sobre nós</Link></li>
                    <br></br>
                    <li className="main-menu-item">Meu perfil
                        <ul className="sub-menu">
                            <li><Link to="/perfil/informacoes">Minhas informações</Link></li>
                            <li><Link to="/perfil/agendamentos">Meus agendamentos</Link></li>
                            <li>Excluir conta</li>
                            <li onClick={handleLogout}><button>Sair</button></li>
                        </ul>
                    </li>
                </ul>
                )}
            </div>
        </div>
    )
}