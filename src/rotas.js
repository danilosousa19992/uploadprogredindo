import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home/index';
import NovoCliente from './pages/Cliente/NovoCliente/index'
import ListaClientes from './pages/Cliente/ListaClientes/index'
import AtualizaCliente from './pages/Cliente/AtualizaCliente/index'
import NovoProduto from './pages/produto/Cadastro/index'
import ListaProdutos from '../src/pages/produto/ListaProdutos/index'

export default function Rotas(){    
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/cliente/cadastro" element={<NovoCliente/>}/>
                <Route path="/cliente/lista" element={<ListaClientes/>}/>
                <Route path="/cliente/atualizar" element={<AtualizaCliente/>}/>
                <Route path="/produto/cadastro" element={<NovoProduto/>}/>
                <Route path="/produto/lista" element={<ListaProdutos/>}/>
            </Routes>
        </BrowserRouter>

    )
}