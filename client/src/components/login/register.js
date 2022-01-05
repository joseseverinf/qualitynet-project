import React from "react";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import Logo from "../home/images/Logo.png";
import Swal from "sweetalert2";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const RegisterForm = (props) => {
  const [inputs, setInputs] = useState(initialState);
  const navigate = useNavigate();
  const formUpdate = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const goHome = (e) => {
    e?.stopPropagation();
    navigate("/auth");
  };
  const goLogin = (e) => {
    e?.stopPropagation();
    navigate("/login");
  };
  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/register", inputs)
      .then((resp) => {
        if (resp.data.ok) {
          Swal.fire("Registro de Usuarios", resp.data.message, "success");
          goHome();
        } else {
          Swal.fire("Registro de Usuarios", resp.data.message, "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="espaciado2 recuadro-reg-log">
      <Row>
        <Col xs={12} md={6} lg={6} className="espaciado2 alineacion">
          <img src={Logo} width="300" alt="logo" />
        </Col>
        <Col xs={12} md={6} lg={6} className="espaciado3">
          <h2>Registrarse</h2>
          <Form onSubmit={formSubmit}>
            <Col xs={12} md={8} lg={8}>
              <FormGroup>
                <Label>Nombre y Apellido:</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Ingresa tu Nombre y Apellido"
                  value={inputs.name}
                  onChange={formUpdate}
                  required
                  maxLength={50}
                />
              </FormGroup>

              <FormGroup>
                <Label>Email:</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Ingresa tu e-mail"
                  value={inputs.email}
                  onChange={formUpdate}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Perfil:</Label>
                <Input
                  type="select"
                  name="profile"
                  value={inputs.profile}
                  onChange={formUpdate}
                  required
                >
                  <option value="">Seleccione un Perfil</option>
                  <option value="admin">Administrador</option>
                  <option value="user">Usuario</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Contraseña:</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Ingresa una contraseña mínimo de 6 dígitos"
                  value={inputs.password}
                  onChange={formUpdate}
                  required
                  minLength={6}
                />
              </FormGroup>

              <FormGroup>
                <Label>Confirmar Contraseña:</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="La contraseña debe coincidir"
                  value={inputs.confirmPassword}
                  onChange={formUpdate}
                  required
                  minLength={6}
                />
              </FormGroup>
            </Col>
            <Row>
              <Col xs={6} md={3}>
                <Button color="success" type="submit">
                  Registrarse
                </Button>
              </Col>
              <Col xs={6} md={3}>
                <Button type="button" onClick={goHome}>
                  Cancelar
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="espaciado3">
                <p>
                  Si ya tienes una cuenta, haz click aquí{" "}
                  <Link to={`/login/`}>
                    <BiLogInCircle
                      color="blue"
                      style={{
                        marginRight: "10px",
                        fontSize: "30",
                        textAlign: "center",
                      }}
                    />
                  </Link>
                </p>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
