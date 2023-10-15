import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Menu from '../../../components/admin/menuDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faL } from '@fortawesome/free-solid-svg-icons';
import { BallTriangle } from "react-loader-spinner";

import '../../../styleGlobal.css';
import './index.css'

import Admin1 from "../../../assets/crudAdmin/admin1.png";
import Admin2 from "../../../assets/crudAdmin/admin2.png";
import Admin3 from "../../../assets/crudAdmin/admin3.png";

export default function CrudAdmin() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModaLoadlOpen, setModalLoadOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(true);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        fotoPerfil: null,
    });
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const userType = localStorage.getItem("userType");

        if (!userType || userType === 'cliente') {
            navigate('/signin');
        } else if (userType === 'admin') {
            setIsUserLoggedIn(userType === "admin");
        }

        fetchAdmins();
    }, []);

    const openModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setFormData(prevFormData => ({
                ...prevFormData,
                fotoPerfil: file,
            }));
        }
    };
    

    const handleNomeChange = (e) => {
        console.log('Nome digitado:', e.target.value);
        setFormData((prevData) => ({
            ...prevData,
            nome: e.target.value,
        }));
    };
    
    const handleEmailChange = (e) => {
        console.log('Email digitado:', e.target.value);
        setFormData((prevData) => ({
            ...prevData,
            email: e.target.value,
        }));
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const updatedFormData = new FormData();
        updatedFormData.append('nome', formData.nome);
        updatedFormData.append('email', formData.email);
        updatedFormData.append('file', formData.fotoPerfil);

        try {
            setIsLoading(true);
            setModalLoadOpen(true);
            const response = await fetch("http://localhost:3636/admin/createAdmin", {
                method: "POST",
                body: updatedFormData,
            });
      
            if (response.ok) {
                const data = await response.json();
                setAdmins((prevAdmins) => [...prevAdmins, { ...data, imageLoaded: false }]);
                closeModal();
                window.location.reload();

            } else {
                throw new Error(`Erro ao criar administrador: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Erro:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAdmins = async () => {
        try {
            const response = await fetch('http://localhost:3636/admin/selectAdmin');
          
            if (!response.ok) {
                throw new Error(`Erro ao buscar administradores: ${response.statusText}`);
            }
      
            const data = await response.json();
            setAdmins(data.map(admin => ({ ...admin, imageLoaded: true })));
        } catch (error) {
            console.error('Erro ao buscar administradores:', error.message);
        }
    };


    return (
        <div>
            <Menu/>
            <section>
                <div className="tituloDashboard">
                    <h1>Administrado<span className="span-color-dashboard">res</span></h1>
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    id="modal-admin"
                    contentLabel="Adicionar administrador"
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                        },
                        content: {
                            top: '50%', 
                            left: '50%', 
                            transform: 'translate(-50%, -50%)', 
                            border: "none",
                            backgroundColor: "transparent",
                            height: '100%'
                        },
                    }}
                >
                    <form className="form modal-admin" onSubmit={handleSubmit} encType="multipart/form-data">
                        <h4>Adicionar administrador</h4>
                        <div className="container-admin-modal-group">
                            <div className="form-group">
                                <label>Nome:</label>
                                <input
                                    className="inputAdmin"
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    placeholder="Nome"
                                    onChange={handleNomeChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    className="inputAdmin"
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="example@email.com"
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="file" >
                                <div>
                                    <div className="fileLabel">
                                        <label>Foto:</label>
                                        <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageSelect}
                                        style={{ display: 'none' }}
                                        id="imageInput"
                                        />

                                        <label htmlFor="imageInput" className="iconFile">
                                            <FontAwesomeIcon className='icon-file' icon={faDownload} color="white" size="50px" />
                                        </label>
                                    </div>
                                    {selectedImage && (
                                        <p className='txt-white photo'>{selectedImage.name}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    
                        <div className="flex" id="btns">
                            <button type="submit" className="btn btn-adicionar">Adicionar</button>
                            <button className="btn btn-cancelar" onClick={closeModal}>Cancelar</button>
                        </div>
                    </form>
                </Modal>
                <div className="perfis">
                <div className="perfil">
                    {admins.map((admin) => (
                        <div key={admin.id} className="perfilAdmin">
                            {!admin.imageLoaded ? (
                                <p>Carregando...</p>
                            ) : (
                                <img
                                    src={`http://localhost:3636/src/temp/${admin.fotoPerfil}`}
                                    className="iconeAdmin"
                                    alt={`ícone de ${admin.nome}`}
                                />
                            )}
                            <h2>{admin.nome}</h2>
                            <p>Tatuador</p>
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                    isOpen={isModaLoadlOpen}
                    onRequestClose={closeModal}
                    id="modal-admin"
                    contentLabel="Adicionar administrador"
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                        },
                        content: {
                            top: '50%', 
                            left: '50%', 
                            transform: 'translate(-50%, -50%)', 
                            border: "none",
                            backgroundColor: "transparent",
                            height: '100%'
                        },
                    }}
                >
                    <div className="center modal-content">
                        <BallTriangle color="#ffffff" height={50} width={50} />
                    </div>
                </Modal>
            </section>
            <div className="btnAdicionar admin">
                <button onClick={(e) => openModal(e)} className="btnCrud">Adicionar</button>
            </div>

            
        </div>
    );
}
