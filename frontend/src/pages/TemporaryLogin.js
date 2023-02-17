import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "./TemporaryLogin.css";

function TemporaryLogin() {
  return (
    <Container>
      <Row>
        <Col md={5} className="login__bg"></Col>
        <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form style={{ width: "80%", maxWidth: 500 }}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder="Enter username" />
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
