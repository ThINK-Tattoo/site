import React, {useState} from "react";
import Menu from '../../../components/admin/menuDashboard';

import '../../../styleGlobal.css';
import './index.css'

export default function CrudSolicitacoes(){
    const [agendamentos, setAgendamentos] = useState([
        {
            id:1,
            dia:"07 de Abril",
            status:"Aguardando Aprovação",
            descricao:"Um dragão chinês em meio a flores, dragão em preto e branco mas as flores e alguns detalhes em vermelho. "
        },
        {
            id:2,
            dia:"14 de Agosto",
            status:"Aguardando Aprovação",
            descricao:"something"
            
        },
        {
            id:3,
            dia: "01 de setembro",
            status:"Aguardando Aprovação",
            descricao:"Uma borboleta que se pareça com uma caveira em tamanho médio na parte posterior da perna, em preto e branco."
        }
    ]);

    return (
        <div>
            <Menu/>
            <section>
            <div className="tituloDashboard">
                <h1>Solicitaç<span className="span-color-dashboard">ões</span></h1>
            </div>
            <div className= "conteiner solicitacoes-conteiner">
                 {agendamentos.map((reserva)=> (
                    <div key={reserva.id} className="info-solicitacoes">
                        <div className="text-info">
                        <p className="txt-dia"><strong>Dia </strong>{reserva.dia}</p>
                        <p className="txt-white"><strong>Status: </strong>{reserva.status}</p>
                        </div>
                        <p className="txt-white"><strong>Detalhes: </strong>{reserva.descricao}</p>


                    </div>
                 ))}
                 </div>
            </section>
        </div>
    )
}