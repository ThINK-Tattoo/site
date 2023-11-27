import React, { useState, useRef, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClockIcon from '@mui/icons-material/AccessTime';
import Modal from 'react-modal';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/usuarioLogado/MenuLog';
import MenuLogado from "../../../components/usuarioLogado/MenuLog";
import Footer from '../../../components/Footer';
import { hotjar } from "react-hotjar";

import axios from "axios";

import '../../../styleGlobal.css';
import './index.css';

export default function FlashTattoo(){
    useEffect(() => {
        hotjar.initialize(3738750, 6);
    }, []);

const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
const [selectedDate, setSelectedDate] = useState(new Date());
const [time, setTime] = useState(null);
const [modalAgenda, setModalAgenda] = useState(false);
const [open, setOpen] = useState(false);
const dialogRef = useRef(null);
const [selectedTime, setSelectedTime] = useState(''); 

const handleOpenDialog = () => {
    setOpen(true);
  };

  // Fechar o diálogo do Time Picker
  const handleCloseDialog = () => {
    setOpen(false);
  };

  // Definir a hora selecionada
  const handleSetTime = (time) => {
    setSelectedTime(time);
    handleCloseDialog();
  };

  const handleTextFieldClick = () => {
    setOpen(true);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCellClick = (date) => {
    setSelectedDate(date);
  };

    useEffect(() => {
        const userType = localStorage.getItem("userType");

        if(!userType || userType === 'admin'){
            navigate('/signin');
        }else if(userType === 'cliente'){
            setIsUserLoggedIn(userType === "cliente");
            axios.get('http://localhost:3636/admin/selectFlashTattoo')
            .then(response => {
                setFlashtatto(response.data);
            })
            .catch(error => {
                console.error('Erro ao obter dados do portfólio:', error);
            });
        }
    }, [])

    const [flashtatto, setFlashtatto] = useState([]);

    const [selectedTattoo, setSelectedTattoo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    
    const navigate = useNavigate();

    const openModal = (tattoo) => {
        setSelectedTattoo(tattoo);
        setModalData({
            nome: tattoo.nome,
            tamanho: selectedSize,
            local: tattoo.local,
            Tipo: tattoo.Tipo,
            Cores: tattoo.Cores,
            valor1: tattoo.valor1,
            valor2: tattoo.valor2,
            valor3: tattoo.valor3,
            imagem: tattoo.imagem,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTattoo(null);
        setModalData(null);
        setIsModalOpen(false);
    };

    const handleAgendarClick = () => {
        if (modalData) {
            // navigate('/agenda', { state: { modalData } });

            setModalAgenda(true);
        }
    };
    const customTheme = createTheme({
        components: {
          MuiDialog: {
            styleOverrides: {
              paper: {
                backgroundColor: '#222', 
                color: 'white',
              },
            },
          },
        },
      });
      const [estOrcamento, setOrcamento] = useState();

      const handleSubmit = async () =>{
        
    
        try {
            const clienteLog = localStorage.getItem('user');
            const clientData = clienteLog ? JSON.parse(clienteLog) : null;
      
            // Obtendo dados do localStorage
            const idCliente = clientData[0].id;
            const nomeCliente = clientData[0].nome;
            const tellCliente = clientData[0].telefone;
            
        
            let orcamentoValue;
            if (selectedSize === "5cm") {
                orcamentoValue = parseFloat(selectedTattoo.valor1);
            } else if (selectedSize === "10cm") {
                orcamentoValue = parseFloat(selectedTattoo.valor2);
            } else {
                orcamentoValue = parseFloat(selectedTattoo.valor3);
            }

            await setOrcamento(orcamentoValue);

            console.log(estOrcamento);
           
            const hTattoo = selectedTime;
            const dataTattoo = selectedDate;
            const fotoReferencia = selectedTattoo.imagem;
            const status = "Pendente";
            const tipoTattoo = "FlashTattoo"
            const tamanhoTattoo = selectedSize;
    
            const dadosParaEnviar = {
              idCliente,
              nomeCliente,
              tellCliente,
              tamanhoTattoo,
              estOrcamento: orcamentoValue,
              hTattoo,
              dataTattoo,
              fotoReferencia,
              status,
              tipoTattoo,
            };

            console.log(dadosParaEnviar)
        
           
            const resposta = await axios.post('http://localhost:3636/cliente/createAgendaCon', dadosParaEnviar);
            console.log(resposta)
            
            console.log(resposta.data);
      
            if(resposta.status === 201){
              setModalAgenda(false);
    
              toast.success('Solicitação de tatuagem feita com sucesso', {
                position: toast.POSITION.TOP_CENTER,
                className: 'custom-toast-success',
                progressClassName: 'custom-toast-progress-bar',
            });
            }else {
              setModalAgenda(false);
              toast.error(resposta.message, {
                position: toast.POSITION.TOP_CENTER,
              });
            }
            
           
          } catch (erro) {
            console.error('Erro ao enviar dados para o back-end: ', erro);
            toast.error('Houve um Erro com o nosso servidor, tente mais tarde.', {
              position: toast.POSITION.TOP_CENTER,
            });
            
          }
      }

      useEffect(() => {
        
        console.log(estOrcamento);
    }, [estOrcamento]);

      const closeModalAgenda = () =>{
        setModalAgenda(false);
      }
    return(
        <div className="container flashtattoo-container">
            {isUserLoggedIn ? <MenuLogado /> : <Menu />}
            <ToastContainer position="top-center" />
            <div className="header-image flashtattoo-tittle">
                <h1>Flash Tat<span className="span-color">too</span></h1>
            </div>
            <h3 className="txt-white">O QUE SÃO E COMO FUNCIONA?</h3>
            <div id='info-flashtattoo'>
                <p className="txt-white">Flash tattoos são tatuagens rápidas geralmente oferecidas pelos artistas por um valor mais em conta para divulgação do trabalho, criação de portfólio e captação de novos clientes. Normalmente não são feitas sob encomenda, então o artista cria e a pessoa não pode pedir nenhuma alteração.
                A vantagem dessa modalidade está na praticidade e no valor reduzido do trabalho, já que os desenhos são mais simples e sem muitos detalhes. Além disso, é perfeita para quem não tem muita criatividade e prefere escolher entre desenhos que já estão prontos.</p>
            </div>
            <p className="txt-white p-info">Você escolherá a Flash Tattoo que temos em nossa galeria e irá fazer o agendamento.</p>
            <br></br>
            <section className="flashtattoo">
                {flashtatto.map((tattoo) => (
                    <div key={tattoo.id} className="tattoo-item">
                        <img src={`http://localhost:3636/src/temp/${tattoo.imagem}`} alt={tattoo.nome} />
                        <button className="btn btn-tattoo" onClick={() => openModal(tattoo)}>
                        Mais detalhes
                        </button>
                    </div>
                ))}
            </section>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                id="modal-container"
                contentLabel="Detalhes da Tatuagem"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    },
                    content: {
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        backgroundColor: '#000',
                        height: '80%'
                    },
                }}
            >
                <button className="modal-close-button" onClick={closeModal}>
                X
                </button>
                {selectedTattoo && (
                    <div className="modal-tattoo">
                        <div id="modal-info-flashtattoo">
                            <img src={`http://localhost:3636/src/temp/${selectedTattoo.imagem}`} alt={selectedTattoo.nome} />
                            <div className="modal-info-description">
                                <h3 className="txt-white h3">{selectedTattoo.nome}</h3>
                                <div className="description">
                                    <h3 className="txt-white ">Descrição:</h3>
                                    <p className="txt-white"><strong>Tamanho: </strong> {selectedSize || selectedTattoo.tamanho}</p>
                                    <p className="txt-white"><strong>Local: </strong>{selectedTattoo.local}</p>
                                    <p className="txt-white"><strong>Tipo: </strong> {selectedTattoo.tipo}</p>
                                    <p className="txt-white"><strong>Cores: </strong> {selectedTattoo.cores}</p>
                                </div>
                            </div>
                        </div>
                        <div className="tamanho-info">
                            <h3 className="txt-white ">Tamanho e valores</h3>
                            <div className="valores-tattoo">
                                <div id="first-info">
                                    <button 
                                        className="btn btn-valor"
                                        onClick={() => setSelectedSize('5cm')}
                                    >
                                    5 cm
                                    </button>
                                    <p className="txt-white">R${selectedTattoo.valor1}</p>
                                </div>
                                <div id="second-info">
                                    <button 
                                        className="btn btn-valor"
                                        onClick={() => setSelectedSize('10cm')}
                                    >
                                    10 cm
                                    </button>
                                    <p className="txt-white">R${selectedTattoo.valor2}</p>
                                </div>
                                <div id="third-info">
                                    <button 
                                        className="btn btn-valor" 
                                        onClick={() => setSelectedSize('15cm')}
                                    >
                                    15 cm
                                    </button>
                                    <p className="txt-white">R${selectedTattoo.valor3}</p>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-agendar" onClick={handleAgendarClick}>Agendar</button>
                    </div>
                )}
            </Modal>
            <Modal
                isOpen={modalAgenda}
                onRequestClose={closeModal}
                id="modal-container"
                contentLabel="Detalhes da Tatuagem"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    },
                    content: {
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        backgroundColor: '#000',
                        height: '80%'
                    },
                }}
            >
                <button className="modal-close-button" onClick={closeModalAgenda}>
                X
                </button>
                
                <div className="calendar-container container" style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
                    <h3 className="txt-white">Escolha um horário e uma data para sua tatuagem</h3>
                    <div className="calendar custom-calendar-container">
                        <Calendar
                       
                        onChange={handleDateChange}
                        value={selectedDate}
                        tileClassName="custom-calendar-tile"
                        onClickDay={handleCellClick}
                        locale="pt-BR"
                        />
                    </div>
                    <div className="time-picker">
                        <h4 className='txt-white'>Escolha o Horário:</h4>
                        <TextField
                        variant="outlined"
                        value={selectedTime}
                        sx={{ width: '100%' }}
                        InputProps={{
                            className: 'custom-input',
                            onClick: handleTextFieldClick, // Abre o diálogo ao clicar no TextField
                            endAdornment: (
                            <ClockIcon
                                sx={{ cursor: 'pointer', color: 'white'}}
                                onClick={handleOpenDialog}
                            />
                            ),
                        }}
                        />
                        <ThemeProvider theme={customTheme}>
                        <Dialog open={open} onClose={handleCloseDialog} ref={dialogRef}>
                            <DialogTitle>Escolha a hora</DialogTitle>
                            <DialogContent sx={{ className: 'custom-dialog-content' }}>
                            <div>
                                {Array.from({ length: 24 }, (_, i) => (
                                <Button
                                    className="btn-hora"
                                    key={i}
                                    variant="outlined"
                                    onClick={() => handleSetTime(i.toString().padStart(2, '0') + ':00')}
                                >
                                    {i.toString().padStart(2, '0') + ':00'}
                                </Button>
                                ))}
                            </div>
                            </DialogContent>
                            <DialogActions>
                            <Button style={{color: "#EB1CE4"}} onClick={handleCloseDialog}>Cancelar</Button>
                            </DialogActions>
                        </Dialog>
                        </ThemeProvider>
                    </div>
                    <button
                    className='btn btn-agendamentos'
                    onClick={() => {
                        handleSubmit();
                        console.log(`Agendado para ${selectedDate.toDateString()} às ${time}`);
                    }}
                    >
                    Agendar
                    </button>
                </div>
            </Modal>
            <Footer/>
        </div>
    );
}