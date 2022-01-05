import React from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import Logo from '../clientes/images/Logo.png';

const Main = (props) => {

    const navigate = useNavigate()

    const goToRegister = (e) => {
        navigate('/register');
    }
    const goToLogin = (e) => {
        navigate('/login');
    }

    return (
        <Container className="recuadro">
            <Row>
                <Col xs={6} className="espaciado3 alineacion">
                    <img src={Logo} width="350" alt='logo'/>
                    <h1>¡Bienvenido!</h1>
                    <p>Pincha el botón registrarse si eres usuario nuevo,</p>
                    <p>Pincha el botón Login si ya te has registrado anteriormente.</p>
                </Col>
                <Col xs={6} md={6} lg={6} className="espaciado3">
                    <Button color="success" size="lg" onClick={goToRegister} style={{ marginRight: '10px', marginTop: '100px'}}>Registrarse</Button>
                    <Button color="primary" size="lg" onClick={goToLogin} style={{ marginTop: '100px'}}>Login</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Main;
