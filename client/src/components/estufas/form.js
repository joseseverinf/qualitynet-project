import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Swal from "sweetalert2";
import axios from 'axios';


const initialState={
    nombreEstufa: '',
    marcaEstufa: '',
    codigoEstufa: '',
    origenPais: '',
    imagenEstufa: '',
}

const EstufaForm = (props) => {

    const navigate = useNavigate();
    const [inputs, setInputs] = useState(initialState);
    const { id } = useParams();

    useEffect(() => {
        if(id) {
            axios.get(`/api/estufas/${id}`)
            .then(resp => setInputs(resp.data.data))
            .catch(error => Swal.fire('Error', 'Error al obtener la estufa, inténtelo mas tarde', 'error'));
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
            <h1>{props.edicion?'Editando la Estufa:' + inputs?.nombreEstufa: props.ver?'Visualizando la Estufa: ' + inputs?.nombreEstufa :'Creando una Estufa Nueva'}</h1>
        </Row>
        <Row>
            <Form onSubmit={save}>
                <Row>
                    <Col md={12}>
                        <FormGroup>
                            <Label>Nombre de la Estufa:</Label>
                            <Input type="text" minLength={3} required name="nombreEstufa" placeholder="Ingresar Nombre" value={inputs.nombreEstufa} onChange={inputsUpdate} disabled={props.ver}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Marca:</Label>
                            <Input type="text" minLength={3} required name="marcaEstufa" placeholder="Ingresar marca" value={inputs.marcaEstufa} onChange={inputsUpdate} disabled={props.ver}/>
                        </FormGroup>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <Label>Codigo Serial:</Label>
                            <Input type="text" min={8} max={12} id="codigoEstufa" name="codigoEstufa" required placeholder="Ingresar el Código Serial" value={inputs.codigoEstufa} onChange={inputsUpdate} disabled={props.ver}/>
                        </FormGroup>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                        <Label>País de Origen:</Label>
                            <Input type="select" name="origenPais" value={inputs.origenPais} onChange={inputsUpdate} disabled={props.ver}>
                                <option value="">Seleccione País de Origen</option>
                                <option value="Italia">Italia</option>
                                <option value="Japón">Japón</option>
                                <option value="Alemania">Alemania</option>
                                <option value="Noruega">Noruega</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                        <Label>Imagen de Referencia:</Label>
                            <Input type="text" name="imagenEstufa" required value={inputs.imagenEstufa} onChange={inputsUpdate} disabled={props.ver}/>
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

export default EstufaForm;