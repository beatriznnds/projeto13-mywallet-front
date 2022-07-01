import axios from 'axios';
import styled from 'styled-components';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from  "../contexts/UserContext";

export default function Login () {
    const navigate = useNavigate();
    const [data, setData] = useState({email: "", password: ""});
    const { setUser } = useContext(UserContext);

    function Login (event) {
        event.preventDefault();
        const promise = axios.post('http://localhost:5000/login', {
            email: data.email,
            password: data.password
        });
        promise.then((res) => {
            const { data } = res;
            setUser({ token: data });
            navigate('/menu');
        });
        promise.catch((err) => {
            alert('Algo deu errado! Tente novamente.')
        })
    }

    return (
        <Container>
            <h1>My Wallet</h1>
            <Form onSubmit={Login}>
                <input
                    type="email"
                    placeholder="E-mail"
                    value={data.email}
                    required                    
                    onChange={(e) => setData({...data, email: e.target.value})} 
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={data.password}
                    required                    
                    onChange={(e) => setData({...data, password: e.target.value})} 
                />
                <Button type="submit">
                    Entrar
                </Button>
            </Form>
            <Link to='/signup'>
                <p>Primeira vez? Cadastre-se!</p>
            </Link>
        </Container>
    )
}


const Container=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 150px;

    h1 {
        font-size: 32px;
        color: #ffffff;
        font-family: 'Saira Stencil One'
    }

    p {
        margin-top: 20px;
        font-family: 'Raleway';
        font-size: 15px;
        color: #ffffff;
    }
`
const Form=styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;

    input {
        width: 325px;
        height: 60px;
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