import React, { useContext, useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from "../features/userSlice";
import "./Sidebar.css";

function Sidebar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);

  function joinRoom(room, isPublic = true) {
    if (!user) {
      return alert("Please login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }

    dispatch(resetNotifications(room));
  }

  function getRooms() {
    fetch("http://localhost:5001/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  function orderIds(firstId, secondId) {
    if (firstId > secondId) {
      return firstId + "-" + secondId;
    } else {
      return secondId + "-" + firstId;
    }
  }

  function handlePrivateMessaging(member) {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  }

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom != room) dispatch(addNotifications(room));
  });

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  if (!user) {
    return <></>;
  }

  return (
    <>
      <div className="rooms">
        <h2>Available rooms</h2>
        <ListGroup>
          {rooms.map((room, idx) => (
            <ListGroup.Item key={idx} onClick={() => joinRoom(room)} active={room == currentRoom} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
              {room} {currentRoom !== room && <span className="badge rounded-pill bg-primary">{user.newMessages[room]}</span>}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="members">
        <h2>Members</h2>
        <ListGroup>
          {members
            .sort((b, a) => {
              if (a.status < b.status) {
                return -1;
              }
              if (a.status > b.status) {
                return 1;
              }
              return 0;
            })
            .map((member) => (
              <ListGroup.Item key={member.id} style={{ cursor: "pointer" }} active={privateMemberMsg?._id == member._id} onClick={() => handlePrivateMessaging(member)} disabled={member._id === user._id || member.status == "offline"}>
                <Row>
                  <Col xs={2} className="member-status">
                    <img src={member.imageUrl} className="member-status-img" alt="Avatar" />
                    {member.status == "online" ? <i className="fas fa-circle sidebar-online-status"></i> : <i className="fas fa-circle sidebar-offline-status"></i>}
                  </Col>
                  <Col xs={9}>
                    {member.name}
                    {member._id === user?._id && " (You)"}
                    {member.status == "offline" && " (Previous member)"}
                  </Col>
                  <Col xs={1}>
                    <span className="badge rounded-pill bg-primary">{user.newMessages[orderIds(member._id, user._id)]}</span>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </>
  );
}

export default Sidebar;
