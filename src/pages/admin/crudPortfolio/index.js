import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/admin/menuDashboard';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import image from '../../../assets/icones/Upload_Image.png';
import tatt1 from '../../../assets/portfolio/portfolio.png';
import tatt2 from '../../../assets/portfolio/portfolio-2.png';
import tatt3 from '../../../assets/portfolio/portfolio-3.png';
import tatt4 from '../../../assets/portfolio/portfolio-4.png';
import tatt5 from '../../../assets/portfolio/portfolio-5.png';
import tatt6 from '../../../assets/portfolio/portfolio-6.png';
import tatt7 from '../../../assets/portfolio/portfolio-7.png';
import tatt8 from '../../../assets/portfolio/portfolio-8.png';
import '../../../styleGlobal.css';
import './index.css'

function CrudPortfolio() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    
    useEffect(() => {
        const userType = localStorage.getItem("userType");

        if(!userType || userType === 'cliente'){
            navigate('/signin');
        } else if(userType === 'admin'){
            setIsUserLoggedIn(userType === "admin");
        }
        
    }, []); 
    
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
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [open3, setOpen3] = useState(false);
    

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
    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setSelectedPortfolio(null);
        setModalData(null);
        setIsModalOpen(false);
    };

    const openModal2 = () => {
        setIsModalOpen2(true);
        setIsModalOpen(false);
    };
    
    const closeModal2 = () => {
        setIsModalOpen2(false);
        setIsModalOpen(true);
    };

    const openModal3 = () => {
        setIsModalOpen3(true);
        
    };
    
    const closeModal3 = () => {
        setIsModalOpen3(false);
    };

    
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
          setSelectedImage(file);
        }
      };
      return(
        <div>
            <Menu/>
            <section>
                <div className="tituloDashboard">
                    <h1>Portfo<span className="span-color-dashboard">lio</span></h1>
                </div>
                <section className="portfolio">
                    {portfolio.map((portfolio) => (
                        <div key={portfolio.id} className="portifolio-item">
                            <img id="img-port" onClick={() => openModal(portfolio)}
                            src={portfolio.imagem} alt={portfolio.nome} />
                        </div>
                    ))}
                </section>
                <div className="btnAdicionar">
                        <button onClick={openModal3} className="btnCrud">Adicionar</button>
                </div>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal}                 
            id="modal-container-portfolio"
            contentLabel="Detalhes da Tatuagem"
            style={{
                overlay:{ backgroundColor:'rgba(0,0,0,0.5)',},
                content:{
                    top: '50%',
                    left:'50%',
                    height:'70%',
                    transform: 'translate(-40%, -50%)',
                    backgroundColor:'#000'
                },
            }}>
            <button className="modal-close-button" onClick={closeModal}> 
            X 
            </button>

            {selectedPortfolio && (
                <div className="modal-tatto">
                    <div id="modal-info-portfolio">
                        <img src={selectedPortfolio.imagem} alt={selectedPortfolio.nome} />
                        <div className="modal-info-description">
                            <div className="description">
                                <h3 className="txt-white" >{selectedPortfolio.nome}</h3>
                                </div>
                                <div className="description">
                                <h3 className="txt-white">Descrição</h3>
                                    <p className="txt-white"><strong>Tamanho: </strong> {selectedSize || selectedPortfolio.tamanho}</p>
                                    <p className="txt-white"><strong>Local: </strong>{selectedPortfolio.local}</p>
                                    <p className="txt-white"><strong>Tipo: </strong> {selectedPortfolio.Tipo}</p>
                                    <p className="txt-white"><strong>Cores: </strong> {selectedPortfolio.Cores}</p>
                                </div>
                            
                            
                        </div>
                    </div>
                            <div className="btn-modal">
                                <button onClick={openModal2} className="btn btn-editar">Editar</button>
                                <button onClick={closeModal} className="btn btn-cancelar">Cancelar</button>

                            </div>
                </div>
            )}
            </Modal>

            <Modal isOpen={isModalOpen2} onRequestClose={closeModal2}
            id="modal-edit-portfolio"
            contentLabel="Editando a Tatuagem"
            style={{
                overlay:{ backgroundColor:'rgba(0,0,0,0.5)',},
                content:{
                    top: '50%',
                    left:'50%',
                    height:'80%',
                    transform: 'translate(-40%, -50%)',
                    backgroundColor:'#000'
                },
            }}>
            <button className="modal-close-button" onClick={closeModal2}> 
            X 
            </button>

            <div className="modal-tatto">
                <div id="modal-edit-tatto">
                <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageSelect}
                              style={{ display: 'none' }}
                              id="imageInpute"
                            />
                            <label htmlFor="imageInpute">                    
                            <img src={image} alt="Upload de imagem"/>
                            </label>
                    <div className="modal-info-description">
                            <div className="description">
                                <input className="inputp" type="text" id="nome" 
                            onChange={(e) => setPortfolio({ ...portfolio, nome: e.target.value })}
                            name="nome" value={portfolio.nome} required />
                            
                            </div>
                                <div className="description">
                                <h3 className="txt-white">Descrição</h3>
                                <input className="inputp" type="text" id="nome" 
                            onChange={(e) => setPortfolio({ ...portfolio, tamanho: e.target.value })}
                            name="nome" value={selectedSize} required />

                                <input className="inputp" type="text" id="nome" 
                            onChange={(e) => setPortfolio({ ...portfolio, local: e.target.value })}
                            name="nome" value={portfolio.local} required />

                                <input className="inputp" type="text" id="nome" 
                            onChange={(e) => setPortfolio({ ...portfolio, Tipo: e.target.value })}
                            name="nome" value={portfolio.Tipo} required />

                                <input className="inputp" type="text" id="nome" 
                            onChange={(e) => setPortfolio({ ...portfolio, cores: e.target.value })}
                            name="nome" value={portfolio.Cores} required />

                              </div>
                              
                    </div>
                </div>
                            <div className="btn-modal">
                                <button onClick={closeModal2} className="btn btn-adicionar">Adicionar</button>
                                <button onClick={closeModal2} className="btn btn-cancelar">Cancelar</button>

                            </div>
            </div>
            </Modal>

            <Modal isOpen={isModalOpen3} onRequestClose={closeModal3}                
            id="modal-add-portfolio"
             contentLabel="Adicionando a Tatuagem"
            style={{
                overlay:{ backgroundColor:'rgba(0,0,0,0.5)',},
                content:{
                    top: '50%',
                    left:'50%',
                    height:'80%',
                    transform: 'translate(-40%, -50%)',
                    backgroundColor:'#000'
                },
            }}>
            <button className="modal-close-button" onClick={closeModal3}> 
            X 
            </button>

            <div className="modal-tatto">
                <div id="modal-add-tatto">
                <div className=' file'>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageSelect}
                              style={{ display: 'none' }}
                              id="imageInputp"
                            />
                            <label htmlFor="imageInputp">                    
                            <img src={image} alt="Upload de imagem"/>
                            </label>
                            
                          </div>
                    <div className="modal-info-description">
                            <div className="description">
                                <input className="inputp" type="text" id="nome" name="nome" placeholder="Nome"/>
                                </div>
                                <div className="description">
                                <h3 className="txt-white">Descrição</h3>
                                <input className="inputp" type="text" id="tamanho" name="tamanho" placeholder="Nome"/>
                                <input className="inputp" type="text" id="local" name="local" placeholder="Local"/>
                                <input className="inputp" type="text" id="tipo" name="tipo" placeholder="Tipo"/>
                                <input className="inputp" type="text" id="cores" name="cores" placeholder="Cores"/>

                              </div>
                    </div>      
                    
                </div>
                    <div className="btn-modal">
                                <button onClick={closeModal3} className="btn btn-cadastrar">Adicionar</button>
                                <button onClick={closeModal3} className="btn btn-cancelar">Cancelar</button>

                    </div>
            </div>
            </Modal>
            </section>

        </div>
      )

      
}
export default CrudPortfolio;
