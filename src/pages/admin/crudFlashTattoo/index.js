import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/admin/menuDashboard';
import axios from 'axios';

import image from '../../../assets/icones/Upload_Image.png';

import '../../../styleGlobal.css';
import './index.css';

import '../../../styleGlobal.css';
import './index.css'

export default function CrudFlashTattoo() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [idAdmin, setIdAdmin] = useState();
    
    const [formValues, setFormValues] = useState({
        nome: '',
        tamanho: '',
        local: '',
        tipo: '',
        cores: '',
        valor1: null,
        valor2: null,
        valor3: null,
    });
    
   
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };
    const handleNumericInputChange = (fieldName, e) => {
        const { value } = e.target;
        // Converte o valor para número e atualiza o estado
        setFormValues((prevValues) => ({
            ...prevValues,
            [fieldName]: parseFloat(value) || 0, // Garante que seja um número válido
        }));
    };
    

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
                axios.get('http://localhost:3636/admin/selectFlashTattoo')
                .then(response => {
                setFlashtatto(response.data);
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

     const [flashtatto, setFlashtatto] = useState([]);

     const [imageLoaded, setImageLoaded] = useState(true);
    const [selectedCrudFlashtattoo, setSelectedCrudFlashtattoo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpenEdit, setIsModalEdit] = useState(false);
    const [isModalOpenAdd, setIsModalAdd] = useState(false);

    const navigate = useNavigate();

    const openModal = ( CrudFlashtattoo) => {
        setSelectedCrudFlashtattoo( CrudFlashtattoo);
        setModalData({
            nome:  CrudFlashtattoo.nome,
            tamanho: selectedSize,
            local:  CrudFlashtattoo.local,
            Tipo:  CrudFlashtattoo.Tipo,
            Cores:  CrudFlashtattoo.Cores,
            imagem:  CrudFlashtattoo.imagem,
        });
        setIsModalOpen(true);
    };
    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setSelectedCrudFlashtattoo(null);
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

    const handleFlashTattooSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('idAdmin', idAdmin); 
      
        formData.append('nome', formValues.nome);
        formData.append('tamanho', formValues.tamanho);
        formData.append('local', formValues.local);
        formData.append('tipo', formValues.tipo);
        formData.append('cores', formValues.cores);
        formData.append('valor1', formValues.valor1);
        formData.append('valor2', formValues.valor2);
        formData.append('valor3', formValues.valor3);

        
        try {
          const response = await fetch('http://localhost:3636/admin/createFlashTattoo', {
            method: 'POST',
            body: formData
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            setFlashtatto((prevFlash) => [...prevFlash, { ...data, imageLoaded: false }]);
            closeModalAdd();
            window.location.reload();
          } else {
            console.error('Erro ao adicionar imagem ao portfólio');
          }
        } catch (error) {
          console.error('Erro ao enviar requisição:', error);
        }
      };
    return (
        <div>
            <Menu />
            <section>
                <div className="tituloDashboard">
                <h1>Flash Tat<span className="span-color-dashboard">too</span></h1>
                </div>
                <section className="CrudFlashtattoo">
                    {flashtatto.map(( CrudFlashtattoo) => (
                        <div key={ CrudFlashtattoo.id} className="portifolio-item">
                            {!imageLoaded ? (
                                <p>Carregando...</p>
                            ) : (
                            <img id="img-flash" onClick={() => openModal( CrudFlashtattoo)}
                            src={`http://localhost:3636/src/temp/${CrudFlashtattoo.imagem}`} alt={CrudFlashtattoo.nome} />
                            )}
                        </div>
                    ))}
                </section>
                <div className="btnAdicionar">
                    <button onClick={openModalAdd} className="btnCrud">Adicionar</button>
                </div>
                <Modal isOpen={isModalOpen} onRequestClose={closeModal}
                    id="modal-container-flashtatto"
                    contentLabel="Detalhes da Tatuagem"
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
                    <button className="modal-close-button" onClick={closeModal}>
                        X
                    </button>

                    {selectedCrudFlashtattoo && (
                        <div className="modal-tattoo">
                            <div id="modal-info-tatto">
                                <img src={`http://localhost:3636/src/temp/${selectedCrudFlashtattoo.imagem}`} alt={selectedCrudFlashtattoo.nome} />
                                <div className="modal-info-description">
                                    <div className="description">
                                        <h3 className="txt-white" >{selectedCrudFlashtattoo.nome}</h3>
                                    </div>
                                    <div className="description">
                                        <h3 className="txt-white">Descrição:</h3>
                                        <p className="txt-white"><strong>Tamanho: </strong> {selectedSize || selectedCrudFlashtattoo.tamanho}</p>
                                        <p className="txt-white"><strong>Local: </strong>{selectedCrudFlashtattoo.local}</p>
                                        <p className="txt-white"><strong>Tipo: </strong> {selectedCrudFlashtattoo.Tipo}</p>
                                        <p className="txt-white"><strong>Cores: </strong> {selectedCrudFlashtattoo.Cores}</p>
                                    </div>


                                </div>
                            </div>

                            <div className="tamanho-info">
                            <h3 className="txt-white ">Tamanho e valores</h3>
                            <div className="valores-tattoo">
                                <div id="first-inf">
                                    <button 
                                        className="btn btn-valor"
                                        onClick={() => setSelectedSize('5cm')}
                                    >
                                        5 cm
                                    </button>
                                    <p className="txt-white">R${selectedCrudFlashtattoo.valor1}</p>
                                </div>
                                <div id="second-inf">
                                    <button 
                                        className="btn btn-valor"
                                        onClick={() => setSelectedSize('10cm')}
                                    >
                                        10 cm
                                    </button>
                                    <p className="txt-white">R${selectedCrudFlashtattoo.valor2}</p>
                                </div>
                                <div id="third-inf">
                                    <button 
                                        className="btn btn-valor" 
                                        onClick={() => setSelectedSize('15cm')}
                                    >
                                        15 cm
                                    </button>
                                    <p className="txt-white">R${selectedCrudFlashtattoo.valor2}</p>
                                </div>
                            </div><div className="btn-modal">
                                <button onClick={openModalEdit} className="btn btn-editar">Editar</button>
                                <button onClick={closeModal} className="btn btn-cancelar">Cancelar</button>

                            </div>
                        </div>

                            
                        </div>

                        
                    )}
                </Modal>

                <Modal isOpen={isModalOpenEdit} onRequestClose={closeModalEdit}
                    id="modal-edit-flashtatto"
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

                    {selectedCrudFlashtattoo && (
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
                                <img src={selectedImage ? URL.createObjectURL(selectedImage): `http://localhost:3636/src/temp/${selectedCrudFlashtattoo.imagem}`} 
                                alt="Upload de imagem" 
                                style={{ maxWidth: '270px', maxHeight: '268px' }}

                                />
                            </label>
                            <div className="modal-info-description">
                                <div className="description">
                                    <input className="inputp input" type="text" id="nome"
                                        onChange={(e) => {
                                            setSelectedCrudFlashtattoo({
                                                ...selectedCrudFlashtattoo,
                                                nome: e.target.value
                                            });
                                        }}
                                        name="nome" value={selectedCrudFlashtattoo.nome} required
                                    />

                                </div>
                                <div className="description">
                                    <h3 className="txt-white">Descrição</h3>
                                    <input className="inputp input" type="text" id="tamanho"
                                        onChange={(e) => {
                                            setSelectedCrudFlashtattoo({
                                                ...selectedCrudFlashtattoo,
                                                tamanho: e.target.value
                                            });
                                        }}
                                        name="tamaho" value={selectedCrudFlashtattoo.tamanho} required />

                                    <input className="inputp input" type="text" id="local"
                                        onChange={(e) => {
                                            setSelectedCrudFlashtattoo({
                                                ...selectedCrudFlashtattoo,
                                                local: e.target.value
                                            });
                                        }}
                                        name="local" value={selectedCrudFlashtattoo.local} required />

                                    <input className="inputp input" type="text" id="Tipo"
                                        onChange={(e) => {
                                            setSelectedCrudFlashtattoo({
                                                ...selectedCrudFlashtattoo,
                                                tipo: e.target.value
                                            });
                                        }}
                                        name="tipo" value={selectedCrudFlashtattoo.tipo} required />

                                    <input className="inputp input" type="text" id="cores"
                                        onChange={(e) => {
                                            setSelectedCrudFlashtattoo({
                                                ...selectedCrudFlashtattoo,
                                                cores: e.target.value
                                            });
                                        }}
                                        name="cores" value={selectedCrudFlashtattoo.cores} required />

                                </div>

                            </div>
                        </div>

                        <div className="tamanho-info">
                            <h3 className="txt-white ">Tamanho e valores</h3>
                            <div className="valores-tattoo">
                                <div id="first-inf">
                                    <button 
                                        className="btn btn-valor"
                                        onClick={() => setSelectedSize('5cm')}
                                    >
                                        5 cm
                                    </button>
                                    <p></p>
                                    <input className="inputv input" type="number" id="tamanhope valor1" 
                                     value={selectedCrudFlashtattoo.valor1}
                                     onChange={(e) => {
                                        setSelectedCrudFlashtattoo({
                                            ...selectedCrudFlashtattoo,
                                            valor1: e.target.value
                                        });
                                    }}
                                     name="tamanhope" placeholder="R$" />
                                </div>
                                <div id="second-inf">
                                    <button 
                                        className="btn btn-valor"
                                        onClick={() => setSelectedSize('10cm')}
                                    >
                                        10 cm
                                    </button>
                                    <p></p>
                                    <input className="inputv input" type="number" id="tamanhome valor2" 
                                    value={selectedCrudFlashtattoo.valor2} 
                                    onChange={(e) => {
                                        setSelectedCrudFlashtattoo({
                                            ...selectedCrudFlashtattoo,
                                            valor2: e.target.value
                                        });
                                    }}
                                    name="tamanhome" placeholder="R$" />
                                </div>
                                <div id="third-inf">
                                    <button 
                                        className="btn btn-valor" 
                                        onClick={() => setSelectedSize('15cm')}
                                    >
                                        15 cm
                                    </button>
                                    <p></p>
                                    <input className="inputv" type="number" 
                                     value={ selectedCrudFlashtattoo.valor3} 
                                     onChange={(e) => {
                                        setSelectedCrudFlashtattoo({
                                            ...selectedCrudFlashtattoo,
                                            valor3: e.target.value
                                        });
                                    }}
                                     id="tamanhoge" name="tamanhoge valor3" placeholder="R$" />
                                </div>
                            </div>
                        </div>

                        <div className="btn-modal">
                            <button onClick={closeModalEdit} className="btn btn-adicionar">Adicionar</button>
                            <button onClick={closeModalEdit} className="btn btn-cancelar">Cancelar</button>

                        </div>
                    </div>
                    )}

                    
                </Modal>

                <Modal isOpen={isModalOpenAdd} onRequestClose={closeModalAdd}
                    id="modal-add-flashtatto"
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
                                    id="imagePreviw"
                                    style={{ maxWidth: '270px', maxHeight: '268px' }}
                                    />
                                
                                
                                </label>
                              
                           
                            <div className="modal-info-description">
                                <div className="description">
                                    <input className="inputp input" 
                                    type="text" id="nome" name="nome"
                                    value={formValues.nome}
                                    onChange={handleInputChange}
                                     placeholder="Nome" />
                                </div>
                                <div className="description">
                                    <h3 className="txt-white">Descrição</h3>

                                    <input className="inputp input" type="text" id="tamanho" name="tamanho" 
                                    value={formValues.tamanho}
                                    onChange={handleInputChange}
                                    placeholder="Tamanho" />

                                    <input className="inputp input" type="text" id="local" name="local" 
                                    value={formValues.local}
                                    onChange={handleInputChange}
                                    placeholder="Local" />

                                    <input className="inputp input" type="text" id="tipo" name="tipo" 
                                    value={formValues.tipo}
                                    onChange={handleInputChange}
                                    placeholder="Tipo" />

                                    <input className="inputp input" type="text" id="cores" name="cores" 
                                    value={formValues.cores}
                                    onChange={handleInputChange}
                                    placeholder="Cores" />

                                </div>
                            </div>

                        </div>

                        <div className="tamanho-info">
                            <h3 className="txt-white ">Tamanho e valores</h3>
                            <div className="valores-tattoo">
                            <div id="first-inf">
                                <button 
                                    className="btn btn-valor"
                                    onClick={() => setSelectedSize('5cm')}
                                >
                                    5 cm
                                </button>
                                <p></p>
                                <input
                                    className="inputv"
                                    type="number"
                                    id="tamanhopa"  
                                    name="tamanhopa"
                                    value={formValues.valor1}
                                    onChange={(e) => handleNumericInputChange('valor1', e)}
                                    placeholder="R$"
                                />
                            </div>
                            <div id="second-inf">
                                <button 
                                    className="btn btn-valor"
                                    onClick={() => setSelectedSize('10cm')}
                                >
                                    10 cm
                                </button>
                                <p></p>
                                <input
                                    className="inputv"
                                    type="number"
                                    id="tamanhoma"
                                    name="tamanhoma"
                                    value={formValues.valor2}
                                    onChange={(e) => handleNumericInputChange('valor2', e)}
                                    placeholder="R$"
                                />
                            </div>
                            <div id="third-inf">
                                <button 
                                    className="btn btn-valor" 
                                    onClick={() => setSelectedSize('15cm')}
                                >
                                    15 cm
                                </button>
                                <p></p>
                                <input
                                    className="inputv"
                                    type="number"
                                    id="tamanhoga"
                                    name="tamanhoga"
                                    value={formValues.valor3}
                                    onChange={(e) => handleNumericInputChange('valor3', e)}
                                    placeholder="R$"
                                />
                            </div>

                            </div>
                        </div>
                        <p className="txt-white">{formValues.valor1}</p>
                        <p className="txt-white">{formValues.valor2}</p>
                        <p className="txt-white">{formValues.valor3}</p>
                        <div className="btn-modal">
                            <button onClick={handleFlashTattooSubmit} className="btn btn-adicionar">Adicionar</button>
                            <button onClick={closeModalAdd} className="btn btn-cancelar">Cancelar</button>
                        </div>
                    </div>
                </Modal>
            </section>

        </div>
    )


}
;
