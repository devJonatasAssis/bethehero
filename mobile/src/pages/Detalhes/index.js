import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import logo from '../../assets/logo.png';


export default function Detalhes() {

    const navigation = useNavigation();
    const route = useRoute();

    const caso = route.params.caso;
    const message = `Olá ${caso.nome_ong}, estou entrando em contato pois gostaria de ajudar no caso '${caso.titulo_caso}' com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.valor_caso)}`

    function navigateBack() {
        navigation.goBack();
    }

    function sendEmail() {
        MailComposer.composeAsync({
            subject: `Heroi do Caso: ${caso.titulo_caso}`,
            recipients: [caso.email_caso],
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=55${caso.whatsapp_ong}&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.casos}>
                <Text style={[styles.casoTitulo, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.casoDescricao}>
                    <Text style={{ fontWeight: "bold" }}>{caso.nome_ong}</Text> de {caso.cidade_ong}/{caso.uf_ong}
                </Text>

                <Text style={styles.casoTitulo}>CASO:</Text>
                <Text style={styles.casoDescricao}>{caso.titulo_caso}</Text>

                <Text style={styles.casoTitulo}>VALOR:</Text>
                <Text style={styles.casoDescricao}>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(caso.valor_caso)}
                </Text>
            </View>

            <View style={styles.contatoBox}>
                <Text style={styles.tituloHeroi}>Salve o dia!</Text>
                <Text style={styles.tituloHeroi}>Seja o herói desse caso</Text>

                <Text style={styles.descHeroi}>Entre em Contato: </Text>

                <View style={styles.acoesContato}>
                    <TouchableOpacity style={styles.acao} onPress={sendWhatsapp}>
                        <Text style={styles.acaoTexto}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.acao} onPress={sendEmail}>
                        <Text style={styles.acaoTexto}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}