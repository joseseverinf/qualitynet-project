import { forwardRef, useEffect, useState } from 'react';

import axios from 'axios';
import Swal from "sweetalert2";

import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Col } from 'reactstrap';

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

const MantenimientoList = () => {
    const [mantenimientos, setMantenimientos] = useState([]);
    const [actualizar, setActualizar] = useState(false);

    useEffect(() => {
        axios.get('/api/mantenciones')
            .then(resp => {
                setMantenimientos(resp.data.data)
            })
            .catch(error =>
                Swal.fire('Error', error.message, 'error'));
    }, [actualizar]);


    const [columns, setColumns] = useState([
        { title: 'Id', field: "_id", hidden: true, filtering: false },
        {
            title: 'Cliente',
            field: 'client',
            editComponent: props => (
                <TextField id='client' label="Cliente" variant="outlined" value={props.value} onChange={e => props.onChange(e.target.value)} />
            )
        },
        { 
            title: 'Producto', 
            field: 'product',
            editComponent: props => (
                <TextField id='product' label="Producto" variant="outlined" value={props.value} onChange={e => props.onChange(e.target.value)} />
            )
        },
        { title: 'Estado', field: 'maintenanceStatus', lookup: { 'Agendado': 'Agendado', 'Realizado': 'Realizado', 'Cancelado': 'Cancelado' } },
        { 
            title: 'Técnico', 
            field: 'technical',
            editComponent: props => (
                <TextField id='technical' label="Técnico" variant="outlined" value={props.value} onChange={e => props.onChange(e.target.value)} />
            )
        },
        {
            title: 'Fecha',
            field: 'scheduledDate',
            type: 'datetime'
        },
        { 
            title: 'Observaciones', 
            field: 'observations',
            editComponent: props => (
                <TextField id='observations' label="Observaciones" variant="outlined" value={props.value} onChange={e => props.onChange(e.target.value)} />
            )
        },
        { title: 'Activo', field: 'active', hidden: true, filtering: false },
    ]);

    return (
        <Col>
            <MaterialTable
                title=""
                columns={columns}
                data={mantenimientos}
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
                            deleteText: "Está seguro que desea eliminar el Mantenimiento",
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
                            exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Mantenimientos')
                        },
                        {
                            label: 'Exportar como CSV',
                            exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Mantenimientos')
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
                                axios.post('/api/mantenciones', newData)
                                    .then(resp => {
                                        console.log(resp);
                                        if (resp.data.ok) {
                                            setMantenimientos([
                                                resp.data.data,
                                                ...mantenimientos,
                                            ]);
                                        } else {
                                            Swal.fire('Error al crear el Mantenimiento', resp.data.message, 'error');
                                        }
                                        resolve();
                                    }).catch(error => {
                                        console.log(error);
                                        Swal.fire('Error al crear el Mantenimiento', error?.message, 'error');
                                        resolve();
                                    });
                            } else {
                                resolve();
                            }
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            axios.put(`/api/mantenciones/${newData._id}`, newData)
                                .then(resp => {
                                    if (resp.data.ok) {
                                        const dataUpdate = [...mantenimientos];
                                        const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
                                        const index = dataUpdate.indexOf(target);
                                        dataUpdate[index] = newData;
                                        setMantenimientos([...dataUpdate]);
                                    } else {
                                        Swal.fire('Error al actualizar el Mantenimiento', resp.data.message, 'error');
                                    }
                                    resolve();
                                }).catch(error => {
                                    console.log(error);
                                    Swal.fire('Error al actualizar el Mantenimiento', error?.message, 'error');
                                    resolve();
                                });
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            oldData.active = false;
                            axios.put(`/api/mantenciones/${oldData._id}`, oldData)
                                .then(resp => {
                                    if (resp.data.ok) {
                                        const dataDelete = [...mantenimientos];
                                        const target = dataDelete.find((el) => el.id === oldData.tableData.id);
                                        const index = dataDelete.indexOf(target);
                                        dataDelete.splice(index, 1);
                                        setMantenimientos([...dataDelete]);
                                    } else {
                                        Swal.fire('Error al eliminar el Mantenimiento', resp.data.message, 'error');
                                    }
                                    resolve();
                                }).catch(error => {
                                    console.log(error);
                                    Swal.fire('Error al eliminar el Mantenimiento', error?.message, 'error');
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
                        onClick: (event, rowData) => Swal.fire(JSON.stringify(rowData))
                    }
                ]}
            />
        </Col>
    )
}

export default MantenimientoList;