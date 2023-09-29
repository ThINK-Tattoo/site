import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/admin/menuDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

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
        }
        
    }, []);
      // clientes de exemplo
      const [clientes, setClientes] = useState([
        { id: 1, nome: 'Cliente 1', email: 'cliente1@example.com', telefone: '(12) 93456-7890', selecionado: false },
        { id: 2, nome: 'Cliente 2', email: 'cliente2@example.com', telefone: '(98) 97654-3210', selecionado: false },
        ]);

    const [ordenarPorNome, setOrdenarPorNome] = useState(null);
    const [termoPesquisa, setTermoPesquisa] = useState('');

    const handleExcluirCliente = (id) => {
        const novosClientes = clientes.filter((cliente) => cliente.id !== id);
        setClientes(novosClientes);
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
                placeholder="Pesquisar"
                value={termoPesquisa}
                onChange={handlePesquisaGeral}
                />
            </div>
            <br></br>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>
                    Nome
                    <button onClick={ordenarClientesPorNome} style={{ border: 'none', background: 'none', marginLeft: '5px' }}>
                        {ordenarPorNome === 'asc' ? '▲' : '▼'}
                    </button>
                    </th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>ㅤ</th>
                </tr>
                </thead>
                <tbody>
                {clientesFiltrados.map((cliente) => (
                    <tr key={cliente.id}>
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