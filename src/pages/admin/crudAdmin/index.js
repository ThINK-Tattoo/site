import React, {useState} from "react";
import Modal from 'react-modal';
import Menu from '../../../components/admin/menuDashboard';

import '../../../styleGlobal.css';
import './index.css'

import Admin1 from "../../../assets/crudAdmin/admin1.png";
import Admin2 from "../../../assets/crudAdmin/admin2.png";
import Admin3 from "../../../assets/crudAdmin/admin3.png";


export default function CrudAdmin(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = () => {
       
        setIsModalOpen(false);
    };

    return (
        <div>
            <Menu/>
            <div className="tituloDashboard">
                <h1>Administrado<span className="span-color-dashboard">res</span></h1>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                id="modal-info"
                contentLabel="Detalhes da Tatuagem"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    },
                    content: {
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        border: "none",
                        backgroundColor: "transparent",
                        height: '100%'
                    },
                }}
            >
                
                <form class="form modal-admin">
                    <h4>Adicionar administrador</h4>
                    <div className="container-admin-modal-group">
                        <div class="form-group">
                            <label>Nome:</label>
                            <input type="text" id="nome" name="nome" placeholder="Nome" />
                        </div>
                        <div class="form-group">
                            <label>Email:</label>
                            <input type="email" id="email" name="email" placeholder="example@email.com"/>
                        </div>
                        <div class="form-group">
                            <label>Foto:</label>
                            <input type="file"></input>
                        </div>
                    </div>
                    
                    <div className="flex">
                        <button type="submit" class="btn btn-adicionar">Adicionar</button>
                        <button class="btn btn-cancelar" onClick={closeModal}>Canelar</button>
                    </div>
                </form>
            </Modal>
            <div className="perfis">
                <div className="perfil">
                    <div className="perfilAdmin">
                        <img src={Admin1} className="iconeAdmin"></img>
                        <h2>Skye</h2>
                        <p>Tatuadora</p>
                    </div>
                    <div className="perfilAdmin">
                        <img src={Admin2} className="iconeAdmin"></img>
                        <h2>Dom</h2>
                        <p>Tatuador</p>
                    </div> 
                    <div className="perfilAdmin">
                        <img src={Admin3} className="iconeAdmin"></img>
                        <h2>Mia</h2>
                        <p>Tatuadora</p>
                    </div> 
                </div>
            </div>
            <div className="btnAdicionar">
                <button onClick={(e) => openModal(e)} className="btn">Adicionar</button>
            </div>
        </div>
    )
}