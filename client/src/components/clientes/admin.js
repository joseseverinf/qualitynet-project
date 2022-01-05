import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { BsHouseDoor } from "react-icons/bs";
import { Container, Col, Row } from "reactstrap";
import { ImUsers } from 'react-icons/im';
import { MdFireplace } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import Logo from '../home/images/Logo.png';
import ClienteList from './list';


const ClientesAdmin = (props) => {

    return <>
    <Container fluid className="recuadro-nc">
        <Row>
            <Col xs={4} sm={4} md={3} lg={3} className="espaciado4 alineacion">
                <Link to={`/`}><img src={Logo} width="150" alt='logo'/></Link>
            </Col>
            <Col xs={4} sm={4} md={6} lg={6} className="espaciado4 alineacion-left">
                <h3><ImUsers color="blue" style={{ marginRight: '10px', fontSize: '50', textAlign: 'center'}}/>Nuestros Clientes</h3>
            </Col>
            <Col xs={4} sm={4} md={3} lg={3} className="espaciado4 alineacion-right">
                <Link to="/"><BsHouseDoor color="black" size={32}  style={{ marginRight: '10px'}} /></Link>
                <Link to="../estufas/"><MdFireplace color="red" size={32}  style={{ marginRight: '10px'}} /></Link>
                <Link to="../ventas/"><RiMoneyDollarCircleLine color="green" size={32}  style={{ marginRight: '10px'}} /></Link>
                <Link to="../mantenciones/"><FiSettings color="gray" size={32}  style={{ marginRight: '10px'}} /></Link>
            </Col>
        </Row>
        <Row>
            <Routes>
                <Route path="/" element={ <ClienteList /> } />
            </Routes>
        </Row>
    </Container>
    </>
}

export default ClientesAdmin;