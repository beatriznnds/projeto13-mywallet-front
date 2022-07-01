import axios from 'axios'
import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from  "../contexts/UserContext"
import styled from 'styled-components'

export default function MainMenu () {
    let balance = 0;
    const { user } = useContext(UserContext);
    const [entries, setEntries] = useState();
    const navigate = useNavigate();
    
	useEffect(() => {
		const promise = axios.get('http://localhost:5000/signup', {headers: {Authorization: `Bearer ${user.token}`}});
	    promise.then((res) => {
			setEntries(res.data);
		});
        promise.catch((err) => {
            alert('Algo deu errado! Tente novamente.')
        })
	}, []);
    
    for (const entry of entries) {
        if (entry.type === "positive") {
            balance += parseFloat(entry.value)
        } else {
            balance -= parseFloat(entry.value)
        }
    }
    balance = balance.toFixed(2)

    return (
        <Container>
            <Header>
                <h2>Oi, {user.name}</h2>
                <ion-icon name="exit-outline"></ion-icon>
            </Header>
            <List>
            {
                entries ? (
                entries.map((entry, index) => <Entry key={index} value={entry.value} description={entry.description} type={entry.type} date={entry.date}/> ))
                :
                <p>Não há registros de entrada ou saída</p>
            }
            </List>
            <Balance>
                <h2> SALDO </h2>
                <h3 color={balance}> { balance } </h3>
            </Balance>
            <Income onClick={() => navigate('/income')}>
                <ion-icon name="add-circle-outline"></ion-icon>
                <p>Nova Entrada</p>
            </Income>
            <Outcome onClick={() => navigate('/outcome')}>
                <ion-icon name="add-circle-outline"></ion-icon>
                <p>Nova Entrada</p>
            </Outcome>
        </Container>
    )
}