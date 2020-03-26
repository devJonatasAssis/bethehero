import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

import logo from '../../assets/logo.svg';

export default function Register() {

    const [nome_ong, setNomeOng] = useState('');
    const [email_ong, setEmailOng] = useState('');
    const [whatsapp_ong, setWhatsappOng] = useState('');
    const [cidade_ong, setCidadeOng] = useState('');
    const [uf_ong, setUfOng] = useState('');

    const history = useHistory();

    async function handleRegister(event) {
        event.preventDefault();
        const data = {
            nome_ong,
            email_ong,
            whatsapp_ong,
            cidade_ong,
            uf_ong
        };

        try {
            const response = await api.post('ongs', data);
            alert(`Seu id de Acesso: ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert('Erro ao Cadastrar. Tente novamente');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Heroes" />
                    <h1>Cadastro</h1>
                    <p>
                        Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
                        os casos da sua ONG.
                    </p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro.
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        value={nome_ong}
                        onChange={event => setNomeOng(event.target.value)}
                        placeholder="Nome da ONG" />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email_ong}
                        onChange={event => setEmailOng(event.target.value)} />

                    <input
                        placeholder="Whatsapp"
                        value={whatsapp_ong}
                        onChange={event => setWhatsappOng(event.target.value)} />

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={cidade_ong}
                            onChange={event => setCidadeOng(event.target.value)} />

                        <input
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf_ong}
                            onChange={event => setUfOng(event.target.value)} />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
