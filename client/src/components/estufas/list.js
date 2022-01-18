import { forwardRef, useEffect, useState } from "react";

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
import { TextField } from "@mui/material";

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

const EstufaList = () => {
  const [estufas, setEstufas] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  useEffect(() => {
    axios
      .get("/api/estufas")
      .then((resp) => {
        setEstufas(resp.data.data);
      })
      .catch((error) => Swal.fire("Error", error.message, "error"));
  }, [actualizar]);

  const [columns, setColumns] = useState([
    { title: "Id", field: "_id", hidden: true, filtering: false },
    {
      title: "Nombre",
      field: "stoveName",
      editComponent: (props) => (
        <TextField
          id="stoveName"
          label="Nombre"
          variant="outlined"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          helperText={props.helperText}
          error={props.error}
        />
      ),
      validate: (rowData) =>
        rowData.stoveName &&
        (rowData.stoveName.length < 3 || rowData.stoveName.length > 50)
          ? {
              isValid: false,
              helperText:
                "El Nombre de la estufa debe tener más de 3 y menos de 50 caracteres.",
            }
          : true,
    },
    {
      title: "Marca",
      field: "stoveBrand",
      editComponent: (props) => (
        <TextField
          id="stoveBrand"
          label="Marca"
          variant="outlined"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          helperText={props.helperText}
          error={props.error}
        />
      ),
      validate: (rowData) =>
        rowData.stoveBrand && rowData.stoveBrand.length < 3
          ? {
              isValid: false,
              helperText:
                "La Marca de la estufa debe contener mínimo 3 caracteres.",
            }
          : true,
    },
    {
      title: "Modelo",
      field: "stoveModel",
      editComponent: (props) => (
        <TextField
          id="stoveModel"
          label="Modelo"
          variant="outlined"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          helperText={props.helperText}
          error={props.error}
        />
      ),
      validate: (rowData) =>
        rowData.stoveModel && rowData.stoveModel.length < 3
          ? {
              isValid: false,
              helperText:
                "El Modelo de la estufa debe contener mínimo 3 caracteres.",
            }
          : true,
    },
    {
      title: "Código",
      field: "stoveCode",
      editComponent: (props) => (
        <TextField
          id="stoveCode"
          label="Código"
          variant="outlined"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          helperText={props.helperText}
          error={props.error}
        />
      ),
      validate: (rowData) =>
        rowData.stoveCode && rowData.stoveCode.length < 4
          ? {
              isValid: false,
              helperText:
                "El Código de la estufa debe contener mínimo 4 caracteres.",
            }
          : true,
    },
    {
      title: "Color",
      field: "stoveColor",
      editComponent: (props) => (
        <TextField
          id="stoveColor"
          label="Color"
          variant="outlined"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
      filtering: false,
    },
    {
      title: "País Origen",
      field: "stoveOrigin",
      filtering: false,
      editComponent: (props) => (
        <TextField
          id="stoveOrigin"
          label="País Origen"
          variant="outlined"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
    {
      title: "Cantidad",
      field: "stoveAmount",
      filtering: false,
      editComponent: (props) => (
        <TextField
          type="number"
          id="stoveAmount"
          label="Cantidad"
          variant="outlined"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          defaultValue={0}
        />
      ),
      type: "numeric",
    },
    {
      title: "Precio Unitario",
      field: "stoveUnitPrice",
      filtering: false,
      type: "currency",
      currencySetting: {
        locale: "es",
        currencyCode: "CLP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      editComponent: (props) => (
        <TextField
          type="number"
          id="stoveUnitPrice"
          label="Precio Unitario CLP"
          variant="outlined"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          helperText={props.helperText}
          error={props.error}
        />
      ),
      validate: (rowData) =>
        rowData.stoveUnitPrice && rowData.stoveUnitPrice <= 0
          ? {
              isValid: false,
              helperText:
                "El Precio Unitario debe ser mayor a 0.",
            }
          : true,
    },
    {
      title: "Imágen",
      field: "stoveImage",
      filtering: false,
      editComponent: (props) => (
        <TextField
          id="stoveImage"
          label="Imágen"
          variant="outlined"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
      render: rowData => (<img src={rowData.stoveImage} style={{width: 60, borderRadius: '50%'}}/>)
    },
    {
      title: "Características",
      field: "stoveCharacteristic",
      editComponent: (props) => (
        <TextField
          id="stoveCharacteristic"
          label="Características"
          variant="outlined"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
      filtering: false,
    },
    { title: "Activo", field: "active", hidden: true, filtering: false },
  ]);

  return (
    <>
      <Container fluid className="espaciado">
        <Row>
          <Col>
            <MaterialTable
              title=""
              columns={columns}
              data={estufas}
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
                    deleteText: "Está seguro que desea eliminar el Producto",
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
                      ExportPdf(cols, datas, "Productos"),
                  },
                  {
                    label: "Exportar como CSV",
                    exportFunc: (cols, datas) =>
                      ExportCsv(cols, datas, "Productos"),
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
                        .post("/api/estufas", newData)
                        .then((resp) => {
                          console.log(resp);
                          if (resp.data.ok) {
                            setEstufas([resp.data.data, ...estufas]);
                          } else {
                            Swal.fire(
                              "Error al crear el producto",
                              resp.data.message,
                              "error"
                            );
                          }
                          resolve();
                        })
                        .catch((error) => {
                          console.log(error);
                          Swal.fire(
                            "Error al crear el producto",
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
                      .put(`/api/estufas/${newData._id}`, newData)
                      .then((resp) => {
                        if (resp.data.ok) {
                          const dataUpdate = [...estufas];
                          const target = dataUpdate.find(
                            (el) => el.id === oldData.tableData.id
                          );
                          const index = dataUpdate.indexOf(target);
                          dataUpdate[index] = newData;
                          setEstufas([...dataUpdate]);
                        } else {
                          Swal.fire(
                            "Error al actualizar el producto",
                            resp.data.message,
                            "error"
                          );
                        }
                        resolve();
                      })
                      .catch((error) => {
                        console.log(error);
                        Swal.fire(
                          "Error al actualizar el producto",
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
                      .put(`/api/estufas/${oldData._id}`, oldData)
                      .then((resp) => {
                        if (resp.data.ok) {
                          const dataDelete = [...estufas];
                          const target = dataDelete.find(
                            (el) => el.id === oldData.tableData.id
                          );
                          const index = dataDelete.indexOf(target);
                          dataDelete.splice(index, 1);
                          setEstufas([...dataDelete]);
                        } else {
                          Swal.fire(
                            "Error al eliminar el producto",
                            resp.data.message,
                            "error"
                          );
                        }
                        resolve();
                      })
                      .catch((error) => {
                        console.log(error);
                        Swal.fire(
                          "Error al eliminar el producto",
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
                  onClick: (event, rowData) =>
                    Swal.fire(
                      {
                        html: `
              <row>
                  <h3>Estás visualizando una Estufa:</h3>
                  <hr>
                  <col>
                          <p><b>Nombre:</b> ${rowData.stoveName}</p>
                          <p><b>Marca:</b> ${rowData.stoveBrand}</p>
                          <p><b>Modelo:</b> ${rowData.stoveModel}</p>
                          <p><b>Código:</b> ${rowData.stoveCode}</p>
                          <p><b>Color:</b> ${rowData.stoveColor}</p>
                          <p><b>País de Origen:</b>${rowData.stoveOrigin}</p>          
                          <p><b>Precio:</b> ${rowData.stoveAmount}</p>
                          <p><b>Precio Unitario:</b> ${rowData.stoveUnitPrice}</p>
                          <p><b>Imagen:</b> <img src=${rowData.stoveImage} alt="Imagen" width="100"/></p>
                          <p><b>Características:</b> ${rowData.stoveCharacteristic}</p>
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
                    ),
                },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EstufaList;
