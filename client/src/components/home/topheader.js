import React, { useContext } from 'react';
import Logo from './images/Logo.png';
import { Container, Row, Col, Navbar, NavbarBrand, Collapse, NavbarText, Button } from 'reactstrap';
import { FiLogOut } from 'react-icons/fi';
import UserContext from '../context/user-context';


const ClienteTop = (props) => {

    const context = useContext(UserContext);

    const logout = e => {
        context.logout();
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Navbar color="dark" dark expand="md" fixed="top" full light className="estilo-top" >
                            <NavbarBrand><img src={Logo} width="150" alt='logo' /> </NavbarBrand>
                            <Collapse navbar>

                            </Collapse>
                            {context.user &&
                                <NavbarText>
                                    <h4>Bienvenido {context.user.name}.</h4>
                                </NavbarText> }
                            {context.user &&
                                <NavbarText>
                                    <Button color="primary" size="md" style={{ "marginLeft": "30px" }} onClick={logout}>
                                        <FiLogOut color="white"
                                            style={{
                                                marginRight: "10px",
                                                fontSize: "25",
                                                textAlign: "center",
                                            }} />Salir</Button>
                                </NavbarText>
                            }
                        </Navbar>
                    </Col>
                </Row>
            </Container>
            <br /><br /><br />
        </>
    );
}

export default ClienteTop;