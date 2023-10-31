import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/usuarioLogado/MenuLog';
import MenuLogado from "../../../components/usuarioLogado/MenuLog";
import Footer from '../../../components/Footer';

import axios from "axios";

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
            axios.get('http://localhost:3636/admin/selectFlashTattoo')
            .then(response => {
                setFlashtatto(response.data);
            })
            .catch(error => {
              console.error('Erro ao obter dados do portfólio:', error);
            });
        }
        
    }, []);

    const [flashtatto, setFlashtatto] = useState([]);

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
            valor1: tattoo.valor1,
            valor2: tattoo.valor2,
            valor3: tattoo.valor3,
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
                        <img src={`http://localhost:3636/src/temp/${tattoo.imagem}`} alt={tattoo.nome} />
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
                            <img src={`http://localhost:3636/src/temp/${selectedTattoo.imagem}`} alt={selectedTattoo.nome} />
                            <div className="modal-info-description">
                                <h3 className="txt-white h3">{selectedTattoo.nome}</h3>

                                <div className="description">
                                    <h3 className="txt-white ">Descrição:</h3>
                                    
                                    <p className="txt-white"><strong>Tamanho: </strong> {selectedSize || selectedTattoo.tamanho}</p>
                                    <p className="txt-white"><strong>Local: </strong>{selectedTattoo.local}</p>
                                    <p className="txt-white"><strong>Tipo: </strong> {selectedTattoo.tipo}</p>
                                    <p className="txt-white"><strong>Cores: </strong> {selectedTattoo.cores}</p>
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
                                    <p className="txt-white">R${selectedTattoo.valor1}</p>
                                </div>
                                <div id="second-info">
                                    <button 
                                        className="btn btn-valor"
                                        onClick={() => setSelectedSize('10cm')}
                                    >
                                        10 cm
                                    </button>
                                    <p className="txt-white">R${selectedTattoo.valor2}</p>
                                </div>
                                <div id="third-info">
                                    <button 
                                        className="btn btn-valor" 
                                        onClick={() => setSelectedSize('15cm')}
                                    >
                                        15 cm
                                    </button>
                                    <p className="txt-white">R${selectedTattoo.valor3}</p>
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