import React from "react";
import Menu from '../../components/MenuHomeLog';
import Footer from '../../components/Footer';

import '../../styleGlobal.css';
import './index.css'

import imagemProjeto from '../../assets/imagemProjeto.png';

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
            <div className="divisao">.</div>
            <div className="grid">
                <div id="grid1"><h2>Realismo</h2></div>
                <div id="grid2"><h2>Dotwork</h2></div>
                <div id="grid3"><h2>Fine Line</h2></div>
            </div>
            <div className="projeto">
                <div>
                    <h1 className="txt-black h1-info" id="tituloProjeto">Conheça no<span className="span-color">sso </span> projeto</h1>
                    <p className="txt-black" id="paragrafoProjeto">Uma plataforma onde você terá mais facilidade de comunicação com o profissional e melhor experiência como usuário. Visamos acima de tudo profissionais competentes com conhecimento não só na parte artística, como na parte de biossegurança e atendimento ao cliente. </p> 
                </div>
                <br></br>
                <div className="topicosGeral">
                    <div className="topicos">
                        <div  className="topicoProjetoDireita">
                            <div>
                                <h4>Realismo</h4>
                                <p>Foca em reproduzir, da maneira mais fiel possível, a cena de uma foto na pele.</p>
                            </div>
                            <div>
                                <h4>Fineline</h4>
                                <p>É uma técnica de traço muito fino, firme e delicado.</p>
                            </div>
                            <div>
                                <h4>Coberturas</h4>
                                <p>Cobertura ou Cover-Up é, simplesmente, a técnica de cobrir uma tatuagem com outra tatuagem.</p>
                            </div>
                        </div>
                        <div>
                            <img  className="imagemProjeto" src={imagemProjeto} alt="Logo do projeto com o nome ThINK"/>
                        </div>
                        <div  className="topicoProjetoEsquerda">
                            <div>
                                <h4>BlackWork</h4>
                                <p>Como o próprio nome sugere, trata-se de uma técnica que não utiliza tintas coloridas, apenas a preta.</p>
                            </div>
                            <div>
                                <h4>Geométricos</h4>
                                <p>No estilo geométrico, como o próprio nome sugere, o desenho é baseado em formas geométricas, linhas retas e precisas, para formar o design desejado</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
      );
}