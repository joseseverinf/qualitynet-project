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

const tableIcons = {
    Add: forwardRef((props, ref) => <AddCircleOutlineIcon color={'primary'} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteForeverIcon color={'error'} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <EditIcon color={'success'} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterAltIcon color="action" ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    RefreshData: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const clientInitialState = {
    firstName: '',
    lastName: '',
    rut: '',
    email: '',
    phone: '',
    agreement: false,
    discount: 0,
    status: true
}


const ClienteList = ({ clientes, setClientes }) => {
    const nodeRef = useRef(null);
    const tableRef = createRef();

    useEffect(() => {
        console.log(clientes);
    }, []);


    const [columns, setColumns] = useState([
        { field: "id", hidden: true },
        { title: 'Nombre', field: 'firstName' },
        { title: 'Apellido', field: 'lastName' },
        { title: 'Rut', field: 'rut' },
        { title: 'Email', field: 'email' },
        { title: 'Teléfono', field: 'phone' },
        { title: 'Convenio', field: 'agreement' },
        { title: 'Descuento', field: 'discount' },
        { field: 'status', hidden: true },
    ]);

    const [data, setData] = useState([
        {
            id: 1,
            firstName: 'Mehmet',
            lastName: 'Baran',
            rut: '261688719',
            email: 'carlos880425@gmail.com',
            phone : '934466718',
            agreement: false,
            discount: 0,
            status: true
        }
    ]);

    return (
        <Col>
            <MaterialTable
                nodeRef={nodeRef}
                tableRef={tableRef}
                title=""
                columns={columns}
                //data={data}
                data={query =>
                    new Promise((resolve, reject) => {
                        axios.get('/api/clientes')
                            .then(resp => {
                                console.log(resp);
                                //setClientes(resp.data.data)
                                resolve({
                                    data: resp.data.data,
                                    page: resp.data.page - 1,
                                    totalCount: resp.data.data.length,
                                })
                            })
                            .catch(error => {
                                Swal.fire('Error', error.message, 'error');
                                resolve();
                            });
                    //   let url = 'https://reqres.in/api/users?'
                    //   url += 'per_page=' + query.pageSize
                    //   url += '&page=' + (query.page + 1)
                    //   fetch(url)
                    //     .then(response => response.json())
                    //     .then(result => {
                    //       resolve({
                    //         data: result.data,
                    //         page: result.page - 1,
                    //         totalCount: result.total,
                    //       })
                    //     })
                    })
                  }
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
                        }
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
                    actionsColumnIndex: -1,
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
                            newData.status = true;
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
                                    //setData([...data, newData]);
                                    resolve();
                                }).catch(error => {
                                    console.log(error);
                                    Swal.fire('Error al crear el cliente', error?.message, 'error');
                                    resolve();
                                });
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);
                                resolve();
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);
                                resolve()
                            }, 1000)
                        }),
                }}
                detailPanel={(rowData) => {
                    console.log(rowData);
                    return (
                        <div
                            style={{
                                fontSize: 20,
                                textAlign: 'left',
                                color: 'white',
                                backgroundColor: '#43A047',
                            }}
                        >
                            {JSON.stringify(rowData)}
                        </div>
                    )
                }}
                actions={[
                    {
                      icon: 'refresh',
                      tooltip: 'Refresh Data',
                      isFreeAction: true,
                      onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                    }
                  ]}
            />
        </Col>
    )
}

export default ClienteList;