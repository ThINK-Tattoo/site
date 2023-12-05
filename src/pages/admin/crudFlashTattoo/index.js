import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/admin/menuDashboard';
import axios from 'axios';

import image from '../../../assets/icones/Upload_Image.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../../styleGlobal.css';
import './index.css';

export default function CrudFlashtatto() {
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

            axios.get('https://api-think-tattoo.up.railway.app/admin/selectFlashtattoo')
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
    const [selectedCrudFlashtatto, setSelectedCrudFlashtatto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpenEdit, setIsModalEdit] = useState(false);
    const [isModalOpenAdd, setIsModalAdd] = useState(false);

    const navigate = useNavigate();

    const openModal = ( CrudFlashtatto) => {
        setSelectedCrudFlashtatto( CrudFlashtatto);
        setModalData({
            nome:  CrudFlashtatto.nome,
            tamanho: selectedSize,
            local:  CrudFlashtatto.local,
            Tipo:  CrudFlashtatto.Tipo,
            Cores:  CrudFlashtatto.Cores,
            imagem:  CrudFlashtatto.imagem,
        });
        setIsModalOpen(true);
    };
    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setSelectedCrudFlashtatto(null);
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

    const handleFlashtattoSubmit = async (e) => {
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
            const response = await fetch('https://api-think-tattoo.up.railway.app/admin/createFlashTattoo', {
            method: 'POST',
            body: formData
          });

          console.log(response);
          
          if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            setFlashtatto((prevFlash) => [...prevFlash, { ...data, imageLoaded: false }]);
            closeModalAdd();
            axios.get('https://api-think-tattoo.up.railway.app/admin/selectFlashtattoo')
            .then(response => {
            setFlashtatto(response.data);
            })
          } else {
            console.error('Erro ao adicionar imagem ao portfólio');
          }
        } catch (error) {
          console.error('Erro ao enviar requisição:', error);
        }
      };

      
    const closeAll = () =>{
        setIsModalAdd(false);
        setIsModalEdit(false);
        setIsModalOpen(false);
    }

      const handleUpdate = async (e) => {
        e.preventDefault();

        console.log('Botão clicado!');
        try {
            const formData = new FormData();
            formData.append('idAdmin', selectedCrudFlashtatto.idAdmin);
            formData.append('nome', selectedCrudFlashtatto.nome);
            formData.append('tamanho', selectedCrudFlashtatto.tamanho);
            formData.append('local', selectedCrudFlashtatto.local);
            formData.append('tipo', selectedCrudFlashtatto.tipo);
            formData.append('cores', selectedCrudFlashtatto.cores);
            formData.append('valor1', selectedCrudFlashtatto.valor1);
            formData.append('valor2', selectedCrudFlashtatto.valor2);
            formData.append('valor3', selectedCrudFlashtatto.valor3);

            if(!selectedImage){
                formData.append('file', selectedCrudFlashtatto.imagem);
            }else{
                formData.append('file', selectedImage);
            }
           

            const response = await axios.put(`https://api-think-tattoo.up.railway.app/cliente/updateFlashTattoo/${selectedCrudFlashtatto.id}`, formData);

            console.log(response.data);
                if (response.status === 200) {
                
                    closeAll();

                    toast.success('Update da FlashTattoo feita com sucesso', {
                        position: toast.POSITION.TOP_CENTER,
                        className: 'custom-toast-success',
                        progressClassName: 'custom-toast-progress-bar',
                    });

                    axios.get('https://api-think-tattoo.up.railway.app/admin/selectFlashtattoo')
                        .then(response => {
                        setFlashtatto(response.data);
                        })
                        .catch(error => {
                        console.error('Erro ao obter dados da flashtattoo:', error);
                        });
             
                } 
                
            else {
                toast.error("Erro ao dar update na FlashTattoo", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                console.error(`Erro ao atualizar dados: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
            alert('Erro ao atualizar dados. Por favor, tente novamente mais tarde.');
        }
    };

    const handleExcluir = async (e) => {
        try {
            const response = await axios.delete(`https://api-think-tattoo.up.railway.app/cliente/updateFlashtatto/${flashtatto.id}`, null);
    
            if (response.status === 200) {
                alert('Item excluído com sucesso!');
                closeModal();
                
                // Atualize o estado ou realize ações necessárias após a exclusão do item no banco de dados.
                
                const deleteFlashtattoData = JSON.stringify([flashtatto]);
                localStorage.setItem('user', deleteFlashtattoData);
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
                <h1>Flash Tat<span className="span-color-dashboard">too</span></h1>
                </div>
                <ToastContainer position="top-center" />
                <section className="CrudFlashtatto" 
                    style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", justifyContent: "center", alignItems: "center"}}>
                    {flashtatto.map(( CrudFlashtatto) => (
                        <div key={ CrudFlashtatto.id} className="portifolio-item"
                        style={{marginLeft: "90%"}}>
                            {!imageLoaded ? (
                                <p>Carregando...</p>
                            ) : (
                            <img id="img-flash" onClick={() => openModal( CrudFlashtatto)}
                            style={{cursor: "pointer"}}
                            src={`https://api-think-tattoo.up.railway.app/src/temp/${CrudFlashtatto.imagem}`} alt={CrudFlashtatto.nome} />
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

                    {selectedCrudFlashtatto && (
                        <div className="modal-tattoo">
                            <div id="modal-info-tatto">
                                <img src={`https://api-think-tattoo.up.railway.app/src/temp/${selectedCrudFlashtatto.imagem}`} alt={selectedCrudFlashtatto.nome} />
                                <div className="modal-info-description">
                                    <div className="description">
                                        <h3 className="txt-white" >{selectedCrudFlashtatto.nome}</h3>
                                    </div>
                                    <div className="description">
                                        <h3 className="txt-white">Descrição:</h3>
                                        <p className="txt-white"><strong>Tamanho: </strong> {selectedSize || selectedCrudFlashtatto.tamanho}</p>
                                        <p className="txt-white"><strong>Local: </strong>{selectedCrudFlashtatto.local}</p>
                                        <p className="txt-white"><strong>Tipo: </strong> {selectedCrudFlashtatto.tipo}</p>
                                        <p className="txt-white"><strong>Cores: </strong> {selectedCrudFlashtatto.cores}</p>
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
                                    <p className="txt-white">R${selectedCrudFlashtatto.valor1}</p>
                                </div>
                                <div id="second-inf">
                                    <button 
                                        className="btn btn-valor"
                                        onClick={() => setSelectedSize('10cm')}
                                    >
                                        10 cm
                                    </button>
                                    <p className="txt-white">R${selectedCrudFlashtatto.valor2}</p>
                                </div>
                                <div id="third-inf">
                                    <button 
                                        className="btn btn-valor" 
                                        onClick={() => setSelectedSize('15cm')}
                                    >
                                        15 cm
                                    </button>
                                    <p className="txt-white">R${selectedCrudFlashtatto.valor2}</p>
                                </div>
                            </div><div className="btn-modal">
                                <button onClick={openModalEdit} className="btn btn-editarFT">Editar</button>
                                <button onClick={handleExcluir} className="btn btn-cancelarAdmin">Excluir</button>

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

                    {selectedCrudFlashtatto && (
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
                                <img src={selectedImage ? URL.createObjectURL(selectedImage): `https://api-think-tattoo.up.railway.app/src/temp/${selectedCrudFlashtatto.imagem}`} 
                                alt="Upload de imagem" 
                                style={{ maxWidth: '270px', maxHeight: '268px' }}

                                />
                            </label>
                            <div className="modal-info-description">
                                <div className="description">
                                    <input className="inputp input" type="text" id="nome"
                                        onChange={(e) => {
                                            setSelectedCrudFlashtatto({
                                                ...selectedCrudFlashtatto,
                                                nome: e.target.value
                                            });
                                        }}
                                        name="nome" value={selectedCrudFlashtatto.nome} required
                                    />

                                </div>
                                <div className="description">
                                    <h3 className="txt-white">Descrição</h3>
                                    <input className="inputp input" type="text" id="tamanho"
                                        onChange={(e) => {
                                            setSelectedCrudFlashtatto({
                                                ...selectedCrudFlashtatto,
                                                tamanho: e.target.value
                                            });
                                        }}
                                        name="tamaho" value={selectedCrudFlashtatto.tamanho} required />

                                    <input className="inputp input" type="text" id="local"
                                        onChange={(e) => {
                                            setSelectedCrudFlashtatto({
                                                ...selectedCrudFlashtatto,
                                                local: e.target.value
                                            });
                                        }}
                                        name="local" value={selectedCrudFlashtatto.local} required />

                                    <input className="inputp input" type="text" id="Tipo"
                                        onChange={(e) => {
                                            setSelectedCrudFlashtatto({
                                                ...selectedCrudFlashtatto,
                                                tipo: e.target.value
                                            });
                                        }}
                                        name="tipo" value={selectedCrudFlashtatto.tipo} required />

                                    <input className="inputp input" type="text" id="cores"
                                        onChange={(e) => {
                                            setSelectedCrudFlashtatto({
                                                ...selectedCrudFlashtatto,
                                                cores: e.target.value
                                            });
                                        }}
                                        name="cores" value={selectedCrudFlashtatto.cores} required />

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
                                    <input className="inputp " type="number" id="tamanhope valor1" 
                                    value={selectedCrudFlashtatto.valor1}
                                    onChange={(e) => {
                                        setSelectedCrudFlashtatto({
                                            ...selectedCrudFlashtatto,
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
                                    <input className="inputp " type="number" id="tamanhome valor2" 
                                    value={selectedCrudFlashtatto.valor2} 
                                    onChange={(e) => {
                                        setSelectedCrudFlashtatto({
                                            ...selectedCrudFlashtatto,
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
                                    <input className="inputp" type="number" 
                                    value={ selectedCrudFlashtatto.valor3} 
                                    onChange={(e) => {
                                        setSelectedCrudFlashtatto({
                                            ...selectedCrudFlashtatto,
                                            valor3: e.target.value
                                        });
                                    }}
                                    id="tamanhoge" name="tamanhoge valor3" placeholder="R$" />
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
                                    className="inputp"
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
                                    className="inputp"
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
                                    className="inputp"
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
                      
                        <div className="btn-modal">
                            <button onClick={handleFlashtattoSubmit} className="btn btn-adicionarADM">Adicionar</button>
                            <button onClick={closeModalAdd} className="btn btn-cancelarAdmin">Cancelar</button>
                        </div>
                    </div>
                </Modal>
            </section>
        </div>
    )
};
