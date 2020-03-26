import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import logo from '../../assets/logo.svg';

import './styles.css';

export default function NovoCaso({ history }) {

    const [titulo_caso, setTituloCaso] = useState('');
    const [desc_caso, setDescCaso] = useState('');
    const [valor_caso, setValorCaso] = useState('');

    const idOng = localStorage.getItem('idOng');

    async function cadastrarCaso(event) {
        event.preventDefault();
        const data = {
            titulo_caso,
            desc_caso,
            valor_caso
        };

        try {
            await api.post('casos', data, {
                headers: {
                    ong_id: idOng
                }
            });
            history.push('/profile');
        } catch (err) {
            alert('Erro ao Cadastrar. Tente novamente');
        }
    }

    return (
        <div className="caso-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Heroes" />
                    <h1>Cadastrar novo Caso</h1>
                    <p>
                        Descreva o caso detalhadamente para
                        encontrar um herói para resolver isso.
                    </p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home.
                    </Link>
                </section>

                <form onSubmit={cadastrarCaso}>
                    <input
                        placeholder="Título do Caso"
                        value={titulo_caso}
                        onChange={e => setTituloCaso(e.target.value)} />

                    <textarea
                        placeholder="Descrição"
                        value={desc_caso}
                        onChange={e => setDescCaso(e.target.value)} />

                    <input
                        placeholder="Valor em Reais"
                        value={valor_caso}
                        onChange={e => setValorCaso(e.target.value)} />


                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
