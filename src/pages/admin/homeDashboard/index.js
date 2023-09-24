import React from "react";
import Menu from '../../../components/admin/menuDashboard';

import '../../../styleGlobal.css';
import './index.css'

import imagem from '../../../assets/dashboardHome/home.png'

export default function homeDashboard(){
    return (
        <div>
            <Menu />
            <section>
            <div className="tituloDashboard">
                <h1>Página Inic<span className="span-color-dashboard">ial</span></h1>
            </div>
            <div className="imagem">
                <img src={imagem} className="homeDash"></img>
            </div>
            </section>
        </div>
        
    )
}