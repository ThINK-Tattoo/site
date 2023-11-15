import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Menu from '../../../components/visitante/MenuVisitante';
import MenuLogado from "../../../components/usuarioLogado/MenuLog";
import Footer from '../../../components/Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import '../../../styleGlobal.css';
import './index.css'

export default function Cadastro(){
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const userType = localStorage.getItem("userType");
        setIsUserLoggedIn(userType === "cliente");
    }, []);

    return (
        <div className="container container-cadastro">
            {isUserLoggedIn ? <MenuLogado /> : <Menu />}
            <div className="header-image cadastro-tittle">
                <h1>Cadas<span className="span-color">tro</span></h1>
            </div>
            <section className="form-container">
                <form class="form cadastro">
                <FontAwesomeIcon icon={faUser} id="person-icon" />
                    <h4>Cadastro</h4>
                    <div className="container-form-group">
                        <div class="form-group">
                            <input className="input" type="text" id="nome" name="nome" placeholder="Nome" required />
                        </div>
                        <div class="form-group">
                            <input className="input" type="email" id="email" name="email" placeholder="E-mail" required />
                        </div>
                        <div class="form-group">
                            <input className="input" type="tel" id="telefone" name="telefone" placeholder="Telefone" required />
                        </div>
                        <div class="form-group">
                            <input className="input" type="number" id="idade" name="idade" placeholder="Idade" required />
                        </div>
                        <div class="form-group">
                            <input className="input" type="password" id="senha" name="senha" placeholder="Senha" required />
                        </div>
                        <p>Já possui conta? Faça <Link to="/signin"><strong>Login</strong></Link></p>
                    </div>
                    <button type="submit" class="btn btn-cadastrar">Cadastrar</button>
                </form>
            </section>
            <Footer/>
        </div>
        );
};