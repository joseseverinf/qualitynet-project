# qualitynet-project
CRM App for Quality Pellets Client named QualityNET
A continuación se detallan requerimientos entregados por cliente para desarrollar una app básica en versión v1.0 que contenga información de la base de datos de los clientes de Quality Pellets y de polifuncionalidad a su uso interconectando, la información del manejo de clientes, de stock de estufas, de las ventas y de las mantenciones.. 

Características que debe incorporar:
1.- Registro de Usuario (para ingresar a la plataforma), solo para el proyecto, luego del proyecto en modo real solo tendrá el login.
2.- Login de Usuario (ya registrado en el paso 1)
	2.1- Incorporar Botón LogOut
3.- Panel de control a 4 componentes, (Clientes, Estufas, Ventas y Mantenciones)


4.- En el mantenedor de Clientes de deben incorporar:
	4.1.- Formulario para crear un nuevo cliente, que permita ingresar los datos (Nombre, Apellido, RUT, Dirección, Comuna, Tipo de Convenio: Particular o Armada, .
	4.2.- Vista que muestre un listado vertical de los clientes ingresados, señalando solamente los siguientes datos: 	Nombre, Apellido, Rut, Estufa y Fecha de Mantención. con sus respectivos botones para (ver, editar y desactivar*).
	4.3- Fase secundaria, añadir que la vista de cliente, sea una hoja personalizada con un diseño diferente que muestre la foto de la estufa del cliente, el nombre de la marca y estufa, nombre del cliente y fecha de compra y mantención con posibilidad de ir agregando en una lista, el historial.

5.- El mantenedor de Estufas debe incorporar:
	5.1.- Formulario para crear una estufa según modelo y marca de esta.
	5.2.- Vista que muestre un listado vertical de las estufas en stock ingresados, señalando, Nombre de la Estufa, Marca de la Estufa, País de Origen, Imagen Referencial. con sus respectivos botones para (ver, editar y desactivar*).
	5.3- Fase secundaria, añadir que la vista de la estufa al detalle, sea una hoja personalizada con un diseño diferente que muestre la foto de la estufa del cliente, el nombre de la marca y estufa, nombre del cliente y fecha de compra y mantención con posibilidad de ir agregando en una lista, el historial.

6.- El mantenedor de Ventas debe incorporar:
6.1.- Formulario para ingresar una venta seleccionando en desplegable, el cliente al cuál se le ingresa la venta ya sea de Estufa o de Pellet, guardando los datos del cliente como Nombre, Apellido, Rut y Estufa o Pellet. y Precio y fecha de compra de esta.
	6.2.- Vista que muestre un listado vertical de las compras ingresadas en stock ingresados, señalando, Nombre, Apellido, Rut y Estufa o Pellet, con sus respectivos botones para (ver, editar y desactivar).

7.- El mantenedor de Mantenciones debe incorporar:
6.1.- Formulario para ingresar una mantención seleccionando en desplegable, el cliente al cuál se le ingresa la mantención de estufa, guardando los datos del cliente como Nombre, Apellido, Rut, Dirección, Estufa, Fecha de mantención y Nombre del Técnico que hará la mantención a ese cliente. Idealmente que si a un mismo cliente se le agrega una nueva mantención, esta se agregue como lista a ese mismo cliente, sin borrar la anterior, en el fondo que genere un historial de mantenciones.
	6.2.- Vista general que muestre un listado vertical de las mantenciones ingresadas señalando, Nombre, Apellido, Rut, Dirección, Estufa, Mantención(es) y Técnico a Cargo de realizar dicha mantención, con sus respectivos botones para (ver y editar, desactivar).



A nivel de proyecto programado en VSC

El Client contiene los siguientes packages instalados:
Iniciando el proyecto debe ejecutar en la ruta qualitynet/client el script npm install
el cual instalará los package y node_modules

@reach/router
andt
axios
bootstrap
material-table
react
react-data-table-component
react-dom
react-icons
react-router-dom
react-scripts
react-webpack
reactstrap
styled-components
sweetalert2
web-vitals

Estructura del Client

El Server contiene los siguientes packages instalados:
Iniciando el proyecto debe ejecutar en la ruta qualitynet/server el script npm install
el cual instalará los package y node_modules

bcrypt
cookie-parser
cors
express
jsonwebtoken
mongoose

Estructura del Server

Layout de la App QualityNET (Ver PDF.)

Equipo a Cargo:
José Severin Front-End
Carlos Reyes Validaciones Backend y Front-End
David Pardo Integración Backend
