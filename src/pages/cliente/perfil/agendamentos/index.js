import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Menu from "../../../../components/usuarioLogado/MenuLog";
import MenuLogado from "../../../../components/usuarioLogado/MenuLog";
import Footer from "../../../../components/Footer";
import Modal from 'react-modal';
import { hotjar } from "react-hotjar";
import axios from 'axios';
import '../../../../styleGlobal.css';
import './index.css';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function MeusAgendamentos(){
    useEffect(() => {
        hotjar.initialize(3738750, 6);
    }, []);
    
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const userType = localStorage.getItem("userType");
        const clienteLog = localStorage.getItem('user');
        const clientData = clienteLog ? JSON.parse(clienteLog) : null;
        const idCliente = clientData[0].id;

        if(!userType || userType === 'admin'){
            navigate('/signin');
        }else if(userType === 'cliente'){
            setIsUserLoggedIn(userType === "cliente");
        }

        const fetchAgendas = async () => {
            
            try {
                const response = await axios.get(`https://api-think-tattoo.up.railway.app/agendaConsulta/selectAgendaCon/${idCliente}`);
                setAgendamentos(response.data);
            } catch (error) {
                console.error('Erro ao buscar as tatuagens marcadas: ', error);
                // Lide com o erro conforme necessário
            }
        };

        fetchAgendas();
    }, []);
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedAgendamento, setSelectedAgendamento] = useState(null);
    const [agendamentos, setAgendamentos] = useState([]);

    const openModal = (agendamento) => {
        setSelectedAgendamento(agendamento);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedAgendamento(null);
        setModalIsOpen(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy', { locale: ptBR });
      };
        

    return(
        <div className= "conteiner agendado-conteiner">
            {isUserLoggedIn ? <MenuLogado /> : <Menu />}
            <div className="header-image agendamento-tittle">
                <h1>Meus Agendamen<span className="span-color">tos</span></h1>
            </div>
            {agendamentos.map((reserva)=> (
                <div key={reserva.id} className="info-agendados" onClick={() => openModal(reserva)}>
                    <div className="text-info">
                        <p className="txt-dia"><strong>Dia: </strong>{formatDate(reserva.dataTattoo)}</p>
                        <p className="txt-white"><strong>Horário: </strong>{reserva.hTattoo}</p>
                        <p className="txt-white"><strong>Status: </strong>{reserva.status}</p>
                    </div>
                    <p className="txt-white"><strong>Estimativa de Orçamento: </strong>R${reserva.estOrcamento}</p>
                    <p style={{marginTop: "15px"}} className="txt-white"><strong>Tamanho da Tatuagem: </strong>{reserva.tamanhoTattoo}</p>
                    <p style={{marginTop: "15px"}} className="txt-white"><strong>Detalhes: </strong>{reserva.observacoes}</p>
                </div>
            ))}
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
                        <h2><strong>Dia: </strong>{formatDate(selectedAgendamento.dataTattoo)}</h2>
                        <p className="txt-white"><strong>Horário: </strong>{selectedAgendamento.hTattoo}</p>
                        <p style={{marginTop: "15px"}} className="txt-white"><strong>Status: </strong>{selectedAgendamento.status}</p>
                        <p style={{marginTop: "15px"}} className="txt-white"><strong>Estimativa de Orçamento: </strong>{selectedAgendamento.estOrcamento}</p>
                        <p style={{marginTop: "15px"}} className="txt-white"><strong>Tamanho da Tatuagem: </strong>{selectedAgendamento.tamanhoTattoo}</p>
                        <p style={{marginTop: "15px"}} className="txt-white"><strong>Detalhes: </strong>{selectedAgendamento.observacoes}</p>
                    </div>
                )}
            </Modal>
            <Footer/>
        </div>
    );
}