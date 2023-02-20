import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useSignupUserMutation } from "../services/appApi";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { AppContext } from "../context/appContext";
import avatarImg from "../assets/avatar.png";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { time, todayDate } from "../util";

function Login() {
  const [name, setName] = useState("");
  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const { socket, currentRoom } = useContext(AppContext);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    generateUsername();
  }, []);

  function generateUsername() {
    var nameList = [
      "Time",
      "Past",
      "Future",
      "Dev",
      "Fly",
      "Flying",
      "Soar",
      "Soaring",
      "Power",
      "Falling",
      "Fall",
      "Jump",
      "Cliff",
      "Mountain",
      "Rend",
      "Red",
      "Blue",
      "Green",
      "Yellow",
      "Gold",
      "Demon",
      "Demonic",
      "Panda",
      "Cat",
      "Kitty",
      "Kitten",
      "Zero",
      "Memory",
      "Trooper",
      "XX",
      "Bandit",
      "Fear",
      "Light",
      "Glow",
      "Tread",
      "Deep",
      "Deeper",
      "Deepest",
      "Mine",
      "Your",
      "Worst",
      "Enemy",
      "Hostile",
      "Force",
      "Video",
      "Game",
      "Donkey",
      "Mule",
      "Colt",
      "Cult",
      "Cultist",
      "Magnum",
      "Gun",
      "Assault",
      "Recon",
      "Trap",
      "Trapper",
      "Redeem",
      "Code",
      "Script",
      "Writer",
      "Near",
      "Close",
      "Open",
      "Cube",
      "Circle",
      "Geo",
      "Genome",
      "Germ",
      "Spaz",
      "Shot",
      "Echo",
      "Beta",
      "Alpha",
      "Gamma",
      "Omega",
      "Seal",
      "Squid",
      "Money",
      "Cash",
      "Lord",
      "King",
      "Duke",
      "Rest",
      "Fire",
      "Flame",
      "Morrow",
      "Break",
      "Breaker",
      "Numb",
      "Ice",
      "Cold",
      "Rotten",
      "Sick",
      "Sickly",
      "Janitor",
      "Camel",
      "Rooster",
      "Sand",
      "Desert",
      "Dessert",
      "Hurdle",
      "Racer",
      "Eraser",
      "Erase",
      "Big",
      "Small",
      "Short",
      "Tall",
      "Sith",
      "Bounty",
      "Hunter",
      "Cracked",
      "Broken",
      "Sad",
      "Happy",
      "Joy",
      "Joyful",
      "Crimson",
      "Destiny",
      "Deceit",
      "Lies",
      "Lie",
      "Honest",
      "Destined",
      "Bloxxer",
      "Hawk",
      "Eagle",
      "Hawker",
      "Walker",
      "Zombie",
      "Sarge",
      "Capt",
      "Captain",
      "Punch",
      "One",
      "Two",
      "Uno",
      "Slice",
      "Slash",
      "Melt",
      "Melted",
      "Melting",
      "Fell",
      "Wolf",
      "Hound",
      "Legacy",
      "Sharp",
      "Dead",
      "Mew",
      "Chuckle",
      "Bubba",
      "Bubble",
      "Sandwich",
      "Smasher",
      "Extreme",
      "Multi",
      "Universe",
      "Ultimate",
      "Death",
      "Ready",
      "Monkey",
      "Elevator",
      "Wrench",
      "Grease",
      "Head",
      "Theme",
      "Grand",
      "Cool",
      "Kid",
      "Boy",
      "Girl",
      "Vortex",
      "Paradox",
    ];
    setName(nameList[Math.floor(Math.random() * nameList.length)]);
  }

  function handleLogin(e) {
    e.preventDefault();
    if (name.length < 3 || name.length > 15) return alert("Name must be between 3 and 15 characters!");
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            signupWithImage(downloadURL);
          });
        }
      );
    } else signupWithImage("https://firebasestorage.googleapis.com/v0/b/chat-app-fda64.appspot.com/o/avatar.png?alt=media&token=3b7adbbe-8238-49ea-949e-4fa28e0c91c8");
    socket.emit("message-room-entry", currentRoom, "User " + name + " has just joined the room!", { name: "system" }, time, todayDate);
  }

  function signupWithImage(downloadURL) {
    signupUser({ name, imageUrl: downloadURL }).then(({ data }) => {
      if (data) {
        socket.emit("new-user");
        navigate("/chat");
      }
    });
  }

  function handleImageInput(e) {
    e.preventDefault();
    setFile(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <Container>
      <Row>
        <Col md={5} className="login__bg"></Col>
        <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form id="form-div" onSubmit={handleLogin}>
            <div className="signup-profile-pic__container">
              <img src={imagePreview || avatarImg} className="signup-profile-pic" alt="avatar" />
              <label htmlFor="image-upload" className="image-upload-label">
                <i className="fas fa-plus-circle add-picture-icon"></i>
              </label>
              <input type="file" id="image-upload" hidden accept="image/png, image/jpg, image/jpeg" onChange={handleImageInput} />
            </div>
            <Form.Text className="text-muted">You can select a custom profile picture or use the one provided.</Form.Text>
            <Form.Group className="mb-3 lower-div">
              <Form.Label>Username: {name}</Form.Label>
              <div>
                <Button variant="primary" onClick={generateUsername}>
                  Generate username
                </Button>
              </div>

              <Form.Text className="text-muted">Press the button to generate a random username or press Chat now to get assigned one randomly.</Form.Text>
            </Form.Group>

            <Button className="chat-now-button" variant="primary" type="submit">
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

export default Login;
