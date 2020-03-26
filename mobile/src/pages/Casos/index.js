import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import api from '../../services/api';
import styles from './styles';
import logo from '../../assets/logo.png';

export default function Casos() {

    const [casos, setCasos] = useState([]);
    const [totalCasos, setTotalCasos] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(caso) {
        navigation.navigate('Detalhe', { caso });
    }

    async function loadCasos() {

        if (loading) {
            return;
        }

        if (totalCasos > 0 && casos.length === totalCasos) {
            return;
        }

        setLoading(true);

        const response = await api.get('casos', {
            params: { page }
        });

        setCasos([...casos, ...response.data]);
        setTotalCasos(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadCasos();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <Text style={styles.headerText}>Total de
                   <Text style={styles.headerTextBold}> {totalCasos} casos</Text>.
                </Text>
            </View>

            <Text style={styles.titulo}>Bem Vindo</Text>
            <Text style={styles.descricao}>Escolha um dos casos abaixo e salve o dia.</Text>


            <FlatList
                style={styles.casosLista}
                keyExtractor={caso => String(caso.id)}
                // showsVerticalScrollIndicator={false}
                data={casos}
                onEndReached={loadCasos}
                onEndReachedThreshold={0.2}
                renderItem={({ item: caso }) => (
                    <View style={styles.casos}>
                        <Text style={styles.casoTitulo}>ONG:</Text>
                        <Text style={styles.casoDescricao}>{caso.nome_ong}</Text>

                        <Text style={styles.casoTitulo}>CASO:</Text>
                        <Text style={styles.casoDescricao}>{caso.titulo_caso}</Text>

                        <Text style={styles.casoTitulo}>VALOR:</Text>
                        <Text style={styles.casoDescricao}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(caso.valor_caso)}
                        </Text>

                        <TouchableOpacity style={styles.botaoCaso} onPress={() => navigateToDetail(caso)}>
                            <Text style={styles.botaoTexto}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}