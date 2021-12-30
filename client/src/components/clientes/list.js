import { createRef, forwardRef, useEffect, useRef, useState } from 'react';

import axios from 'axios';
import Swal from "sweetalert2";

import MaterialTable from 'material-table';
import { Col } from 'reactstrap';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import RefreshIcon from '@mui/icons-material/Refresh';
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddCircleOutlineIcon color={'primary'} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteForeverIcon color={'error'} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <EditIcon color={'success'} ref={ref} />),
    Export: forwardRef((props, ref) => <GetAppIcon {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterAltIcon color="action" ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const ClienteList = () => {
    const nodeRef = useRef(null);
    const tableRef = createRef();

    const [clientes, setClientes] = useState([]);
    const [actualizar, setActualizar] = useState(false);

    useEffect(() => {
        axios.get('/api/clientes')
            .then(resp => {
                console.log(resp.data.data);
                setClientes(resp.data.data)
            })
            .catch(error =>
                Swal.fire('Error', error.message, 'error'));
    }, [actualizar]);


    const [columns, setColumns] = useState([
        { field: "_id", hidden: true },
        { title: 'Nombre', field: 'firstName' },
        { title: 'Apellido', field: 'lastName' },
        { title: 'Rut', field: 'rut' },
        { title: 'Email', field: 'email' },
        { title: 'Teléfono', field: 'phone' },
        { title: 'Convenio', field: 'agreement', type: 'boolean' },
        { title: 'Descuento', field: 'discount', type: 'numeric' },
        { field: 'active', hidden: true },
    ]);

    //const [data, setData] = useState([]);

    return (
        <Col>
            <MaterialTable
                nodeRef={nodeRef}
                tableRef={tableRef}
                title=""
                columns={columns}
                data={clientes}
                icons={tableIcons}
                // actions={[
                //     {
                //         icon: () => <AddCircleOutlineIcon color={'primary'} />,
                //         tooltip: 'Agregar Cliente',
                //         isFreeAction: true,
                //         onClick: (event) => alert("You want to add a new row")
                //     },
                //     {
                //         icon: () => <EditIcon color={'success'} />,
                //         tooltip: 'Editar Cliente',
                //         onClick: (event, rowData) => alert("You saved " + JSON.stringify(rowData))
                //     },
                //     {
                //         icon: () => <DeleteForeverIcon color={'error'} />,
                //         tooltip: 'Eliminar Cliente',
                //         onClick: (event, rowData) => alert("You want to delete " + JSON.stringify(rowData))
                //     }
                // ]}
                localization={{
                    toolbar: {
                        exportCSVName: "Exportar como CSV",
                        exportPDFName: "Exportar como PDF",
                        exportTitle: "Exportar",
                        searchTooltip: "Buscar",
                        searchPlaceholder: "Buscar"
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
                    // actionsColumnIndex: -1,
                    searchFieldAlignment: 'left',
                    exportButton: {
                        csv: true,
                        pdf: true
                    },
                    grouping: true,
                    filtering: true
                }}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            newData.active = true;
                            console.log(newData);
                            axios.post('/api/clientes', newData)
                                .then(resp => {
                                    console.log(resp);
                                    if (resp.data.ok) {
                                        setClientes([
                                            ...clientes,
                                            resp.data.data
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
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            axios.put(`/api/clientes/${newData._id}`, newData)
                                .then(resp => {
                                    console.log(resp);
                                    if (resp.data.ok) {
                                        const dataUpdate = [...clientes];
                                        const index = oldData.tableData.id;
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
                                    console.log(resp);
                                    if (resp.data.ok) {
                                        const dataDelete = [...clientes];
                                        const index = oldData.tableData.id;
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
                // detailPanel={[
                //     {
                //         icon: () => <VisibilityIcon color={'primary'} />,
                //         tooltip: 'Detalle',
                //         render: rowData => {
                //             return (
                //                 <div
                //                     style={{
                //                         fontSize: 15,
                //                         textAlign: 'left',
                //                         color: 'black',
                //                         backgroundColor: 'white',
                //                     }}
                //                 >
                //                     {JSON.stringify(rowData)}
                //                 </div>
                //             )
                //         },
                //     }
                // ]}
                actions={[
                    {
                        icon: () => <RefreshIcon color={'action'} />,
                        tooltip: 'Refrescar Datos',
                        isFreeAction: true,
                        onClick: () => setActualizar(!actualizar),
                    },
                    {
                        icon: () => <VisibilityIcon color={'secondary'} />,
                        tooltip: 'Detalle',
                        onClick: (event, rowData) => Swal.fire(JSON.stringify(rowData))
                    }
                ]}
            />
        </Col>
    )
}

export default ClienteList;