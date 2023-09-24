import React from "react";
import Menu from '../../../components/admin/menuDashboard';

import '../../../styleGlobal.css';
import './index.css'

export default function crudPortfolio(){
    return (
        <div>
            <Menu/>
            <section>
            <div className="tituloDashboard">
                <h1>Portfo<span className="span-color-dashboard">lio</span></h1>
            </div>
            <div>
                
            </div>
            </section>
        </div>
    )
}