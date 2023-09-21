import React, { useState } from "react";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/visitante/MenuVisitante';
import Footer from '../../../components/Footer';

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
    const [portfolio, setPortfolio] = useState([
        {
            id: 1,
            nome: "Girassóis",
            tamanho: "35cm",
            local: "Perna direira",
            Tipo: "Realista",
            Cores: "Preto e branco",
            imagem: tatt4
        },
        {
            id: 2,
            nome: "Dragão Floral",
            tamanho: "45cm",
            local: "Perna esquerda",
            Tipo: "Realista",
            Cores: "Marrom, vermelho, Rosa e Preto",
            imagem: tatt1
        },
        {
            id: 3,
            nome: "Medusa",
            tamanho: "50cm",
            local: "Braço direito",
            Tipo: "Realista",
            Cores: "Preto e branco",
            imagem: tatt2
        },
        {
            id: 4,
            nome: "Mulher e Lobo",
            tamanho: "50cm",
            local: "Braço direito",
            Tipo: "Realista",
            Cores: "Preto e branco",
            imagem: tatt3
        },
        {
            id: 5,
            nome: "Olhos de mar e lua",
            tamanho: "35cm",
            local: "Perna esquerda",
            Tipo: "Realista",
            Cores: "Preto e branco",
            imagem: tatt5
        },
        {
            id: 6,
            nome: "Mulher fragmentada",
            tamanho: "50cm",
            local: "Braço esquerdo",
            Tipo: "Realista",
            Cores: "Preto e branco",
            imagem: tatt6
        },
        {
            id: 7,
            nome: "Mulher floral",
            tamanho: "25cm",
            local: "Antebraço",
            Tipo: "Realista",
            Cores: "Preto e branco",
            imagem: tatt7
        },
        {
            id: 8,
            nome: "Leão floral",
            tamanho: "50cm",
            local: "Braço direito",
            Tipo: "Realista",
            Cores: "Preto e branco",
            imagem: tatt8
        },
        
    ]);

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
            <Menu/>
            <div className="header-image portfolio-tittle">
                <h1>Portfó<span className="span-color">lio</span></h1>
            </div>
            <h3 className="txt-white">Conheça um pouco do nosso trabalho!</h3>
            <br></br>
            <section className="flashtattoo">
                {portfolio.map((portfolio) => (
                    <div key={portfolio.id} className="portfolio-item">
                        <img id="img-port" onClick={() => openModal(portfolio)} src={portfolio.imagem} alt={portfolio.nome} />
                        
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
                            <img src={selectedPortfolio.imagem} alt={selectedPortfolio.nome} />
                            <div className="modal-info-description">
                                <h3 className="txt-white h3">{selectedPortfolio.nome}</h3>

                                <div className="description">
                                    <h3 className="txt-white ">Descrição:</h3>
                                    
                                    <p className="txt-white"><strong>Tamanho: </strong> {selectedSize || selectedPortfolio.tamanho}</p>
                                    <p className="txt-white"><strong>Local: </strong>{selectedPortfolio.local}</p>
                                    <p className="txt-white"><strong>Tipo: </strong> {selectedPortfolio.Tipo}</p>
                                    <p className="txt-white"><strong>Cores: </strong> {selectedPortfolio.Cores}</p>
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