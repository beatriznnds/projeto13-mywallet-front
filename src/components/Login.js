import axios from 'axios';
import styled from 'styled-components';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from  "../contexts/UserContext";

export default function Login () {
    const navigate = useNavigate();
    const [data, setData] = useState({email: "", password: ""});
    const { user, setUser } = useContext(UserContext);

    function Login (event) {
        event.preventDefault();
        const promise = axios.post('http://localhost:5000/login', {
            email: data.email,
            password: data.password
        });
        promise.then((res) => {
            const { data } = res;
            setUser({ token: data }),
            navigate('/menu')
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
                    placeholder="email"
                    value={data.email}
                    required
                    disabled={disable}
                    onChange={(e) => setData({...data, email: e.target.value})} 
                />
                <input
                    type="password"
                    placeholder="senha"
                    value={data.password}
                    required
                    disabled={disable}
                    onChange={(e) => setData({...data, password: e.target.value})} 
                />
                <Button disabled={disable} type="submit">
                    Entrar
                </Button>
            </Form>
            <Link to='/signup'>
                <p>Primeira vez? Cadastre-se!</p>
            </Link>
        </Container>
    )
}