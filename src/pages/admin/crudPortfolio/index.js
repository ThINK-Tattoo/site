import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/admin/menuDashboard';

import '../../../styleGlobal.css';
import './index.css'

function CrudPortfolio() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const userType = localStorage.getItem("userType");

        if(!userType || userType === 'cliente'){
            navigate('/signin');
        } else if(userType === 'admin'){
            setIsUserLoggedIn(userType === "admin");
        }
        
    }, []); 

    return (
        <div>
            <Menu/>
            <section>
                <div className="tituloDashboard">
                    <h1>Portfo<span className="span-color-dashboard">lio</span></h1>
                </div>
                <div>
                    {/* Your component content */}
                </div>
            </section>
        </div>
    )
}

export default CrudPortfolio;
