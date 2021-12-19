import React from 'react'
import Logo from '../../assets/img/logo-loja.jpg'
import Barra from '../../components/Barra'

import './style.css'

export default function Home() {
    return (
        <div className="home-container">
            <div className="menu">
                <Barra />
            </div>
            <section className="titulo-app">
                <h1>Software de Gestão Comercial</h1>
            </section>
            <section className="logo-container">
                <img src={Logo} alt="Logomarca da loja" style={{ width: '60%' }} />
            </section>
        </div>
    )
}