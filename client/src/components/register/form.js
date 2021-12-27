import React from 'react';
import { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Logo from '../clientes/images/Logo.png';
import Swal from "sweetalert2";

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const RegisterForm = (props) => {

    const [inputs, setInputs] = useState(initialState);
    const navigate = useNavigate();
    const formUpdate = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }
    const goHome = (e) => {
        e?.stopPropagation();
        navigate('/');
    }
    const formSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/register', inputs)
            .then(resp => {
                if (resp.data.ok) {
                    Swal.fire('Registro de Usuarios', resp.data.message, 'success');
                    goHome();
                } else {
                    Swal.fire('Registro de Usuarios', resp.data.message, 'error');
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
            <h1>Registrarse</h1>
            <Form onSubmit={formSubmit}>
                <Col xs={6}>
                    <FormGroup>
                        <Label>Nombre y Apellido:</Label>
                        <Input type="text" name="name" value={inputs.name} onChange={formUpdate} required maxLength={50} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Email:</Label>
                        <Input type="email" name="email" value={inputs.email} onChange={formUpdate} required />
                    </FormGroup>

                    <FormGroup>
                        <Label>Password:</Label>
                        <Input type="password" name="password" value={inputs.password} onChange={formUpdate} required minLength={6} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Confirmar Password:</Label>
                        <Input type="password" name="confirmPassword" value={inputs.confirmPassword} onChange={formUpdate} required minLength={6} />
                    </FormGroup>
                </Col>
            <Row>
                <Col xs={6} md={3}>
                    <Button color="success" type="submit">Registrarse</Button>
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


export default RegisterForm;