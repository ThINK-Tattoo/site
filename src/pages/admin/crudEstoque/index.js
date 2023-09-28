import React from "react";
import Menu from '../../../components/admin/menuDashboard';

import '../../../styleGlobal.css';
import './index.css'

export default function CrudEstoque(){
    return (
        <div>
            <Menu/>
            <section>
            <div className="tituloDashboard">
                <h1>Esto<span className="span-color-dashboard">que</span></h1>
            </div>
            </section>
        </div>
    )
}