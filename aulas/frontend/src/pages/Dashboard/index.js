import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom'

import socketio from 'socket.io-client';
import api from '../../services/api'

import './styles.css';

export default function DashBoard() {

    const [spots, setSpots] = useState([]);
    const [request, setRequest] = useState([]);

    const user_id = localStorage.getItem('user');
    //so muda o socket quando o user_id mudar
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id },
    }), [user_id])



    useEffect(() => {

        socket.on('booking_request', data => {
            setRequest([...request, data])
        })
    }, [request, socket])

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

            <ul className="notifications">
                {request.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em  <strong>{request.spot.company}</strong> para a data:
                            <strong> {request.date}</strong>
                        </p>
                        <button className="accept">Aceitar</button>
                        <button className="reject">Rejeitar</button>
                    </li>
                ))}
            </ul>
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