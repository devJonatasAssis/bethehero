import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import Logo from '../../assets/logo.svg';
import './styles.css';

export default function Profile({ history }) {

    const [ongs, setOngs] = useState([]);
    const idOng = localStorage.getItem('idOng');
    const nomeOng = localStorage.getItem('nomeOng');

    useEffect(() => {
        async function buscarCasos() {
            const response = await api.get('cases_details', {
                headers: {
                    ong_id: idOng
                }
            });
            setOngs(response.data);
        }

        buscarCasos();
    }, [idOng]);

    async function deletarCaso(id) {
        try {
            await api.delete(`casos/${id}`, {
                headers: {
                    ong_id: idOng
                }
            });

            setOngs(ongs.filter(ong => ong.id !== id));
        } catch (error) {
            alert('Erro ao deletar caso! Tente novamente');
        }
    }

    function logout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">

            <header>
                <img src={Logo} alt="Be the Hero" />
                <span>Bem vinda, {nomeOng}</span>

                <Link className="button" to="/caso/novo">Cadastrar novo caso</Link>

                <button onClick={logout} type="button">
                    <FiPower size={28} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {ongs.map(ong => (
                    <li key={ong.id}>
                        <strong>CASO:</strong>
                        <p>{ong.titulo_caso}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{ong.desc_caso}</p>

                        <strong>VALOR:</strong>
                        <p>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(ong.valor_caso)}
                        </p>

                        <button onClick={() => deletarCaso(ong.id)} type="button">
                            <FiTrash2 size={20} color="#A8A8B3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
