import React from 'react';
import Logo from './images/Logo.png';
import { Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ImUsers } from 'react-icons/im';
import { MdFireplace } from 'react-icons/md';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ClienteDashboard = (props) => {

    const navigate = useNavigate()

    return (
        <>
        <Container fluid className="espaciado3 recuadro">
            <Row className="espaciado3">
                <Col xs={12} className="alineacion">
                    <img src={Logo} width="200" alt='logo'/> 
                    <h1>Panel de Control de Quality Pellets NET</h1>
                    <p>A continuación, selecciona uno de los módulos para visualizar lo que necesites trabajar</p>
                </Col>
                <Col className="alineación" xs={3}>
                <Link to={`/clientes/`}><ImUsers color="blue" style={{ marginRight: '10px', fontSize: '100', textAlign: 'center'}}/></Link>
                    <p>Nuestros Clientes</p>
                </Col>
                <Col className="alineación" xs={3}>
                <Link to={`/estufas/`}><MdFireplace color="red" style={{ marginRight: '10px', fontSize: '100', textAlign: 'center'}}/></Link>
                    <p>Estufas y Calderas</p>
                </Col>
                <Col className="alineación" xs={3}>
                <Link to={`/ventas/`}><RiMoneyDollarCircleLine color="green" style={{ marginRight: '10px', fontSize: '100', textAlign: 'center'}}/></Link>
                    <p>Ventas de Pellets y Estufas</p>
                </Col>
                <Col className="alineación" xs={3}>
                <Link to={`/mantenciones/`}><FiSettings color="grey" style={{ marginRight: '10px', fontSize: '100', textAlign: 'center'}}/></Link>
                    <p>Instalación y Mantenciones</p>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default ClienteDashboard;