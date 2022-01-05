import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { BsHouseDoor } from "react-icons/bs";
import { Container, Col, Row } from "reactstrap";
import { MdFireplace } from 'react-icons/md';
import { ImUsers } from "react-icons/im";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import Logo from '../home/images/Logo.png';
import MantenimientoList from './list';


const MantenimientosAdmin = (props) => {

    return <>
    <Container fluid className="recuadro-nc">
        <Row>
            <Col xs={4} sm={4} md={3} lg={3} className="espaciado4 alineacion">
                <img src={Logo} width="150" alt='logo'/>
            </Col>
            <Col xs={4} sm={4} md={6} lg={6} className="espaciado4 alineacion-left">
            <h3><FiSettings color="grey" style={{ marginRight: '10px', fontSize: '50', textAlign: 'center'}}/>Instalación y Mantenciones</h3>
            </Col>
            <Col xs={4} sm={4} md={3} lg={3} className="espaciado4 alineacion-right">
                <Link to="/"><BsHouseDoor color="black" size={32}  style={{ marginRight: '10px'}} /></Link>
                <Link to="../clientes/"><ImUsers color="blue" size={32}  style={{ marginRight: '10px'}} /></Link>
                <Link to="../estufas/"><MdFireplace color="red" size={32}  style={{ marginRight: '10px'}} /></Link>
                <Link to="../ventas/"><RiMoneyDollarCircleLine color="green" size={32}  style={{ marginRight: '10px'}} /></Link>
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