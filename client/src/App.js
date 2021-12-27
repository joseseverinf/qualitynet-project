import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Container } from 'reactstrap';
import Home from './components/home/home';
import ClientesAdmin from './components/clientes/admin';
import LoginForm from "./components/login/login";
import RegisterForm from "./components/register/form";
import ClienteDashboard from "./components/clientes/dashboard";
import ClienteFooter from "./components/clientes/footer";
import ClienteTop from "./components/clientes/topheader";
import ClienteView from "./components/clientes/view";
import EstufaAdmin from "./components/estufas/admin";
import EstufasView from "./components/estufas/view";
import './App.css';

function App() {
  return (
     <Container fluid className="Fondo">
      <ClienteTop />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />}/>
            <Route path="/register" element={<RegisterForm />}/>
            <Route path="/clientes/*" element={<ClientesAdmin />} />
            <Route path="/clientes/dashboard" element={<ClienteDashboard />} />
            <Route path="/clientes/view" element={<ClienteView />} />
            <Route path="/estufas/*" element={<EstufaAdmin />} />
            <Route path="/estufa/view" element={<EstufasView />} />
          </Routes>
        </BrowserRouter>
      <ClienteFooter />
    </Container>
  );
}

export default App;
