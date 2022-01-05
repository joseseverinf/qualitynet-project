import React from 'react';
import { Container, Row, Col } from 'reactstrap';


const ClienteFooter = (props) => {

    return (
        <>
         <Container>
            <Row>
                <Col className="footer">
                    <p><a href="https://www.qualitypellets.cl">Sitio Web Quality Pellets</a> · +56 9 6509 8393 Quality Pellets Chile, es representante de 2D Electrónica en la V Región</p>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default ClienteFooter;