import React,{Suspense, useEffect, useState} from "react";
import Menu from '../../components/visitante/MenuHomeVisitante';
import MenuLogado from "../../components/usuarioLogado/MenuHomeLog";
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

import '../../styleGlobal.css';
import './index.css'

import iconMaq from '../../assets/icones/icon-maq.png';
import imagemProjeto from '../../assets/home/imagemProjeto.png';
import iconCoracao from '../../assets/icones/icon-heart.png';
import iconEmail from '../../assets/icones/icon-envelope.png';
import setaCuidados from '../../assets/icones/icon-seta.png';

export default function Home(){
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const userType = localStorage.getItem("userType");
        setIsUserLoggedIn(userType === "cliente");
    }, []);

    return (
        <div className="containerHome">
            
            <div className="containerPrincipal">
                <div id="imagemPrincipal">
                {isUserLoggedIn ? <MenuLogado /> : <Menu />}
                <div className="itensContainer">
                    <h1>ThINK</h1>
                    <p>Uma nova maneira de Pensar e Tatuar</p>
                    <button className="btn agende"><Link to="/agenda"><a>Agende já!</a></Link></button>
                </div> 
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
                <div className="topicosGeral">
                    <div className="topicos">
                        <div  className="topicoProjetoDireita">
                            <div className="topicosItem">
                                <div>
                                    <h4>Realismo</h4>
                                    <p>Foca em reproduzir, da maneira mais fiel possível, a cena de uma foto na pele.</p>
                                </div>
                                <div>
                                    <img src={iconMaq} alt="Máquina de tatuagem roxa."/>
                                </div>
                            </div>
                            <div className="topicosItem">
                                <div>
                                    <h4>Fineline</h4>
                                    <p>É uma técnica de traço muito fino, firme e delicado.</p>
                                </div>
                                <div>
                                    <img src={iconMaq} alt="Máquina de tatuagem roxa."/>
                                </div>
                            </div>
                            <div className="topicosItem">
                                <div>
                                    <h4>Coberturas</h4>
                                    <p>Cobertura ou Cover-Up é, simplesmente, a técnica de cobrir uma tatuagem com outra tatuagem.</p>
                                </div>
                                <div>
                                    <img src={iconMaq} alt="Máquina de tatuagem roxa."/>
                                </div>
                            </div>
                        </div>
                        <div className="imagemProjeto">
                            <img src={imagemProjeto} alt="Logo do projeto com o nome ThINK"/>
                        </div>
                        <div  className="topicoProjetoEsquerda">
                            <div className="topicosItem">
                                <div>
                                <img src={iconMaq} alt="Máquina de tatuagem roxa."/>
                                </div>
                                <div>
                                <h4>BlackWork</h4>
                                <p>Como o próprio nome sugere, trata-se de uma técnica que não utiliza tintas coloridas, apenas a preta.</p>
                                </div>
                            </div>
                            <div className="topicosItem">
                                <div>
                                <img src={iconMaq} alt="Máquina de tatuagem roxa."/>
                                </div>
                                <div>
                                    <h4>Geométricos</h4>
                                    <p>No estilo geométrico, como o próprio nome sugere, o desenho é baseado em formas geométricas, linhas retas e precisas, para formar o design desejado</p>
                                </div>
                            </div>                           
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="portfolioHome">
                <div className="portfolioConteudo">
                    <h1 className="txt-white h1-info">Portfólio</h1>
                    <p>Conheça nosso trabalho.</p>
                    <button className="btn confira"><Link to="/portfolio"><a>Confira</a></Link></button>
                </div>
            </div>
            <div className="divisao">.</div>
            <div className="cuidadosEmensagem">    
                <div className="cuidados">
                    <img className="iconCoracao" src={iconCoracao} alt="Icone de um coração"></img>
                    <h1 className="txt-white h1-info">Cuidados</h1>
                    <p className="descricao">Confira quais os cuidados você precisa ter após a realização da sua tattoo:</p>
                    <div className="cuidadosTopicosGeral">
                            <div>
                                <img src={setaCuidados} alt="Icone de uma seta direcionada para esquerda" className="iconSeta"></img>
                                <p>Não tirar casquinhas</p>
                            </div>
                            <div>
                                <img src={setaCuidados} alt="Icone de uma seta direcionada para esquerda" className="iconSeta"></img>
                                <p>Hidratar o local da tatuagem</p>
                            </div>
                            <div>
                                    <img src={setaCuidados} alt="Icone de uma seta direcionada para esquerda" className="iconSeta"></img>
                                    <p>Não expor a tattoo ao sol</p>
                                </div>
                                <div>
                                    <img src={setaCuidados} alt="Icone de uma seta direcionada para esquerda" className="iconSeta"></img>
                                    <p>Não entrar no mar ou piscina</p>
                                </div>
                    </div>
                </div>
                <div className="mensagem">
                    <div className="iconEmail">
                        <img src={iconEmail} alt="Icone de um coração"></img>
                    </div>
                    <h1 className="txt-white h1-info">Fale Conosco</h1>
                    <p className="descricao">Para mais informações entre em contato com a gente!</p>
                    <div className="mensagemContainer">
                        <div className="mensagemFormGeral">
                            <div>
                                <input className="input" type="text" id="nome" name="nome" placeholder="Nome" required/>
                            </div>
                            <div>
                                <input className="input" type="tel" id="telefone" name="telefone" placeholder="WhatsApp" required/>
                            </div>
                            <div >
                                <input className="input" type="email" id="email" name="email" placeholder="E-mail" required/>
                            </div>
                            <div>
                                <select id="tipoTattoo" name="Tipo de Tattoo">
                                    <option disabled selected>Tipo de Tattoo</option>
                                    <option value="Blackout">Blackout</option>
                                    <option value="Blackwork">Blackwork</option>
                                    <option value="Cobertura">Cobertura de /T/attoo</option>
                                    <option value="Dotwork">Dotwork</option>
                                    <option value="Fine Line">Fine Line</option>
                                    <option value="Maori">Maori</option>
                                    <option value="Old School">Old School</option>
                                    <option value="Realistas">Realistas</option>
                                    <option value="Watercolor">Watercolor</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" class="btn enviar">Enviar</button>
                    </div>
                    
                </div>
            </div>
            <Footer/>
        </div>
        );
}
