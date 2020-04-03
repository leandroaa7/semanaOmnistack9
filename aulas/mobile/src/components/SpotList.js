import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity, //botão
    StyleSheet,
    FlatList // componente para lista, para deslizar 
} from 'react-native';

import {
    withNavigation // permite o componente SpotList ter a função navigation
} from 'react-navigation'

import api from '../services/api';


function SpotList({ tech, navigation }) {

    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { tech }
            })
            setSpots(response.data)
        }
        loadSpots()
    }, []);

    /* quando o usuário clicar no botão 
        Spotlist não é uma página, logo não tem a propriedade navigation

    */
    function handleNavigate(id) {
        navigation.navigate('Book', { id });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}> {tech} </Text> </Text>

            <FlatList
                style={styles.list}
                data={spots} /* array com as informações */
                keyExtractor={spot => spot._id} /* key identificador, similar ao que foi feito com o .map em List.js */
                horizontal
                showsHorizontalScrollIndicator={false} /* oculta a barra de rolagem */
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>
                            {item.price ? `R$${item.price}/dia` : `Gratuito`}
                        </Text>
                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button} >
                            <Text style={styles.buttonText}>Solicitar Reserva</Text>
                        </TouchableOpacity>
                    </ View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },

    bold: {
        fontWeight: 'bold'
    },

    list: {
        paddingHorizontal: 20,
    },

    listItem: {
        marginRight: 15
    },

    thumbnail: {
        width: 200,
        height: 120,
        /* cobrir a área toda */
        resizeMode: 'cover',
        borderRadius: 2,
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },
    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },
    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15
    }
});

export default withNavigation(SpotList)