// Componente é uma função que retorna html
import React from 'react';

import './global.css';

import Routes from './routes';

function App() { // No react NÃO se pode colocar um elemento abaixo do outro sem nada em volta
  return ( // Por isso se coloca uma div para segura-los
    <Routes />
  );
}

export default App;
