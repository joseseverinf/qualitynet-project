import React from 'react';
import { Container, Row, Col, Table } from "reactstrap";
import { FaRegEye } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import '../../App.css';

const EstufaList = (props) => {

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
                            <th>Nombre de la Estufa:</th>
                            <th>Marca:</th>
                            <th>Codigo Serial:</th>
                            <th>País de Origen:</th>
                            <th>Imagen de Referencia:</th>
                            <th>Acciones:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.estufas && props.estufas.map((estufa, i) => <tr key={i}>
                            <td>{estufa.nombreEstufa}</td>
                            <td>{estufa.marcaEstufa}</td>
                            <td>{estufa.codigoEstufa}</td>
                            <td>{estufa.origenPais}</td>
                            <td><img src={estufa.imagenEstufa} alt="Imagen de Referencia" width="100" style={{ borderRadius: '10px', border: '1px solid black' }}/></td>
                            <td>
                                <Link to={`/estufas/view/${estufa._id}`}><FaRegEye color="blue" style={{ marginRight: '10px'}}/></Link>
                                {/* Editar */}
                                <Link to={`/estufas/update/${estufa._id}`}><AiFillEdit color="green" style={{ marginRight: '10px'}} /></Link>
                                <RiDeleteBin6Fill color="red" onClick={e => eliminar(e, estufa._id)} style={{cursor: 'pointer'}}></RiDeleteBin6Fill>
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
    );
}

export default EstufaList;