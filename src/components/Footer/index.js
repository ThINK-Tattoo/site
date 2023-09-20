import React from "react";
import { Link } from 'react-router-dom';
import Logo from '../../assets/icones/logo-removebg-preview 1.png';
import iconEnv from '../../assets/icones/icon-envelope.png';
import iconPhone from '../../assets/icones/icon-phone.png';
import iconClock from '../../assets/icones/icon-clock.png';

import '../../styleGlobal.css';
import './index.css';

export default function Footer(){
    return(
        <div className="footer-container">
            <Link to="/"><img className="logo-footer" src={Logo} alt="Logo do projeto com o nome ThINK"/></Link>

            <div className="info-think">
                <div className="info-element">
                    <img className="icon-footer" src={iconEnv} alt="Icon de um envelope aberto"/>
                    <h4 className="tittle-footer"><strong>E-mail</strong></h4>
                    <p>think.studio.tattoo@gmail.com</p>
                </div>

                <div className="info-element">
                    <img className="phone icon-footer" src={iconPhone} alt="Icon de um smartphone"/>
                    <h4 className="tittle-footer"><strong>Telefone</strong></h4>
                    <p>(11) 90000-9999</p>
                </div>

                <div className="info-element">
                    <img className="icon-footer" src={iconClock} alt="Icon de um relógio"/>
                    <h4 className="tittle-footer"><strong>Horário de funcionamento</strong></h4>
                    <p>SEG - SEX : 10:00 - 22:00</p>
                    <p>SAB : 10:00 - 18:00</p>
                    
                </div>
                <p id="dev">Desenvolvido por Beatriz,  Eloisa, Gabriel, Giovanna, Karoline e Priscila.</p>
            </div>
        </div>
    );
}