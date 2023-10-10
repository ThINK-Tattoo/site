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


export default function CrudFlashTattoo() {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userType = localStorage.getItem("userType");

        if(!userType || userType === 'cliente'){
            navigate('/signin');
        }else if(userType === 'admin'){
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

    const [selectedTattoo, setSelectedTattoo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpenEdit, setIsModalEdit] = useState(false);

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


    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newTattooData, setNewTattooData] = useState({
        nome: "",
        tamanho: "",
        local: "",
        Tipo: "",
        Cores: "",
        imagem: "",
        valor: ""
    });

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleAddTattoo = () => {
        closeAddModal();
    };

    const clearForm = () => {
        setNewTattooData({
            nome: '',
            tamanho: '',
            valor: '',
            imagem: null,
            local: '',
            Tipo: '',
            Cores: '',
            descricao: '',
        });
    };

    const openModalEdit = () => {
        setIsModalEdit(true);
        setIsModalOpen(false);
    };

    const closeModalEdit = () => {
        setIsModalEdit(false);
        setIsModalOpen(true);
    };

    const clearFormAndCloseModal = () => {
        clearForm();
        closeAddModal();

    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTattooData({ ...newTattooData, [name]: value });
    };



    
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };
    return (
        <div >
            <Menu />
            <section>
                <div className="tituloDashboard">
                    <h1>Flash Tat<span className="span-color-dashboard">too</span></h1>
                </div>
            
            <div  className="admin-flashtattoo-container">
                <section className="flashtattoo ">

                    {flashtatto.map((tattoo) => (

                        <div key={tattoo.id} className="tattoo-item">

                            <img src={tattoo.imagem} alt={tattoo.nome} />

                            <button className="btn btn-tattoo" onClick={() => openModal(tattoo)}>

                                Ver

                            </button>

                        </div>

                    ))}

                </section>
         
                    <div className="btnAdicionar">
                    <button onClick={openAddModal} className="btnCrud">Adicionar</button>
                     </div>
                    
            </div>
           
            
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

                        <div className="button-container">

                        <button onClick={openModalEdit} className="btn btn-EditarExcluir" >Editar</button>

                            <button className="btn btn-EditarExcluir" >Excluir</button>

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

                    {selectedTattoo && (
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
                                <img src={selectedImage ? URL.createObjectURL(selectedImage): selectedTattoo.imagem} 
                                alt="Upload de imagem" 
                                style={{ maxWidth: '270px', maxHeight: '268px' }}

                                />
                            </label>
                            <div className="modal-info-description">
                                <div className="description">
                                    <input className="inputp" type="text" id="nome"
                                        onChange={(e) => ({ ...selectedTattoo, nome: e.target.value })}
                                        name="nome" value={selectedTattoo.nome} required
                                    />

                                </div>
                                <div className="description">
                                    <h3 className="txt-white">Descrição</h3>
                                    <input className="inputp" type="text" id="tamanho"
                                        onChange={(e) => ({ ...selectedTattoo, tamanho: e.target.value})}
                                        name="tamaho" value={selectedTattoo.tamanho} required />

                                    <input className="inputp" type="text" id="local"
                                        onChange={(e) => ({ ...selectedTattoo, local: e.target.value })}
                                        name="local" value={selectedTattoo.local} required />

                                    <input className="inputp" type="text" id="Tipo"
                                        onChange={(e) => ({ ...selectedTattoo, Tipo: e.target.value })}
                                        name="Tipo" value={selectedTattoo.Tipo} required />

                                    <input className="inputp" type="text" id="cores"
                                        onChange={(e) => ({ ...selectedTattoo, cores: e.target.value })}
                                        name="cores" value={selectedTattoo.Cores} required />

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

                                    <p className="txt-white">R$ xx,xx</p>

                                </div>

                                <div id="second-info">

                                    <button

                                        className="btn btn-valor"

                                        onClick={() => setSelectedSize('10cm')}

                                    >

                                        10 cm

                                    </button>

                                    <p className="txt-white">R$ xx,xx</p>

                                </div>

                                <div id="third-info">

                                    <button

                                        className="btn btn-valor"

                                        onClick={() => setSelectedSize('15cm')}

                                    >

                                        15 cm

                                    </button>

                                    <p className="txt-white">R$ xx,xx</p>

                                </div>

                            </div>

                        </div>
                        <div className="btn-modal">
                            <button onClick={openModalEdit} className="btn btn-adicionar">Adicionar</button>
                            <button onClick={closeModalEdit} className="btn btn-cancelar">Cancelar</button>

                        </div>
                    </div>
                    )}
            </Modal>
            <Modal
                isOpen={isAddModalOpen}
                onRequestClose={closeAddModal}
                id="modal-container"
                contentLabel="Adicionar Tatuagem"
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

                <button className="modal-close-button" onClick={closeAddModal}>
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
                                <label htmlFor="imageInpute">
                                <img src={selectedImage ? URL.createObjectURL(selectedImage): image} 
                                alt="Upload de imagem" 
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

                        <div id="first-info">
    <button
        className="btn btn-valor"
        onClick={() => setSelectedSize('5cm')}
    >
        5 cm
    </button>
    <p className="txt-white ">
        <input
            type="text"
            placeholder="R$"
            name="valor5cm" // Nome diferente para 5 cm
            value={newTattooData.valor5cm}
            onChange={handleInputChange}
            style={{ textAlign: 'center' }}
        />
    </p>
</div>

<div id="second-info">
    <button
        className="btn btn-valor"
        onClick={() => setSelectedSize('10cm')}
    >
        10 cm
    </button>
    <p className="txt-white ">
        <input
            type="text"
            placeholder="R$"
            name="valor10cm" // Nome diferente para 10 cm
            value={newTattooData.valor10cm}
            onChange={handleInputChange}
            style={{ textAlign: 'center' }}
        />
    </p>
</div>

<div id="third-info">
    <button
        className="btn btn-valor"
        onClick={() => setSelectedSize('15cm')}
    >
        15 cm
    </button>
    <input
        type="text"
        placeholder="R$"
        name="valor15cm" // Nome diferente para 15 cm
        value={newTattooData.valor15cm}
        onChange={handleInputChange}
        style={{ textAlign: 'center' }}
    />
</div>


                        </div>

                    </div>

                    <div className="button-container">

                        <button className="btn btn-EditarExcluir" onClick={handleAddTattoo}> Adicionar </button>

                        <button className="btn btn-EditarExcluir" onClick={clearFormAndCloseModal}>Cancelar</button>

                    </div>

                </div>

            </Modal>
            </section>
        </div>
    );
}