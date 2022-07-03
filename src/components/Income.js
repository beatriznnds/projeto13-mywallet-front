import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from  "../contexts/UserContext"
import styled from 'styled-components'

export default function Income () {
    const [income, setIncome] = useState({ value: "", description: "", type: "positive"});
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    function addIncome (event) {
        event.preventDefault();
        const promise = axios.post('https://projetomywallet-13.herokuapp.com/entries', {value: income.value, description: income.description, type: "positive"}, {headers: {Authorization: `Bearer ${user.token}`}});
        promise.then((res) => {
            navigate('/menu')
        })
        promise.catch((err) => {
            alert('Algo deu errado! Tente novamente.')
        })
    }

    return (
        <Container>
            <Header>
                <h2>Nova entrada</h2>
            </Header>
            <Form onSubmit={addIncome}>
                <input
                    type="text"
                    placeholder="Valor"
                    value={income.value}
                    required                    
                    onChange={(e) => setIncome({...income, value: e.target.value})} 
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={income.description}
                    required                    
                    onChange={(e) => setIncome({...income, description: e.target.value})} 
                />
                <Button type="submit">
                    <p>Salvar entrada</p>
                </Button>
            </Form>
        </Container>
    )
}

const Container=styled.div`
   font-family: 'Raleway';
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-top: 60px;
`

const Header=styled.div`
    color: #ffffff;
    font-weight: 700;
    font-size: 26px;
    
`

const Form=styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;

    input {
        width: 325px;
        height: 50px;
        font-size: 16px;
        border-radius: 5px;
        margin-bottom: 5px;
        padding-left: 10px;
        background-color: #ffffff;
    }

    &::placeholder {
        font-family: 'Raleway';
        font-size: 20px;
        color: #000000;
    }
`

const Button=styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 325px;
    height: 45px;
    background-color: #a328d6;
    border-radius: 5px;
    font-size: 20px;
    color: #ffffff;
    margin-top: 25px;
`