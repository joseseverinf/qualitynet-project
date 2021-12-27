import React from 'react';
import { Container, Row, Col, Navbar, NavbarToggler, Collapse, NavbarText } from 'reactstrap';


const ClienteFooter = (props) => {

    return (
        <>
         <Container>
            <Row>
                <Col>
                    <Navbar color="danger" dark expand="md" fixed="bottom" full light className="estilo-footer" >
                        <NavbarToggler onClick={function noRefCheck(){}} />
                        <Collapse navbar>
                        <NavbarText>
                        <p>CONTACTO@QUALITYPELLETS.CL · +56 9 6509 8393 Quality Pellets Chile, es representante de 2D Electrónica en la V Región</p>
                        </NavbarText>
                        </Collapse>
                    </Navbar>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default ClienteFooter;