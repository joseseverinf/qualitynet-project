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
    if(!props.estufa) {
      navigate('../')
    }

  }, [props.estufa])

  return(
      <Container>
        {props.estufas && props.estufas.map((estufa, i) => 
          <Card key={i} style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{estufa.stoveName}</Card.Title>
                  <Card.Text>Marca: {estufa.stoveBrand}</Card.Text>
                  <Card.Text>Modelo: {estufa.stoveModel}</Card.Text>
                  <Card.Text>País de Origen: {estufa.origenPais}</Card.Text>
                  <Card.Text>Código: {estufa.stoveCode}</Card.Text>
                  <Card.Text>Color: {estufa.stoveColor}</Card.Text>
                  <Card.Text>País de Origen: {estufa.stoveOrigin}</Card.Text>
                  <Card.Text>Cantidad en Stock: {estufa.stoveAmount}</Card.Text>
                  <Card.Text>Precio Unitario: {estufa.stoveUnitPrice}</Card.Text>
                  <Card.Text>Imagen de Referencia: {estufa.stoveImage}</Card.Text>
                  <Card.Text>Características Generales: {estufa.stoveCharacteristic}</Card.Text>
                  <Button submit={volver} variant="primary">Volver</Button>
                </Card.Body>
            </Card>
        )}
      </Container>
  );
}
export default EstufaView;