import React from "react";
import Menu from '../../components/MenuHomeLog';
import Footer from '../../components/Footer';

import '../../styleGlobal.css';
import './index.css'

import imagemPrincipal from '../../assets/image 1.png';

export default function Home(){
    return (
        <div className="containerHome">
            
            <div className="containerPrincipal">
                <div id="imagemPrincipal">
                <Menu/>
                <div className="itensContainer">
                    <h1>ThINK</h1>
                    <p>Uma nova maneira de Pensar e Tatuar</p>
                    <div className="btn-agendeJa">
                        <button className="btn">Agende já!</button>
                    </div> 
                </div> 
                    {/*<img src={imagemPrincipal} className="imagemPrincipal"></img>*/}
                </div>
            </div>
            <div className="grid">
                <div class="gridContainer">
                    <div className="gridColuna1">
                    <span>Realismo</span>
                    </div>
                    <div className="gridColuna2">
                    <span>Dotwork</span>
                    </div>
                    <div className="gridColuna3">
                    <span>Fine Line</span>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
      );
}