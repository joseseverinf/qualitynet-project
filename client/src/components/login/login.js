import React from 'react';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Logo from '../clientes/images/Logo.png';
import Swal from "sweetalert2";

const initialState = {
    username: '',
    password: ''
}

const LoginForm = (props) => {

    const [inputs, setInputs] = useState(initialState);

    const navigate = useNavigate();

    const formUpdate = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const goIn = (e) => {
        e?.stopPropagation();
        navigate('/clientes/dashboard');
    }
    const goHome = (e) => {
        e?.stopPropagation();
        navigate('/');
    }

    const formSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/login', inputs)
            .then(resp => {
                if (resp.data.ok) {
                    Swal.fire('Login', resp.data.message, 'success');
                    goIn();
                } else {
                    Swal.fire('Login', resp.data.message, 'error');
                    goHome();
                }
            })
            .catch(err => {
                console.log(err);

            })
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
                            <Button color="primary" type="submit">Ingresar</Button>
                        </Col>
                        <Col xs={6} md={3}>
                            <Button type="button" onClick={goHome}>Cancelar</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    </Container>
    )
}

export default LoginForm;