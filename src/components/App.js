import "../assets/reset.css";
import "../assets/style.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import UserContext from '../contexts/UserContext'
import Login from './Login';
import SignUp from './SignUp';
import MainMenu from './MainMenu';
import Income from './Income';
import Outcome from './Outcome';

export default function App () {   
    const [user, setUser] = useState(null)

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ user, setUser }}>
                <Routes>
                    <Route path='/' element={ <Login/> } />
                    <Route path='/signup' element={ <SignUp/> } />
                    <Route path='/menu' element={ <MainMenu/> } />
                    <Route path='/income' element={ <Income/> } />
                    <Route path='/outcome' element={ <Outcome/> } />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}