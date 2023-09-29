import React, { useState } from "react";
import Modal from 'react-modal';
import Menu from '../../../components/admin/menuDashboard';

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

export default function CrudEstoque(){
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
    const openModal = (e) => {
        e.preventDefault();
        setIsModalAddOpen(true);
    }

    const closeModal = () => {
        setIsModalAddOpen(false);
    }

    return (
        <div>
            <Menu/>
            <section>
            <div className="tituloDashboard">
                <h1>Esto<span className="span-color-dashboard">que</span></h1>
            </div>
            <div>
                <section className="grupoEstoque">
                    {grupoEstoque.map((grupoEstoque) => (
                        <div key={grupoEstoque.id} className="grupoEstoque-item">
                            <img src={grupoEstoque.imagem} alt={grupoEstoque.grupo}/>
                            <button className="btn btn-detalhes">Mais detalhes</button>
                        </div>
                    ))}
                </section> 
                <div className="btnAdicionar estoque">
                    <button className="btnCrud">Adicionar</button>
                </div>               
            </div>
            <Modal
                isOpen={isModalAddOpen}
                onRequestClose={closeModal}
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
                        height: '80%'
                    },
                }}
            >
            </Modal>
            </section>

        </div>
    )
}