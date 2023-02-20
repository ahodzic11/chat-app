import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import "./MessageForm.css";
import { time, todayDate } from "../util";

function MessageForm() {
  const [message, setMessage] = useState("");
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext);
  const messageEndRef = useRef(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!message) return;

    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  }

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
  });

  return (
    <>
      <div className="messages-output">
        {user && !privateMemberMsg?._id && <div className="alert alert-info">You are in the {currentRoom} room</div>}
        {user && privateMemberMsg?._id && (
          <>
            <div className="alert alert-info conversation-info">
              <div>
                Your conversation with {privateMemberMsg.name} <img src={privateMemberMsg.imageUrl} className="conversation-profile-picture" alt="conversation-pic" />
              </div>
            </div>
          </>
        )}
        {!user && <div className="alert alert-danger">Please login!</div>}

        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx}>
              <p className="alert alert-info text-center message-date-indicator">{date}</p>
              {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
                <div>
                  {sender?.name == "system" ? (
                    <div className="system-message">
                      <p style={{ textAlign: "center", marginBottom: 0 }}>{content}</p>
                      <p className="message-timestamp" style={{ textAlign: "center", fontSize: "70%" }}>
                        {time}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className={sender?.name == user?.name ? "message" : "incoming-message"} key={msgIdx}>
                        <div className="message-inner">
                          <div className="d-flex align-items-center mb-3">
                            <img src={sender.imageUrl} style={{ width: 35, height: 35, objectFit: "cover", borderRadius: "50%", marginRight: 10 }} alt="Avatar" />
                            <p className="message-sender">{sender._id == user?._id ? "You" : sender.name}</p>
                          </div>
                          <p className="message-content">{content}</p>
                          <p className="message-timestamp">{time}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className="form-column-group" md={10}>
            <Form.Group>
              <Form.Control className="form-column" type="text" placeholder="Your message" disabled={!user} value={message} onChange={(e) => setMessage(e.target.value)}></Form.Control>
            </Form.Group>
          </Col>
          <Col md={2} className="paperplane-column">
            <Button id="buttonSubmit" variant="primary" type="submit" style={{ width: "100%", backgroundColor: "orange" }} disabled={!user}>
              <i className="fas fa-paper-plane icon-paperplane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default MessageForm;
