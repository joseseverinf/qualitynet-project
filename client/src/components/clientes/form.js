import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Swal from "sweetalert2";
import axios from 'axios';

const initialState={
    firstName: '',
    lastName: '',
    rut: '',
    email: '',
    phone: '',
    estufa: '',
    mantencion: '',
}

const ClienteForm = (props) => {

    const navigate = useNavigate();
    const [inputs, setInputs] = useState(initialState);
    const [estufas, setEstufas] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/estufas/`)
        .then(resp => setEstufas(resp.data.data))
        .catch(error =>
            Swal.fire('Error', error.message, 'error'));

        if(id) {
            axios.get(`/api/clientes/${id}`)
            .then(resp => setInputs(resp.data.data))
            .catch(error => Swal.fire('Error', 'Error al obtener el cliente, inténtelo mas tarde', 'error'));
        }
    }, [id]);

    const inputsUpdate = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const volver = e => {
        e.stopPropagation();
        navigate('../')
    }

    const save = e => {
        e.preventDefault();
        const data = {...inputs};
        data._id = id;
        props.accion(data);
    }

    

    return <>
    <Container>
        <Row>
            <h1>{props.edicion?'Editando el Cliente:' + inputs?.firstName: props.ver?'Visualizando el Cliente: ' + inputs?.firstName + inputs?.lastName :'Creando un Cliente Nuevo'}</h1>
        </Row>
        <Row>
            <Form onSubmit={save}>
                <Row>
                    <Col md={12}>
                        <FormGroup>
                            <Label>Nombre:</Label>
                            <Input type="text" minLength={3} required name="firstName" placeholder="Ingresar Nombre" value={inputs.firstName} onChange={inputsUpdate} disabled={props.ver}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Apellido:</Label>
                            <Input type="text" minLength={3} required name="lastName" placeholder="Ingresar Apellido" value={inputs.lastName} onChange={inputsUpdate} disabled={props.ver}/>
                        </FormGroup>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <Label>Rut:</Label>
                            <Input type="text" min={8} max={12} id="rut" name="rut" required placeholder="Ingresar el RUT" value={inputs.rut} onChange={inputsUpdate} disabled={props.ver}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Email:</Label>
                            <Input type="email" name="email" value={inputs.email} onChange={inputsUpdate} placeholder="Ingresar email" disabled={props.ver}/>
                        </FormGroup>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <Label>Teléfono:</Label>
                            <Input type="text" name="phone" value={inputs.phone} placeholder="Ejemplo: +56 9 9876 5432" onChange={inputsUpdate} disabled={props.ver}/>
                        </FormGroup>
                        <FormGroup>
                        <Label>Estufa:</Label>
                            <Input type="select" name="estufa" value={inputs.estufa} onChange={inputsUpdate} disabled={props.ver}>
                                <option value="">Seleccione Estufa o Caldera</option>
                                {estufas?.map(estufa => <option key={estufa._id} value={estufa._id}>{estufa.nombreEstufa} / {estufa.marcaEstufa}</option>)}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                        <Label>Fecha de Mantencion:</Label>
                            <Input type="date" name="mantencion" required value={inputs.mantencion} onChange={inputsUpdate} disabled={props.ver}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {props.accion && <Button color="success" type="submit">Guardar</Button>}
                        <Button type="button" color="primary" onClick={volver} style={{marginLeft:'20px'}}>Volver</Button>
                    </Col>
                </Row>
            </Form>
        </Row>
    </Container>
    </>
}

export default ClienteForm;