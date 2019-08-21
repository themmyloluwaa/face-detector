import React, { Component } from "react";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import Rank from "./components/rank/Rank";
import SignIn from "./components/signIn/SignIn";
import Register from "./components/register/Register";
import ImageLinkForm from "./components/linkform/ImageLinkForm";
import FaceRecognition from "./components/facerecognition/FaceRecognition";
import Particles from "react-particles-js";
import "./App.css";

const particleOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 1105
      }
    },
    line_linked: {
      enable: false
    },
    size: {
      value: 8
    },
    color: {
      value: "#000"
    }
  }
};

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  calculateFaceLocation = data => {
    const detectedFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    // console.log(detectedFace);
    const inputImg = document.getElementById("inputImg");
    const width = Number(inputImg.width);
    const height = Number(inputImg.height);
    return {
      leftCol: detectedFace.left_col * width,
      topRow: detectedFace.top_row * height,
      rightCol: width - detectedFace.right_col * width,
      bottomRow: height - detectedFace.bottom_row * height
    };
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "Home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route });
  };

  displayBox = box => {
    // console.log(box);
    this.setState({ box });
  };
  onInputChange = event => {
    this.setState({ input: event.target.value });
  };
  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    // fetch api call from backend and pass data into the displaybox method
    fetch("https://server-fd.herokuapp.com/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        this.displayBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));

    // fetch user entries and increament upon image submission
    fetch("https://server-fd.herokuapp.com/image", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.user.id,
        name: this.state.user.name
      })
    })
      .then(res => res.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, { entries: count }));
      })
      .catch(err => console.log(err));
  };
  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };
  render() {
    const { imageUrl, box, isSignedIn, route } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === "Home" ? (
          <div>
            <Logo />
            <Rank
              ranked={this.state.user.entries}
              named={this.state.user.name}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
        ) : route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
