import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logo from '../../assets/logo.svg';
import heroes from '../../assets/heroes.png';

export default function Login({ history }) {

  const [id, setId] = useState('');
  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post('sessions/login', { id });
      localStorage.setItem('idOng', id);
      localStorage.setItem('nomeOng', response.data.nome_ong);
      history.push('/profile');
    } catch (error) {
      alert('Falha no Login! Tente Novamente');
    }
  }
  return (
    <div className="login-container">
      <section className="form">
        <img src={logo} alt="Heroes" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu Login</h1>

          <input
            placeholder="Informe seu ID"
            value={id}
            onChange={event => setId(event.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro.
          </Link>
        </form>
      </section>

      <img src={heroes} alt="Heroes" />
    </div>
  );
}
