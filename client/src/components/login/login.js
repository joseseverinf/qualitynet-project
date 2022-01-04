import { useContext, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Logo from '../clientes/images/Logo.png';
import UserContext from '../context/user-context'

const initialState = {
    username: '',
    password: ''
}

const LoginForm = (props) => {

    const [inputs, setInputs] = useState(initialState);
    const context = useContext(UserContext);


    const formUpdate = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }


    const formSubmit = (e) => {
        e.preventDefault();
        context.login(inputs);
        setInputs(initialState);
    }

    return (
    <Container className="espaciado2 recuadro">
        <Row>
            <Col xs={6} md={6} lg={6} className="espaciado3 alineacion">
                <img src={Logo} width="350" alt='logo'/>
            </Col>
            <Col xs={6} md={6} lg={6} className="espaciado3">
                <h1>Ingresar</h1>
                <Form onSubmit={formSubmit}>
                    <Row>
                        <Col xs={6}>
                            <FormGroup>
                                <Label>Username:</Label>
                                <Input type="text" name="username" value={inputs.username} onChange={formUpdate} required maxLength={50} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password:</Label>
                                <Input type="password" name="password" value={inputs.password} onChange={formUpdate} required minLength={6} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={3}>
                            <Button color="primary" type="submit">Login</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    </Container>
    )
}

export default LoginForm;