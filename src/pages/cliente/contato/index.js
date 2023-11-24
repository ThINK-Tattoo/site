import React, {useState, useEffect} from "react";
import Menu from '../../../components/visitante/MenuVisitante';
import MenuLogado from "../../../components/usuarioLogado/MenuLog";
import Footer from '../../../components/Footer';
import { hotjar } from "react-hotjar";
import MaskedInput from 'react-input-mask';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
    useEffect(() => {
        hotjar.initialize(3738750, 6);
    }, []);

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

    const validationSchema = Yup.object({
        nome: Yup.string().min(2, "O nome deve ter pelo menos 2 caracteres").required("Campo obrigatório"),
        email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
        telefone: Yup.string().required("Campo obrigatório"),
        assunto: Yup.string().min(10, "O assunto deve ter no mínimo 10 caracteres").required("Campo obrigatório"),
        mensagem: Yup.string().min(100, "A mensagem deve ter no mínimo 100 caracteres").required("Campo obrigatório"),
    });

    const formik = useFormik({
        initialValues: {
            nome: "",
            email: "",
            telefone: "",
            assunto: "",
            mensagem: "",
        },
        validationSchema: validationSchema,
    });

    return (
        <div className="container container-contato">
            {isUserLoggedIn ? <MenuLogado /> : <Menu />}
            <div className="header-image contato-tittle">
                <h1>Cont<span className="span-color">ato</span></h1>
            </div>
            <section className="form-container">
                <form class="form contato">
                    <FontAwesomeIcon icon={faEnvelope} id="envelope" />
                    <h4>Contato</h4>
                    <div className="container-form-group">
                        <div class="form-group">
                            <input
                                className="input"
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nome}
                            />
                            {formik.touched.nome && formik.errors.nome ? (
                                <div className="avisoForm">{formik.errors.nome}</div>
                            ) : null}   
                        </div>
                        <div class="form-group">
                            <input
                                className="input"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="E-mail"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="avisoForm">{formik.errors.email}</div>
                            ) : null}       
                        </div>
                        <div class="form-group">
                            <MaskedInput
                                className="input"
                                type="tel"
                                id="telefone"
                                name="telefone"
                                placeholder="Telefone"
                                mask="(99) 99999-9999"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.telefone}
                            />
                            {formik.touched.telefone && formik.errors.telefone ? (
                                <div className="avisoForm">{formik.errors.telefone}</div>
                            ) : null}   
                        </div>
                        <div class="form-group">
                            <input 
                            className="input" 
                            type="text" 
                            id="assunto" 
                            name="assunto" 
                            placeholder="Assunto" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.assunto} />
                            {formik.touched.assunto && formik.errors.assunto ? (
                                <div className="avisoForm">{formik.errors.assunto}</div>
                            ) : null}   
                        </div>
                        <div class="form-group col-full">
                        <textarea 
                                className="input" 
                                id="mensagem" 
                                name="mensagem" 
                                placeholder="Mensagem" 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.mensagem}
                                >
                            </textarea>
                            {formik.touched.mensagem && formik.errors.mensagem ? (
                                <div className="avisoForm">{formik.errors.mensagem}</div>
                            ) : null}   
                        </div>
                    </div>
                    <button type="submit" onClick={hadnleContato} class="btn btn-cadastrar">Enviar</button>
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
