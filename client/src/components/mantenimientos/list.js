import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";

import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Container, Row, Col } from "reactstrap";

import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckIcon from "@mui/icons-material/Check";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import SearchIcon from "@mui/icons-material/Search";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Autocomplete, TextField } from "@mui/material";

const tableIcons = {
  Add: forwardRef((props, ref) => (
    <AddBoxIcon {...props} ref={ref} sx={{ fontSize: 30 }} />
  )),
  Check: forwardRef((props, ref) => <CheckIcon {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <DeleteOutlineIcon {...props} ref={ref} color="error" />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRightIcon {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <EditIcon {...props} ref={ref} color="primary" />
  )),
  Export: forwardRef((props, ref) => <SaveAltIcon {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterListIcon {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPageIcon {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPageIcon {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => (
    <ChevronRightIcon {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeftIcon {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <SearchIcon {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => (
    <ArrowUpwardIcon {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props, ref) => (
    <RemoveIcon {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props, ref) => (
    <ViewColumnIcon {...props} ref={ref} />
  )),
};

let clookup = {};
let elookup = {};
const slookup = {
  Agendado: "Agendado",
  Realizado: "Realizado",
  Cancelado: "Cancelado",
};
const status = ["Agendado", "Realizado", "Cancelado"];

const MantenimientoList = (props) => {
  const [mantenimientos, setMantenimientos] = useState([]);

  const [actualizar, setActualizar] = useState(false);
  const [clientes, setClientes] = useState({});
  const [estufas, setEstufas] = useState({});
  const [reloadcolum, setReloadcolum] = useState(false);

  useEffect(() => {
    axios
      .get("/api/clientes")
      .then((resp) => {
        setClientes(resp.data.data);
        let _lookup = {};
        resp.data.data.forEach((element) => {
          _lookup[
            element._id.toString()
          ] = `${element.firstName} ${element.lastName}`;
        });
        clookup = _lookup;

        axios
          .get("/api/estufas")
          .then((resp) => {
            setEstufas(resp.data.data);
            _lookup = {};
            resp.data.data.forEach((element) => {
              _lookup[
                element._id.toString()
              ] = `${element.stoveBrand} ${element.stoveModel}`;
            });
            elookup = _lookup;
            setReloadcolum(!reloadcolum);
          })
          .catch((error) => Swal.fire("Error", error.message, "error"));
        //setReloadcolum(!reloadcolum);
      })
      .catch((error) => Swal.fire("Error", error.message, "error"));
  }, [actualizar]);

  // useEffect(() => {
  //     axios.get('/api/estufas')
  //         .then(resp => {
  //             setEstufas(resp.data.data);
  //             let _lookup = {};
  //             resp.data.data.forEach(element => {
  //                 _lookup[element._id.toString()] = `${element.stoveBrand} ${element.stoveModel}`;
  //             });
  //             elookup = _lookup;
  //             setReloadcolum(!reloadcolum);
  //         })
  //         .catch(error =>
  //             Swal.fire('Error', error.message, 'error'));
  // }, [actualizar]);

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

  useEffect(() => {
    axios
      .get("/api/mantenciones")
      .then((resp) => {
        setMantenimientos(resp.data.data);
        //setReloadcolum(!reloadcolum);
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  }, [actualizar]);

  //     useEffect(() => {
  //     new Promise((resolve, reject) => {
  //         axios.get('/api/estufas')
  //             .then(resp => {
  //                 console.log(resp.data.data);
  //                 setClientes(resp.data.data);
  //                 //console.log('tenemos clientes');
  //                 let _lookup = {};
  //                 resp.data.data.forEach(element => {
  //                     _lookup[element._id.toString()] = `${element.firstName} ${element.lastName}`;
  //                 });
  //                 clookup = _lookup;
  //                 axios.get("/api/estufas")
  //                     .then((estufas) => {
  //                         //setEstufas(resp.data.data);
  //                         _lookup = {};
  //                         estufas.data.data.forEach(element => {
  //                             _lookup[element._id.toString()] = element.stoveModel;
  //                         });
  //                         plookup = _lookup;
  //                         axios.get('/api/mantenciones')
  //                             .then(resp => {
  //                                 setMantenimientos(resp.data.data);
  //                                 console.log('tenemos mantenciones');
  //                                 setReloadcolum(!reloadcolum);
  //                                 resolve();
  //                             })
  //                             .catch(error => {
  //                                 Swal.fire('Error', error.message, 'error');
  //                                 resolve();
  //                             })
  //                     })
  //                     .catch((error) => Swal.fire("Error", error.message, "error"));

  //             })
  //             .catch(error => {
  //                 Swal.fire('Error', error.message, 'error');
  //                 resolve();
  //             })
  //     })

  // }, [actualizar]);

  const columns = useMemo(
    () => [
      { title: "Id", field: "_id", hidden: true, filtering: false },
      {
        title: "Cliente",
        field: "client",
        lookup: clookup,
        editComponent: (props) => (
          <Autocomplete
            id="client"
            options={clientes}
            getOptionLabel={(option) =>
              `${option.firstName} ${option.lastName}`
            }
            renderInput={(params) => {
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
              }
            }}
          />
        ),
      },
      {
        title: "Producto",
        field: "product",
        lookup: elookup,
        editComponent: (props) => (
          <Autocomplete
            id="product"
            options={estufas}
            getOptionLabel={(option) =>
              `${option.stoveBrand} ${option.stoveModel}`
            }
            renderInput={(params) => {
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
              }
            }}
          />
        ),
      },
      {
        title: "Estado",
        field: "maintenanceStatus",
        lookup: slookup,
        editComponent: (props) => (
          <Autocomplete
            id="maintenanceStatus"
            options={status}
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
        title: "Técnico",
        field: "technical",
        editComponent: (props) => (
          <TextField
            id="technical"
            label="Técnico"
            variant="outlined"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        ),
      },
      {
        title: "Fecha",
        field: "scheduledDate",
        type: "datetime",
      },
      {
        title: "Observaciones",
        field: "observations",
        editComponent: (props) => (
          <TextField
            id="observations"
            label="Observaciones"
            variant="outlined"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        ),
      },
      { title: "Activo", field: "active", hidden: true, filtering: false },
    ],
    [reloadcolum]
  );

  return (
    <>
      <Container fluid className="espaciado">
        <Row>
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
                  showColumnsTitle: "Mostrar Columnas",
                },
                header: {
                  actions: "Acciones",
                },
                body: {
                  addTooltip: "Crear",
                  editTooltip: "Editar",
                  deleteTooltip: "Eliminar",
                  editRow: {
                    deleteText:
                      "Está seguro que desea eliminar el Mantenimiento",
                    cancelTooltip: "Cancelar",
                    saveTooltip: "Aceptar",
                  },
                  emptyDataSourceMessage: "No hay registros que mostrar",
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
                  lastTooltip: "Última página",
                },
                grouping: {
                  placeholder: "Arrastra los encabezados aquí para agruparlos",
                  groupedBy: "Agrupados por: ",
                },
              }}
              options={{
                addRowPosition: "first",
                searchFieldAlignment: "left",
                exportMenu: [
                  {
                    label: "Exportar como PDF",
                    exportFunc: (cols, datas) =>
                      ExportPdf(cols, datas, "Mantenimientos"),
                  },
                  {
                    label: "Exportar como CSV",
                    exportFunc: (cols, datas) =>
                      ExportCsv(cols, datas, "Mantenimientos"),
                  },
                ],
                grouping: true,
                filtering: true,
                columnsButton: true,
              }}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    if (newData && Object.keys(newData).length !== 0) {
                      newData.active = true;
                      axios
                        .post("/api/mantenciones", newData)
                        .then((resp) => {
                          if (resp.data.ok) {
                            setMantenimientos([
                              resp.data.data,
                              ...mantenimientos,
                            ]);
                          } else {
                            Swal.fire(
                              "Error al crear el Mantenimiento",
                              resp.data.message,
                              "error"
                            );
                          }
                          resolve();
                        })
                        .catch((error) => {
                          console.log(error);
                          Swal.fire(
                            "Error al crear el Mantenimiento",
                            error?.message,
                            "error"
                          );
                          resolve();
                        });
                    } else {
                      resolve();
                    }
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    axios
                      .put(`/api/mantenciones/${newData._id}`, newData)
                      .then((resp) => {
                        if (resp.data.ok) {
                          const dataUpdate = [...mantenimientos];
                          const target = dataUpdate.find(
                            (el) => el.id === oldData.tableData.id
                          );
                          const index = dataUpdate.indexOf(target);
                          dataUpdate[index] = newData;
                          setMantenimientos([...dataUpdate]);
                        } else {
                          Swal.fire(
                            "Error al actualizar el Mantenimiento",
                            resp.data.message,
                            "error"
                          );
                        }
                        resolve();
                      })
                      .catch((error) => {
                        console.log(error);
                        Swal.fire(
                          "Error al actualizar el Mantenimiento",
                          error?.message,
                          "error"
                        );
                        resolve();
                      });
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    oldData.active = false;
                    axios
                      .put(`/api/mantenciones/${oldData._id}`, oldData)
                      .then((resp) => {
                        if (resp.data.ok) {
                          const dataDelete = [...mantenimientos];
                          const target = dataDelete.find(
                            (el) => el.id === oldData.tableData.id
                          );
                          const index = dataDelete.indexOf(target);
                          dataDelete.splice(index, 1);
                          setMantenimientos([...dataDelete]);
                        } else {
                          Swal.fire(
                            "Error al eliminar el Mantenimiento",
                            resp.data.message,
                            "error"
                          );
                        }
                        resolve();
                      })
                      .catch((error) => {
                        console.log(error);
                        Swal.fire(
                          "Error al eliminar el Mantenimiento",
                          error?.message,
                          "error"
                        );
                        resolve();
                      });
                  }),
              }}
              actions={[
                {
                  icon: () => (
                    <RefreshIcon color={"action"} sx={{ fontSize: 30 }} />
                  ),
                  tooltip: "Refrescar Datos",
                  isFreeAction: true,
                  onClick: () => setActualizar(!actualizar),
                },
                {
                  icon: () => <VisibilityIcon color={"secondary"} />,
                  tooltip: "Detalle",
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
                      <h3>Estás visualizando Instalación y Mantención de:</h3>
                      <hr>
                      <col>
                              <p><b>Cliente:</b> ${_rowData.client}</p>
                              <p><b>Producto:</b> ${_rowData.product}</p>
                              <p><b>Estado:</b> ${_rowData.maintenanceStatus}</p>
                              <p><b>Técnico:</b> ${_rowData.technical}</p>
                              <p><b>Fecha:</b> ${_rowData.scheduledDate}</p>
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
                      JSON.stringify(_rowData)
                    );
                  },
                },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MantenimientoList;
