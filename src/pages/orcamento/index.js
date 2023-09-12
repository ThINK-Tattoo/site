import React from "react";
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';

import '../../styleGlobal.css';
import './index.css';

export default function Orcamento(){
    return(
        <div className="container orcamento-container">
            <Menu/>
            <Footer/>
        </div>
    );
}