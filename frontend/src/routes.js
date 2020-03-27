import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; // Pacote responsável por lidar com rotas na aplicação
// BrowserRouter precisa ficar por volta de todas as rotas
// Route é a própria rota
// Switch garantirá que apenas uma rota seja executada por vez

/** Na troca de rotas:
 * O react-router-dom não verifica o caminho path das rotas;
 * Ele verifica se o início das rotas é igual ao que está configurado
 * Nesse caso, a rota "/" será chamada no lugar de "/register"
 * Pois a rota "/" é a rota de Logon
 * 
 * A propriedade "exact" corrige esse problema exigindo que o path seja exatamente igual
 * E não apenas no início como é por padrão
 */

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />

        <Route path="/profile" component={Profile} />

        <Route path="/incidents/new" component={NewIncident} />
      </Switch>
    </BrowserRouter>
  );
}