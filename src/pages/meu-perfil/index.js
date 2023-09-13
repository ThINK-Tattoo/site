import React, {useState} from "react";
import Modal from 'react-modal';
import Menu from '../../components/MenuLog';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEdit   } from '@fortawesome/free-solid-svg-icons';
import iconPerson from '../../assets/icon-person.png';

import '../../styleGlobal.css';
import './index.css';

export default function MeuPerfil(){
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [client, setClient] = useState({
        nome: "Felipe Souza",
        email: "felipe@gmail.com",
        telefone: "(11) 99999-9999",
        idade: 18,
        senha: "1234"
    });
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
            <Menu/>
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
                
                <form class="form modal-form">
                    <img id="person-icon" src={iconPerson} alt="Icon de usuário"/>
                    <h4>Atualizar informações</h4>
                    <div className="container-form-group">
                        <div class="form-group">
                           
                            <input className="input" type="text" id="nome" 
                            onChange={(e) => setClient({ ...client, nome: e.target.value })}
                            name="nome" value={client.nome} required />
                        </div>
                        <div class="form-group">
                            
                            <input className="input" type="email" id="email" 
                            onChange={(e) => setClient({...client, email: e.target.value})}
                            name="email" value={client.email} required />
                        </div>
                        <div class="form-group">
                           
                            <input className="input" type="tel" id="telefone" 
                            onChange={(e) => setClient({...client, telefone: e.target.value})}
                            name="telefone" value={client.telefone} required />
                        </div>
                        <div class="form-group">
                           
                            <input className="input" type="number" id="idade"
                            onChange={(e) => setClient({...client, idade: e.target.value})}
                            name="idade" value={client.idade} required />
                        </div>
                        <div class="form-group">
                            
                            <input className="input" type="text" id="senha" 
                            onChange={(e) => setClient({...client, senha: e.target.value})}
                            name="senha" value={client.senha} required />
                        </div>
                    </div>
                    
                    <div className="flex">
                        <button type="submit" class="btn btn-salvar">Salvar</button>
                        <button class="btn btn-cancelar" onClick={closeModal}>Canelar</button>
                    </div>
                </form>
            </Modal>

            <div className="header-image perfil-tittle">
                <h1>Minhas informa<span className="span-color">ções</span></h1>
            </div>

            <section className="form-container">
                <form class="form form-info">
                    <img id="person-icon" src={iconPerson} alt="Icon de usuário"/>
                    <h4>Informações</h4>
                    <div class="container-form-group info-container">
                        <div class="form-group info-perfil">
                            <label for="nome">Nome:</label>
                            <input className="input-info" type="text" id="nome" value={client.nome} readonly />
                        </div>
                        <div class="form-group info-perfil">
                            <label for="email">Email:</label>
                            <input className="input-info" type="text" id="email" value={client.email} readonly />
                        </div>
                        <div class="form-group info-perfil">
                            <label for="telefone">Telefone:</label>
                            <input className="input-info" type="text" id="telefone" value={client.telefone} readonly />
                        </div>
                        <div class="form-group info-perfil">
                            <label for="idade">Idade:</label>
                            <input className="input-info" type="text" id="idade" value={client.idade + " anos"} readonly />
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