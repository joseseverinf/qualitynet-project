import { forwardRef, useEffect, useState } from 'react';

import axios from 'axios';
import Swal from "sweetalert2";

import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Container, Row, Col } from 'reactstrap';

import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckIcon from '@mui/icons-material/Check';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SearchIcon from '@mui/icons-material/Search';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';
import { TextField } from '@mui/material';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBoxIcon {...props} ref={ref} sx={{ fontSize: 30 }} />),
    Check: forwardRef((props, ref) => <CheckIcon {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutlineIcon {...props} ref={ref} color="error" />),
    DetailPanel: forwardRef((props, ref) => <ChevronRightIcon {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <EditIcon {...props} ref={ref} color="primary" />),
    Export: forwardRef((props, ref) => <SaveAltIcon {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterListIcon {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPageIcon {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPageIcon {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRightIcon {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeftIcon {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <SearchIcon {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpwardIcon {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <RemoveIcon {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumnIcon {...props} ref={ref} />),
};

const ClienteList = () => {
    const [clientes, setClientes] = useState([]);
    const [actualizar, setActualizar] = useState(false);

    const validEmail = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    useEffect(() => {
        axios.get('/api/clientes')
            .then(resp => {
                setClientes(resp.data.data)
            })
            .catch(error =>
                Swal.fire('Error', error.message, 'error'));
    }, [actualizar]);

    const [columns, setColumns] = useState([
        { title: 'Id', field: "_id", hidden: true, filtering: false },
        {
            title: 'Nombre',
            field: 'firstName',
            editComponent: props => (
                <TextField
                    id='firstName'
                    label="Nombre"
                    variant="outlined"
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                    helperText={props.helperText}
                    error={props.error}
                />
            ),
            validate: rowData => rowData.firstName && (rowData.firstName.length < 3 || rowData.firstName.length > 50) ? { isValid: false, helperText: 'El Nombre debe tener más de 3 y menos de 50 caracteres.' } : true
        },
        {
            title: 'Apellido',
            field: 'lastName',
            editComponent: props => (
                <TextField
                    id='lastName'
                    label="Apellido"
                    variant="outlined"
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                    helperText={props.helperText}
                    error={props.error}
                />
            ),
            validate: rowData => rowData.lastName && (rowData.lastName.length < 3 || rowData.lastName.length > 50) ? { isValid: false, helperText: 'El Apellido debe tener más de 3 y menos de 50 caracteres.' } : true
        },
        {
            title: 'Rut',
            field: 'rut',
            editComponent: props => (
                <TextField
                    id='rut'
                    label="Rut"
                    variant="outlined"
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                    helperText={props.helperText}
                    error={props.error}
                />
            ),
            validate: rowData => rowData.rut && (rowData.rut.length < 8 || rowData.rut.length > 12) ? { isValid: false, helperText: 'El Rut debe tener más de 8 y menos de 12 caracteres.' } : true
        },
        {
            title: 'Email',
            field: 'email',
            editComponent: props => (
                <TextField
                    id='email'
                    label="Email"
                    variant="outlined"
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                    helperText={props.helperText}
                    error={props.error}
                />
            ),
            filtering: false, validate: rowData => rowData.email && !validEmail.test(rowData.email) ? { isValid: false, helperText: 'Ingrese un Email válido.' } : true
        },
        {
            title: 'Teléfono',
            field: 'phone',
            filtering: false,
            editComponent: props => (
                <TextField
                    id='phone'
                    label="Teléfono"
                    variant="outlined"
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                    helperText={props.helperText}
                    error={props.error}
                />
            ),
            validate: rowData => rowData.phone && (rowData.phone.length < 8 || rowData.phone.length > 11) ? { isValid: false, helperText: 'El Teléfono debe tener más de 8 y menos de 12 caracteres.' } : true
        },
        { title: 'Convenio', field: 'agreement', type: 'boolean' },
        {
            title: 'Descuento %',
            field: 'discount',
            type: 'numeric',
            editComponent: props => (
                <TextField type="number" id='discount' label="Descuento" variant="outlined" value={props.value} onChange={e => props.onChange(e.target.value)} />
            ),
            filtering: false
        },
        { title: 'Activo', field: 'active', hidden: true, filtering: false },
    ]);

    return (
        <>
            <Container fluid className="espaciado">
                <Row>
                    <Col>
                        <MaterialTable
                            title=""
                            columns={columns}
                            data={clientes}
                            icons={tableIcons}
                            localization={{
                                toolbar: {
                                    exportTitle: "Exportar",
                                    searchTooltip: "Buscar",
                                    searchPlaceholder: "Buscar",
                                    showColumnsTitle: "Mostrar Columnas"
                                },
                                header: {
                                    actions: "Acciones"
                                },
                                body: {
                                    addTooltip: "Crear",
                                    editTooltip: "Editar",
                                    deleteTooltip: "Eliminar",
                                    editRow: {
                                        deleteText: "Está seguro que desea eliminar el cliente",
                                        cancelTooltip: "Cancelar",
                                        saveTooltip: "Aceptar"
                                    },
                                    emptyDataSourceMessage: "No hay registros que mostrar"
                                },
                                pagination: {
                                    labelRowsSelect: "filas",
                                    labelDisplayedRows: "{from}-{to} de {count}",
                                    labelRowsPerPage: "Filas por página:",
                                    firstAriaLabel: "Primera página",
                                    firstTooltip: "Primera página",
                                    previousAriaLabel: "Página anterior",
                                    previousTooltip: "Página anterior",
                                    nextAriaLabel: "Siguiente página",
                                    nextTooltip: "Siguiente página",
                                    lastAriaLabel: "Última página",
                                    lastTooltip: "Última página"
                                },
                                grouping: {
                                    placeholder: "Arrastra los encabezados aquí para agruparlos",
                                    groupedBy: "Agrupados por: "
                                }
                            }}
                            options={{
                                addRowPosition: 'first',
                                searchFieldAlignment: 'left',
                                exportMenu: [
                                    {
                                        label: 'Exportar como PDF',
                                        exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Clientes')
                                    },
                                    {
                                        label: 'Exportar como CSV',
                                        exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Clientes')
                                    }
                                ],
                                grouping: true,
                                filtering: true,
                                columnsButton: true
                            }}
                            editable={{
                                onRowAdd: newData =>
                                    new Promise((resolve, reject) => {
                                        if (newData && Object.keys(newData).length !== 0) {
                                            newData.active = true;
                                            if (!newData.agreement) {
                                                newData.agreement = false;
                                                newData.discount = 0;
                                            }
                                            if (!newData.discount) {
                                                newData.discount = 0;
                                            }
                                            axios.post('/api/clientes', newData)
                                                .then(resp => {
                                                    console.log(resp);
                                                    if (resp.data.ok) {
                                                        setClientes([
                                                            resp.data.data,
                                                            ...clientes,
                                                        ]);
                                                    } else {
                                                        Swal.fire('Error al crear el cliente', resp.data.message, 'error');
                                                    }
                                                    resolve();
                                                }).catch(error => {
                                                    console.log(error);
                                                    Swal.fire('Error al crear el cliente', error?.message, 'error');
                                                    resolve();
                                                });
                                        } else {
                                            resolve();
                                        }
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        axios.put(`/api/clientes/${newData._id}`, newData)
                                            .then(resp => {
                                                if (resp.data.ok) {
                                                    const dataUpdate = [...clientes];
                                                    const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
                                                    const index = dataUpdate.indexOf(target);
                                                    dataUpdate[index] = newData;
                                                    setClientes([...dataUpdate]);
                                                } else {
                                                    Swal.fire('Error al actualizar el cliente', resp.data.message, 'error');
                                                }
                                                resolve();
                                            }).catch(error => {
                                                console.log(error);
                                                Swal.fire('Error al actualizar el cliente', error?.message, 'error');
                                                resolve();
                                            });
                                    }),
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        oldData.active = false;
                                        axios.put(`/api/clientes/${oldData._id}`, oldData)
                                            .then(resp => {
                                                if (resp.data.ok) {
                                                    const dataDelete = [...clientes];
                                                    const target = dataDelete.find((el) => el.id === oldData.tableData.id);
                                                    const index = dataDelete.indexOf(target);
                                                    dataDelete.splice(index, 1);
                                                    setClientes([...dataDelete]);
                                                } else {
                                                    Swal.fire('Error al eliminar el cliente', resp.data.message, 'error');
                                                }
                                                resolve();
                                            }).catch(error => {
                                                console.log(error);
                                                Swal.fire('Error al eliminar el cliente', error?.message, 'error');
                                                resolve();
                                            });
                                    }),
                            }}
                            actions={[
                                {
                                    icon: () => <RefreshIcon color={'action'} sx={{ fontSize: 30 }} />,
                                    tooltip: 'Refrescar Datos',
                                    isFreeAction: true,
                                    onClick: () => setActualizar(!actualizar),
                                },
                                {
                                    icon: () => <VisibilityIcon color={'secondary'} />,
                                    tooltip: 'Detalle',
                                    onClick: (event, rowData) => Swal.fire({
                                        html: `
                                    <row>
                                        <h3>Estás visualizando al cliente:</h3>
                                        <hr>
                                        <col>
                                                <p><b>Nombre:</b> ${rowData.firstName} ${rowData.lastName}</p>
                                                <p><b>Rut:</b> ${rowData.rut}</p>
                                                <p><b>Teléfono:</b> ${rowData.phone}</p>
                                                <p><b>Email:</b> ${rowData.email}</p>
                                                <p><b>Convenio:</b> ${rowData.agreement}</p>
                                                <p><b>Descuento:</b> ${rowData.discount}</p>
                                        </col>
                                    </row>
                                    `,
                                        focusConfirm: false,
                                        focusCancel: false,
                                        customClass: {
                                            container: 'swal-wide',
                                            popup: 'swal-wide',
                                            header: 'swal-wide',
                                            closeButton: 'swal-wide',
                                            icon: 'swal-wide',
                                            image: 'swal-wide',
                                            content: 'swal-wide',
                                            actions: 'swal-wide',
                                            confirmButton: 'swal-wide',
                                            cancelButton: 'swal-wide',
                                            footer: 'swal-wide',
                                        },
                                        showClass: {
                                            popup: 'animated fadeIn faster',
                                            actions: 'animated fadeIn faster',
                                            confirmButton: 'animated zoomIn faster',
                                            cancelButton: 'animated zoomIn faster',
                                        },
                                    }, JSON.stringify(rowData))
                                }
                            ]}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ClienteList;