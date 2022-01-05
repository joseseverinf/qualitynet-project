
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
                        <Col>
                            <h2>Welcome a QulityNET</h2>
                        </Col>
                        </NavbarText>
                        <Col className="alineacion-right">
                            <Button color="danger" size= "lg" onClick={logout}>LogOut</Button>
                        </Col>
                        
                        </Collapse>
                        
                    </Navbar>
                    
                </Col>
                
            </Row>
        </Container>
        </>
    );
}

export default ClienteTop;