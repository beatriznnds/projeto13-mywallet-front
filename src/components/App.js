import "../assets/reset.css";
import "../assets/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from '../contexts/UserContext.js'
import Login from './Login';
import SignUp from './SignUp';
import MainMenu from './MainMenu';
import NewRegister from './NewRegister';

export default function App () {   
    const [user, setUser] = useState(null)

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ user, setUser }}>
                <Routes>
                    <Route path='/' element={ <Login/> } />
                    <Route path='/signup' element={ <SignUp/> } />
                    <Route path='/menu' element={ <MainMenu/> } />
                    <Route path='/newregister' element={ <NewRegister/> } />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}