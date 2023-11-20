import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/admin/menuDashboard';


import '../../../styleGlobal.css';
import './index.css'

import imagem from '../../../assets/crudHome/home.png'

export default function HomeDashboard(){
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const userType = localStorage.getItem("userType");

        if(!userType || userType === 'cliente'){
            navigate('/signin');
        }else if(userType === 'admin'){
            setIsUserLoggedIn(userType === "admin");
        }
        
    }, []);

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