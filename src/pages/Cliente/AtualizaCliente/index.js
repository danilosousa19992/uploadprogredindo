import React, { useState, useEffect } from 'react';
import api from '../../../services/api'
import { FiArrowLeftCircle } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';

import './style.css'

import CarrinhoCompras from '../../../assets/img/carrinho-de-compras.png'

export default function NovoCliente() {

    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [cpf, setCpf] = useState('')
    const [sexo, setSexo] = useState('')
    const [endereco, setEndereco] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')
    const [email, setEmail] = useState('')
    const [celular, setCelular] = useState('')

    const navegacao = useNavigate();
    const id = localStorage.getItem('idCliente')

    useEffect( () => {

        try {
            api.get(`cliente/busca/${id}`).then( response => {
                setNome(response.data[0].nome)
                setSobrenome(response.data[0].sobrenome)
                setCpf(response.data[0].cpf)
                setSexo(response.data[0].sexo)
                setEndereco(response.data[0].endereco)
                setCidade(response.data[0].cidade)
                setUf(response.data[0].uf)
                setEmail(response.data[0].email)
                setCelular(response.data[0].celular)
            })
        } catch (error) {
            
        }
    }, [id]);

    async function executarAtualizacao(e){
        e.preventDefault();
                       
        const dados = {
            nome,
            sobrenome,
            cpf,
            sexo,
            endereco,
            cidade,
            uf,
            email,
            celular
        }

        try {
            await api.put(`/cliente/atualizar/${id}`, dados)
            alert('Dados atualizados com sucesso')
            navegacao('/cliente/lista')
        } catch (error) {
            alert('Erro ao tentar atualizar. Tente novamente.')
        }
    }
    return (
        <div className="novo-cliente-container">
            <div className="content-atualizar">
                <section className="cliente-form-atualizar">
                    <section className="logo-carrinho-compras">
                        <img src={CarrinhoCompras} alt="Carrinho de compras" style={{ width: '100%' }} />

                        <Link to="/"> 
                            <FiArrowLeftCircle size={30} color="#e02041"/>
                        </Link>
                    </section>
                    <section className="form-cadastro-cliente">
                        <h1>Atualizar cliente</h1>
                        <form onSubmit={executarAtualizacao}>
                            <input
                                placeholder="Nome"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                style={{ width: "45%" }}
                            />
                            <input
                                placeholder="Sobrenome"
                                value={sobrenome}
                                onChange={e => setSobrenome(e.target.value)}
                                style={{ width: "45%" }}

                            />
                            <input
                                placeholder="CPF"
                                value={cpf}
                                onChange={e => setCpf(e.target.value)}
                                style={{ width: "45%" }}
                                readOnly
                            />
                            <input
                                placeholder="Sexo"
                                value={sexo}
                                onChange={e => setSexo(e.target.value)}
                                style={{ width: "20%" }}
                            />

                            <input
                                placeholder="UF"
                                value={uf}
                                onChange={e => setUf(e.target.value)}
                                style={{ width: "20%" }}
                            />

                            <input
                                placeholder="Endereço"
                                value={endereco}
                                onChange={e => setEndereco(e.target.value)}
                                style={{ width: "95%" }}
                            />
                            <input
                                placeholder="Cidade"
                                value={cidade}
                                onChange={e => setCidade(e.target.value)}
                                style={{ width: "45%" }}
                            />
                            <input
                                placeholder="Celular"
                                value={celular}
                                onChange={e => setCelular(e.target.value)}
                                style={{ width: "45%" }}
                            />
                            <input
                                placeholder="E-mail"
                                value={email}
                                type="email"
                                onChange={e => setEmail(e.target.value)}
                                style={{ width: "95%" }}
                                readOnly
                            />

                            <button className="button" style={{ width: "95%"}} >
                                Atualizar
                            </button>
                        </form>
                    </section>
                </section>
            </div>
        </div>
    )
}