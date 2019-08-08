import React, { Component } from "react";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import Rank from "./components/rank/Rank";
import ImageLinkForm from "./components/linkform/ImageLinkForm";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import "./App.css";

const app = new Clarifai.App({ apiKey: "517cc1ac527144dc930b73597c371595" });
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
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ""
    };
  }
  onInputChange = event => {
    console.log(event.target.value);
  };
  onButtonSubmit = () => {
    console.log("clicked");
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        "https://samples.clarifai.com/metro-north.jpg"
      )
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
