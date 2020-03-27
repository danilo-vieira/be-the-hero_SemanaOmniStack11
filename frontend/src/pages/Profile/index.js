import React, { useState, useEffect } from 'react'; // Dispara alguma função em algum momento dentro do componente
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  /** Dois parâmetros do useEffect: 
   * - A função a ser executada
   * - Quando a função vai ser executada (array)
   * Quando as informações do array mudarem, a função é executada
   * Caso o array esteja vazio, ele executa apenas uma única vez no fluxo do componente
  */
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })

    /**
     * // É colocado "ongId" mesmo sem precisar pois é recomendável colocar uma
     * variável como dependência, porque se o ongId mudar por qualquer motivo,
     * o useEffect recalcula o perfil e mostra em tela
     */
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  function handleLogout() {
    try {
      // localStorage.removeItem('ongId');
      // localStorage.removeItem('ongName');
      localStorage.clear(); // Limpa todo o localStorage

      history.push('/');
    } catch (err) {
      alert('Falha ao realizar logout, tente novamente.');
    }
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => ( // Retorna diretamente um conteúdo JSX
                                     // Poderia ser { return () }
          // É necessario que o primeiro elemento tenha um valor único para
          // identificar cada um dos incidents. Esse é o atributo "key"
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
// Para atualizar o conteúdo em tela, basta adicionar "incidents" no array monitorado pelo useEffect