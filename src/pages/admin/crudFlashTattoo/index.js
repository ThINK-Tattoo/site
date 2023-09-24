import React from "react";
import Menu from '../../../components/admin/menuDashboard';

import '../../../styleGlobal.css';
import './index.css'

export default function crudFlashTattoo(){
    return (
        <div>
            <Menu/>
            <section>
            <div className="tituloDashboard">
                <h1>Flash Tat<span className="span-color-dashboard">too</span></h1>
            </div>
            <div>
                
            </div>
            </section>
        </div>
    )
}