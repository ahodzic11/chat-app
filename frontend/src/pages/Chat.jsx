import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MessageForm from "../components/MessageForm";
import Sidebar from "../components/Sidebar";
import "./Chat.css";

function Chat() {
  return (
    <Container>
      <Row className="chat-rows">
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col md={8}>
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
