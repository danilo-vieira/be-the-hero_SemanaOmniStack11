import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  // Serve para fazer a navegação através de uma função JS quando não se pode usar o elemento "<Link />"
  const history = useHistory();

  async function handleRegister(e) { // "e" é o evento de submit do formulário
    e.preventDefault() // Previne o comportamento padrão do submit (que é dar um refresh na página)

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('ongs', data); // O axios ja envia em formato JSON
      alert(`Seu ID de acesso: ${response.data.id}`); // "data" é o corpo da resposta e "id" é o campo
      
      history.push('/') // Redireciona o usuário para a rota "/"
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041"/>
            Voltar para o logon
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            value={name}
            
            /** 
             * "e" é o valor que a função recebe 
             * "setName(e.target.value)" é a corpo da função
             * */
            onChange={e => setName(e.target.value)} // "e.target.value" representa o valor do input
            placeholder="Nome da ONG"
          />

          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input  
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input  
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />

            <input  
              placeholder="UF" 
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}