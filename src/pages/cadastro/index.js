import React from "react";
import { Link } from "react-router-dom";
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import iconPerson from '../../assets/icon-person.png';

import '../../styleGlobal.css';
import './index.css'

export default function Cadastro(){
    return (
        <div>
            <Menu/>
            <div className="header-image cadastro-tittle">
                <h1>Cadas<span className="span-color">tro</span></h1>
            </div>

            <section className="form-container">
                <form class="form">
                    <img id="person-icon" src={iconPerson} alt="Icon de usuário"/>
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
}
