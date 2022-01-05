import React from "react";
import Logo from "./images/Logo.png";
import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { ImUsers } from "react-icons/im";
import { MdFireplace } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import UserContext from '../context/user-context';
import { useContext }from 'react';

const ClienteDashboard = (props) => {
  const navigate = useNavigate();
  const context = useContext(UserContext);

  const logout = e => {
      context.logout();
  }

  return (
    <>
      <Container fluid className="espaciado recuadro-reg-log">
      <Row>
          <Col className="cs-logout">
         
              <Button color="primary" size= "md" onClick={logout}> 
                <FiLogOut color="white"
                      style={{
                        marginRight: "10px",
                        fontSize: "25",
                        textAlign: "center",
                      }}/>Cerrar Sesión</Button>
            </Col>
       </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} className="alineacion">
            <img src={Logo} width="200" alt="logo" />
            <h3>Panel de Control de Quality Pellets NET</h3>
            <p>
              A continuación, selecciona uno de los módulos para visualizar lo
              que necesites trabajar
            </p>
          </Col>
        </Row>
        <Row className="espaciado3">
          <Col className="alineación textos-dash" xs={6} sm={6} md={6} lg={3}>
            <Link to={`../clientes/`}>
              <ImUsers
                color="blue"
                style={{
                  marginRight: "10px",
                  fontSize: "100",
                  textAlign: "center",
                }}
              />
            <p>Nuestros Clientes</p>
            </Link>
          </Col>
          <Col className="alineación textos-dash" xs={6} sm={6} md={6} lg={3}>
            <Link to={`../estufas/`}>
              <MdFireplace
                color="red"
                style={{
                  marginRight: "10px",
                  fontSize: "100",
                  textAlign: "center",
                }}
              />
            <p>Estufas y Calderas</p>
            </Link>
          </Col>
          <Col className="alineación textos-dash" xs={6} sm={6} md={6} lg={3}>
            <Link to={`../ventas/`}>
              <RiMoneyDollarCircleLine
                color="green"
                style={{
                  marginRight: "10px",
                  fontSize: "100",
                  textAlign: "center",
                }}
              />
            <p>Ventas de Pellets y Estufas</p>
            </Link>
          </Col>
          <Col className="alineación textos-dash" xs={6} sm={6} md={6} lg={3}>
            <Link to={`../mantenciones/`}>
              <FiSettings
                color="grey"
                style={{
                  marginRight: "10px",
                  fontSize: "100",
                  textAlign: "center",
                }}
              />
            <p>Instalación y Mantenciones</p>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ClienteDashboard;
