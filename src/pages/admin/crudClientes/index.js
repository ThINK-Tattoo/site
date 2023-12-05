import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/admin/menuDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import '../../../styleGlobal.css';
import './index.css'

function App() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userType = localStorage.getItem("userType");

        if(!userType || userType === 'cliente'){
            navigate('/signin');
        }else if(userType === 'admin'){
            setIsUserLoggedIn(userType === "admin");
            axios.get('https://api-production-f446.up.railway.app/cliente/selectclientes')
                .then(response => setClientes(response.data))
                .catch(error => console.error('Erro ao buscar clientes:', error));
        
        }
        
    }, [navigate]); 
    
    const [clientes, setClientes] = useState([]);

    const [ordenarPorNome, setOrdenarPorNome] = useState(null);
    const [termoPesquisa, setTermoPesquisa] = useState('');

    const handleExcluirCliente = async (id) => {
        await axios.delete(`https://api-production-f446.up.railway.app/cliente/deleteclientes/${id}`)
        .then(response => {
            setClientes(clientes.filter(cliente => cliente.id !== id));
        })
        .catch(err => console.log("Erro ao excluir clientes", err));
    };

    const ordenarClientesPorNome = () => {
        if (ordenarPorNome === 'asc') {
        setClientes([...clientes].sort((a, b) => a.nome.localeCompare(b.nome)));
        setOrdenarPorNome('desc');
        } else {
        setClientes([...clientes].sort((a, b) => b.nome.localeCompare(a.nome)));
        setOrdenarPorNome('asc');
        }
    };

    const handlePesquisaGeral = (e) => {
        const termo = e.target.value.toLowerCase();
        setTermoPesquisa(termo);
    };

    const clientesFiltrados = clientes.filter(
        (cliente) =>
        cliente.id.toString().includes(termoPesquisa) ||
        cliente.nome.toLowerCase().includes(termoPesquisa) ||
        cliente.email.toLowerCase().includes(termoPesquisa) ||
        cliente.telefone.includes(termoPesquisa)
    );

    return (
        <div>
            <Menu />
            <section>
            <div className="tituloDashboard">
                <h1>Clien<span className="span-color-dashboard">tes</span></h1>
            </div>
            <div className="crudClientes">
            <div className="barraPesquisa">
            <FontAwesomeIcon icon={faSearch} style={{color: "#e40ce4",}} />
                <input
                type="text"
                id="barraPesquisa"
                placeholder="Pesquisar"
                value={termoPesquisa}
                onChange={handlePesquisaGeral}
                />
            </div>
            <br></br>
            <table className="table Cliente">
                <thead>
                <tr>
                    <th style={{ width: '50px' }}>ID</th>
                    <th style={{ width: '200px' }}>
                    Nome
                    <button onClick={ordenarClientesPorNome} style={{ border: 'none', background: 'none', marginLeft: '5px' }}>
                        {ordenarPorNome === 'asc' ? '▲' : '▼'}
                    </button>
                    </th>
                    <th style={{ width: '150px' }}>Email</th>
                    <th style={{ width: '150px' }}>Telefone</th>
                    <th style={{ width: '50px' }}>ㅤ</th>
                </tr>
                </thead>
                <tbody>
                {clientesFiltrados.map((cliente) => (
                    <tr key={cliente.id} className={cliente.id % 2 === 0 ? 'cor1' : 'cor2'}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.telefone}</td>
                    <td>
                        <div className="iconeContainer">
                        <button onClick={() => handleExcluirCliente(cliente.id)}><FontAwesomeIcon className="icone" icon={faTrash} style={{color: "#eb1cea",}} /></button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            </section> 
        </div>
    );
}

export default App;