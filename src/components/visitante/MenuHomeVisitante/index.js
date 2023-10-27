import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../../../assets/icones/logo-removebg-preview 1.png';
import '../../../styleGlobal.css';
import './index.css';
import BarraAcessibilidade from "../../barraAcessibilidade";

export default function Menu(){
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
      


    return(
        <div className='menu-container'>
             <BarraAcessibilidade />
            <nav className="menuHome">
                <div id="menu-normal">      
                    <ul>
                        <li><Link to="/portfolio">Portfólio</Link></li>
                        <li><Link to="/contato">Contato</Link></li>
                    </ul>
                </div>
                <div>
                    <Link to="/">
                    <img className="logo-menu" src={logo} alt="Logo do projeto com o nome ThINK"/>
                    </Link>
                </div>
                <div id="menu-normal">
                    <ul>
                        <li><Link to="/signup">Cadastro</Link></li>
                        <li><Link to="/signin">Login</Link></li>
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
                            <li><Link to="/contato">Contato</Link></li>
                            <li><Link to="/cadastro">Cadastro</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                        )}
                    </ul>
                </div>
            </nav>
            
        </div>
    )
}
