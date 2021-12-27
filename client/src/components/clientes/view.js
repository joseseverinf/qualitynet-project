import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from 'reactstrap';


const ClienteView = (props) => {
  
  const navigate = useNavigate();

  const volver = e => {
    e.stopPropagation();
    navigate('../')
  }
  const eliminar = (e, id) => {
    e.stopPropagation();
    if(id) {
        props.eliminar(id);
    }
  }
  
  useEffect(() => {
    if(!props.cliente) {
      navigate('../')
    }

  }, [props.cliente])

  return(
      <Container>
        {props.clientes && props.clientes.map((cliente, i) => 
          <Card key={i} style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{cliente.firstName} {cliente.lastName}</Card.Title>
                  <Card.Text>Rut del Cliente: {cliente.rut}</Card.Text>
                  <Card.Text>Email del Cliente: {cliente.email}</Card.Text>
                  <Card.Text>Teléfono del Cliente: {cliente.phone}</Card.Text>
                  <Card.Text>Tipo de Estufa: {cliente.estufa}</Card.Text>
                  <Card.Text>Fecha de la última mantención: {cliente.mantencion}</Card.Text>
                  <Button submit={volver} variant="primary">Volver</Button>
                  <Button submit={eliminar} variant="danger">Eliminar</Button>
                </Card.Body>
            </Card>
        )}
      </Container>
  );
}
export default ClienteView;