const mongoose = require("mongoose");
require("dotenv").config();

/*mongoose.connect(`mongodb+srv://chat-app:1nuvQsM3vZvF4LQx@cluster0.rgyn478.mongodb.net/?retryWrites=true&w=majority`, () => {
  console.log(process.env.DB_USER);
  console.log(process.env.DB_PW);
  console.log("Connected to MongoDB.");
});*/

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.rgyn478.mongodb.net/?retryWrites=true&w=majority`, () => {
  console.log("Connected to MongoDB.");
});
