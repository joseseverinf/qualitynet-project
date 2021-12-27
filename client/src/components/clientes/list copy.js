import React from 'react';
import { Container, Row, Col, Table } from "reactstrap";
import { FaRegEye } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Table } from 'antd';
import '../../App.css';

const ClienteList = (props) => {

    const eliminar = (e, id) => {
        e.stopPropagation();
        if(id) {
            props.eliminar(id);
        }
    }
    return (
    <Container fluid className="espaciado2">
        <Row>
            <Col xs={12}>
                <Table>
                    <thead>
                        <tr>
                            <th>Nombre:</th>
                            <th>Apellido:</th>
                            <th>RUT:</th>
                            <th>Email:</th>
                            <th>Teléfono:</th>
                            <th>Tipo de Estufa:</th>
                            <th>Fecha Mantención:</th>
                            <th>Acciones:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.clientes && props.clientes.map((cliente, i) => <tr key={i}>
                            <td>{cliente.firstName}</td>
                            <td>{cliente.lastName}</td>
                            <td>{cliente.rut}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.phone}</td>
                            <td>{cliente.estufa.nombreEstufa} / {cliente.estufa.marcaEstufa}</td>
                            <td>{cliente.mantencion}</td>
                            <td>
                                <Link to={`/clientes/view/${cliente._id}`}><FaRegEye color="blue" style={{ marginRight: '10px'}}/></Link>
                                {/* Editar */}
                                <Link to={`/clientes/update/${cliente._id}`}><AiFillEdit color="green" style={{ marginRight: '10px'}} /></Link>
                                <RiDeleteBin6Fill color="red" onClick={e => eliminar(e, cliente._id)} style={{cursor: 'pointer'}}></RiDeleteBin6Fill>
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
    );
}

export default ClienteList;