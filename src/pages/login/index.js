import React, {useState, useHistory} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Menu from "../../components/visitante/MenuVisitante";
import MenuLogado from "../../components/usuarioLogado/MenuLog";
import Footer from "../../components/Footer";
import iconPerson from '../../assets/icones/icon-person.png';

import '../../styleGlobal.css';
import './index.css'

export default function Login(){
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:3636/cliente/login", {email, senha});
            const {auth, token, userType, user} = response.data;

            if(auth){
                localStorage.setItem("token", token);
                localStorage.setItem("user", user);
                localStorage.setItem("userType", userType);

                if(userType === "cliente"){
                    navigate('/');
                }else if(userType === "admin"){
                    navigate('/dashboard/administradores');
                }
            }else{
                setError("Email ou senha incorretos");
            }

        }catch(err){
            console.error("Erro ao autenticar login", err);
            setError("Erro ao efetuar login");
        }
    }

    const isUserLoggedIn = localStorage.getItem("userType") === "cliente";
   
    return (
        <div>
           {isUserLoggedIn ? <MenuLogado /> : <Menu />}
            <div className="login-tittle">
                <h1>Lo<span className="span-color">gin</span></h1>
            </div>

            <section className="form-conteiner">
                <form class="form" onSubmit={handleLogin}>
                    <img id="person-icon" src={iconPerson} alt="Icone de um usuário"></img>
                    <h4>Login</h4>

                    <div className="conteiner-form-group">
                        <div class="form-group">

                            <input 
                                className="input" 
                                type="email" 
                                id="login" 
                                name="email" 
                                placeholder="E-mail" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                        </div>

                        <div class="form-group">
                            <input 
                                className="input" 
                                type="password" 
                                id="senha" 
                                name="senha" 
                                placeholder="Senha" 
                                required 
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                />
                        </div>
                        <p> <Link to="/signup"><strong>Esqueceu a senha?</strong></Link> </p>

                    </div>

                    <button type="submit" class="btn-entrar">Entrar</button>
                    {error && <p className="error-message">{error}</p>}
                    
                    <p> Não possui conta? <Link to="/signup"><strong>Cadastrar-se</strong></Link> </p>

                </form>
            </section>
            <Footer/>
        </div>
    );
}