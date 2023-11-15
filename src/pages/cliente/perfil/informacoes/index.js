import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import Menu from "../../../../components/usuarioLogado/MenuLog";
import MenuLogado from "../../../../components/usuarioLogado/MenuLog";
import Footer from '../../../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from "react-router-dom";

import '../../../../styleGlobal.css';
import './index.css';

export default function MinhasInformacoes(){
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [client, setClient] = useState({
        id: 0,
        nome: '',
        telefone: '',
        email: '',
        idade: 0,
        senha: '',
    });
    
    const navigate = useNavigate();
    useEffect(() => {
        const userType = localStorage.getItem("userType");
        
        if(!userType || userType === 'admin'){
            navigate('/signin');
        }else if(userType === 'cliente'){
            setIsUserLoggedIn(userType === "cliente");
            const clienteLog = localStorage.getItem('user');
            const clientData = clienteLog ? JSON.parse(clienteLog) : null;
        if (clientData) {
            setClient(clientData[0]);
        }
        }
    }, []);

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [senha, setSenha] = useState(client.senha);
    
    const toggleSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    const openModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return(
        <div className="container perfil-container">
            {isUserLoggedIn ? <MenuLogado /> : <Menu />}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                id="modal-info"
                contentLabel="Detalhes da Tatuagem"
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
                <form className="form modal-form">
                    <FontAwesomeIcon icon={faUser} id="person-icon" alt="Icon de usuário"/>
                    <h4>Atualizar informações</h4>
                    <div className="container-form-group info-container">
                        <div className="form-group info-perfil">
                            <label htmlFor="nome">Nome:</label>
                            <input
                                className="input"
                                type="text"
                                id="nome"
                                onChange={(e) => setClient((prevClient) => ({ ...prevClient, nome: e.target.value }))}
                                value={client.nome}
                            />
                        </div>
                        <div className="form-group info-perfil">
                            <label htmlFor="email">Email:</label>
                            <input
                                className="input"
                                type="text"
                                id="email"
                                onChange={(e) => setClient((prevClient) => ({ ...prevClient, email: e.target.value }))}
                                value={client.email}
                            />
                        </div>
                        <div className="form-group info-perfil">
                            <label htmlFor="telefone">Telefone:</label>
                            <input
                                className="input"
                                type="text"
                                id="telefone"
                                onChange={(e) => setClient((prevClient) => ({ ...prevClient, telefone: e.target.value }))}
                                value={client.telefone}
                            />
                        </div>
                        <div className="form-group info-perfil">
                            <label htmlFor="idade">Idade:</label>
                            <input
                                className="input"
                                type="number"
                                id="idade"
                                onChange={(e) => setClient((prevClient) => ({ ...prevClient, idade: e.target.value }))}
                                value={client.idade }
                            />
                        </div> 
                    </div>
                    <div className="flex">
                        <button type="submit" className="btn btn-salvarInfo">Salvar</button>
                        <button className="btn btn-cancelarInfo" onClick={closeModal}>Cancelar</button>
                    </div>
                </form>
            </Modal>
            <div className="header-image perfil-tittle">
                <h1>Minhas informaç<span className="span-color">ões</span></h1>
            </div>
            <section className="form-container">
                <form class="form form-info">
                    <FontAwesomeIcon icon={faUser} id="person-icon" alt="Icon de usuário"/>
                    <h4>Informações</h4>
                    <div class="container-form-group info-container">
                        <div class="form-group info-perfil">
                            <label for="nome">Nome:</label>
                            <input className="input" type="text" id="nome"  value={client.nome} readOnly />
                        </div>
                        <div class="form-group info-perfil">
                            <label for="email">Email:</label>
                            <input className="input" type="text" id="email"  value={client.email} readOnly />
                        </div>
                        <div class="form-group info-perfil">
                            <label for="telefone">Telefone:</label>
                            <input className="input" type="text" id="telefone"  value={client.telefone} readOnly />
                        </div>
                        <div class="form-group info-perfil">
                            <label for="idade">Idade:</label>
                            <input className="input" type="text" id="idade" value={client.idade} readOnly />
                        </div>
                        <div class="form-group info-perfil">
                            <label for="telefone">Senha:</label>
                            <div className="input-senha">
                                <input
                                    type={mostrarSenha ? 'text' : 'password'}
                                    id="senha"
                                    value={senha}
                                    readonly
                                />
                                <FontAwesomeIcon
                                    icon={mostrarSenha ? faEyeSlash : faEye}
                                    className="toggle-password"
                                    onClick={toggleSenha}
                                />
                            </div>
                        </div>
                    </div>
                    <button onClick={(e) => openModal(e)} class="btn btn-editar">
                        <FontAwesomeIcon className="editIcon" icon={faEdit } />
                        Editar info
                    </button>
                </form>
            </section>
            <Footer/>
        </div>
    );
}