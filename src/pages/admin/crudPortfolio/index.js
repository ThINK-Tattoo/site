import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/admin/menuDashboard';
import axios from 'axios';
import image from '../../../assets/icones/Upload_Image.png';

import '../../../styleGlobal.css';
import './index.css'

export default function CrudPortfolio() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [idAdmin, setIdAdmin] = useState();
    const [admin, setAdmin] = useState({
        id: 0,
        nome: '',
        email: '',
        senha: '',
        fotoPerfil: null
    });
     useEffect(() => {
         const userType = localStorage.getItem("userType");
 
         if(!userType || userType === 'cliente'){
             navigate('/signin');
         } else if(userType === 'admin'){
            setIsUserLoggedIn(userType === "admin");
            const adminLog = localStorage.getItem('user');
            const adminData = adminLog ? JSON.parse(adminLog) : null;
            axios.get('http://localhost:3636/cliente/selectPortfolio')
            .then(response => {
              setPortfolio(response.data); 
            })
            .catch(error => {
              console.error('Erro ao obter dados do portfólio:', error);
            });
            if (adminData) {
                setAdmin(adminData);
                setIdAdmin(adminData[0].id);
            }
         }

         
         
     }, []); 

    const [portfolio, setPortfolio] = useState([]);


    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpenEdit, setIsModalEdit] = useState(false);
    const [isModalOpenAdd, setIsModalAdd] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(true);
    const [formData, setFormData] = useState({
        id: idAdmin,
        nome: '',
        tamanho: '',
        local: '',
        tipo: '',
        cores: '',
        imagem: null,
    });
    
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
    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setSelectedPortfolio(null);
        setModalData(null);
        setIsModalOpen(false);
    };

    const openModalEdit = () => {
        setIsModalEdit(true);
        setIsModalOpen(false);
    };

    const closeModalEdit = () => {
        setIsModalEdit(false);
        setIsModalOpen(true);
    };

    const openModalAdd = () => {
        setIsModalAdd(true);

    };

    const closeModalAdd = () => {
        setIsModalAdd(false);
    };


    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handlePortfolioSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('idAdmin', idAdmin); // Supondo que 'user' seja uma string JSON
      
        formData.append('nome', document.getElementById('nome').value);
        formData.append('tamanho', document.getElementById('tamanho').value);
        formData.append('local', document.getElementById('local').value);
        formData.append('tipo', document.getElementById('tipo').value);
        formData.append('cores', document.getElementById('cores').value);
        
        try {
          const response = await fetch('http://localhost:3636/cliente/createPortfolio', {
            method: 'POST',
            body: formData
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            setPortfolio((prevPort) => [...prevPort, { ...data, imageLoaded: false }]);
            closeModalAdd();
            window.location.reload();
          } else {
            console.error('Erro ao adicionar imagem ao portfólio');
          }
        } catch (error) {
          console.error('Erro ao enviar requisição:', error);
        }
      };
      
      const handleUpdate = async (e) => {
        e.preventDefault();

        console.log('Botão clicado!');
        try {
            
            const response = await axios.put(`http://localhost:3636/cliente/updatePortfolio/${portfolio.id}`, portfolio);

            if (response.status === 200) {
                alert('Dados atualizados com sucesso!');
                closeModal(); // Fechar o modal após a atualização
                setPortfolio(updatedPortfolio => ({ ...updatedPortfolio, ...portfolio }));       
                const updatedPortfolioData = JSON.stringify([portfolio]);             
                localStorage.setItem('user', updatedPortfolioData);
                window.location.reload();            } else {
                alert(`Erro ao atualizar dados: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
            alert('Erro ao atualizar dados. Por favor, tente novamente mais tarde.');
        }
    };

    const handleExcluir = async (e) => {
        try {
            const response = await axios.delete(`http://localhost:3636/cliente/updatePortfolio/${portfolio.id}`, null);
    
            if (response.status === 200) {
                alert('Item excluído com sucesso!');
                closeModal();
                
                // Atualize o estado ou realize ações necessárias após a exclusão do item no banco de dados.
                
                const deletePortfolioData = JSON.stringify([portfolio]);
                localStorage.setItem('user', deletePortfolioData);
            } else {
                alert(`Erro ao excluir o item: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Erro ao excluir o item:', error);
            alert('Erro ao excluir o item. Por favor, tente novamente mais tarde.');
        }
    };
    
    return (
        <div>
            <Menu />
            <section>
                <div className="tituloDashboard">
                    <h1>Portfo<span className="span-color-dashboard">lio</span></h1>
                </div>
                <section className="portfolio">
                    {portfolio.map((portfolio) => (
                        <div key={portfolio.id} className="portifolio-item">
                            {!imageLoaded ? (
                                <p>Carregando...</p>
                            ) : (
                            <img id="img-port" onClick={() => openModal(portfolio)}
                            
                                src={`http://localhost:3636/src/temp/${portfolio.imagem}`} alt={portfolio.nome} />
                            )}
                        </div>
                    ))}
                </section>
                <div className="btnAdicionar">
                    <button onClick={openModalAdd} className="btnCrud">Adicionar</button>
                </div>
                <Modal isOpen={isModalOpen} onRequestClose={closeModal}
                    id="modal-container-portfolio"
                    contentLabel="Detalhes da Tatuagem"
                    style={{
                        overlay: { backgroundColor: 'rgba(0,0,0,0.5)', },
                        content: {
                            top: '50%',
                            left: '50%',
                            height: '70%',
                            transform: 'translate(-40%, -50%)',
                            backgroundColor: '#000'
                        },
                    }}>
                    <button className="modal-close-button" onClick={closeModal}>
                        X
                    </button>

                    {selectedPortfolio && (
                        <div className="modal-tatto">
                            <div id="modal-info-portfolio">
                                <img src={`http://localhost:3636/src/temp/${selectedPortfolio.imagem}`} alt={selectedPortfolio.nome} />
                                <div className="modal-info-description">
                                    <div className="description">
                                        <h3 className="txt-white" >{selectedPortfolio.nome}</h3>
                                    </div>
                                    <div className="description">
                                        <h3 className="txt-white">Descrição</h3>
                                        <p className="txt-white"><strong>Tamanho: </strong> {selectedSize || selectedPortfolio.tamanho}</p>
                                        <p className="txt-white"><strong>Local: </strong>{selectedPortfolio.local}</p>
                                        <p className="txt-white"><strong>Tipo: </strong> {selectedPortfolio.tipo}</p>
                                        <p className="txt-white"><strong>Cores: </strong> {selectedPortfolio.cores}</p>
                                        
                                    </div>


                                </div>
                            </div>
                            <div className="btn-modal">
                                <button onClick={openModalEdit} className="btn btn-editar">Editar</button>
                                <button onClick={handleExcluir} className="btn btn-cancelar">Excluir</button>

                            </div>
                        </div>
                    )}
                </Modal>

                <Modal isOpen={isModalOpenEdit} onRequestClose={closeModalEdit}
                    id="modal-edit-portfolio"
                    contentLabel="Editando a Tatuagem"
                    style={{
                        overlay: { backgroundColor: 'rgba(0,0,0,0.5)', },
                        content: {
                            top: '50%',
                            left: '50%',
                            height: '80%',
                            transform: 'translate(-40%, -50%)',
                            backgroundColor: '#000'
                        },
                    }}>
                    <button className="modal-close-button" onClick={closeModalEdit}>
                        X
                    </button>

                    {selectedPortfolio && (
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
                                <img src={selectedImage ? URL.createObjectURL(selectedImage): `http://localhost:3636/src/temp/${selectedPortfolio.imagem}`} 
                                alt="Upload de imagem" 
                                style={{ maxWidth: '270px', maxHeight: '268px' }}

                                />
                            </label>
                            <div className="modal-info-description">
                                <div className="description">
                                    <input className="inputp input" type="text" id="nome"
                                         onChange={(e) => {
                                            setSelectedPortfolio({
                                                ...selectedPortfolio,
                                                nome: e.target.value
                                            });
                                        }}
                                        name="nome" value={selectedPortfolio.nome} required
                                    />

                                </div>
                                <div className="description">
                                    <h3 className="txt-white">Descrição</h3>
                                    <input className="inputp input" type="text" id="tamanho"
                                        onChange={(e) => {
                                            setSelectedPortfolio({
                                                ...selectedPortfolio,
                                                tamanho: e.target.value
                                            });
                                        }}
                                        name="tamaho" value={selectedPortfolio.tamanho} required />

                                    <input className="inputp input" type="text" id="local"
                                        onChange={(e) => {
                                            setSelectedPortfolio({
                                                ...selectedPortfolio,
                                                local: e.target.value
                                            });
                                        }}
                                        name="local" value={selectedPortfolio.local} required />

                                    <input className="inputp input" type="text" id="Tipo"
                                        onChange={(e) => {
                                            setSelectedPortfolio({
                                                ...selectedPortfolio,
                                                tipo: e.target.value
                                            });
                                        }}
                                        name="Tipo" value={selectedPortfolio.tipo} required />

                                    <input className="inputp input" type="text" id="cores"
                                        onChange={(e) => {
                                            setSelectedPortfolio({
                                                ...selectedPortfolio,
                                                cores: e.target.value
                                            });
                                        }}
                                        name="cores" value={selectedPortfolio.cores} required />
                                </div>


                            </div>
                        </div>
                        <div className="btn-modal">
                            <button onClick={handleUpdate} className="btn btn-adicionar">Editar</button>
                            <button onClick={closeModalEdit} className="btn btn-cancelar">Cancelar</button>

                        </div>
                    </div>
                    )}

                    
                </Modal>

                <Modal isOpen={isModalOpenAdd} onRequestClose={closeModalAdd}
                    id="modal-add-portfolio"
                    contentLabel="Adicionando a Tatuagem"
                    style={{
                        overlay: { backgroundColor: 'rgba(0,0,0,0.5)', },
                        content: {
                            top: '50%',
                            left: '50%',
                            height: '80%',
                            transform: 'translate(-40%, -50%)',
                            backgroundColor: '#000'
                        },
                    }}>
                    <button className="modal-close-button" onClick={closeModalAdd}>
                        X
                    </button>

                    <div className="modal-tatto">
                        <div id="modal-add-tatto">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    style={{ display: 'none' }}
                                    id="imageInputp"
                                />
                               
                                <label htmlFor="imageInputp">
                                    <img src={selectedImage ? URL.createObjectURL(selectedImage): image} 
                                    alt="Upload de imagem" 
                                    id="imagePreview"
                                    style={{ maxWidth: '270px', maxHeight: '268px' }}
                                    />
                                
                                
                                </label>
                              
                           
                            <div className="modal-info-description">
                                <div className="description">
                                    <input className="inputp input" type="text" id="nome" name="nome" placeholder="Nome" />
                                </div>
                                <div className="description">
                                    <h3 className="txt-white">Descrição</h3>
                                    <input className="inputp" type="text" id="tamanho" name="tamanho" placeholder="Tamanho" />
                                    <input className="inputp" type="text" id="local" name="local" placeholder="Local" />
                                    <input className="inputp" type="text" id="tipo" name="tipo" placeholder="Tipo" />
                                    <input className="inputp" type="text" id="cores" name="cores" placeholder="Cores" />

                                </div>
                            </div>

                        </div>
                        <div className="btn-modal">
                            <button onClick={handlePortfolioSubmit} className="btn btn-adicionar">Adicionar</button>
                            <button onClick={closeModalAdd} className="btn btn-cancelar">Cancelar</button>
                        </div>
                    </div>
                </Modal>
            </section>

        </div>
    )


}
;
