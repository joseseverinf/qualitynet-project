
import Logo from './images/Logo.png';
import { Button, Container, Row, Col, Navbar, NavbarBrand, NavbarToggler, Collapse, NavbarText } from 'reactstrap';
import UserContext from '../context/user-context';
import { useContext }from 'react';

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
                        <NavbarBrand><img src={Logo} width="100" alt='logo'/> </NavbarBrand>
                        <NavbarToggler onClick={function noRefCheck(){}} />
                        <Collapse navbar>
                        <NavbarText>
                        <Col xs={9}>
                            <h2>Welcome a QulityNET</h2>
                        </Col>
                        <Col className="alineación" xs={3}>
                            <Button onClick={logout} hidden>LogOut</Button>
                        </Col>
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