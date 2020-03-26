import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import logo from '../../assets/logo.png';


export default function Detalhes() {

    const navigation = useNavigation();
    const message = "Olá APAE, estou entrando em contato pois gostaria de ajudar no caso 'Cachorro atropelado' com o valor de R$ 100,00"

    function navigateBack() {
        navigation.goBack();
    }

    function sendEmail() {
        MailComposer.composeAsync({
            subject: 'Heroi do Caso: Cachorro atropelado',
            recipients: ['jonatassilva9090@gmail.com'],
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=5544999077386&text=${message}`);
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
                <Text style={styles.casoDescricao}>APAD</Text>

                <Text style={styles.casoTitulo}>CASO:</Text>
                <Text style={styles.casoDescricao}>Aula de musica</Text>

                <Text style={styles.casoTitulo}>VALOR:</Text>
                <Text style={styles.casoDescricao}>R$ 120,00</Text>
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