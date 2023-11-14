import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import logo from "../../../assets/icones/logo.png";
import BarraAcessibilidade from "../../barraAcessibilidade";

import "../../../styleGlobal.css";
import "./index.css";

const Menu = () => {
    const [isSubMenuOpen, setSubMenuOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigate = useNavigate();

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

    return (
        <div className={`menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <BarraAcessibilidade />
        <div className="desktop-menu">
            <Link to="/"><img src={logo} alt="Logo do projeto com o nome ThINK"/></Link>
            <ul>
                <li className="main-menu-item"><Link to="/portfolio">Portfólio</Link></li>
                <li className="main-menu-item"><Link to="/flashtattoo">Flash tattoo</Link></li>
                <li className="main-menu-item"><Link to="/agenda">Agenda</Link></li>
                <li className="main-menu-item"><Link to="/contato">Contato</Link></li>
                <li className="main-menu-item"><Link to="/">Sobre nós</Link></li>
                <li className="main-menu-item" onClick={toggleSubMenu}><Link to="">Meu perfil</Link>
                {isSubMenuOpen && (
                    <ul className="sub-menu">
                        <li><Link to="/dashboard">Ir para dashboard</Link></li>
                        <li onClick={handleLogout}><button>Sair</button></li>
                    </ul>
                )}
                </li>
            </ul>
        </div>

        <div className="mobile-menu">
            <Link to="/"><img src={logo} alt="Logo do projeto com o nome ThINK" /></Link>
            <button className={mobileMenuButtonClass} onClick={toggleMobileMenu}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            {isMobileMenuOpen && (
                <ul className="mobile-menu-list">
                    <li className="main-menu-item"><Link to="/portfolio">Portfólio</Link></li>
                    <li className="main-menu-item"><Link to="/flashtattoo">Flash tattoo</Link></li>
                    <li className="main-menu-item"><Link to="/agenda">Agenda</Link></li>
                    <li className="main-menu-item"><Link to="/contato">Contato</Link></li>
                    <li className="main-menu-item"><Link to="/">Sobre nós</Link></li>
                    <br></br>
                    <li className="main-menu-item">Meu perfil
                        <ul className="sub-menu">
                            <li><Link to="/dashboard">Ir para dashboard</Link></li>
                            <li onClick={handleLogout}><button>Sair</button></li>
                        </ul>
                    </li>
                </ul>
            )}
        </div>
    </div>
    );
};

export default Menu;