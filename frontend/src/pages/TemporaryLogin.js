import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "./TemporaryLogin.css";

function TemporaryLogin() {
  const [name, setName] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (name.length < 3 || name.length > 15) return alert("Name must be between 3 and 15 characters!");
  }

  return (
    <Container>
      <Row>
        <Col md={5} className="login__bg"></Col>
        <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder="Enter username" onChange={(e) => setName(e.target.value)} value={name} required />
              <Form.Text className="text-muted">Random name will be generated if desired username is taken.</Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Chat now!
            </Button>
            <div className="py-4">
              <p className="text-center"> </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default TemporaryLogin;
