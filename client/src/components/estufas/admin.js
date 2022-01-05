import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { BsHouseDoor } from "react-icons/bs";
import { Container, Col, Row } from "reactstrap";
import Logo from '../clientes/images/Logo.png';
import { MdFireplace } from 'react-icons/md';
import EstufaList from './list';


const EstufasAdmin = (props) => {

    return <>
    <Container className="recuadro-nc">
        <Row>
            <Col xs={3} md={3} lg={3} className="espaciado4 alineacion">
                <img src={Logo} width="200" alt='logo'/>
            </Col>
            <Col xs={6} md={6} lg={6} className="espaciado4 alineacion-left">
            <h2><MdFireplace color="red" style={{ marginRight: '10px', fontSize: '50', textAlign: 'center'}}/>Nuestras Estufas</h2>            </Col>
            <Col xs={3} md={3} lg={3} className="espaciado4 alineacion-right">
                <Link to="/"><BsHouseDoor color="black" size={32}  style={{ marginRight: '10px'}} /></Link>
            </Col>
        </Row>
        <Row>
            <Routes>
                <Route path="/" element={ <EstufaList /> } />
            </Routes>
        </Row>
    </Container>
    </>
}

export default EstufasAdmin;