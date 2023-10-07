import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Menu from '../../../components/admin/menuDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';

import '../../../styleGlobal.css';
import './index.css'

import estoque1 from '../../../assets/crudEstoque/estoque1.png';
import estoque2 from '../../../assets/crudEstoque/estoque2.png';
import estoque3 from '../../../assets/crudEstoque/estoque3.png';
import estoque4 from '../../../assets/crudEstoque/estoque4.png';
import estoque5 from '../../../assets/crudEstoque/estoque5.png';
import estoque6 from '../../../assets/crudEstoque/estoque6.png';
import estoque7 from '../../../assets/crudEstoque/estoque7.png';
import estoque8 from '../../../assets/crudEstoque/estoque8.png';
import { set } from "date-fns";

export default function CrudEstoque(){
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
     const navigate = useNavigate();
    
    useEffect(() => {
        const userType = localStorage.getItem("userType");

        if(!userType || userType === 'cliente'){
            navigate('/signin');
        }else if(userType === 'admin'){
            setIsUserLoggedIn(userType === "admin");
        }
        
    }, []);
    const [grupoEstoque, setGrupoEstoque] =useState([
        {
            id: 1,
            grupo: "Agulhas",
            imagem: estoque1
        },
        {
            id: 2,
            grupo: "Biqueiras",
            imagem: estoque2
        },
        {
            id: 3,
            grupo: "Esterelizador",
            imagem: estoque3
        },
        {
            id: 4,
            grupo: "Máquinas",
            imagem: estoque4
        },
        {
            id: 5,
            grupo: "Luvas",
            imagem: estoque5
        },
        {
            id: 6,
            grupo: "Papel",
            imagem: estoque6
        },
        {
            id: 7,
            grupo: "Copos",
            imagem: estoque7
        },
        {
            id: 8,
            grupo: "Tintas",
            imagem: estoque8
        },
    ]);

    const [isModalAddOpen, setIsModalAddOpen]= useState(false);
    const openModalAdd = (e) => {
        setIsModalAddOpen(true);
    }

    const closeModalAdd = () => {
        setIsModalAddOpen(false);
    }

    const [itensEstoque, setItensEstoque] = useState([
        { grupo: "Agulhas", nome: "Agulha 1", quantidade: 10, dataCompra: "2023-10-06" },
        { grupo: "Agulhas", nome: "Agulha 2", quantidade: 5, dataCompra: "2023-10-07" },
        { grupo: "Tintas", nome: "Tinta 1", quantidade: 8, dataCompra: "2023-10-08" },
        { grupo: "Tintas", nome: "Tinta 2", quantidade: 6, dataCompra: "2023-10-09" },
    ]);

    const renderItens = (grupo) => {
        const itensFiltrados = itensEstoque.filter(item => item.grupo === grupo);
        return itensFiltrados.map((item, index) => (
            <li key={index}>{item.nome} - Quantidade: {item.quantidade}</li>
        ));
    
    }

    const [selectedGrupoEstoque, setSelectedGrupoEstoque] = useState(null);
    const [isModalAccordionOpen, setIsModalAccordionOpen] = useState(false);
    const openModalAccordion = (grupo) => {
        setSelectedGrupoEstoque(grupo);
        setIsModalAccordionOpen(true);
    }
    const closeModalAccordion = () =>{
        setIsModalAccordionOpen(false);
    }

    const [activeAccordion, setActiveAccordion] = useState(null);


    const renderAccordionItems = (grupo) => {
        const itensDoGrupo = itensEstoque.filter((item) => item.grupo === grupo);
    
        return itensDoGrupo.map((item, index) => (
            <div className="accordion-item" key={index}>
                <button
                    className={`accordion-button ${activeAccordion === index ? 'active' : ''}`}
                    onClick={() => toggleAccordion(index)}
                >
                    <a>
                    {item.nome}
                    </a>
                    <span className="accordion-button-icon">
                    {activeAccordion === index ? "-" : "+"}
                    </span>
                </button>
                <div className={`accordion-content ${activeAccordion === index ? 'show' : ''}`}>
                    <p>Quantidade: {item.quantidade}</p>

                </div>
            </div>
        ));
    };

    
    const toggleAccordion = (index) => {
        setActiveAccordion((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div>
            <Menu/>
            <section>
                <div className="headerEstoque">
                    <div className="tituloDashboard">
                        <h1>Esto<span className="span-color-dashboard">que</span></h1>
                    </div>
                    <div className="visualizacao">
                    <FontAwesomeIcon icon={faTable} className="icon" style={{color: "#e40ce4",}} />
                    <h2>Alterar visualização</h2>
                    </div>
                </div>
            
            <div>
                <section className="grupoEstoque">
                    {grupoEstoque.map((grupoEstoque) => (
                        <div key={grupoEstoque.id} className="grupoEstoque-item">
                            <img src={grupoEstoque.imagem} alt={grupoEstoque.grupo}/>
                            <button className="btn btn-detalhes" onClick= {() => openModalAccordion(grupoEstoque)}>Mais detalhes</button>
                        </div>
                    ))}
                </section> 
                <div className="btnAdicionar estoque">
                    <button className="btnCrud" onClick={openModalAdd}>Adicionar</button>
                </div>               
            </div>
            <Modal
                isOpen={isModalAddOpen}
                onRequestClose={closeModalAdd}
                id="modalAddEstoque"
                contentLabel="Adicionar Item"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    },
                    content: {
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        backgroundColor: '#000',
                        height: '80%',
                        width: '35%',
                    },
                }}>
                <button className="modal-close-button" onClick={closeModalAdd}> X </button>
                <form className="estoqueAdd">
                    <div className="form-group-estoque">
                        <label>Nome:</label>
                        <input className="inputEstoque" type="text" id="nome" name="nome"/>
                    </div>
                    <div className="form-group-estoque">
                        <label>Tipo:</label>
                        <select id="grupoItem" name="grupoItem">
                            <option selected disabled>Escolha o grupo a qual o item pertence</option>
                            <option value="Agulhas">Agulhas</option>
                            <option value="Biqueiras">Biqueiras</option>
                            <option value="Esterelizadores">Esterelizadores</option>
                            <option value="Máquinas">Máquinas</option>
                            <option value="Luvas">Luvas</option>
                            <option value="Papel">Papel</option>
                            <option value="Copos">Copos</option>
                            <option value="Tintas">Tintas</option>
                        </select>
                    </div>
                    <div className="form-group-estoque">
                        <label>Quantidade:</label>
                        <input className="inputEstoque" type="number" id="quantidade" name="quantidade"/>
                    </div>
                    <div className="form-group-estoque">
                        <label>Data de compra:</label>
                        <input className="inputEstoque" type="date" id="dataCompra" name="compra" />
                    </div>
                    <div className="form-group-estoque">
                        <label>Data de validade:</label>
                        <input className="inputEstoque" type="date" id="dataValidade" name="validade"/>
                    </div>
                </form>
                <div className="btn-modal">
                                <button onClick={closeModalAdd} className="btn btn-cadastrar">Adicionar</button>
                                <button onClick={closeModalAdd} className="btn btn-cancelar">Cancelar</button>
                </div>
            </Modal>
            <Modal
                isOpen={isModalAccordionOpen}
                onRequestClose={closeModalAccordion}
                id="modalGrupoEstoque"
                contentLabel="Ver itens"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    },
                    content: {
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        backgroundColor: '#000',
                        height: '80%',
                        width: '35%',
                    },
                }}>
                <button className="modal-close-button" onClick={closeModalAccordion}> X </button>
                <div>
                {selectedGrupoEstoque && (
                    <h2 className="tituloModal">{selectedGrupoEstoque.grupo}</h2>
                    )}
                    <div className="accordion">
                        {selectedGrupoEstoque && renderAccordionItems(selectedGrupoEstoque.grupo)}
                    </div>
                </div>
            </Modal>
            </section>

        </div>
    )
}
