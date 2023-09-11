import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-removebg-preview 1.png';
import '../../styleGlobal.css';
import './index.css';


export default function Menu(){
    const [fontSize, setFontSize] = useState(16);
    const [menuOpen, setMenuOpen] = useState(false);

    const increaseFontSize = () => {
      setFontSize((prevSize) => prevSize + 2); 
    };

    const decreaseFontSize = () => {
      setFontSize((prevSize) => prevSize - 2); 
    };
  
    useEffect(() => {
      document.body.style.fontSize = `${fontSize}px`;
    }, [fontSize]);


    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    return(
        <div className='menu-container'>
            <div className="accessibility-bar">
                <a href="#accessibility" className="accessibility-link">
                    Acessibilidade
                </a>
                <button className="access-btn high-contrast-button">Alto Contraste</button>
                <button className="access-btn font-size-button" onClick={increaseFontSize}>
                    A+
                </button>
                <button className="access-btn font-size-button" onClick={decreaseFontSize}>
                    A-
                </button>
            </div>

            <nav className="menu">
                <img className="logo-menu" src={logo} alt="Logo do projeto com o nome ThINK"/>
                
                <div id="menu-normal">      
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/">Portfólio</Link></li>
                        <li><Link to="/">FlashTattoo</Link></li>
                        <li><Link to="/">Agenda</Link></li>
                        <li><Link to="/">Orçamento</Link></li>
                        <li><Link to="/">Contato</Link></li>
                        <li><Link to="/signin">Login</Link></li>
                        <li><Link to="/signup">Cadastro</Link></li>
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
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Portfólio</Link></li>
                            <li><Link to="/">FlashTattoo</Link></li>
                            <li><Link to="/">Agenda</Link></li>
                            <li><Link to="/">Orçamento</Link></li>
                            <li><Link to="/">Contato</Link></li>
                            <li><Link to="/">Login</Link></li>
                        </>
                        )}
                    </ul>
                </div>
            </nav>
            
        </div>
    )
}
