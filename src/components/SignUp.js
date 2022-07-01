import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function SignUp () {
    const [data, setData] = useState({email: "", name: "", password: ""})//, checkPassword: ""})
    const navigate = useNavigate();

    function signUp (event) {
        event.preventDefault();
        const promise = axios.post('http://localhost:5000/signup', {
            email: data.email,
            name: data.name,
            password: data.password
            //checkPassword: data.checkPassword
        });
        promise.then((res) => {
            navigate('/')
        })
        promise.catch((err) => {
            alert('Algo deu errado! Tente novamente.')
        })
    }
    return (
        <Container>
            <h1>MyWallet</h1>
            <Form onSubmit={signUp}>
                <input
                    value={data.name}
                    type="name"
                    name="name"
                    placeholder="Nome"
                    onChange={(e) => setData({...data, name: e.target.value})}
                    required
                />
                <input
                    value={data.email}
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    onChange={(e) => setData({...data, email: e.target.value})}
                    required
                />
                <input
                    value={data.password}
                    type="password"
                    name="password"
                    placeholder="Senha"
                    onChange={(e) => setData({...data, password: e.target.value})}
                    required
                />
                {/* <input
                    value={data.checkPassword}
                    type="password"
                    name="password"
                    placeholder="Confirme a senha"
                    onChange={(e) => setData({...data, checkPassword: e.target.value})}
                    required
                />      */}
                <Button type="submit">
                    Cadastrar
                </Button>           
            </Form>
            <Link to='/'>
                <p>Já tem uma conta? Entre agora!</p>
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