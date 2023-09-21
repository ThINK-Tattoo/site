import React from "react";
import Menu from '../../../components/admin/menuDashboard';

import '../../../styleGlobal.css';
import './index.css'

export default function homeDashboard(){
    return (
        <div>
            <Menu />
            <div className="tituloDashboard">
                <h1>Página Inic<span className="span-color-dashboard">ial</span></h1>
            </div>
        </div>
        
    )
}