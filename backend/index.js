const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const Message = require("./models/Message");
const User = require("./models/User");
const rooms = ["general", "tech", "uni"];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
require("./db");

const server = require("http").createServer(app);
const PORT = 5001;
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/rooms", (req, res) => {
  res.json(rooms);
});

async function getMessagesFromRoom(room) {
  let roomMessages = await Message.aggregate([{ $match: { to: room } }, { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } }]);
  return roomMessages;
}

function sortRoomMessages(messages) {
  return messages.sort(function (older, newer) {
    let firstDate = older._id.split("/");
    let secondDate = newer._id.split("/");
    //sorting by year, months & date
    firstDate = firstDate[2] + firstDate[0] + firstDate[1];
    secondDate = secondDate[2] + secondDate[0] + secondDate[1];

    return firstDate < secondDate ? -1 : 1;
  });
}

// socket connection

io.on("connection", (socket) => {
  socket.on("new-user", async () => {
    const members = await User.find();
    io.emit("new-user", members);
  });

  socket.on("join-room", async (newRoom, previousRoom) => {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await getMessagesFromRoom(newRoom);
    roomMessages = sortRoomMessages(roomMessages);
    socket.emit("room-messages", roomMessages);
  });

  socket.on("message-room", async (room, content, sender, time, date) => {
    const newMessage = await Message.create({ content, from: sender, time, date, to: room });
    let roomMessages = await getMessagesFromRoom(room);
    roomMessages = sortRoomMessages(roomMessages);
    io.to(room).emit("room-messages", roomMessages);

    socket.broadcast.emit("notifications", room);
  });

  app.delete("/logout", async (req, res) => {
    try {
      const { _id, newMessages } = req.body;
      const user = await User.findById(_id);
      user.status = "offline";
      user.newMessages = newMessages;
      await user.save();
      const members = await User.find();
      socket.broadcast.emit("new-user", members);
      res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(400).send();
    }
  });
});

server.listen(PORT, () => {
  console.log("PORT " + PORT);
});
