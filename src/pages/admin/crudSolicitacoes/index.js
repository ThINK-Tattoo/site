import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/admin/menuDashboard';
import Modal from 'react-modal';
import axios from "axios";

import '../../../styleGlobal.css';
import './index.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function CrudSolicitacoes(){
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [idAdmin, setIdAdmin]= useState();

    const navigate = useNavigate();
    useEffect(() => {
        const userType = localStorage.getItem("userType");

        if(!userType || userType === 'cliente'){
            navigate('/signin');
        }else if(userType === 'admin'){
            const adminLog = localStorage.getItem('user');
            const adminData = adminLog ? JSON.parse(adminLog) : null;
            setIsUserLoggedIn(userType === "admin");

            setIdAdmin(adminData[0].id);
        }

        const fetchAgendas = async () => {
            try {
                const response = await axios.get('http://localhost:3636/agendaConsulta/selectAllAgendaCon');
                setAgendamentos(response.data);
            } catch (error) {
                console.error('Erro ao buscar as tatuagens marcadas: ', error);
                // Lide com o erro conforme necessário
            }
        };

        fetchAgendas();
        
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy', { locale: ptBR });
      };

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedAgendamento, setSelectedAgendamento] = useState(null);
    const [agendamentos, setAgendamentos] = useState([]);
    const [infoAgendamento, setInfoAgendamento] = useState({});

    const openModal = (agendamento) => {
        setSelectedAgendamento(agendamento);
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setSelectedAgendamento(null);
        setModalIsOpen(false);
    };

    const handleAgendamento = async (res) =>{
        
        try{
            const confirmaTattoo = res;
            const updatedInfoAgendamento = {
                ...selectedAgendamento,
                confirmaTattoo: confirmaTattoo,
                idAdmin: idAdmin
            };
    
            setInfoAgendamento(updatedInfoAgendamento);


            const response = await axios.post(`http://localhost:3636/agenda/createAgenda/${selectedAgendamento.id}`, infoAgendamento);
            console.log(response);
            console.log(confirmaTattoo)
            console.log(infoAgendamento)

            if(response.status === 201){
                closeModal();

                toast.success(`Tatuagem ${confirmaTattoo === "Aceitar" ? "Marcada" : "Cancelada"} com Sucesso`, {
                    position: toast.POSITION.TOP_CENTER,
                    className: 'custom-toast-success',
                    progressClassName: 'custom-toast-progress-bar',
                    
                });

                const fetchAgendas = async () => {
                    try {
                        const response = await axios.get('http://localhost:3636/agendaConsulta/selectAllAgendaCon');
                        setAgendamentos(response.data);
                    } catch (error) {
                        console.error('Erro ao buscar as tatuagens marcadas: ', error);
                        // Lide com o erro conforme necessário
                    }
                };

                fetchAgendas();
            }else{
                closeModal();
                toast.error('Erro Cancelar', {
                    position: toast.POSITION.TOP_CENTER,
                });
            }

        }catch(err){
            console.log("Erro ao cancelar tatuagem: ", err);
        }

    }
    
    return (
        <div>
            <Menu/>
            <section>
            <ToastContainer position="top-center" />
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
                            {reserva.tipoTattoo === "FlashTattoo" ? (
                                <img style={{width: "100px", height: "100px"}} 
                                src={`http://localhost:3636/src/temp/${reserva.fotoReferencia }`} />
                            ) : null}
                            <p className="txt-dia"><strong>Dia: </strong>{formatDate(reserva.dataTattoo)}</p>
                            <p className="txt-white"><strong>Horário: </strong>{reserva.hTattoo}</p>
                            <p className="txt-white"><strong>Status: </strong>{reserva.status}</p>
                        </div>
                        <p className="txt-white"><strong>Estimativa de Orçamento: </strong>R${reserva.estOrcamento}</p>
                        <p style={{marginTop: "15px"}} className="txt-white"><strong>Cliente: </strong>{reserva.nomeCliente}</p>
                        <p style={{marginTop: "15px"}} className="txt-white"><strong>Telefone: </strong>{reserva.tellCliente}</p>
                        <p style={{marginTop: "15px"}} className="txt-white"><strong>Tamanho da Tatuagem: </strong>{reserva.tamanhoTattoo}</p>
                        <p style={{marginTop: "15px"}} className="txt-white"><strong>Detalhes: </strong>{reserva.observacoes}</p>
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
                        <div className="text-info">
                             <h2><strong>Dia: </strong>{formatDate(selectedAgendamento.dataTattoo)}</h2>
                        </div>
                       
                        <p className="txt-white"><strong>Horário: </strong>{selectedAgendamento.hTattoo}</p>
                        <p style={{marginTop: "15px"}} className="txt-white"><strong>Status: </strong>{selectedAgendamento.status}</p>
                        <p className="txt-white"><strong>Estimativa de Orçamento: </strong>R${selectedAgendamento.estOrcamento}</p>
                        <p style={{marginTop: "15px"}} className="txt-white"><strong>Cliente: </strong>{selectedAgendamento.nomeCliente}</p>
                        <p style={{marginTop: "15px"}} className="txt-white"><strong>Telefone: </strong>{selectedAgendamento.tellCliente}</p>
                        <p style={{marginTop: "15px"}} className="txt-white"><strong>Tamanho da Tatuagem: </strong>{selectedAgendamento.tamanhoTattoo}</p>
                        <p style={{marginTop: "15px"}} className="txt-white"><strong>Detalhes: </strong>{selectedAgendamento.observacoes}</p>
                        {selectedAgendamento.tipoTattoo === "FlashTattoo" ? (
                                <img style={{width: "200px", height: "200px", marginLeft: "5%", marginTop: "2%"}} 
                                src={`http://localhost:3636/src/temp/${selectedAgendamento.fotoReferencia }`} />
                            ) : null}

                        <div className="flex">
                            <button class="btn btn-aceitar" onClick={() => handleAgendamento("Aceitar")}>Aceitar</button>
                            <button class="btn btn-recusar" onClick={() => handleAgendamento("Recusar")}>Recusar</button>
                        </div>
                    </div>
                )}
            </Modal>
            </section>
        </div>
    )
}