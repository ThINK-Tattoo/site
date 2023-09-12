import React from "react";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import iconPerson from '../../assets/icon-person.png';

import '../../styleGlobal.css';
import './index.css'

export default function Login(){
    return (
        <div>
            <Menu/>
            <div className="login-tittle">
                <h1>Lo<span>gin</span></h1>
            </div>

            <section className="form-conteiner">
                <form class="form">
                    <img id="person-icon" src={iconPerson} alt="Icone de um usuário"></img>
                    <h4>Login</h4>

                    <div className="conteiner-form-group">
                        <div class="form-group">

                            <input className="input" type="email" id="login" name="email" placeholder="Login" required />
                        </div>

                        <div class="form-group">
                            <input className="input" type="password" id="senha" name="senha" placeholder="Senha" required />
                        </div>
                        <p> <Link to="/signup"><strong>Esqueceu a senha?</strong></Link> </p>

                    </div>

                    <button type="submit" class="btn-entrar">Entrar</button>
                    <p> Não possui conta? <Link to="/signup"><strong>Cadastrar-se</strong></Link> </p>

                </form>
            </section>
            <Footer/>
        </div>
    );
}