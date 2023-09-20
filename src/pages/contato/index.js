import React from "react";
import { Link } from "react-router-dom";
import Menu from '../../components/visitante/MenuVisitante';
import Footer from '../../components/Footer';
import iconEnvelop from '../../assets/icones/icon-envelop-close.png';

import '../../styleGlobal.css';
import './index.css'

export default function Contato(){
    return (
        <div>
            <Menu/>
            <div className="header-image contato-tittle">
                <h1>Cont<span className="span-color">ato</span></h1>
            </div>

            <section className="form-container">
                <form class="form">
                    <img id="person-icon" src={iconEnvelop} alt="Icon de usuário"/>
                    <h4>Contato</h4>
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
                           
                            <input className="input" type="text" id="assunto" name="assunto" placeholder="Assunto" required />
                        </div>
                        <div class="form-group col-full">
                            
                            <textarea className="input" id="mensagem" name="mensagem" placeholder="Mensagem" required></textarea>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-cadastrar">Enviar</button>
                </form>
            </section>
            <Footer/>
        </div>
      );
}
