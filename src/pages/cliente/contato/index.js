import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Menu from '../../../components/visitante/MenuVisitante';
import MenuLogado from "../../../components/usuarioLogado/MenuLog";
import Footer from '../../../components/Footer';

import { BallTriangle } from "react-loader-spinner";
import Modal from 'react-modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import '../../../styleGlobal.css';
import './index.css'
import axios from "axios";

export default function Contato(){
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isModaLoadlOpen, setModalLoadOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        email: '', 
        telefone: '',
        assunto: '',
        mensagem: '',

    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const openModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalLoadOpen(false);
    };

    useEffect(() => {
        const userType = localStorage.getItem("userType");
        setIsUserLoggedIn(userType === "cliente");
    }, []);

    const hadnleContato = async (e) => {
        e.preventDefault();
        
        try {
            setModalLoadOpen(true);

            const response = await axios.post('http://localhost:3636/cliente/contato', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log(response);
            

            if (response.status === 200) {
                const data = response.data;
                console.log(data.message);

                closeModal();

                toast.success('E-mail enviado com sucesso!', {
                    position: toast.POSITION.TOP_CENTER,
                    className: 'custom-toast-success',
                    progressClassName: 'custom-toast-progress-bar',
                    
                  });

                setFormData({nome: '',
                            email: '', 
                            telefone: '',
                            assunto: '',
                            mensagem: '',});
                
            } else {
                console.error('Erro ao enviar e-mail:', response.data.message);
                toast.error('Erro ao enviar e-mail. Tente novamente mais tarde.', {
                    position: toast.POSITION.TOP_CENTER,
                  });
            }
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
            toast.error('Erro ao enviar e-mail. Tente novamente mais tarde.', {
                position: toast.POSITION.TOP_CENTER,
              });
        }
    };

    return (
        <div className="container container-contato">
            {isUserLoggedIn ? <MenuLogado /> : <Menu />}
            <div className="header-image contato-tittle">
                <h1>Cont<span className="span-color">ato</span></h1>
            </div>

            <section className="form-container">
                <form class="form">
                    <FontAwesomeIcon icon={faEnvelope} id="envelope" />
                    <h4>Contato</h4>
                    <div className="container-form-group">
                        <div class="form-group">
                        
                            <input className="input" type="text" id="nome" name="nome" 
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Nome" required />
                        </div>
                        <div class="form-group">
                            
                            <input className="input" type="email" id="email" name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="E-mail" required />
                        </div>
                        <div class="form-group">
                        
                            <input className="input" type="tel" id="telefone" name="telefone" 
                            value={formData.telefone}
                            onChange={handleChange}
                            placeholder="Telefone" required />
                        </div>
                        <div class="form-group">
                            <input className="input" type="text" id="assunto" name="assunto" 
                            value={formData.assunto}
                            onChange={handleChange}
                            placeholder="Assunto" required />
                        </div>
                        <div class="form-group col-full">
                            <textarea className="input" id="mensagem" name="mensagem" 
                            value={formData.mensagem}
                            onChange={handleChange}
                            placeholder="Mensagem" required></textarea>
                        </div>
                    </div>
                    
                    <button type="submit" onClick={hadnleContato} class="btn btn-contato">Enviar</button>
                    <ToastContainer position="top-center" />
                </form>
            </section>
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
            <Footer/>
        </div>
    );
}
