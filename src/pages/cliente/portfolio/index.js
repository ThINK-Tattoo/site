import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/visitante/MenuVisitante';
import MenuLogado from "../../../components/usuarioLogado/MenuLog";
import Footer from '../../../components/Footer';
import axios from 'axios';
import tatt1 from '../../../assets/portfolio/portfolio.png';
import tatt2 from '../../../assets/portfolio/portfolio-2.png';
import tatt3 from '../../../assets/portfolio/portfolio-3.png';
import tatt4 from '../../../assets/portfolio/portfolio-4.png';
import tatt5 from '../../../assets/portfolio/portfolio-5.png';
import tatt6 from '../../../assets/portfolio/portfolio-6.png';
import tatt7 from '../../../assets/portfolio/portfolio-7.png';
import tatt8 from '../../../assets/portfolio/portfolio-8.png';
import '../../../styleGlobal.css';
import './index.css';

export default function Portfolio(){
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const userType = localStorage.getItem("userType");
        setIsUserLoggedIn(userType === "cliente");
        axios.get('http://localhost:3636/cliente/selectPortfolio')
            .then(response => {
              setPortfolio(response.data); 
            })
            .catch(error => {
              console.error('Erro ao obter dados do portfólio:', error);
            });
    }, []); 
    const [portfolio, setPortfolio] = useState([]);

    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    
    const navigate = useNavigate();

    const openModal = (portfolio) => {
        setSelectedPortfolio(portfolio);
        setModalData({
            nome: portfolio.nome,
            tamanho: selectedSize,
            local: portfolio.local,
            Tipo: portfolio.Tipo,
            Cores: portfolio.Cores,
            imagem: portfolio.imagem,
          });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPortfolio(null);
        setModalData(null);
        setIsModalOpen(false);
    };


    const handleAgendarClick = () => {
        if (modalData) {
            navigate('/agenda', { state: { modalData } });
        }
    };

    return(
        <div className="container portfolio-container">
             {isUserLoggedIn ? <MenuLogado /> : <Menu />}
            <div className="header-image portfolio-tittle">
                <h1>Portfó<span className="span-color">lio</span></h1>
            </div>
            <h3 className="txt-white">Conheça um pouco do nosso trabalho!</h3>
            <br></br>
            <section className="flashtattoo">
                {portfolio.map((portfolio) => (
                    <div key={portfolio.id} className="portfolio-item">
                        <img id="img-port" onClick={() => openModal(portfolio)}  src={`http://localhost:3636/src/temp/${portfolio.imagem}`} alt={portfolio.nome} />
                        
                    </div>
                ))}
            </section>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                id="modal-container-portfolio"
                contentLabel="Detalhes da Tatuagem"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    },
                    content: {
                        top: '50%', 
                        left: '50%', 
                        height: '60%',
                        transform: 'translate(-50%, -50%)', 
                        backgroundColor: '#000'
                    },
                }}
            >
                <button className="modal-close-button" onClick={closeModal}>
                X
                </button>
                {selectedPortfolio && (
                    <div className="modal-tattoo">
                        <div id="modal-info-portfolio">
                            <img id="imgSelectPortfolio" src={`http://localhost:3636/src/temp/${selectedPortfolio.imagem}`} alt={selectedPortfolio.nome} />
                            <div className="modal-info-description">
                                <h3 className="txt-white h3">{selectedPortfolio.nome}</h3>

                                <div className="description">
                                    <h3 className="txt-white ">Descrição:</h3>
                                    
                                    <p className="txt-white"><strong>Tamanho: </strong> {selectedSize || selectedPortfolio.tamanho}</p>
                                    <p className="txt-white"><strong>Local: </strong>{selectedPortfolio.local}</p>
                                    <p className="txt-white"><strong>Tipo: </strong> {selectedPortfolio.tipo}</p>
                                    <p className="txt-white"><strong>Cores: </strong> {selectedPortfolio.cores}</p>
                                </div>
                        
                            </div>
                        
                        </div>
                        
                    </div>
                )}
            </Modal>
            <Footer/>
        </div>
    );
}