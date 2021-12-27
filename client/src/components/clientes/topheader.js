import React from 'react';
import Logo from './images/Logo.png';
import { Container, Row, Col, Navbar, NavbarBrand, NavbarToggler, Collapse, NavbarText } from 'reactstrap';


const ClienteTop = (props) => {

    return (
        <>
        <Container>
            <Row>
                <Col>
                    <Navbar color="dark" dark expand="md" fixed="top" full light className="estilo-top" >
                        <NavbarBrand><img src={Logo} width="100" alt='logo'/> </NavbarBrand>
                        <NavbarToggler onClick={function noRefCheck(){}} />
                        <Collapse navbar>
                        <NavbarText>
                            <h2>Bienvenidos a QualityNET</h2>
                        </NavbarText>
                        </Collapse>
                    </Navbar>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default ClienteTop;