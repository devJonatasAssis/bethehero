import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import api from '../../services/api';
import styles from './styles';
import logo from '../../assets/logo.png';

export default function Casos() {
    const navigation = useNavigation();

    function navigateToDetail() {
        navigation.navigate('Detalhe');
    }

    const [casos, setCasos] = useState([]);

    useEffect(() => {
        async function loadCasos() {
            const response = await api.get('casos');
            setCasos(response.data);
        }

        loadCasos();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <Text style={styles.headerText}>Total de
                   <Text style={styles.headerTextBold}> 0 casos</Text>.
                </Text>
            </View>

            <Text style={styles.titulo}>Bem Vindo</Text>
            <Text style={styles.descricao}>Escolha um dos casos abaixo e salve o dia.</Text>


            <FlatList
                style={styles.casosLista}
                keyExtractor={caso => String(caso.id)}
                showsVerticalScrollIndicator={false}
                data={casos}
                renderItem={({ item: caso }) => (
                    <View style={styles.casos}>
                        <Text style={styles.casoTitulo}>ONG:</Text>
                        <Text style={styles.casoDescricao}>{caso.nome_ong}</Text>

                        <Text style={styles.casoTitulo}>CASO:</Text>
                        <Text style={styles.casoDescricao}>{caso.titulo_caso}</Text>

                        <Text style={styles.casoTitulo}>VALOR:</Text>
                        <Text style={styles.casoDescricao}>{caso.valor_caso}</Text>

                        <TouchableOpacity style={styles.botaoCaso} onPress={navigateToDetail}>
                            <Text style={styles.botaoTexto}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}