import React, { useContext, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import "./MessageForm.css";

function MessageForm() {
  const [message, setMessage] = useState("");
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext);
  const user = useSelector((state) => state.user);

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  function handleSubmit(e) {
    console.log("Uslo ovdje");
    e.preventDefault();
    if (!message) return;
    console.log("Uslo ovdje");

    const today = new Date();
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  }

  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    console.log(roomMessages);
    setMessages(roomMessages);
  });

  return (
    <>
      <div className="messages-output">
        {!user && <div className="alert alert-danger">Please login!</div>}

        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx}>
              <p className="alert alert-info text-center message-date-indicator">{date}</p>
              {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
                <div className="message" key={msgIdx}>
                  <p>{content}</p>
                </div>
              ))}
            </div>
          ))}
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control type="text" placeholder="Your message" disabled={!user} value={message} onChange={(e) => setMessage(e.target.value)}></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button variant="primary" type="submit" style={{ width: "100%", backgroundColor: "orange" }} disabled={!user}>
              <i className="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default MessageForm;
