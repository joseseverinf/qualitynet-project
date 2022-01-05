import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import UserContext from "../context/user-context";
import axios from "axios";
import Swal from "sweetalert2";
import Main from "../login/main";
import ClienteDashboard from "../clientes/dashboard";
import ClientesAdmin from '../clientes/admin';
import LoginForm from "../login/login";
import RegisterForm from "../login/register";
import ClienteFooter from "../clientes/footer";
import ClienteTop from "../clientes/topheader";
import EstufaAdmin from "../estufas/admin";
import VentasAdmin from "../ventas/admin";
import MantenimientoAdmin from "../mantenimientos/admin";


const Home = (props) => {
    const SESSION_USER = 'SESSION_USER';

    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const login = (inputs) => {
        axios.post('/api/login', inputs)
            .then(resp => {
                if (resp.data.ok) {
                    setUser(resp.data.data);
                    sessionStorage.setItem(SESSION_USER, JSON.stringify(resp.data.data));
                    navigate('/');
                } else {
                    Swal.fire('Login', resp.data.message, 'error');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const logout = () => {
        setUser(null);
        sessionStorage.clear();
        navigate('/auth');
    }    

    useEffect(() => {
        if (sessionStorage.getItem(SESSION_USER)) {
            setUser(JSON.parse(sessionStorage.getItem(SESSION_USER)));
            navigate('/');
        } else {
            navigate('/auth');
        }

    }, []);
    return (
        
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            <ClienteTop />
            <Routes>
            <Route path="/auth" element={<Main />} />
            <Route path="/*" element={<ClienteDashboard />} />
            <Route path="/login" element={<LoginForm />}/>
            <Route path="/register" element={<RegisterForm />}/>
            <Route path="/clientes/*" element={<ClientesAdmin />} />
            <Route path="/estufas/*" element={<EstufaAdmin />} />
            <Route path="/ventas/*" element={<VentasAdmin />} />
            <Route path="/mantenciones/*" element={<MantenimientoAdmin />} />
            </Routes>
            <ClienteFooter/>
        </UserContext.Provider>
    );
}

export default Home;
