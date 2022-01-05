import React from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import Logo from '../home/images/Logo.png';

const Main = (props) => {

    const navigate = useNavigate()

    const goToRegister = (e) => {
        navigate('/register');
    }
    const goToLogin = (e) => {
        navigate('/login');
    }

    return (
        <Container fluid className="recuadro-reg-log">
            <Row>
                <Col xs={12} sm={6} md={6} lg={6} className="espaciado2 alineacion">
                    <img src={Logo} width="300" alt='logo'/>
                    <h2>¡Bienvenido!</h2>
                    <p>Si eres usuario nuevo, haz click en Registrarse</p>
                    <p>Si ya posees una cuenta creada, haz click en Login</p>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="espaciado3 alineacion">
                    <Button color="success" size="lg" onClick={goToRegister} style={{ marginRight: '10px', marginTop: '100px'}}>Registrarse</Button>
                    <Button color="primary" size="lg" onClick={goToLogin} style={{ marginTop: '100px'}}>Login</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Main;
