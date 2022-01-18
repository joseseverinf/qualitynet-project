import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
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
import { Link } from "react-router-dom";
import { AiOutlineForm } from "react-icons/ai";
import Logo from "../home/images/Logo.png";
import Swal from "sweetalert2";
import UserContext from "../context/user-context";

const initialState = {
  username: "",
  password: "",
};

const LoginForm = (props) => {
  const [inputs, setInputs] = useState(initialState);
  const context = useContext(UserContext);

  const navigate = useNavigate();

  const formUpdate = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const goIn = (e) => {
    e?.stopPropagation();
    navigate("/");
  };
  const goHome = (e) => {
    e?.stopPropagation();
    navigate("/auth");
  };
  const goReg = (e) => {
    e?.stopPropagation();
    navigate("/register");
  };

  const formSubmit = (e) => {
    e.preventDefault();
    context.login(inputs);
    // axios
    //   .post("/api/login", inputs)
    //   .then((resp) => {
    //     if (resp.data.ok) {
    //       Swal.fire("Login", resp.data.message, "success");
    //       goIn();
    //     } else {
    //       Swal.fire("Login", resp.data.message, "error");
    //       goHome();
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    
  };

  return (
    <Container className="espaciado2 recuadro-reg-log">
      <Row>
        <Col xs={12} md={6} lg={6} className="espaciado2 alineacion">
          <img src={Logo} width="300" alt="logo" />
        </Col>
        <Col xs={12} md={6} lg={6} className="espaciado3">
          <h2>Ingresar</h2>
          <Form onSubmit={formSubmit}>
            <Row>
              <Col xs={12} md={8} lg={8}>
                <FormGroup>
                  <Label>E-mail:</Label>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Ingresa tu e-mail"
                    value={inputs.username}
                    onChange={formUpdate}
                    required
                    maxLength={50}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Contraseña:</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    value={inputs.password}
                    onChange={formUpdate}
                    required
                    minLength={6}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={3}>
                <Button color="primary" type="submit">
                  Ingresar
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
                  ¿No tienes una cuenta creada?, regístrate aquí{" "}
                  <Link to={`/register/`}>
                    <AiOutlineForm
                      color="green"
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

export default LoginForm;
