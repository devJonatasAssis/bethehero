import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
    headerText: {
        fontSize: 15,
        color: "#737380"
    },
    headerTextBold: {
        fontWeight: "bold"
    },

    casos: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
        marginTop: 32,
    },
    casoTitulo: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
        marginTop: 24,
    },
    casoDescricao: {
        marginTop: 8,
        fontSize: 15,
        color: '#737380'
    },

    contatoBox: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16
    },
    tituloHeroi: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#13131a',
        lineHeight: 30  
    },
    descHeroi: {
        fontSize: 15,
        color: '#737380',
        marginTop: 16
    },
    acoesContato: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    },
    acao: {
        backgroundColor: '#E02041',
        borderRadius: 8,
        height: 50,
        width: '48%',
        justifyContent: "center",
        alignItems: "center"
    },
    acaoTexto: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    }
})

export default styles;