import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../../styleGlobal.css';
import './index.css';

import VLibras from '@moreiraste/react-vlibras';

export default function BarraAcessibilidade(){
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

    const [isHighContrast, setIsHighContrast] = useState(false);
    const toggleHighContrast = () => {
        document.documentElement.classList.toggle("alto-contraste", isHighContrast);
        setIsHighContrast((prevContrast) => !prevContrast);
    };

    return(
        <div className='menu-container'>
            <VLibras forceOnload={true} />
            <div className="accessibility-bar">
                <a href="#accessibility" className="accessibility-link"><Link to="/acessibilidade">
                    Acessibilidade
                </Link></a>
                <button className="access-btn high-contrast-button" onClick={toggleHighContrast}>
                    Alto Contraste
                </button>
                <button className="access-btn font-size-button" onClick={increaseFontSize}>
                    A+
                </button>
                <button className="access-btn font-size-button" onClick={decreaseFontSize}>
                    A-
                </button>
            </div>
        </div>
    )
}