import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom' // Será usado para linkar uma rota utilizando SPA
import { FiLogIn } from 'react-icons/fi'; // Pacote de ícones Feather Icons

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault(); // Faz-se em todo form

    try {
      const response = await api.post('sessions', { id });

      /** Dados que vão ser usados em toda a aplicação precisam ser salvos
       * Será então salvo no storage no browser
      */
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (err) {
      alert('Falha no login, tente novamente.')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
      <img src={logoImg} alt="Be The Hero"/>

      <form onSubmit={handleLogin}>
        <h1>Faça seu logon</h1>

        <input
          placeholder="Sua ID"
          value={id}
          onChange={e => setId(e.target.value)}
        />
        <button className="button" type="submit">Entrar</button>

        <Link className="back-link" to="/register">
          <FiLogIn size={16} color="#e02041"/>
          Não tenho cadastro
        </Link>
      </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}