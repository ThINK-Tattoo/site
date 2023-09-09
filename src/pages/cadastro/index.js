import React from "react";
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import iconPerson from '../../assets/icon-person.png';

import '../../styleGlobal.css';
import './index.css'

export default function Cadastro(){
    return (
        <div>
            <Menu/>
            <div className="cadastro-tittle">
                <h1>Cadas<span>tro</span></h1>
            </div>

            <section className="form-container">
                <form class="form">
                    <img id="person-icon" src={iconPerson} alt="Icon de usuário"/>
                    <h4>Cadastro</h4>
                    <div className="container-form-group">
                        <div class="form-group">
                           
                            <input type="text" id="nome" name="nome" placeholder="Nome" required />
                        </div>
                        <div class="form-group">
                            
                            <input type="email" id="email" name="email" placeholder="E-mail" required />
                        </div>
                        <div class="form-group">
                           
                            <input type="tel" id="telefone" name="telefone" placeholder="Telefone" required />
                        </div>
                        <div class="form-group">
                           
                            <input type="number" id="idade" name="idade" placeholder="Idade" required />
                        </div>
                        <div class="form-group">
                            
                            <input type="password" id="senha" name="senha" placeholder="Senha" required />
                        </div>
                    </div>
                    
                    <button type="submit" class="btn-cadastrar">Cadastrar</button>
                </form>
            </section>
            <Footer/>
        </div>
      );
}