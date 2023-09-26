import React, {useState} from "react";
import Menu from '../../../components/admin/menuDashboard';
import Modal from 'react-modal';

import '../../../styleGlobal.css';
import './index.css'

export default function CrudSolicitacoes(){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedAgendamento, setSelectedAgendamento] = useState(null);
    const [agendamentos, setAgendamentos] = useState([
        {
            id:1,
            dia:"07 de Abril",
            cliente: "Sobrenome, Nome",
            status:"Aguardando Aprovação",
            descricao:"Um dragão chinês em meio a flores, dragão em preto e branco mas as flores e alguns detalhes em vermelho. "
        },
        {
            id:2,
            dia:"14 de Agosto",
            cliente: "Sobrenome, Nome",
            status:"Aguardando Aprovação",
            descricao:"something"
            
        },
        {
            id:3,
            dia: "01 de setembro",
            cliente: "Sobrenome, Nome",
            status:"Aguardando Aprovação",
            descricao:"Uma borboleta que se pareça com uma caveira em tamanho médio na parte posterior da perna, em preto e branco."
        }
    ]);
    const openModal = (agendamento) => {
        setSelectedAgendamento(agendamento);
        setModalIsOpen(true);
      };
      const closeModal = () => {
        setSelectedAgendamento(null);
        setModalIsOpen(false);
      };
        
    
    return (
        <div>
            <Menu/>
            <section>
            <div className="tituloDashboard">
                <h1>Solicitaç<span className="span-color-dashboard">ões</span></h1>
            </div>
            <div className="aviso">
                <p>Clique em alguma solitação para visualizar maiores informações.</p>
            </div>
            <div className= "conteiner solicitacoes-conteiner">
                 {agendamentos.map((reserva)=> (
                    <div key={reserva.id} className="info-solicitacoes"  onClick={() => openModal(reserva)}>
                        <div className="text-info">
                        <p className="txt-dia"><strong>Dia </strong>{reserva.dia}</p>
                        <p className="txt-white"><strong>Cliente: </strong>{reserva.cliente}</p>
                        <p className="txt-white"><strong>Status: </strong>{reserva.status}</p>
                        </div>
                        <p className="txt-white"><strong>Detalhes: </strong>{reserva.descricao}</p>
                 </div>
                 ))}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                id="modalSolicitacoes"
                contentLabel="Detalhes da Solicitação"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    },
                    content: {
                        top: '50%', 
                        left: '50%', 
                        height: '60%',
                        transform: 'translate(-50%, -50%)', 
                        backgroundColor: '#000'
                    },
                }}
                >
                    <button className="modal-close-button" onClick={closeModal}>X</button>
                    {selectedAgendamento && (
                    <div className="modal-content">
                    <h2><strong>Dia </strong>{selectedAgendamento.dia}</h2>
                    <p><strong>Cliente: </strong>{selectedAgendamento.cliente}</p>
                    <p><strong>Detalhes: </strong>{selectedAgendamento.descricao}</p>
                    <div className="flex">
                        <button type="submit" class="btn btn-aceitar">Aceitar</button>
                        <button class="btn btn-recusar" onClick={closeModal}>Recusar</button>
                    </div>
                    </div>
                )}
            </Modal>
            </section>
        </div>
    )
}