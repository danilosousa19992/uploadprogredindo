import React, { useEffect, useState } from 'react';
import { FiTrash2, FiRotateCcw } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Barra from '../../../components/Barra'



import "./style.css";

import api from "../../../services/api"

export default function ListaClientes() {

    const [clientes, setClientes] = useState([]);
    const navegacao = useNavigate()

    useEffect(() => {
        api.get('/cliente/listar').then(response => {
            setClientes(response.data)
        })
    }, [])

    async function deletarCliente(id){  
        try {
            await api.delete(`/cliente/apagar/${id}`)
            setClientes(clientes.filter(clientes => clientes.id !== id))
        } catch (error) {
            alert('Erro ao apagar o cliente, tente outra vez.')
        }
    }

    function selecionarCliente(id){
        localStorage.setItem('idCliente', id)
        navegacao('/cliente/atualizar')
    }

    return (
        <div className="lista-clientes-container">
            <div className="menu">
                <Barra/>
            </div>
            <div className="content-lista">
                <div className="titulo-lista-clientes">
                    <h1>Relatório de clientes</h1>
                </div>
                <div className="lista-clientes">
                    <table>
                        <thead>
                            <tr>
                                <th>Cód.</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Endereço</th>
                                <th>Cidade</th>
                                <th>Celular</th>
                                <th>E-mail</th>
                                <th>Atualizar</th>
                                <th>Apagar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientes.map(cliente => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.id}</td>
                                        <td>{cliente.nome+" "+cliente.sobrenome}</td>
                                        <td>{cliente.cpf}</td>
                                        <td>{cliente.endereco}</td>
                                        <td>{cliente.cidade}</td>
                                        <td>{cliente.celular}</td>
                                        <td>{cliente.email}</td>
                                        <td>
                                            <button type="button" onClick={ () => selecionarCliente(cliente.id)} id="button-update">
                                                <FiRotateCcw size={20} color="green" />
                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" onClick={ () => deletarCliente(cliente.id)} id="button-delete">
                                                <FiTrash2 size={20} color="red" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {/* <ul>
                        <li>Nome Completo</li>
                        <li>CPF</li>
                        <li>Endereço</li>
                        <li>Cidade</li>
                        <li>Celular</li>
                        <li>E-mail</li>
                    </ul>
                    <ul>
                        <li>Danilo Fernando</li>
                        <li>0077441667</li>
                        <li>Rua qualquer</li>
                        <li>Goiânia</li>
                        <li>629683163</li>
                        <li>danilofas@g</li>
                    </ul> */}
                </div>
            </div>
        </div>
    );
}