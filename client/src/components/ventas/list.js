import { forwardRef, useEffect, useMemo, useState } from 'react';

import axios from 'axios';
import Swal from "sweetalert2";

import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Container, Row, Col } from "reactstrap";

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
import { Autocomplete, TextField } from '@mui/material';

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

let clookup = {};
let elookup = {};

const slookup = {
    Efectivo: "Efectivo",
    Crédito: "Crédito",
    Débito: "Débito",
    Transferencia: "Transferencia",
};

let vlookup = {};

const formaspago = ["Efectivo", "Crédito", "Débito", "Transferencia"];

const VentasList = (props) => {
    const [ventas, setVentas] = useState([]);

    const [actualizar, setActualizar] = useState(false);
    const [clientes, setClientes] = useState({});
    const [estufas, setEstufas] = useState({});
    const [reloadcolum, setReloadcolum] = useState(false);

    useEffect(() => {
        axios.get('/api/clientes')
            .then(resp => {
                setClientes(resp.data.data);
                let _lookup = {};
                resp.data.data.forEach(element => {
                    _lookup[element._id.toString()] = `${element.firstName} ${element.lastName}`;
                });
                clookup = _lookup;

                axios.get('/api/estufas')
                    .then(resp => {
                        setEstufas(resp.data.data);
                        _lookup = {};
                        resp.data.data.forEach(element => {
                            _lookup[element._id.toString()] = `${element.stoveBrand} ${element.stoveModel}`;
                        });
                        elookup = _lookup;
                        axios.get('/api/usuarios')
                            .then(resp => {
                                _lookup = {};
                                resp.data.data.forEach(element => {
                                    _lookup[element._id.toString()] = element.name;
                                });
                                vlookup = _lookup;
                                setReloadcolum(!reloadcolum);
                            })
                            .catch(error =>
                                Swal.fire('Error', error.message, 'error'));
                    })
                    .catch(error =>
                        Swal.fire('Error', error.message, 'error'));
                //setReloadcolum(!reloadcolum);
            })
            .catch(error =>
                Swal.fire('Error', error.message, 'error'));
    }, [actualizar]);

    useEffect(() => {
        axios.get('/api/ventas')
            .then(resp => {
                setVentas(resp.data.data);
                //setReloadcolum(!reloadcolum);
            })
            .catch(error => {
                Swal.fire('Error', error.message, 'error');
            })
    }, [actualizar]);

    const getName = (info) => {
        if (info.value) {
            const cliente = clientes.find(
                (el) => el.id === info.value
            );
            return `${cliente.firstName} ${cliente.lastName}`;
        }
        return "";
    }

    const getProduct = (info) => {
        if (info.value) {
            const estufa = estufas.find(
                (el) => el.id === info.value
            );
            return `${estufa.stoveBrand} ${estufa.stoveModel}`;
        }
        return "";
    }


    const getSalePrice = (data) => {
        let precio = 0;
        let discountByClient = 0;
        let discountBySale = 0;

        if (data.product && data.quantitie) {
            const _estufas = [...estufas];
            const _estufa = _estufas.find(
                (el) => el.id === data.product
            );
            const globalPrice = (parseInt(_estufa.stoveUnitPrice) * parseInt(data.quantitie));
            precio = globalPrice;

            if (data.client) {
                const _clientes = [...clientes];
                const _cliente = _clientes.find(
                    (el) => el.id === data.client
                );
                discountByClient = Math.round(globalPrice * parseInt(_cliente.discount) / 100);
            }

            if (data.discount && data.discount > 0) {
                discountBySale = Math.round(globalPrice * parseInt(data.discount) / 100);
            }
        }

        return precio - discountByClient - discountBySale;
    }

    const columns = useMemo(() => ([
        { title: 'Id', field: "_id", hidden: true, filtering: false },
        {
            title: 'Cliente',
            field: 'client',
            lookup: clookup,
            editComponent: props => (
                <Autocomplete
                    id="client"
                    options={clientes}
                    getOptionLabel={option => `${option.firstName} ${option.lastName}`}
                    renderInput={params => {
                        return (
                            <TextField
                                {...params}
                                variant="outlined"
                                label={getName(props)}
                                fullWidth
                            />
                        );
                    }}
                    onChange={(e, newValue) => {
                        if (newValue) {
                            props.onChange(newValue._id);
                            let _rowData = {...props.rowData};
                            _rowData['client'] = newValue._id;
                            _rowData["salePrice"] = getSalePrice(_rowData);
                            props.onRowDataChange(_rowData);
                        }
                    }}
                />
            )
        },
        {
            title: 'Producto',
            field: 'product',
            lookup: elookup,
            editComponent: props => (
                <Autocomplete
                    id="product"
                    options={estufas}
                    getOptionLabel={option => `${option.stoveBrand} ${option.stoveModel}`}
                    renderInput={params => {
                        return (
                            <TextField
                                {...params}
                                variant="outlined"
                                label={getProduct(props)}
                                fullWidth
                            />
                        );
                    }}
                    onChange={(e, newValue) => {
                        if (newValue) {
                            props.onChange(newValue._id);
                            let _rowData = {...props.rowData};
                            _rowData['product'] = newValue._id;
                            _rowData["salePrice"] = getSalePrice(_rowData);
                            props.onRowDataChange(_rowData);
                        }
                    }}
                />
            )
        },
        {
            title: 'Cantidad',
            field: 'quantitie',
            type: 'numeric',
            editComponent: props => (
                <TextField id='quantitie' type="number" label="Cantidad" variant="outlined" value={props.value} onChange={e => {
                    props.onChange(e.target.value);
                    let _rowData = {...props.rowData};
                    _rowData['quantitie'] = e.target.value;
                    _rowData["salePrice"] = getSalePrice(_rowData);
                    props.onRowDataChange(_rowData);
                }} />
            )
        },
        {
            title: 'Descuento %',
            field: 'discount',
            type: 'numeric',
            editComponent: props => (
                <TextField id='discount' type="number" label="Descuento" variant="outlined" value={props.value} onChange={e => {
                    props.onChange(e.target.value);
                    let _rowData = {...props.rowData};
                    _rowData['discount'] = e.target.value;
                    _rowData["salePrice"] = getSalePrice(_rowData);
                    props.onRowDataChange(_rowData);
                }} />
            )
        },
        {
            title: 'Precio de Venta',
            field: 'salePrice',
            type: "currency",
            editable: 'never',
            currencySetting: {
                locale: "es",
                currencyCode: "CLP",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            },
            editComponent: props => (
                <TextField id='salePrice' type="number" label="Precio de Venta" variant="outlined" value={props.value} onChange={e => props.onChange(e.target.value)} />
            )
        },
        // {
        //     title: 'Fecha',
        //     field: 'saleDate',
        //     type: 'datetime'
        // },
        // {
        //     title: 'Vendedor',
        //     field: 'seller',
        //     editComponent: props => (
        //         <TextField id='seller' label="Vendedor" variant="outlined" value={props.value} onChange={e => props.onChange(e.target.value)} />
        //     )
        // },
        {
            title: 'Método de Pago',
            field: 'paymentMethod',
            lookup: slookup,
            editComponent: (props) => (
                <Autocomplete
                    id="paymentMethod"
                    options={formaspago}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...params}
                                variant="outlined"
                                label={props.value}
                                fullWidth
                            />
                        );
                    }}
                    onChange={(e, newValue) => {
                        if (newValue) {
                            props.onChange(newValue);
                        }
                    }}
                />
            ),
        },
        {
            title: 'Observaciones',
            field: 'observations',
            editComponent: props => (
                <TextField id='observations' label="Observaciones" variant="outlined" value={props.value} onChange={e => props.onChange(e.target.value)} />
            )
        },
        {
            title: 'Fecha de Venta',
            field: 'createdAt',
            editable: 'never',
            type: 'date'
        },
        {
            title: 'Vendedor',
            field: 'userId',
            editable: 'never',
            hidden: true,
            lookup: vlookup
        },
        { title: 'Activo', field: 'active', hidden: true, filtering: false },
    ]), [reloadcolum]);


    return (
        <>
            <Container fluid className="espaciado">
                <Row>
                    <Col>
                        <MaterialTable
                            title=""
                            columns={columns}
                            data={ventas}
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
                                            if (!newData.discount) {
                                                newData.discount = 0;
                                            }
                                            if (!newData.quantitie) {
                                                newData.quantitie = 1;
                                            }
                                            const _clientes = [...clientes];
                                            const _estufas = [...estufas];
                                            const _estufa = _estufas.find(
                                                (el) => el.id === newData.product
                                            );
                                            const _cliente = _clientes.find(
                                                (el) => el.id === newData.client
                                            );

                                            if (parseInt(newData.quantitie) <= parseInt(_estufa.stoveAmount)) {
                                                var globalPrice = (parseInt(_estufa.stoveUnitPrice) * parseInt(newData.quantitie));
                                                var discountByClient = Math.round(globalPrice * parseInt(_cliente.discount) / 100);
                                                var discountBySale = Math.round(globalPrice * parseInt(newData.discount) / 100);
                                                newData.salePrice = globalPrice - discountByClient - discountBySale;

                                                axios.post('/api/ventas', newData)
                                                    .then(resp => {
                                                        if (resp.data.ok) {
                                                            setVentas([
                                                                resp.data.data,
                                                                ...ventas,
                                                            ]);
                                                        } else {
                                                            Swal.fire('Error al crear la Venta', resp.data.message, 'error');
                                                        }
                                                        resolve();
                                                    }).catch(error => {
                                                        console.log(error);
                                                        Swal.fire('Error al crear la Venta', error?.message, 'error');
                                                        resolve();
                                                    });
                                            } else {
                                                Swal.fire('Error al crear la Venta', 'La cantidad de Estufas a vender supera el Stock disponible', 'error');
                                                resolve();
                                            }
                                        } else {
                                            resolve();
                                        }
                                    }),
                                // onRowUpdate: (newData, oldData) =>
                                //     new Promise((resolve, reject) => {
                                //         axios.put(`/api/ventas/${newData._id}`, newData)
                                //             .then(resp => {
                                //                 if (resp.data.ok) {
                                //                     const dataUpdate = [...ventas];
                                //                     const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
                                //                     const index = dataUpdate.indexOf(target);
                                //                     dataUpdate[index] = newData;
                                //                     setVentas([...dataUpdate]);
                                //                 } else {
                                //                     Swal.fire('Error al actualizar la Venta', resp.data.message, 'error');
                                //                 }
                                //                 resolve();
                                //             }).catch(error => {
                                //                 console.log(error);
                                //                 Swal.fire('Error al actualizar la Venta', error?.message, 'error');
                                //                 resolve();
                                //             });
                                //     }),
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        oldData.active = false;
                                        axios.put(`/api/ventas/${oldData._id}`, oldData)
                                            .then(resp => {
                                                if (resp.data.ok) {
                                                    const dataDelete = [...ventas];
                                                    const target = dataDelete.find((el) => el.id === oldData.tableData.id);
                                                    const index = dataDelete.indexOf(target);
                                                    dataDelete.splice(index, 1);
                                                    setVentas([...dataDelete]);
                                                } else {
                                                    Swal.fire('Error al eliminar la Venta', resp.data.message, 'error');
                                                }
                                                resolve();
                                            }).catch(error => {
                                                console.log(error);
                                                Swal.fire('Error al eliminar la Venta', error?.message, 'error');
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
                                    onClick: (event, rowData) => {
                                        const _clientes = [...clientes];
                                        const _estufas = [...estufas];

                                        const _estufa = _estufas.find(
                                            (el) => el.id === rowData.product
                                        );

                                        const _cliente = _clientes.find(
                                            (el) => el.id === rowData.client
                                        );
                                        const _rowData = { ...rowData };
                                        _rowData["client"] = `${_cliente.firstName} ${_cliente.lastName}`;
                                        _rowData["product"] = `${_estufa.stoveBrand} ${_estufa.stoveModel}`;

                                        Swal.fire(
                                            {
                                                html: `
              <row>
                  <h3>Estás visualizando el registro de venta:</h3>
                  <hr>
                  <col>
                          <p><b>Cliente:</b> ${_rowData.client}</p>
                          <p><b>Producto:</b> ${_rowData.product}</p>
                          <p><b>Descuento:</b> ${_rowData.discount}</p>
                          <p><b>Cantidad:</b> ${_rowData.quantitie}</p>
                          <p><b>Precio de Venta:</b> ${_rowData.salePrice}</p>
                          <p><b>Método de Pago:</b>${_rowData.paymentMethod}</p>          
                          <p><b>Observaciones:</b> ${_rowData.observations}</p>
                  </col>
              </row>
              `,
                                                focusConfirm: false,
                                                focusCancel: false,
                                                customClass: {
                                                    container: "swal-wide",
                                                    popup: "swal-wide",
                                                    header: "swal-wide",
                                                    closeButton: "swal-wide",
                                                    icon: "swal-wide",
                                                    image: "swal-wide",
                                                    content: "swal-wide",
                                                    actions: "swal-wide",
                                                    confirmButton: "swal-wide",
                                                    cancelButton: "swal-wide",
                                                    footer: "swal-wide",
                                                },
                                                showClass: {
                                                    popup: "animated fadeIn faster",
                                                    actions: "animated fadeIn faster",
                                                    confirmButton: "animated zoomIn faster",
                                                    cancelButton: "animated zoomIn faster",
                                                },
                                            },
                                            JSON.stringify(rowData)
                                        )
                                    },
                                },
                            ]}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default VentasList;