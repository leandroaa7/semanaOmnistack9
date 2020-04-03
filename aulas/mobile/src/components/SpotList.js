import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity, //botão
    StyleSheet,
    FlatList // componente para lista, para deslizar 
} from 'react-native';

import api from '../services/api';

export default function SpotList({ tech }) {

    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { tech }
            })
            setSpots(response.data)
        }
        loadSpots()
    }, [])

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
                        <TouchableOpacity onPress={() => { }} style={styles.button} >
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
        resizeMode: 'cover',
        borderRadius: 2,
    },

})
