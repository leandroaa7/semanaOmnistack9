import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import api from '../../services/api'

import './styles.css';

export default function DashBoard() {

    const [spots, setSpots] = useState([]);

    /**Carrega as informações quando a página é carregada
     * useEffect é uma função que recebe dois parâmetros
     * parâmetro 1 - Uma função 
     * parâmetro 2 - Array de dependências, dependências que quando forem alteradas irão executar a função do parâmetro 1
     * um exemplo seria um filtro como dependência, [] significa que irá executar apenas uma vez
      */
    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('dashboard', { headers: { user_id } })
            setSpots(response.data)
        }

        loadSpots();
    }, [])

    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : `Gratuito`}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    )
}