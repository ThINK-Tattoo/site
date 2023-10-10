import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Menu from "../../../../components/usuarioLogado/MenuLog";
import MenuLogado from "../../../../components/usuarioLogado/MenuLog";
import Footer from "../../../../components/Footer";

import '../../../../styleGlobal.css';
import './index.css';

export default function MeusAgendamentos(){
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const userType = localStorage.getItem("userType");

        if(!userType || userType === 'admin'){
            navigate('/signin');
        }else if(userType === 'cliente'){
            setIsUserLoggedIn(userType === "cliente");
        }
        
    }, []);
    const [agendamentos, setAgendamentos] = useState([
        {
            id:1,
            dia:"07 de Abril",
            status:"Realizada",
            descricao:"Um dragão chinês em meio á flores, dragão em preto e branco mas as flores e alguns detalhes em vermelho. "
        },
        {
            id:2,
            dia:"14 de Agosto",
            status:"Negada",
            descricao:"something"
            
        },
        {
            id:3,
            dia: "01 de setembro",
            status:"aguardando aprovação",
            descricao:"Uma borboleta que se pareça com uma caveira em tamanho médio na parte posterior da perna, em preto e branco."
        }
    ]);

    return(
        <div className= "conteiner agendado-conteiner">
            {isUserLoggedIn ? <MenuLogado /> : <Menu />}
            <div className="header-image agendamento-tittle">
                <h1>Meus Agendamen<span className="span-color">tos</span></h1>
                 </div>
                 
                 {agendamentos.map((reserva)=> (
                    <div key={reserva.id} className="info-agendados">
                        <div className="text-info">
                        <p className="txt-dia"><strong>Dia </strong>{reserva.dia}</p>
                        <p className="txt-white"><strong>Status: </strong>{reserva.status}</p>
                        </div>
                        <p className="txt-white"><strong>Detalhes: </strong>{reserva.descricao}</p>


                    </div>
                 ))}
        
            <Footer/>
       </div>
    );
}