import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/usuarioLogado/MenuLog';
import MenuLogado from "../../../components/usuarioLogado/MenuLog";
import Footer from '../../../components/Footer';

import tatt1 from '../../../assets/flashTattoo/tattoo.png';
import tatt2 from '../../../assets/flashTattoo/tattoo-2.png';
import tatt3 from '../../../assets/flashTattoo/tattoo-3.png';
import tatt4 from '../../../assets/flashTattoo/tattoo-4.png';
import tatt5 from '../../../assets/flashTattoo/tattoo-5.png';
import tatt6 from '../../../assets/flashTattoo/tattoo-6.png';
import tatt7 from '../../../assets/flashTattoo/tattoo-7.png';
import tatt8 from '../../../assets/flashTattoo/tattoo-8.png';
import '../../../styleGlobal.css';
import './index.css';

export default function FlashTattoo(){
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const userType = localStorage.getItem("userType");

        if(!userType || userType === 'admin'){
            navigate('/signin');
        }else if(userType === 'cliente'){
            setIsUserLoggedIn(userType === "cliente");
        }
        
    }, []);*/
    const [flashtatto, setFlashtatto] = useState([
        {
            id: 1,
            nome: "Caveira Borboleta",
            tamanho: "A definir",
            local: "A definir",
            Tipo: "Realista",
            Cores: "Preto e branco",
            imagem: tatt4
        },
        {
            id: 2,
            nome: "Coração teia de aranha",
            tamanho: "A definir",
            local: "A definir",
            Tipo: "Realista",
            Cores: "Preto e branco",
            imagem: tatt1
        },
        {
            id: 3,
            nome: "Coração de arabescos",
            tamanho: "A definir",
            local: "A definir",
            Tipo: "Realista",
            Cores: "Preto e branco",
            imagem: tatt2
        },
        {
            id: 4,
            nome: "Onça",
            tamanho: "A definir",
            local: "A definir",
            Tipo: "Realista",
            Cores: "Preto e branco",
            imagem: tatt3
        },
        {
            id: 5,
            nome: "Olhos de mar e lua",
            tamanho: "A definir",
            local: "A definir",
            Tipo: "Realista",
            Cores: "Preto e branco",
            imagem: tatt5
        },
        {
            id: 6,
            nome: "Pantera",
            tamanho: "A definir",
            local: "A definir",
            Tipo: "Realista",
            Cores: "Preto e branco",
            imagem: tatt6
        },
        {
            id: 7,
            nome: "Coração asas de morcego",
            tamanho: "A definir",
            local: "A definir",
            Tipo: "Realista",
            Cores: "Preto e branco",
            imagem: tatt7
        },
        {
            id: 8,
            nome: "Cogumelos",
            tamanho: "A definir",
            local: "A definir",
            Tipo: "Realista",
            Cores: "Preto e branco",
            imagem: tatt8
        },
        
    ]);

    const [selectedTattoo, setSelectedTattoo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    
    const navigate = useNavigate();

    const openModal = (tattoo) => {
        setSelectedTattoo(tattoo);
        setModalData({
            nome: tattoo.nome,
            tamanho: selectedSize,
            local: tattoo.local,
            Tipo: tattoo.Tipo,
            Cores: tattoo.Cores,
            imagem: tattoo.imagem,
          });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTattoo(null);
        setModalData(null);
        setIsModalOpen(false);
    };


    const handleAgendarClick = () => {
        if (modalData) {
            navigate('/agenda', { state: { modalData } });
        }
    };

    return(
        <div className="container flashtattoo-container">
            {isUserLoggedIn ? <MenuLogado /> : <Menu />}
            <div className="header-image flashtattoo-tittle">
                <h1>Flash Tat<span className="span-color">too</span></h1>
            </div>
            <h3 className="txt-white">O QUE SÃO E COMO FUNCIONA?</h3>

            <div id='info-flashtattoo'>
                <p className="txt-white">Flash tattoos são tatuagens rápidas geralmente oferecidas pelos artistas por um valor mais em conta para divulgação do trabalho, criação de portfólio e captação de novos cli entes. Normalmente não são feitas sob encomenda, então o artista cria e a pessoa não pode pedir nenhuma alteração.
                    A vantagem dessa modalidade está na praticidade e no valor reduzido do trabalho, já que os desenhos são mais simples e sem muitos detalhes. Além disso, é perfeita para quem não tem muita criatividade e prefere escolher entre desenhos que já estão prontos.</p>
            </div>

            <p className="txt-white p-info">Você escolherá a Flash Tattoo que temos em nossa galeria e irá fazer o agendamento.</p>
            <br></br>
            <section className="flashtattoo">
                {flashtatto.map((tattoo) => (
                    <div key={tattoo.id} className="tattoo-item">
                        <img src={tattoo.imagem} alt={tattoo.nome} />
                        <button className="btn btn-tattoo" onClick={() => openModal(tattoo)}>
                        Mais detalhes
                        </button>
                    </div>
                ))}
            </section>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                id="modal-container"
                contentLabel="Detalhes da Tatuagem"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    },
                    content: {
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        backgroundColor: '#000',
                        height: '80%'
                    },
                }}
            >
                <button className="modal-close-button" onClick={closeModal}>
                X
                </button>
                
                {selectedTattoo && (
                    <div className="modal-tattoo">
                        <div id="modal-info">
                            <img src={selectedTattoo.imagem} alt={selectedTattoo.nome} />
                            <div className="modal-info-description">
                                <h3 className="txt-white h3">{selectedTattoo.nome}</h3>

                                <div className="description">
                                    <h3 className="txt-white ">Descrição:</h3>
                                    
                                    <p className="txt-white"><strong>Tamanho: </strong> {selectedSize || selectedTattoo.tamanho}</p>
                                    <p className="txt-white"><strong>Local: </strong>{selectedTattoo.local}</p>
                                    <p className="txt-white"><strong>Tipo: </strong> {selectedTattoo.Tipo}</p>
                                    <p className="txt-white"><strong>Cores: </strong> {selectedTattoo.Cores}</p>
                                </div>
                              
                            </div>
                           
                        </div>
                        <div className="tamanho-info">
                            <h3 className="txt-white ">Tamanho e valores</h3>
                            <div className="valores-tattoo">
                                <div id="first-info">
                                    <button 
                                        className="btn btn-valor"
                                        onClick={() => setSelectedSize('5cm')}
                                    >
                                        5 cm
                                    </button>
                                    <p className="txt-white">R$ 200.00</p>
                                </div>
                                <div id="second-info">
                                    <button 
                                        className="btn btn-valor"
                                        onClick={() => setSelectedSize('10cm')}
                                    >
                                        10 cm
                                    </button>
                                    <p className="txt-white">R$ 290.00</p>
                                </div>
                                <div id="third-info">
                                    <button 
                                        className="btn btn-valor" 
                                        onClick={() => setSelectedSize('15cm')}
                                    >
                                        15 cm
                                    </button>
                                    <p className="txt-white">R$ 350.00</p>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-agendar" onClick={handleAgendarClick}>Agendar</button>
                    </div>
                )}
            </Modal>
            <Footer/>
        </div>
    );
}