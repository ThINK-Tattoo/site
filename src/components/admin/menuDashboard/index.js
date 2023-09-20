import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../../../assets/icones/logo-removebg-preview 1.png';
import '../../../styleGlobal.css';
import './index.css';


export default function Menu(){
    const [fontSize, setFontSize] = useState(16);

    const increaseFontSize = () => {
        setFontSize((prevSize) => prevSize + 2); 
    };

    const decreaseFontSize = () => {
        setFontSize((prevSize) => prevSize - 2); 
    };

    useEffect(() => {
        document.body.style.fontSize = `${fontSize}px`;
    }, [fontSize]);

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

            <div className="sidebar">
                <Link to="/"><img className="logo-menu" src={logo} alt="Logo do projeto com o nome ThINK"/></Link>
                
                <div className="nav-links">      
                    <ul>
                        <li><Link to="/dashboard"><a>Página Inicial</a></Link></li>
                        <li><Link to="/dashboard/administradores"><a>Administradores</a></Link></li>
                        <li><Link to="/dashboard/clientes"><a>Clientes</a></Link></li>
                        <li><Link to="/dashboard/portfolio"><a>Porfolio</a></Link></li>
                        <li><Link to="/dashboard/flashTattoo"><a>FlashTattoo</a></Link></li>
                        <li><Link to="/dashboard/agendamentos"><a>Agendamentos</a></Link></li>
                        <li><Link to="/dashboard/estoque"><a>Estoque</a></Link></li>
                    </ul>
                </div>
                <div>
                <li><button className="btn-sair">Sair</button></li>
                </div>
            </div>
            
        </div>
    )
}