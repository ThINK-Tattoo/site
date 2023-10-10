import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/admin/menuDashboard';

import image from '../../../assets/icones/Upload_Image.png';
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

import '../../../styleGlobal.css';
import './index.css'

export default function CrudFlashTattoo() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
         const userType = localStorage.getItem("userType");
 
         if(!userType || userType === 'cliente'){
             navigate('/signin');
         } else if(userType === 'admin'){
             setIsUserLoggedIn(userType === "admin");
         }
         
     }, []); 
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
                            <img id="img-flash" onClick={() => openModal( CrudFlashtattoo)}
                                src={ CrudFlashtattoo.imagem} alt={ CrudFlashtattoo.nome} />
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
                                <img src={selectedCrudFlashtattoo.imagem} alt={selectedCrudFlashtattoo.nome} />
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
                                    <p className="txt-white">R$ 200.00</p>
                                </div>
                                <div id="second-inf">
                                    <button 
                                        className="btn btn-valor"
                                        onClick={() => setSelectedSize('10cm')}
                                    >
                                        10 cm
                                    </button>
                                    <p className="txt-white">R$ 290.00</p>
                                </div>
                                <div id="third-inf">
                                    <button 
                                        className="btn btn-valor" 
                                        onClick={() => setSelectedSize('15cm')}
                                    >
                                        15 cm
                                    </button>
                                    <p className="txt-white">R$ 350.00</p>
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
                                <img src={selectedImage ? URL.createObjectURL(selectedImage): selectedCrudFlashtattoo.imagem} 
                                alt="Upload de imagem" 
                                style={{ maxWidth: '270px', maxHeight: '268px' }}

                                />
                            </label>
                            <div className="modal-info-description">
                                <div className="description">
                                    <input className="inputp" type="text" id="nome"
                                        onChange={(e) => ({ ...selectedCrudFlashtattoo, nome: e.target.value })}
                                        name="nome" value={selectedCrudFlashtattoo.nome} required
                                    />

                                </div>
                                <div className="description">
                                    <h3 className="txt-white">Descrição</h3>
                                    <input className="inputp" type="text" id="tamanho"
                                        onChange={(e) => ({ ...selectedCrudFlashtattoo, tamanho: e.target.value})}
                                        name="tamaho" value={selectedCrudFlashtattoo.tamanho} required />

                                    <input className="inputp" type="text" id="local"
                                        onChange={(e) => ({ ...selectedCrudFlashtattoo, local: e.target.value })}
                                        name="local" value={selectedCrudFlashtattoo.local} required />

                                    <input className="inputp" type="text" id="Tipo"
                                        onChange={(e) => ({ ...selectedCrudFlashtattoo, Tipo: e.target.value })}
                                        name="Tipo" value={selectedCrudFlashtattoo.Tipo} required />

                                    <input className="inputp" type="text" id="cores"
                                        onChange={(e) => ({ ...selectedCrudFlashtattoo, cores: e.target.value })}
                                        name="cores" value={selectedCrudFlashtattoo.Cores} required />

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
                                    <input className="inputv" type="number" id="tamanhope" name="tamanhope" placeholder="R$" />
                                </div>
                                <div id="second-inf">
                                    <button 
                                        className="btn btn-valor"
                                        onClick={() => setSelectedSize('10cm')}
                                    >
                                        10 cm
                                    </button>
                                    <p></p>
                                    <input className="inputv" type="number" id="tamanhome" name="tamanhome" placeholder="R$" />
                                </div>
                                <div id="third-inf">
                                    <button 
                                        className="btn btn-valor" 
                                        onClick={() => setSelectedSize('15cm')}
                                    >
                                        15 cm
                                    </button>
                                    <p></p>
                                    <input className="inputv" type="number" id="tamanhoge" name="tamanhoge" placeholder="R$" />
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
                                    id="imageInpute"
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
                                    <input className="inputp" type="text" id="nome" name="nome" placeholder="Nome" />
                                </div>
                                <div className="description">
                                    <h3 className="txt-white">Descrição</h3>
                                    <input className="inputp" type="text" id="tamanho" name="tamanho" placeholder="Nome" />
                                    <input className="inputp" type="text" id="local" name="local" placeholder="Local" />
                                    <input className="inputp" type="text" id="tipo" name="tipo" placeholder="Tipo" />
                                    <input className="inputp" type="text" id="cores" name="cores" placeholder="Cores" />

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
                                    <input className="inputv" type="number" id="tamanhopa" name="tamanhopa" placeholder="R$" />
                                </div>
                                <div id="second-inf">
                                    <button 
                                        className="btn btn-valor"
                                        onClick={() => setSelectedSize('10cm')}
                                    >
                                        10 cm
                                    </button>
                                    <p></p>
                                    <input className="inputv" type="number" id="tamanhoma" name="tamanhoma" placeholder="R$" />
                                </div>
                                <div id="third-inf">
                                    <button 
                                        className="btn btn-valor" 
                                        onClick={() => setSelectedSize('15cm')}
                                    >
                                        15 cm
                                    </button>
                                    <p></p>
                                    <input className="inputv" type="number" id="tamanhoga" name="tamanhoga" placeholder="R$" />
                                </div>
                            </div>
                        </div>

                        <div className="btn-modal">
                            <button onClick={closeModalAdd} className="btn btn-adicionar">Adicionar</button>
                            <button onClick={closeModalAdd} className="btn btn-cancelar">Cancelar</button>
                        </div>
                    </div>
                </Modal>
            </section>

        </div>
    )


}
;
