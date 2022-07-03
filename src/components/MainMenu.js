import axios from 'axios'
import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from  "../contexts/UserContext"
import styled from 'styled-components'
import Entry from './Entry'

export default function MainMenu () {
    let balance = 0;
    const { user } = useContext(UserContext);
    const [entries, setEntries] = useState([]);
    const navigate = useNavigate();

	useEffect(() => {
		const promise = axios.get('https://projetomywallet-13.herokuapp.com/entries', {headers: {Authorization: `Bearer ${user.token}`}});
        promise.then((res) => {
			setEntries(res.data);
		});
        promise.catch((err) => {
            alert('Algo deu errado! Tente novamente.')
        })
	}, []);
    
    for (const entry of entries) {
        if (entry.type === "positive") {
            balance += parseFloat(entry.value);
        } else {
            balance -= parseFloat(entry.value);
        }
    }
    balance = balance.toFixed(2);

    return (
        <Container>
            <Header>
                <h2>Oi, {user.name}</h2>
                <IonIcon><ion-icon name="exit-outline"></ion-icon></IonIcon>
            </Header>
            <BankStatement>
                <div>
                {
                    entries.length > 0 ? (
                    entries.map((entry, index) => <Entry key={index} value={entry.value} description={entry.description} type={entry.type} date={entry.date}/> ))
                    :
                    <BankStatementNull>Não há registros de entrada ou saída</BankStatementNull>
                }
                </div>
                <Balance color={balance}>
                    <h2> SALDO </h2>
                    <h3> { balance } </h3>
                </Balance>
            </BankStatement>
            <Registers>
                <div onClick={() => navigate('/income')}>
                    <IonIcon><ion-icon name="add-circle-outline"></ion-icon></IonIcon>
                    <p>Nova Entrada</p>
                </div>
                <div onClick={() => navigate('/outcome')}>
                <IonIcon><ion-icon name="remove-circle-outline"></ion-icon></IonIcon>
                    <p>Nova Saída</p>
                </div>
            </Registers>

        </Container>
    )
}

const Container=styled.div`
    margin-top: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-left: 20px;
    h2 {
        font-size: 24px;
        color: #126BA5;
        text-transform: capitalize;
        margin-bottom: 10px;
    }
`

const Header=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 330px;

    h2 {
        font-family: 'Raleway';
        color: #ffffff;
        font-size: 26px;
        font-weight: 700;
    }

`

const IonIcon=styled.p`
    font-size: 35px;
    color: #ffffff;
    padding-bottom: 5px;
`

const BankStatement=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 325px;
    height: 445px;
    margin-top: 40px;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: scroll;
    padding-bottom: 20px;
`
const BankStatementNull=styled.p`
    font-family: 'Raleway';
    width: 180px;
    height: 45px;
    color: #868686;
    font-size: 20px;
    margin-top: 200px;
    margin-left: 75px;
    line-height: 25px;
    text-align: center;
`

const Balance=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;

    h2 {
        font-family: 'Raleway';
        font-size: 17px;
        color: #000000;
        font-weight: 700;
    }

    h3 {
        font-size: 17px;
        font-family: 'Raleway';
        margin-bottom: 2px;
        color: ${props => props.color > 0 ? "#03AC00" : "#C70000"};
    }
`

const Registers=styled.div`
    display: flex;
    justify-content: space-between;
    width: 325px;
    margin-top: 15px;

    div {
        display: flex;
        padding: 10px;
        flex-direction: column;
        justify-content: space-between;
        font-family: 'Raleway';
        color: #ffffff;
        font-size: 17px;
        font-weight: 700;
        width: 155px;
        height: 115px;
        background-color: #a328d6;
        border-radius: 5px;
    }
`