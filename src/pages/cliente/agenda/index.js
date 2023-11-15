import React, { useState, useRef, useEffect } from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';

import Menu from '../../../components/usuarioLogado/MenuLog';
import MenuLogado from "../../../components/usuarioLogado/MenuLog";
import Footer from '../../../components/Footer';

import '../../../styleGlobal.css';
import './index.css';


export default function Agenda(){
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [open3, setOpen3] = useState(false);
  const dialogRef = useRef(null);
  const [selectedTime, setSelectedTime] = useState(''); 
  const [selectedImage, setSelectedImage] = useState(null);
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
    setIsModalOpen(false);
  };

  const closeModal2 = () => {
      setIsModalOpen2(false);
      setIsModalOpen(true);
  };

  const openModal3 = () => {
    setIsModalOpen3(true);
    setIsModalOpen2(false);
  };

  const closeModal3 = () => {
    setIsModalOpen3(false);
    setIsModalOpen2(true);
  };

  const handleSubmit = () =>{
    setIsModalOpen3(false);
  }

  registerLocale('pt-BR', ptBR);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCellClick = (date) => {
    setSelectedDate(date);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

    return (
        <div className='container'>
            {isUserLoggedIn ? <MenuLogado /> : <Menu />}
            <div className="header-image agenda-tittle">
                <h1>Age<span className="span-color">nda</span></h1>
            </div>
            <h3 className="txt-white txt-center h3-agenda">Veja a disponibilidade das datas e agende a sua tatuagem!</h3>
            <div className="calendar-container container">
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
                openModal();
                console.log(`Agendado para ${selectedDate.toDateString()} às ${time}`);
              }}
            >
              Próximo
            </button>
            </div>

          {/**Modais */}

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
                  <div id="modal-agenda">
                  <h3 className='txt-white'>01 setembro 2023</h3>
                        <div>
                         
                          <div className=' file'>
                          <h3 className='txt-white'>Imagem de Referência</h3>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageSelect}
                              style={{ display: 'none' }}
                              id="imageInput"
                            />
                            <label htmlFor="imageInput">
                              <FontAwesomeIcon className='icon-file' icon={faDownload} color="white" size="50px" />
                            </label>
                            
                          </div>
                          {selectedImage && (
                              <p className='txt-white photo'>{selectedImage.name}</p>
                            )}
                        </div>

                        <div id="obs">
                            <h3 className='txt-white'>Observações:</h3>
                            <div class="form-group col-full">
                            
                              <textarea style={{backgroundColor: "#0f0f0f"}} className="input" id="mensagem" name="mensagem" placeholder="Obervação: (Opcional)" required></textarea>
                            </div>
                        </div>
                  </div>
                  <div className="flex btn-container">
                    <button onClick={closeModal} className="btn btn-cancelar voltar">Voltar</button>
                    <button onClick={openModal2} className="btn btn-cadastrar">Proximo</button>
                  </div>
            </Modal>
            <Modal
                isOpen={isModalOpen2}
                onRequestClose={closeModal2}
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
                        height: '90%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center'
                    },
                }}
            >
              <div class="container-tipos">        
                <div class="section">
                  <h3>Tamanho:</h3>
                  <div class="options">
                    <label>
                      <input type="checkbox"/> Até 10 cm
                    </label>
                    <label>
                      <input type="checkbox"/> De 11 cm a 20 cm
                    </label>
                    <label>
                      <input type="checkbox"/> De 21 cm a 30 cm
                    </label>
                    <label>
                      <input type="checkbox"/> De 31 cm a 50 cm
                    </label>
                    <label>
                      <input type="checkbox"/> De 51 cm a 60 cm
                    </label>
                    <label>
                      <input type="checkbox"/> De 61 cm a 70 cm
                    </label>
                    <label>
                      <input type="checkbox"/> Maior que 70 cm
                    </label>
                  </div>
                </div>
                <div class="section">
                  <h3>Estilo:</h3>
                  <div class="options">
                    <label>
                      <input type="checkbox"/> Watercolor
                    </label>
                    <label>
                      <input type="checkbox"/> Pontilismo
                    </label>
                    <label>
                      <input type="checkbox"/> Geométrico
                    </label>
                    <label>
                      <input type="checkbox"/> Maori
                    </label>
                    <label>
                      <input type="checkbox"/> Realismo
                    </label>
                    <label>
                      <input type="checkbox"/> Old School
                    </label>
                    <label>
                      <input type="checkbox"/> Minimalismo
                    </label>
                  </div>
                </div>
                <div class="section centered">
                  <h3>Cores:</h3>
                  <div class="options">
                    <label>
                      <input type="checkbox"/> Preto e Branco
                    </label>
                    <label>
                      <input type="checkbox"/> Vermelho
                    </label>
                    <label>
                      <input type="checkbox"/> Colorido
                    </label>
                    <label>
                      <input type="checkbox"/> Preto - Blackout
                    </label>
                    <label>
                      <input type="checkbox"/> Preto - Blacwork
                    </label>
                  </div>
                </div>
              </div>
              <div id='orcamento'>
                <p>Valor estimado: R$ 00,00</p>
              </div>
              <div className="flex btn-container">
                <button onClick={closeModal2} className="btn btn-cancelar voltar">Voltar</button>
                <button onClick={openModal3} className="btn btn-cadastrar">Proximo</button>
              </div>
            </Modal>
            <Modal
                isOpen={isModalOpen3}
                onRequestClose={closeModal3}
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
                        height: '100%'
                    },
                }}
            >
              <div id="modal-agenda">
                <h3 className='txt-white'>01 setembro 2023</h3>
                <div>
                  <div className=' file'>
                    <h3 className='txt-white'>Imagem de Referência</h3>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      style={{ display: 'none' }}
                      id="imageInput"
                    />
                    <label htmlFor="imageInput">
                      <FontAwesomeIcon className='icon-file' icon={faDownload} color="white" size="50px" />
                    </label>
                    </div>
                    {selectedImage && (
                      <p className='txt-white photo'>{selectedImage.name}</p>
                    )}
                </div>
                <div id='info-tat'>
                    <h3 className='txt-white'>Tamanho</h3>
                    <p id='info-p' className='txt-white'>X cm</p>
                    <h3 className='txt-white'>Estilo</h3>
                    <p id='info-p' className='txt-white'> Estilo x</p>
                    <h3 className='txt-white'>Cores</h3>
                  <p id='info-p' className='txt-white'>Cores x</p></div>
                  <div id="obs">
                    <h3 className='txt-white'>Imagem de Referência</h3>
                    <div class="form-group col-full">
                      <textarea style={{backgroundColor: "#0f0f0f"}} className="input" id="mensagem" name="mensagem" placeholder="Obervação: (Opcional)" required></textarea>
                    </div>
                  </div>
              </div>
              <div className="flex btn-container">
                <button onClick={closeModal3} className="btn btn-cancelar voltar">Voltar</button>
                <button onClick={handleSubmit} className="btn btn-cadastrar">Agenda</button>
              </div>
            </Modal>
            <Footer/>
        </div>
      );
}