import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native' // Semelhante ao useHistory
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'; // View vai funcionar como um elemento div

import api from '../../services/api';

// Não é necessário definir qual png será importado
// dessa forma, será importada a logo no melhor formato de acordo com a 
// tela em que está rodando
import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  // Armazena uma informação quando está buscando 
  // dados novos para evitar que esses dados sejam buscados novamente
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    // O segundo parâmetro serve para enviar um objeto para a página a ser redirecionada
    navigation.navigate('Detail', { incident })
  }

  async function loadIncidents() {
    /**
     * Evita que uma requisição aconteça caso outra requisição esteja sendo feita
     * (caso a página esteja carregando e o usuário continue puxando o scroll)
     */
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);


    const response = await api.get('incidents', {
      params: { page },
    });

    setLoading(false);
    // Somando valores de dois vetores para nao sobrepor a informação de incidents
    setIncidents([...incidents, ...response.data]); // Função que atualiza o valor de incidents
    setTotal(response.headers['x-total-count'])
    setPage(page + 1);
  }

  // Função que é disparada quando o estado do conteúdo do array é alterado
  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logoImg}/>
          <Text style={styles.headerText}>
            Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
          </Text>
        </View>

        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

        <FlatList
          style={styles.incidentList}
          data={incidents}
          keyExtractor={incident => String(incident.id)} // Incident representa cada elemento de data
          showsVerticalScrollIndicator={false}
          onEndReached={loadIncidents} // Aceita uma função que é disparada quando o usuário chega ao fim da lista
          onEndReachedThreshold={0.2} // Quantos % do final da lista o usuário precisa estar para que seja carregado novos conteúdos
          renderItem={({ item: incident }) => (
            <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG:</Text>
              <Text style={styles.incidentValue}>{incident.name}</Text>

              <Text style={styles.incidentProperty}>CASO</Text>
              <Text style={styles.incidentValue}>{incident.description}</Text>

              <Text style={styles.incidentProperty}>VALOR</Text>
              <Text style={styles.incidentValue}>
                {Intl.NumberFormat('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                  }).format(incident.value)
                }
              </Text>

              <TouchableOpacity 
                style={styles.detailsButton} 
                onPress={() => navigateToDetail(incident)}
              >
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={16} color="#e02041" />
              </TouchableOpacity>
            </View>
          )}
        />
    </View>
  );
};
