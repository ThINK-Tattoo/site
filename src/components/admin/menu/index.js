import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../../../assets/icones/logo-removebg-preview 1.png';
import '../../../styleGlobal.css';
import './index.css';
import BarraAcessibilidade from "../../barraAcessibilidade";

export default function Menu(){
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };
    

    return(
        <div className='menu-container'>
            <BarraAcessibilidade />
            <nav className="menu">
                <Link to="/"><img className="logo-menu" src={logo} alt="Logo do projeto com o nome ThINK"/></Link>
                
                <div id="menu-normal">      
                    <ul>
                        <li><Link to="/portfolio">Portfólio</Link></li>
                        <li><Link to="/flashtattoo">FlashTattoo</Link></li>
                        <li><Link to="/">Agenda</Link></li>
                        <li><Link to="/contato">Contato</Link></li>
                        <li className="submenu-parent" onMouseEnter={toggleSubMenu} onMouseLeave={toggleSubMenu}>Meu Perfil {isSubMenuOpen && (
                            <ul className="submenu">
                                <li><Link to="">Ir para dashboard</Link></li>
                                <li><button>Sair</button></li>
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
                            <li><Link to="">Ir para dashboard</Link></li>
                            <li><button>Sair</button></li>
                        </>
                        )}
                    </ul>
                </div>
            </nav>
            
        </div>
    )
}