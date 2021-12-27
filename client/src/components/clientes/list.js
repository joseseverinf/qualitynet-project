import React from 'react';
import { Table } from 'antd';
import { FaRegEye } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from 'axios';
import '../../App.css';

const ClienteList = ({clientes, eliminar: eliminarClientes}) => {

    const eliminar = (e, id) => {
        e.stopPropagation();
        if(id) {
            eliminarClientes(id);
            Swal.fire({
                title:'Eliminar el Cliente Definitivamente',
                text: '¿Esta seguro que desea eliminar el Cliente',
                icon:'question',
                showCancelButton: true,
                confirmButtonText: 'Si, eliminar!!!',
                cancelButtonText: 'No'
            }).then(result => {
                if(result.value) {
                    axios.drop(`/api/clientes/${id}`)
                    .then(resp => {
                    Swal.fire('Cliente Eliminado', 'El Cliente ha sido eliminado', 'success')
                    })
                    .catch(error => Swal.fire('Error al eliminar el Cliente', error?.message, 'error'));
                }
            })
        }
    }

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'firstName',
            key: 'firstName',
            firstName: '',
            sorter: (a, b) => a.firstName.localeCompare(b.firstName),
            sortDirections: ['descend', 'ascend'],
            ellipsis: true,
            width: '15%',
        },
        {
            title: 'Apellido',
            dataIndex: 'lastName',
            key: 'lastName',
            lastName: '',
            sorter: (a, b) => a.lastName.localeCompare(b.lastName),
            sortDirections: ['descend', 'ascend'],
            ellipsis: true,
            width: '20%',
        },
        {
        key: 'rut',
        rut: '',
        title: 'RUT',
        dataIndex: 'rut',
        sorter: (a, b) => a.rut.localeCompare(b.rut),
        width: '17%',
        },
        {
        key: 'email',
        email: '',
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email),
        width: '15%',
        },
        {
        key: 'phone',
        phone: '',
        title: 'Teléfono',
        dataIndex: 'phone',
        sorter: (a, b) => a.phone.localeCompare(b.phone),
        width: '15%',
        },
        {
        key: 'estufas',
        estufa: '',
        title: 'Estufas',
        dataIndex: 'estufa',
        sorter: (a, b) => a.estufa.localeCompare(b.estufa),
        width: '20%',
        },
        {
        title: 'Acciones',
        dataIndex: 'actions',
        render: (text, record) => (
            <span>
                <Link to={`/clientes/view/${record.id}`}><FaRegEye color="blue" style={{ marginRight: '10px'}}/></Link>
                <Link to={`/clientes/update/${record.id}`}><AiFillEdit color="green" style={{ marginRight: '10px'}} /></Link>
                <RiDeleteBin6Fill color="red" onClick={e => eliminar(e, record.id)} style={{cursor: 'pointer'}}></RiDeleteBin6Fill>
            </span>
            ),
        },
    ];

    const data = clientes?.map(cliente => ({
        key: cliente._id,
        id: cliente._id,
        firstName: cliente.firstName,
        lastName: cliente.lastName,
        email: cliente.email,
        rut: cliente.rut,
        phone: cliente.phone,
        estufa: cliente.estufa.nombreEstufa + ' / ' +  cliente.estufa.marcaEstufa,
        mantenciones: cliente.mantencion,
    }));

    const config = { 
        pagination : {
            defaultPageSize: 10,
            pageSizeOptions : ['10', '20', '30'], 
            showSizeChanger : true,
            showQuickJumper : false,
            showTotal : total => `En total son ${total} registros`
        }
    }

    return (
        <>
            <Table columns={columns} dataSource={data} {...config}/>
        </>
    )
}
export default ClienteList;

    {/*return (
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
}*/}

