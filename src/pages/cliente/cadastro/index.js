import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Menu from '../../../components/visitante/MenuVisitante';
import MenuLogado from "../../../components/usuarioLogado/MenuLog";
import Footer from '../../../components/Footer';
import { hotjar } from "react-hotjar";
import MaskedInput from 'react-input-mask';
import logo from "../../../assets/icones/logo.png"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import '../../../styleGlobal.css';
import './index.css'

export default function Cadastro(){
    useEffect(() => {
        hotjar.initialize(3738750, 6);
    }, []);

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [tokenValues, setTokenValues] = useState(["", "", "", "", "", ""]);

    const handleSignup = async () => {
        try {
            const response = await fetch('https://api-think-tattoo.up.railway.app/cliente/createConfirmaCliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: formik.values.nome,
                    email: formik.values.email,
                    telefone: formik.values.telefone,
                    idade: formik.values.idade,
                    senha: formik.values.senha,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Usuário cadastrado com sucesso!');
                openModal();  // Abra o modal apenas se a chamada à API for bem-sucedida
            } else {
                console.error('Erro no cadastro:', data.message);
            }
        } catch (error) {
            console.error('Erro ao chamar a API:', error);
        }
    };
    

    useEffect(() => {
        const userType = localStorage.getItem("userType");
        setIsUserLoggedIn(userType === "cliente");
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [passwordErrors, setPasswordErrors] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    const validatePassword = (value) => {
        const errors = {
            length: value.length >= 6,
            uppercase: /[A-Z]/.test(value),
            lowercase: /[a-z]/.test(value),
            number: /\d/.test(value),
            specialChar: /[!@#$%^&*()_+]/.test(value),
        };
    
        setPasswordErrors(errors);
    };
    

    const validationSchema = Yup.object({
        nome: Yup.string().min(2, "O nome deve ter pelo menos 2 caracteres").required("Campo obrigatório"),
        email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
        telefone: Yup.string().required("Campo obrigatório"),
        idade: Yup.number().min(18, "A idade deve ser igual ou maior que 18").required("Campo obrigatório"),
        senha: Yup.string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
            "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
        )
        .required("Campo obrigatório"),
    });

    const formik = useFormik({
        initialValues: {
            nome: "",
            email: "",
            telefone: "",
            idade: "",
            senha: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
           
            await handleSignup();
    
            // Abrir o modal apenas se a chamada à API for bem-sucedida
            if (formik.isValid && Object.keys(passwordErrors).every((key) => passwordErrors[key])) {
                openModal();
            }
        },
    });
    
    const handleTokenChange = (e, index) => {
        const newTokenValues = [...tokenValues];
        newTokenValues[index] = e.target.value.toUpperCase();
        setTokenValues(newTokenValues);
    };
    
    // Adicione uma função para lidar com o envio do formulário do token
    const handleTokenSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('https://api-think-tattoo.up.railway.app/cliente/verifyTokenConfirmaCliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: tokenValues.join(""), // Unir os valores do token em uma string
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Token válido, redirecionando para redefinir senha');

               

                toast.success('Conta cadastrada com sucesso!', {
                    position: toast.POSITION.TOP_CENTER,
                    className: 'custom-toast-success',
                    progressClassName: 'custom-toast-progress-bar',
                });

                setTimeout(() => {
                    window.location.href = "/signin";
                }, 2000);
            } else {
                console.error('Erro na verificação do token:', data.message);
                toast.error('Erro na verificação do token.', {
                    position: toast.POSITION.TOP_CENTER,
            });
            }
        } catch (error) {
            console.error('Erro ao chamar a API:', error);
             toast.error('Erro ao chamar a API.', {
                    position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    
    return (
        <div className="container container-cadastro">
            {isUserLoggedIn ? <MenuLogado /> : <Menu />}
            <div className="header-image cadastro-tittle">
                <h1>Cadas<span className="span-color">tro</span></h1>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                id="modal-cadastro"
                contentLabel="Autenticação de dois fatores"
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
                <form onSubmit={handleTokenSubmit}>
                    <img src={logo} className="logoModal"/>
                    <h2>Autenticação de dois fatores</h2>
                    <div className="token">
                        <div className="tokenInside">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    minLength={1}
                                    style={{ textAlign: 'center', fontSize: '20px', textTransform: 'uppercase' }}
                                    value={tokenValues[index]}
                                    onChange={(e) => handleTokenChange(e, index)}
                                />
                            ))}
                        </div>
                    </div>
                    <p>Uma mensagem com um código de verificação foi enviada para seu e-mail. Insira o código para continuar.</p>
                    <div>
                        <button className="btn btn-prosseguir">Verificar</button>
                    </div>
                    <div className="reenvio">
                        <h4>Não recebeu um código de verificação?</h4>
                        <h4 id="reenvio2" >Enviar novamente</h4>
                    </div>
                    <button type="submit">Verificar Token</button>
                    
                </form>
            </Modal>

            <ToastContainer position="top-center" />
            <section className="form-container">
                <form class="form cadastro" onSubmit={formik.handleSubmit}>
                <FontAwesomeIcon icon={faUser} id="person-icon" />
                    <h4>Cadastro</h4>
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
                                type="number"
                                id="idade"
                                name="idade"
                                placeholder="Idade"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.idade}
                            />
                            {formik.touched.idade && formik.errors.idade ? (
                                <div className="avisoForm">{formik.errors.idade}</div>
                            ) : null}
                        </div>
                        <div class="form-group">
                        <input
                            className="input"
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            onChange={(e) => {
                                formik.handleChange(e);
                                validatePassword(e.target.value);
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.senha}
                        />
                        {formik.touched.senha && formik.values.senha === "" && (
                            <div className="avisoForm">Campo obrigatório</div>
                        )}
                        {formik.touched.senha && (
                            <div className="avisoForm">
                                {passwordErrors.length || passwordErrors.uppercase || passwordErrors.lowercase || passwordErrors.number || passwordErrors.specialChar ? (
                                    <>
                                        {!passwordErrors.length && <div>A senha deve ter pelo menos 6 caracteres.</div>}
                                        {!passwordErrors.uppercase && <div>A senha deve conter pelo menos uma letra maiúscula.</div>}
                                        {!passwordErrors.lowercase && <div>A senha deve conter pelo menos uma letra minúscula.</div>}
                                        {!passwordErrors.number && <div>A senha deve conter pelo menos um número.</div>}
                                        {!passwordErrors.specialChar && <div>A senha deve conter pelo menos um caractere especial.</div>}
                                    </>
                                ) : (
                                    <div>&nbsp;</div>
                                )}
                            </div>
                        )}
                        </div>
                        <p>Já possui conta? Faça <Link to="/signin"><strong>Login</strong></Link></p>
                    </div>
                    <button type="submit" class="btn btn-cadastrar" onClick={(e) => {
                            handleSignup(); // Validação do formulário
                            if (formik.isValid && Object.keys(passwordErrors).every((key) => passwordErrors[key])) {
                                openModal(e); // Abrir o modal se o formulário for válido e a senha atender aos critérios
                            }
                    }}>Cadastrar</button>
                </form>
            </section>
            <Footer/>
        </div>
        );
};