import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { BsHouseDoor } from "react-icons/bs";
import { Container, Col, Row } from "reactstrap";
import { FiSettings } from 'react-icons/fi';
import Logo from '../clientes/images/Logo.png';
import MantenimientoList from './list';


const MantenimientosAdmin = (props) => {

    return <>
    <Container className="recuadro-nc">
        <Row>
            <Col xs={3} md={3} lg={3} className="espaciado4 alineacion">
                <img src={Logo} width="200" alt='logo'/>
            </Col>
            <Col xs={6} md={6} lg={6} className="espaciado4 alineacion-left">
            <h2><FiSettings color="grey" style={{ marginRight: '10px', fontSize: '50', textAlign: 'center'}}/>Nuestros Mantenimientos</h2>
            </Col>
            <Col xs={3} md={3} lg={3} className="espaciado4 alineacion-right">
                <Link to="/clientes/dashboard/"><BsHouseDoor color="black" size={32}  style={{ marginRight: '10px'}} /></Link>
            </Col>
        </Row>
        <Row>
            <Routes>
                <Route path="/" element={ <MantenimientoList /> } />
            </Routes>
        </Row>
    </Container>
    </>
}

export default MantenimientosAdmin;