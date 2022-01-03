import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { BsHouseDoor } from "react-icons/bs";
import { Container, Col, Row, Button } from "reactstrap";
import Logo from '../clientes/images/Logo.png';
import axios from 'axios';
import Swal from "sweetalert2";
import { MdFireplace } from 'react-icons/md';
import EstufaList from './list';


const EstufasAdmin = (props) => {
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
            Swal.fire('Error al crear el cliente', error?.message, 'error')
        });
    }

    const update = (data) => {
        axios.put(`/api/estufas/${data._id}`, data)
            .then(resp => {
                setActualizar(!actualizar)
                navigate('./');
            })
            .catch(error => Swal.fire('Error al actualizar el productoº', error?.message, 'error'));
    }

    const eliminar = (id) => {
        if(id) {
            Swal.fire({
                title:'Eliminar el Producto',
                text: '¿Esta seguro que desea eliminar el Producto',
                icon:'question',
                showCancelButton: true,
                confirmButtonText: 'Si, eliminar!!!',
                cancelButtonText: 'No'
            }).then(resp => {
                if(resp.isConfirmed){
                    axios.delete(`/api/clientes/${id}`)
                    .then(resp => {
                        const lista = [...estufas];
                        lista.splice(lista.findIndex(e => e._id === id), 1);
                        setEstufas(lista);
                    }).catch(error => Swal.fire('Error al eliminar el Producto', error?.message, 'error'));
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
            <h2><MdFireplace color="red" style={{ marginRight: '10px', fontSize: '50', textAlign: 'center'}}/>Nuestras Estufas</h2>            </Col>
            <Col xs={3} md={3} lg={3} className="espaciado4 alineacion-right">
                <Link to="/clientes/dashboard/"><BsHouseDoor color="black" size={32}  style={{ marginRight: '10px'}} /></Link>
                {/* <Button color="primary" type="button" onClick={goCreate}>Crear Nuevo Cliente</Button> */}
            </Col>
        </Row>
        <Row>
            <Routes>
                <Route path="/" element={ <EstufaList /> } />
                {/* <Route path="create" element={ <ClienteForm accion={create}/> } />
                <Route path="update/:id" element={ <ClienteForm accion={update} edicion={true}/> } />
                <Route path="view/:id" element={ <ClienteForm ver={true}/> } /> */}
            </Routes>
        </Row>
    </Container>
    </>
}

export default EstufasAdmin;