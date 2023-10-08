import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Menu from '../../../components/admin/menuDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartGantt, faBorderAll, faSearch } from '@fortawesome/free-solid-svg-icons';

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
        { grupo: "Agulhas", nome: "Agulha RL Round Liner - 1003", quantidade: 10, validade: "2026-04-06", movimentacao: "2023-10-06", dataCompra: "2023-10-09" },
        { grupo: "Agulhas", nome: "Agulha RS Round Liner - 1005", quantidade: 5, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-10-07" },
        { grupo: "Agulhas", nome: "Agulha RS Round Liner - 1007", quantidade: 7, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-12-07" },
        { grupo: "Agulhas", nome: "Agulha RS Round Liner - 1009", quantidade: 6, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-14-07" },
        { grupo: "Agulhas", nome: "Agulha RS Round Liner - 1011", quantidade: 9, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-16-07" },
        { grupo: "Agulhas", nome: "Agulha RS Round Shader - 1205", quantidade: 5, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra:"2023-12-07" },
        { grupo: "Agulhas", nome: "Agulha RS Round Shader - 1207", quantidade: 8, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra:"2023-11-07" },
        { grupo: "Agulhas", nome: "Agulha RS Round Shader - 1209", quantidade: 9, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra:"2023-13-07" },
        { grupo: "Agulhas", nome: "Agulha RS Round Shader - 1211", quantidade: 4, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra:"2023-13-07" },
        { grupo: "Agulhas", nome: "Agulha M1 Flat Alternada ou Magnum Trançada - 1009", quantidade: 7, validade: "2026-20-06", movimentacao: "2023-10-08", dataCompra: "2023-11-07" },
        { grupo: "Agulhas", nome: "Agulha M1 Flat Alternada ou Magnum Trançada - 1011", quantidade: 9, validade: "2026-20-06", movimentacao: "2023-10-08",dataCompra: "2023-11-07" },
        { grupo: "Agulhas", nome: "Agulha M1 Flat Alternada ou Magnum Trançada - 1013", quantidade: 8, validade: "2026-21-06", movimentacao: "2023-10-08", dataCompra: "2023-12-07" },
        { grupo: "Agulhas", nome: "Agulha M1 Flat Alternada ou Magnum Trançada - 1015", quantidade: 6, validade: "2026-22-06", movimentacao: "2023-10-08", dataCompra: "2023-13-07" },
        { grupo: "Agulhas", nome: "Agulha M1 Flat Alternada ou Magnum Trançada - 1205", quantidade: 9, validade: "2026-22-06", movimentacao: "2023-10-08", dataCompra: "2023-13-07" },
        { grupo: "Agulhas", nome: "Agulha RM - Magnum Trançada Curvada ou Round Magnum - 1207", quantidade: 6, validade: "2026-22-06", movimentacao: "2023-10-08", dataCompra: "2023-14-07" },
        { grupo: "Agulhas", nome: "Agulha RM - Magnum Trançada Curvada ou Round Magnum - 1209", quantidade: 5, validade: "2026-22-06", movimentacao: "2023-10-08", dataCompra: "2023-14-07" },
        { grupo: "Agulhas", nome: "Agulha RM - Magnum Trançada Curvada ou Round Magnum - 1211", quantidade: 7, validade: "2026-22-06", movimentacao: "2023-10-08", dataCompra: "2023-15-07" },
        { grupo: "Agulhas", nome: "Agulha RM - Magnum Trançada Curvada ou Round Magnum - 1213", quantidade: 7, validade: "2026-22-06", movimentacao: "2023-10-08", dataCompra: "2023-15-07" },
        { grupo: "Agulhas", nome: "Agulha RM - Magnum Trançada Curvada ou Round Magnum - 1215", quantidade: 6, validade: "2026-22-06", movimentacao: "2023-10-08", dataCompra: "2023-15-07" },

        
        { grupo: "Biqueiras", nome: "Biqueiras Reutilizáveis", quantidade: 5, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-18-09" },
        { grupo: "Biqueiras", nome: "Biqueiras Descartáveis", quantidade: 58, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-19-09" },


        { grupo: "Esterilizadores", nome: "Esterilizador", quantidade: 3, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-20-09" },


        { grupo: "Máquinas de Tatuagem", nome: "Máquina de Tatuagem", quantidade: 2, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-21-09" },


        { grupo: "Luvas Látex", nome: "Luva Látex", quantidade: 220, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-21-09" },


        { grupo: "Toalhas Descartáveis", nome: "Toalha Descartável", quantidade: 356, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-22-09" },


        { grupo: "Copos Descartáveis", nome: "Copos Descartáveis", quantidade: 210, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-22-09" },


        { grupo: "Tintas", nome: "Tinta Easy Glow Raven Black - 240ml", quantidade: 111, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
        { grupo: "Tintas", nome: "Tinta Easy Glow Pink - 30ml", quantidade: 21, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
        { grupo: "Tintas", nome: "Tinta Easy Glow Deepsest Green - 30ml", quantidade: 15, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
        { grupo: "Tintas", nome: "Tinta Easy Glow Ultra Liner Black - 30ml", quantidade: 98, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
        { grupo: "Tintas", nome: "Tinta Easy Glow Bubblegum - 30ml", quantidade: 20, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
        { grupo: "Tintas", nome: "Tinta Easy Glow Coral - 30ml", quantidade: 12, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
        { grupo: "Tintas", nome: "Tinta Easy Glow - Sushine Orange - 30ml", quantidade: 11, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
        { grupo: "Tintas", nome: "Tinta Easy Glow Moss Green - 30ml", quantidade: 13, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
        { grupo: "Tintas", nome: "Tinta Easy Glow Rose - 30ml", quantidade: 17, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
        { grupo: "Tintas", nome: "Tinta Easy Glow Walnut - 30ml", quantidade: 10, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
        { grupo: "Tintas", nome: "Tinta Easy Glow Saphire Blue - 30ml", quantidade: 19, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
        { grupo: "Tintas", nome: "Tinta Easy Glow Snake Green - 30ml", quantidade: 9, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
        { grupo: "Tintas", nome: "Tinta Easy Glow Cannary Yellow - 30ml", quantidade: 10, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
        { grupo: "Tintas", nome: "Tinta Easy Glow Shark Grey - 30ml", quantidade: 9, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
        { grupo: "Tintas", nome: "Tinta Easy Glow Mellow Yellow - 30ml", quantidade: 11, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
        { grupo: "Tintas", nome: "Tinta Easy Glow Wine Purple - 30ml", quantidade: 14, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
        { grupo: "Tintas", nome: "Tinta Easy Glow Redish - 30ml", quantidade: 26, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
        { grupo: "Tintas", nome: "Tinta Easy Glow Deep Violet - 30ml", quantidade: 12, validade: "2026-04-06", movimentacao: "2023-10-08", dataCompra: "2023-23-09" },
    
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
                    <p>Data de compra: {item.dataCompra}</p>
                    <p>Validade: {item.validade}</p>
                    <div>
                    <button className="btn btn-editar">Editar</button>
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

    return (
        <div>
            <Menu/>
            <section>
                <div className="headerEstoque">
                    <div className="tituloDashboard">
                        <h1>Esto<span className="span-color-dashboard">que</span></h1>
                    </div>
                    <button onClick={alternarVisualizacao}  className="visualizacao">
                    <FontAwesomeIcon icon={iconeVisualizacao} className="icon" style={{color: "#e40ce4",}} />
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
                        placeholder="Pesquisar..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                    <table className="table Estoque">
                        <thead>
                            <tr>
                                <th>ㅤ</th>
                                <th>Grupo</th>
                                <th>Nome</th>
                                <th>Quantidade</th>
                                <th>Validade</th>
                                <th>última movimentação</th> 
                            </tr>
                        </thead>
                        <tbody>
                        {itensEstoque
                        .filter((item) =>
                        item.grupo.toLowerCase().includes(searchText.toLowerCase()) ||
                        item.nome.toLowerCase().includes(searchText.toLowerCase()) ||
                        item.quantidade.toString().includes(searchText) ||
                        item.validade.toLowerCase().includes(searchText.toLowerCase()) ||
                        item.movimentacao.toLowerCase().includes(searchText.toLowerCase())
                        )

                        .map((item, index) => (
                            <tr key={index}>
                                <td>ㅤ</td>
                                <td>{item.grupo}</td>
                                <td>{item.nome}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.validade}</td>
                                <td>{item.movimentacao}</td>
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
            </section>

        </div>
    )
}
