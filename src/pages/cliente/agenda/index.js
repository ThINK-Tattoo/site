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
import { hotjar } from 'react-hotjar';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Menu from '../../../components/usuarioLogado/MenuLog';
import MenuLogado from "../../../components/usuarioLogado/MenuLog";
import Footer from '../../../components/Footer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../../styleGlobal.css';
import './index.css';

export default function Agenda(){
  useEffect(() => {
    hotjar.initialize(3738750, 6);
}, []);

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

  const handleSubmit = async () =>{
    
    try {
        const clienteLog = localStorage.getItem('user');
        const clientData = clienteLog ? JSON.parse(clienteLog) : null;
  
        // Obtendo dados do localStorage
        const idCliente = clientData[0].id;
        const nomeCliente = clientData[0].nome;
        const tellCliente = clientData[0].telefone;
    
        // Outros dados necessários
        const estOrcamento = valorEstimado;
        const hTattoo = selectedTime;
        const dataTattoo = selectedDate;
        const observacoes = descricao;
        const fotoReferencia = selectedImage;
        const status = "Pendente";

        const formattedDate = selectedDate.toISOString().split('T')[0];
        
        // Lógica para obter o tipo de tatuagem a partir dos checkboxes selecionados
        const tipoTattoo = {
          tamanho: selectedCheckboxes.tamanho,
          estilo: selectedCheckboxes.estilo,
          cores: selectedCheckboxes.cores,
        };

        const tamanhoTattoo = tipoTattoo.tamanho;
    
        // Construa um objeto com os dados que você deseja enviar
        const dadosParaEnviar = {
          idCliente,
          nomeCliente,
          tellCliente,
          tamanhoTattoo,
          estOrcamento,
          hTattoo,
          dataTattoo: formattedDate,
          observacoes,
          fotoReferencia,
          status,
          tipoTattoo,
        };
    
        // Faça a chamada para o back-end usando axios
        const resposta = await axios.post('https://api-think-tattoo.up.railway.app/cliente/createAgendaCon', dadosParaEnviar);
        console.log(resposta)
        // A resposta do back-end estará em resposta.data
        console.log(resposta.data);
  
        if(resposta.status === 201){
          setIsModalOpen3(false);

          toast.success('Solicitação de tatuagem feita com sucesso', {
            position: toast.POSITION.TOP_CENTER,
            className: 'custom-toast-success',
            progressClassName: 'custom-toast-progress-bar',
        });
        }else {
          setIsModalOpen3(false);
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

  registerLocale('pt-BR', ptBR);

  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
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

  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    tamanho: [],
    estilo: [],
    cores: [],
  });

  const [valorEstimado, setValorEstimado] = useState(0);

  const valoresPorCategoria = {
    tamanho: {
      'Até 10 cm': 70,
      'De 11 cm a 20 cm': 90,
      'De 21 cm a 30 cm': 100,
      'De 31 cm a 50 cm': 150,
      'De 51 cm a 60 cm': 200,
      'De 61 cm a 70 cm': 290,
      'Maior que 70 cm': 310,
    },
    estilo: {
      'Watercolor': 30,
      'Pontilismo': 40,
      'Geométrico': 50,
      'Maori': 90,
      'Realismo': 100,
      'Old School': 70,
      'Minimalismo': 60,
    },
    cores: {
      'Preto e Branco': 50,
      'Vermelho': 60,
      'Colorido': 100,
      'Preto - Blackout': 180,
      'Preto - Blackwork': 150,
    },
  };

  const handleCheckboxClick = (categoria, opcao, isChecked) => {
    const checkboxesAtualizados = { ...selectedCheckboxes };

    if (isChecked) {
      checkboxesAtualizados[categoria] = [...checkboxesAtualizados[categoria], opcao];
    } else {
      checkboxesAtualizados[categoria] = checkboxesAtualizados[categoria].filter(
        (item) => item !== opcao
      );
    }

    setSelectedCheckboxes(checkboxesAtualizados);
    atualizarValorEstimado(checkboxesAtualizados);
  };

  const atualizarValorEstimado = (checkboxes) => {
    let novoValor = 0;

    for (const categoria in checkboxes) {
      const opcoesSelecionadas = checkboxes[categoria];
      const valoresPorOpcao = valoresPorCategoria[categoria];

      novoValor += opcoesSelecionadas.reduce((acumulador, opcao) => {
        return acumulador + valoresPorOpcao[opcao];
      }, 0);
    }

    setValorEstimado(novoValor);
  };

  const [descricao, setDescricao] = useState('');

  const handleDescricaoChange = (event) => {
    setDescricao(event.target.value);
  };

  const formatarData = (data, hora) => {
    const opcoesData = { day: 'numeric', month: 'long', year: 'numeric' };
    const dataFormatada = data.toLocaleDateString('pt-BR', opcoesData);

    return `${dataFormatada} às ${hora}`;
  };

    return (
        <div className='container'>
            {isUserLoggedIn ? <MenuLogado /> : <Menu />}
            <ToastContainer position="top-center" />
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
                  <h3 className='txt-white'>{formatarData(selectedDate, selectedTime)}</h3>
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
                              <textarea style={{backgroundColor: "#0f0f0f"}} className="input" id="mensagem" name="mensagem" placeholder="Obervação: (Opcional)" value={descricao} onChange={handleDescricaoChange}></textarea>
                            </div>
                        </div>
                  </div>
                  <div className="flex btn-container">
                    <button onClick={closeModal} className="btn btn-voltar">Voltar</button>
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
                          <input type="checkbox" 
                          checked={selectedCheckboxes.tamanho.includes('Até 10 cm')}
                          onChange={(e) => handleCheckboxClick('tamanho', 'Até 10 cm', e.target.checked)}/> Até 10 cm
                        </label>
                        <label>
                          <input type="checkbox" 
                          checked={selectedCheckboxes.tamanho.includes('De 11 cm a 20 cm')}
                          onChange={(e) => handleCheckboxClick('tamanho', 'De 11 cm a 20 cm', e.target.checked)}
                          /> De 11 cm a 20 cm
                        </label>
                        <label>
                          <input type="checkbox" 
                          checked={selectedCheckboxes.tamanho.includes('De 21 cm a 30 cm')}
                          onChange={(e) => handleCheckboxClick('tamanho', 'De 21 cm a 30 cm', e.target.checked)}
                        /> De 21 cm a 30 cm
                        </label>
                        <label>
                          <input type="checkbox" 
                          checked={selectedCheckboxes.tamanho.includes('De 31 cm a 50 cm')}
                          onChange={(e) => handleCheckboxClick('tamanho', 'De 31 cm a 50 cm', e.target.checked)}
                          /> De 31 cm a 50 cm
                        </label>
                         <label>
                          <input type="checkbox" 
                          checked={selectedCheckboxes.tamanho.includes('De 51 cm a 60 cm')}
                          onChange={(e) => handleCheckboxClick('tamanho', 'De 51 cm a 60 cm', e.target.checked)}
                          /> De 51 cm a 60 cm
                        </label>
                         <label>
                          <input type="checkbox" 
                          checked={selectedCheckboxes.tamanho.includes('De 61 cm a 70 cm')}
                          onChange={(e) => handleCheckboxClick('tamanho', 'De 61 cm a 70 cm', e.target.checked)}
                          /> De 61 cm a 70 cm
                        </label>
                        <label>
                          <input type="checkbox" 
                          checked={selectedCheckboxes.tamanho.includes('Maior que 70 cm')}
                          onChange={(e) => handleCheckboxClick('tamanho', 'Maior que 70 cm', e.target.checked)}
                          /> Maior que 70 cm
                        </label>
                      </div>
                </div>
                <div class="section">
                      <h3>Estilo:</h3>
                      <div class="options">
                        <label>
                          <input type="checkbox" 
                          checked={selectedCheckboxes.estilo.includes('Watercolor')}
                          onChange={(e) => handleCheckboxClick('estilo', 'Watercolor', e.target.checked)}/> Watercolor
                        </label>
                        <label>
                          <input type="checkbox" 
                          checked={selectedCheckboxes.estilo.includes('Pontilismo')}
                          onChange={(e) => handleCheckboxClick('estilo', 'Pontilismo', e.target.checked)}/> Pontilismo
                        </label>
                        <label>
                          <input type="checkbox" 
                          checked={selectedCheckboxes.estilo.includes('Geométrico')}
                          onChange={(e) => handleCheckboxClick('estilo', 'Geométrico', e.target.checked)}/> Geométrico
                        </label>
                        <label>
                          <input type="checkbox" 
                          checked={selectedCheckboxes.estilo.includes('Maori')}
                          onChange={(e) => handleCheckboxClick('estilo', 'Maori', e.target.checked)}/> Maori
                        </label>
                        <label>
                          <input type="checkbox" 
                          checked={selectedCheckboxes.estilo.includes('Realismo')}
                          onChange={(e) => handleCheckboxClick('estilo', 'Realismo', e.target.checked)}/> Realismo
                        </label>
                        <label>
                          <input type="checkbox"
                          checked={selectedCheckboxes.estilo.includes('Old School')}
                          onChange={(e) => handleCheckboxClick('estilo', 'Old School', e.target.checked)}/> Old School
                        </label>
                        <label>
                          <input type="checkbox" 
                          checked={selectedCheckboxes.estilo.includes('Minimalismo')}
                          onChange={(e) => handleCheckboxClick('estilo', 'Minimalismo', e.target.checked)}/> Minimalismo
                        </label>
                      </div>
                </div>
                <div class="section centered">
                      <h3>Cores:</h3>
                      <div class="options">
                        <label>
                          <input type="checkbox" 
                          checked={selectedCheckboxes.cores.includes('Preto e Branco')}
                          onChange={(e) => handleCheckboxClick('cores', 'Preto e Branco', e.target.checked)}/> Preto e Branco
                        </label>
                        <label>
                          <input type="checkbox" 
                          checked={selectedCheckboxes.cores.includes('Vermelho')}
                          onChange={(e) => handleCheckboxClick('cores', 'Vermelho', e.target.checked)}/> Vermelho
                        </label>
                        <label>
                          <input type="checkbox" 
                          checked={selectedCheckboxes.cores.includes('Colorido')}
                          onChange={(e) => handleCheckboxClick('cores', 'Colorido', e.target.checked)}/> Colorido
                        </label>
                        <label>
                          <input type="checkbox" 
                          checked={selectedCheckboxes.cores.includes('Preto - Blackout')}
                          onChange={(e) => handleCheckboxClick('cores', 'Preto - Blackout', e.target.checked)}/> Preto - Blackout
                        </label>
                        <label>
                          <input type="checkbox" 
                          checked={selectedCheckboxes.cores.includes('Preto - Blackwork')}
                          onChange={(e) => handleCheckboxClick('cores', 'Preto - Blackwork', e.target.checked)}/> Preto - Blackwork
                        </label>
                      </div>
                    </div>
              </div>
              <div id='orcamento'>
                <p>Valor estimado: R$ {valorEstimado.toFixed(2)}</p>
              </div>
              <div className="flex btn-container">
                <button onClick={closeModal2} className="btn btn-voltar">Voltar</button>
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
                <h3 className='txt-white'>{formatarData(selectedDate, selectedTime)}</h3>
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
                  <p id='info-p' className='txt-white'>{selectedCheckboxes.tamanho.join(', ')}</p>

                  <h3 className='txt-white'>Estilo</h3>
                  <p id='info-p' className='txt-white'>{selectedCheckboxes.estilo.join(', ')}</p>

                  <h3 className='txt-white'>Cores</h3>
                  <p id='info-p' className='txt-white'>{selectedCheckboxes.cores.join(', ')}</p></div>

                  <div id="obs">
                    <h3 className='txt-white'>Observações</h3>
                    <div class="form-group col-full">
                      <textarea style={{backgroundColor: "#0f0f0f"}} className="input" id="mensagem" name="mensagem" placeholder="Obervação: (Opcional)" value={descricao}></textarea>
                    </div>
                  </div>
              </div>
              <div className="flex btn-container">
                <button onClick={closeModal3} className="btn btn-voltar">Voltar</button>
                <button onClick={handleSubmit} className="btn btn-cadastrar">Agenda</button>
              </div>
            </Modal>
            <Footer/>
        </div>
      );
}