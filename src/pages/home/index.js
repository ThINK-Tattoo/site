import React,{ useEffect, useState} from "react";
import Menu from '../../components/visitante/MenuHomeVisitante';
import MenuLogado from "../../components/usuarioLogado/MenuHomeLog";
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { hotjar } from "react-hotjar";
import MaskedInput from 'react-input-mask';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import '../../styleGlobal.css';
import './index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen, faHeart, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import iconMaq from '../../assets/icones/icon-maq.png';
import imagemProjeto from '../../assets/home/imagemProjeto.png';

export default function Home(){
    useEffect(() => {
        hotjar.initialize(3738750, 6);
    }, []);
    
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const userType = localStorage.getItem("userType");
        setIsUserLoggedIn(userType === "cliente");
    }, []);

    const validationSchema = Yup.object({
        nome: Yup.string().min(2, "O nome deve ter pelo menos 2 caracteres").required("Campo obrigatório"),
        email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
        telefone: Yup.string().required("Campo obrigatório"),
    });

    const formik = useFormik({
        initialValues: {
            nome: "",
            email: "",
            telefone: "",
        },
        validationSchema: validationSchema,
    });

    const [showScrollDownButton, setShowScrollDownButton] = useState(false);
    const [showScrollUpButton, setShowScrollUpButton] = useState(false);
    const scrollToBottom = () => {
        console.log('Scrolling to bottom');
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    };
    
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const scrollThreshold = 100;
    
        console.log('Scroll Position:', scrollPosition);
    
        setShowScrollDownButton(scrollPosition < scrollThreshold);
        setShowScrollUpButton(scrollPosition > scrollThreshold);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, []);

    const buttonStyles = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#A40C9F',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        padding: '10px 20px',
        fontSize: '20px',
        cursor: 'pointer',
        display: showScrollDownButton ? 'block' : 'none',
    };

    const buttonStylesUp = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#A40C9F',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        padding: '10px 20px',
        fontSize: '20px',
        cursor: 'pointer',
        display: showScrollUpButton ? 'block' : 'none',
    };

    return (
        <div className="containerHome">
            <div className="containerPrincipal">
                <div id="imagemPrincipal">
                {isUserLoggedIn ? <MenuLogado /> : <Menu />}
                <div className="itensContainer">
                    <h1>ThINK</h1>
                    <p>Uma nova maneira de Pensar e Tatuar</p>
                    <Link to="/agenda"><button className="btn agende">Agende já!</button></Link>
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
                    <Link to="/portfolio"><button className="btn confira" aria-label="Confira o nosso portfólio!">Confira</button></Link>
                </div>
            </div>
            <div className="divisao">.</div>
            <div className="cuidadosEmensagem">    
                <div className="cuidados">
                    <FontAwesomeIcon icon={faHeart} className="iconCoracao" alt="Icone de um coração"/>
                    <h1 className="txt-white h1-info">Cuidados</h1>
                    <p className="descricao">Confira quais os cuidados você precisa ter após a realização da sua tattoo:</p>
                    <div className="cuidadosTopicosGeral">
                            <div>
                                <FontAwesomeIcon icon={faChevronRight} alt="Icone de uma seta direcionada para esquerda" className="iconSeta"/>
                                <p>Não tirar casquinhas</p>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faChevronRight} alt="Icone de uma seta direcionada para esquerda" className="iconSeta"/>
                                <p>Hidratar o local da tatuagem</p>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faChevronRight} alt="Icone de uma seta direcionada para esquerda" className="iconSeta"/>
                                <p>Não expor a tattoo ao sol</p>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faChevronRight} alt="Icone de uma seta direcionada para esquerda" className="iconSeta"/>
                                <p>Não entrar no mar ou piscina</p>
                            </div>
                    </div>
                </div>
                <div className="mensagem" onSubmit={formik.handleSubmit}>
                    <FontAwesomeIcon icon={faEnvelopeOpen} className="iconEmail" alt="Icone de um envelope"/>
                    <h1 className="txt-white h1-info">Fale Conosco</h1>
                    <p className="descricao">Para mais informações entre em contato com a gente!</p>
                    <div className="mensagemContainer">
                        <div className="mensagemFormGeral">
                            <div>
                                <input
                                    className="input inputHome"
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    placeholder="Nome"
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.nome}
                                />
                                {formik.touched.nome && formik.errors.nome ? (
                                    <div className="avisoHome">{formik.errors.nome}</div>
                                ) : null}
                            </div>
                            <div>
                                <MaskedInput className="input inputHome" 
                                    type="tel" 
                                    id="telefone" 
                                    name="telefone" 
                                    placeholder="WhatsApp"
                                    mask="(99) 99999-9999"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.telefone}
                                />
                                {formik.touched.telefone && formik.errors.telefone ? (
                                    <div className="avisoHome">{formik.errors.telefone}</div>
                                ) : null}
                            </div>
                            <div >
                                <input className="input inputHome" 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="E-mail" required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="avisoHome">{formik.errors.email}</div>
                                ) : null}  
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
                        <button type="submit" class="btn enviar" aria-label="Enviar formulário">Enviar</button>
                    </div>
                </div>
            </div>
            {showScrollUpButton && (
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={buttonStylesUp} id="buttonStylesUp">
                    &#8593;
                </button>
                )}
            {showScrollDownButton && (
                <button
                    onClick={scrollToBottom}
                    style={buttonStyles}
                    className="bounce-animation"
                    id="buttonStyles"
                >
                &#8595;
                </button>
            )}
            <Footer/>
        </div>
        );
}