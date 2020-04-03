import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    SafeAreaView, // View que não ultrapassa a status bar ou os cantos do começo da tela
    StyleSheet, //classe para criar os styles dos elementos
    AsyncStorage // similar ao localstorage
} from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';


export default function List() {
    const [techs, setTechs] = useState([]);


    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs
                .split(',')
                .map(tech => tech.trim());
            setTechs(techsArray)
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            {techs.map(tech => <SpotList key={tech} tech={tech} />)}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: "contain", //faz com que o conteúdo da imagem fique contido no tamanho setado
        alignSelf: "center", // alinhar no centro
        marginTop: 10
    }
})