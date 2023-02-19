const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must be between 3 and 15 characters"],
      unique: true,
    },
    imageUrl: {
      type: String,
    },
    newMessages: {
      type: Object,
      default: {},
    },
    status: {
      type: String,
      default: "online",
    },
  },
  { minimize: false }
);

UserSchema.statics.findByCredentials = async function (name) {
  const user = await User.findOne({ name });
  if (!user) throw new Error("Name doesnt exist");
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
