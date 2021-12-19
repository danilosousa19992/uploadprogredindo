import React, { useEffect, useState } from 'react';
import { FiTrash2, FiRotateCcw } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Barra from '../../../components/Barra'

import "./style.css";

import api from "../../../services/api"

export default function ListaProdutos() {

    const [produtos, setProdutos] = useState([]);
    const navegacao = useNavigate()

    useEffect(() => {
        api.get('/produto/listar').then(response => {
            setProdutos(response.data)
        })
    }, [])

    async function deletarProduto(id){  
        try {
            await api.delete(`/produto/apagar/${id}`)
            setProdutos(produtos.filter(produtos => produtos.id !== id))
        } catch (error) {
            alert('Erro ao apagar o produto, tente outra vez.')
        }
    }

    function selecionarProduto(id){
        localStorage.setItem('idProduto', id)
        navegacao('/produto/atualizar')
    }

    return (
        <div className="lista-clientes-container">
            <div className="menu">
                <Barra/>
            </div>
            <div className="content-lista-produtos">
                <div className="titulo-lista-clientes">
                    <h1>Relatório de produtos</h1>
                </div>
                <div className="lista-clientes">
                    <table>
                        <thead>
                            <tr>
                                <th>Cód.</th>
                                <th>Nome</th>
                                <th>Categoria</th>
                                <th>Preço</th>
                                <th>Estoque</th>
                                <th>Unidade</th>
                                <th>Marca</th>
                                <th>Descrição</th>
                                <th>Atualizar</th>
                                <th>Apagar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                produtos.map(produto => (
                                    <tr key={produto.id}>
                                        <td>{produto.id}</td>
                                        <td>{produto.nome}</td>
                                        <td>{produto.categoria}</td>
                                        <td>{Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL' }).format(produto.preco)}</td>
                                        <td>{produto.estoque}</td>
                                        <td>{produto.unidade}</td>
                                        <td>{produto.marca}</td>
                                        <td>{produto.descricao}</td>
                                        <td>
                                            <button type="button" onClick={ () => selecionarProduto(produto.id)} id="button-update">
                                                <FiRotateCcw size={20} color="green" />
                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" onClick={ () => deletarProduto(produto.id)} id="button-delete">
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