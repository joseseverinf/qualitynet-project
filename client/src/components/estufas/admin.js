import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { BsHouseDoor } from "react-icons/bs";
import { Container, Col, Row, Button } from "reactstrap";
import { MdFireplace } from 'react-icons/md';
import Logo from '../estufas/images/Logo.png';
import axios from 'axios';
import Swal from "sweetalert2";
import EstufaForm from "./form";
import EstufaList from './list';


const EstufaAdmin = (props) => {
    const [estufas, setEstufas] = useState([]);
    const [actualizar, setActualizar] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/estufas')
        .then(resp => setEstufas(resp.data.data))
        .catch(error =>
            Swal.fire('Error', error.message, 'error'));
    }, [actualizar]);


    const create = (data) => {
        axios.post('/api/estufas', data)
        .then(resp => {
            // Se agrega elemento creado al listado directamente evitando realizar una llamada al backend para recargar el listado
            setEstufas([
                ...estufas,
                resp.data.data
            ]);
            navigate('./')
        }).catch(error => {
            console.log(error); // Revisar el mensaje de error
            Swal.fire('Error al crear la estufa', error?.message, 'error')
        });
    }

    const update = (data) => {
        axios.put(`/api/estufas/${data._id}`, data)
            .then(resp => {
                setActualizar(!actualizar)
                navigate('./');
            })
            .catch(error => Swal.fire('Error al actualizar la estufa', error?.message, 'error'));
    }

    const eliminar = (id) => {
        if(id) {
            Swal.fire({
                title:'Eliminar la estufa',
                text: '¿Esta seguro que desea eliminar la estufae',
                icon:'question',
                showCancelButton: true,
                confirmButtonText: 'Si, eliminar!!!',
                cancelButtonText: 'No'
            }).then(resp => {
                if(resp.isConfirmed){
                    axios.delete(`/api/estufas/${id}`)
                    .then(resp => {
                        const lista = [...estufas];
                        lista.splice(lista.findIndex(e => e._id === id), 1);
                        setEstufas(lista);
                    }).catch(error => Swal.fire('Error al eliminar la Estufa', error?.message, 'error'));
                }
            })
        }
    }

    const goCreate = (e) => {
        e?.stopPropagation();
        navigate('/estufas/create');
    }

    return <>
    <Container className="recuadro-nc">
        <Row>
            <Col xs={3} md={3} lg={3} className="espaciado4 alineacion">
                <img src={Logo} width="200" alt='logo'/>
            </Col>
            <Col xs={6} md={6} lg={6} className="espaciado4 alineacion-left">
            <h2><MdFireplace color="red" style={{ marginRight: '10px', fontSize: '50', textAlign: 'center'}}/>Nuestras Estufas</h2>
            
            </Col>
            <Col xs={3} md={3} lg={3} className="espaciado4 alineacion-right">
                <Link to="/clientes/dashboard/"><BsHouseDoor color="black" size={32}  style={{ marginRight: '10px'}} /></Link>
                
                <Button color="primary" type="button" onClick={goCreate}>Crear Nueva Estufa</Button>
            </Col>
        </Row>
        <Row>
            <Routes>
                <Route path="/" element={ <EstufaList estufas={estufas} eliminar={eliminar}/> } />
                <Route path="create" element={ <EstufaForm accion={create}/> } />
                <Route path="update/:id" element={ <EstufaForm accion={update} edicion={true}/> } />
                <Route path="view/:id" element={ <EstufaForm ver={true}/> } />
            </Routes>
        </Row>
    </Container>
    </>
}

export default EstufaAdmin;