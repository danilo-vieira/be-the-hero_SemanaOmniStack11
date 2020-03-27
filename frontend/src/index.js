// Primeiro arquivo JS aberto pelo index.html (mesmo sem estar sendo importado)
import React from 'react';
import ReactDOM from 'react-dom'; // Integração do react com a DOM do navegador (Document Object Model)
import App from './App';

ReactDOM.render(<App />,document.getElementById('root')); // Renderiza App como elemento html