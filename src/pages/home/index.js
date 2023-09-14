import React from "react";
import Menu from '../../components/MenuLog';
import Footer from '../../components/Footer';

import '../../styleGlobal.css';
import './index.css'

import imagemPrincipal from '../../assets/image 1.png';

export default function Home(){
    return (
        <div>
            <Menu/>
            <div className="containerPrincipal">
                <div>
                    <img src={imagemPrincipal} className="imagemPrincipal"></img>
                </div>
                <div className="itensContainer">
                    <h1>ThINK</h1>
                    <p>Uma nova maneira de Pensar e Tatuar</p>
                    <div className="btn-agendeJa">
                        <button className="btn">Agende já!</button>
                    </div> 
                </div>  
            </div>
            <Footer/>
        </div>
      );
}