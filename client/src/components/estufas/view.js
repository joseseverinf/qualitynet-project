import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from 'reactstrap';


const EstufaView = (props) => {
  
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
        {props.estufas && props.estufas.map((estufa, i) => 
          <Card key={i} style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{estufa.firstName}</Card.Title>
                  <Card.Text>Marca: {estufa.rut}</Card.Text>
                  <Card.Text>Codigo Serial: {estufa.codigoSerial}</Card.Text>
                  <Card.Text>País de Origen: {estufa.origenPais}</Card.Text>
                  <Card.Text>Imagen de Referencia: {estufa.imagenEstufa}</Card.Text>
                  <Button submit={volver} variant="primary">Volver</Button>
                  <Button submit={eliminar} variant="danger">Eliminar</Button>
                </Card.Body>
            </Card>
        )}
      </Container>
  );
}
export default EstufaView;