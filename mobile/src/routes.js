import React from 'react';
// Sempre vai por volta de todas as rotas
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator(); // Cria uma navegação
// Dentro de AppStack serão cadastradas as rotas

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

export default function Routes() {
  return ( // Retorna as rotas
           // AppStack.Screen será usado para cada rota adicionada na aplicação
    <NavigationContainer>

      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>

    </NavigationContainer>
  );
};