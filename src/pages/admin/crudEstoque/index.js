import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Menu from '../../../components/admin/menuDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartGantt, faBorderAll, faSearch, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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
        const [formData, setFormData] = useState({
            nome: '',
            grupoItem: '', 
            quantidade: 0,
            dataCompra: '',
            dataValidade: '',
        });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

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

    const [itensEstoque, setItensEstoque] = useState([]);

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
        const itensDoGrupo = itensEstoque.filter((item) => item.descricaoItem === grupo);
    
        return itensDoGrupo.map((item, index) => (
            <div className="accordion-item" key={index}>
                <button
                    className={`accordion-button ${activeAccordion === index ? 'active' : ''}`}
                    onClick={() => toggleAccordion(index)}
                >
                    <a>
                    {item.nomeItem}
                    </a>
                    <span className="accordion-button-icon">
                    {activeAccordion === index ? "-" : "+"}
                    </span>
                </button>
                <div className={`accordion-content ${activeAccordion === index ? 'show' : ''}`}>
                    <p>Quantidade: {item.quantidadeItem}</p>
                    <p>Data de compra: {item.dataCompraItem}</p>
                    <p>Validade: {item.dataValidadeItem}</p>
                    <div className="btnEditarAccordion">
                    <button className="btn btn-adicionar">Editar</button>
                    </div>
                </div>
            </div>
        ));
    };

    const toggleAccordion = (index) => {
        setActiveAccordion((prevIndex) => (prevIndex === index ? null : index));
    };

    const [visualizacaoGrade, setVisualizacaoGrade] = useState(true);
    const [iconeVisualizacao, setIconeVisualizacao] = useState(faChartGantt); 
    const alternarVisualizacao = () => {
        setVisualizacaoGrade(!visualizacaoGrade);
        setIconeVisualizacao(visualizacaoGrade ? faBorderAll : faChartGantt);
    };

    const [searchText, setSearchText] = useState("");

    const [ordenacao, setOrdenacao] = useState(null);
    const [direcaoOrdenacao, setDirecaoOrdenacao] = useState('asc');

    const ordenarPorColuna = (coluna) => {
        if (ordenacao === coluna) {
            const novaDirecao = direcaoOrdenacao === 'asc' ? 'desc' : 'asc';
            setItensEstoque([...itensEstoque].sort((a, b) => {
            const resultado = a[coluna].localeCompare(b[coluna]);
            return direcaoOrdenacao === 'asc' ? resultado : -resultado;
            }));
            setDirecaoOrdenacao(novaDirecao);
        } else {
            setItensEstoque([...itensEstoque].sort((a, b) => a[coluna].localeCompare(b[coluna])));
            setOrdenacao(coluna);
            setDirecaoOrdenacao('asc');
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        console.log('Botão clicado!');
        try {
            const response = await axios.post('http://localhost:3636/admin/createItemEstoque', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log(response);
    
            if (response.status === 201) {
                const data = response.data;
                console.log(data.message);
                closeModalAdd();
                window.location.reload();
            } else {
                console.error('Erro ao adicionar item ao estoque:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
            
            const response = await axios.get('http://localhost:3636/admin/selectItemEstoque');
            setItensEstoque(response.data);
            console.log(itensEstoque);
            } catch (error) {
            console.error('Erro ao buscar dados do estoque:', error);
            }
        };
    
        fetchData();
    }, []);
    
    return (
        <div>
            <Menu/>
            <section>
                <div className="headerEstoque">
                    <div className="tituloDashboard">
                        <h1>Esto<span className="span-color-dashboard">que</span></h1>
                    </div>
                    <button onClick={alternarVisualizacao}  className="visualizacao">
                    <FontAwesomeIcon icon={iconeVisualizacao} className="iconeVisualizacao" style={{color: "#e40ce4",}} />
                        <h2>Alterar Visualização</h2></button>
                </div>
            
            <div>
            {visualizacaoGrade ? (
                <section className="grupoEstoque">
                    {grupoEstoque.map((grupoEstoque) => (
                        <div key={grupoEstoque.id} className="grupoEstoque-item">
                            <img src={grupoEstoque.imagem} alt={grupoEstoque.grupo}/>
                            <button className="btn btn-detalhes" onClick= {() => openModalAccordion(grupoEstoque)}>Mais detalhes</button>
                        </div>
                    ))}
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
                ) : ( 
                <section className="tabelaEstoque">
                    <div className="barraPesquisa">
                        <FontAwesomeIcon icon={faSearch} style={{color: "#e40ce4",}} />
                        <input
                        type="text"
                        className="input"
                        placeholder="Pesquisar..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                    <table className="table tableEstoque">
                        <thead>
                            <tr>
                                <th style={{ width: '50px', textAlign: 'center' }}>
                                <button onClick={() => ordenarPorColuna('grupo')} style={{ border: 'none', background: 'none', marginLeft: '-15px' }}>
                                {direcaoOrdenacao === 'asc' ? '▲' : '▼'}
                                </button>
                                </th>
                                <th style={{ width: '20px', textAlign: 'center'  }}>
                                Grupo
                                <button onClick={() => ordenarPorColuna('grupo')} style={{ border: 'none', background: 'none', marginLeft: '5px' }}>
                                {direcaoOrdenacao === 'asc' ? '▲' : '▼'}
                                </button>
                                </th>
                                <th style={{ width: '350px' }}onClick={() => ordenarPorColuna('nome') }>
                                Nome
                                <button onClick={() => ordenarPorColuna('nome')} style={{ border: 'none', background: 'none', marginLeft: '5px' }}>
                                {direcaoOrdenacao === 'asc' ? '▲' : '▼'}
                                </button>
                                </th>
                                <th style={{ width: '100px', textAlign: 'center' }}>Quantidade</th>
                                <th style={{ width: '150px', textAlign: 'center' }}>
                                Validade
                                <button onClick={() => ordenarPorColuna('validade')} style={{ border: 'none', background: 'none', marginLeft: '5px' }}>
                                {direcaoOrdenacao === 'asc' ? '▲' : '▼'}
                                </button>
                                </th>
                                <th style={{ width: '150px', textAlign: 'center' }}>
                                Última movimentação
                                <button onClick={() => ordenarPorColuna('movimentacao')} style={{ border: 'none', background: 'none', marginLeft: '5px' }}>
                                {direcaoOrdenacao === 'asc' ? '▲' : '▼'}
                                </button>
                                </th> 
                            </tr>
                        </thead>
                        <tbody>
                        {itensEstoque.filter((item) =>
                        item.descricaoItem.toLowerCase().includes(searchText.toLowerCase()) ||
                        item.nomeItem.toLowerCase().includes(searchText.toLowerCase()) ||
                        item.quantidadeItem.toString().includes(searchText) ||
                        item.dataValidadeItem.toLowerCase().includes(searchText.toLowerCase()) ||
                        item.dataHora.toLowerCase().includes(searchText.toLowerCase())
                        )
                        .map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'cor1' : 'cor2'}>
                                <td style={{ textAlign: 'center' }}>
                                {itensEstoque.quantidadeItem > 0 ? (
                                    <FontAwesomeIcon icon={faArrowDown} style={{ color: 'red' }} />
                                ) : (
                                    <FontAwesomeIcon icon={faArrowUp} style={{ color: 'green' }} />
                                    
                                )}
                                ㅤ</td>
                                <td style={{ textAlign: 'center' }}>{item.descricaoItem}</td>
                                <td>{item.nomeItem}</td>
                                <td style={{ textAlign: 'center' }}>{item.quantidadeItem}</td>
                                <td style={{ textAlign: 'center' }}>{item.dataValidade}</td>
                                <td style={{ textAlign: 'center' }}>{item.dataHora}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}
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
                        <input
                            className="inputEstoque input"
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group-estoque">
                        <label>Tipo:</label>
                        <select id="grupoItem" name="grupoItem" value={formData.grupoItem} onChange={handleChange}>
                            <option selected >Escolha o grupo a qual o item pertence</option>
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
                        <input className="inputEstoque input" type="number" id="quantidade" 
                        value={formData.quantidade}
                        onChange={handleChange}
                        name="quantidade"/>
                    </div>
                    <div className="form-group-estoque">
                        <label>Data de compra:</label>
                        <input className="inputEstoque input" type="date" id="dataCompra" 
                        value={formData.dataCompra}
                        onChange={handleChange}
                        name="dataCompra" />
                    </div>
                    <div className="form-group-estoque">
                        <label>Data de validade:</label>
                        <input className="inputEstoque input" type="date" id="dataValidade" 
                        value={formData.dataValidade}
                        onChange={handleChange}
                        name="dataValidade"/>
                    </div>
                </form>
                <div className="btn-modalEstoque">
                    <button onClick={handleAddItem} className="btn btn-cadastrarEstoque">Adicionar</button>
                    <button onClick={closeModalAdd} className="btn btn-cancelarEstoque">Cancelar</button>
                </div>
            </Modal>
            </section>
        </div>
    )
}