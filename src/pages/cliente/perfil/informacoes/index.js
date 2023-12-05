import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import Menu from "../../../../components/usuarioLogado/MenuLog";
import MenuLogado from "../../../../components/usuarioLogado/MenuLog";
import Footer from '../../../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { hotjar } from "react-hotjar";
import { useNavigate } from "react-router-dom";
import MaskedInput from 'react-input-mask';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import '../../../../styleGlobal.css';
import './index.css';

export default function MinhasInformacoes(){
    useEffect(() => {
        hotjar.initialize(3738750, 6);
    }, []);

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [client, setClient] = useState({
        id: 0,
        nome: '',
        telefone: '',
        email: '',
        idade: 0,
        senha: '',
    });
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        idade: '',
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
    
    const handleUpdate = async (e) => {
        e.preventDefault();

        console.log('Botão clicado!');
        try {
            
            const response = await axios.put(`https://api-think-tattoo.up.railway.app/cliente/updateclientes/${client.id}`, client);

            if (response.status === 200) {
                alert('Dados atualizados com sucesso!');
                closeModal(); // Fechar o modal após a atualização
                setClient(updatedClient => ({ ...updatedClient, ...client }));       
                const updatedClientData = JSON.stringify([client]);             
                localStorage.setItem('user', updatedClientData);
                window.location.reload();            } else {
                alert(`Erro ao atualizar dados: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
            alert('Erro ao atualizar dados. Por favor, tente novamente mais tarde.');
        }
    };

    const validationSchema = Yup.object({
        nome: Yup.string().min(2, "O nome deve ter pelo menos 2 caracteres").required("Campo obrigatório"),
        email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
        telefone: Yup.string().required("Campo obrigatório"),
        idade: Yup.number().min(18, "A idade deve ser igual ou maior que 18").required("Campo obrigatório"),
    });

    const formik = useFormik({
        initialValues: {
            nome: client.nome,
            email: client.email,
            telefone: client.telefone,
            idade: client.idade,
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log('Formulário enviado com os valores:', values);
            closeModal();
        },
    });

    return(
        <div className="container perfil-container">
            {isUserLoggedIn ? <MenuLogado />: <Menu />}
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
                
                <form className="form modal-form" onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <FontAwesomeIcon icon={faUser} id="person-icon" alt="Icon de usuário"/>
                    <h4>Atualizar informações</h4>
                    <div className="container-form-group info-container">
                        <div className="form-group info-perfil">
                            <label htmlFor="nome">Nome:</label>
                            <input
                                className="input"
                                type="text"
                                id="nome"
                                name="nome"
                                onChange={(e) => setClient((prevClient) => ({ ...prevClient, nome: e.target.value }))}
                                onBlur={formik.handleBlur}
                                value={client.nome}
                            />
                            {formik.touched.nome && formik.errors.nome ? (
                                <div className="avisoForm">{formik.errors.nome}</div>
                            ) : null}
                        </div>
                        <div className="form-group info-perfil">
                            <label htmlFor="email">Email:</label>
                            <input
                                className="input"
                                type="text"
                                id="email"
                                onChange={(e) => setClient((prevClient) => ({ ...prevClient, email: e.target.value }))}
                                value={client.email}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="avisoForm">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="form-group info-perfil">
                            <label htmlFor="telefone">Telefone:</label>
                            <MaskedInput
                                className="input"
                                type="text"
                                id="telefone"
                                
                                mask="(99) 99999-9999"
                                onChange={(e) => setClient((prevClient) => ({ ...prevClient, telefone: e.target.value }))}
                                value={client.telefone}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.telefone && formik.errors.telefone ? (
                                <div className="avisoForm">{formik.errors.telefone}</div>
                            ) : null}
                        </div>
                        <div className="form-group info-perfil">
                            <label htmlFor="idade">Idade:</label>
                            <input
                                className="input"
                                type="number"
                                id="idade"
                                onChange={(e) => setClient((prevClient) => ({ ...prevClient, idade: e.target.value }))}
                                value={client.idade }
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.idade && formik.errors.idade ? (
                                <div className="avisoForm">{formik.errors.idade}</div>
                            ) : null}
                        </div> 
                    </div>
                    <div className="flex">
                        <button type="submit" onClick={handleUpdate}  className="btn btn-salvar">Salvar</button>
                        <button className="btn btn-cancelar" onClick={closeModal}>Cancelar</button>
                    </div>
                </form>
            </Modal>

            <div className="header-image perfil-tittle">
                <h1>Minhas informaç<span className="span-color">ões</span></h1>
            </div>
            <section className="form-container">
                <form class="form form-info">
                    <FontAwesomeIcon icon={faEye} id="person-icon" alt="Icon de usuário"/>
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
                            <input className="input" type="text" id="idade" value={client.idade + " anos"} readOnly />
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