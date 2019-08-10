import React, { Component } from "react";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import Rank from "./components/rank/Rank";
import ImageLinkForm from "./components/linkform/ImageLinkForm";
import FaceRecognition from "./components/facerecognition/FaceRecognition";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import "./App.css";

const app = new Clarifai.App({ apiKey: "c36ed3caa8284a98861b45d79dccf183" });
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
      input: "",
      imageUrl: "",
      box: {}
    };
  }
  calculateFaceLocation = data => {
    const detectedFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(detectedFace);
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
  displayBox = box => {
    console.log(box);
    this.setState({ box });
  };
  onInputChange = event => {
    this.setState({ input: event.target.value });
  };
  onButtonSubmit = () => {
    console.log("clicked");
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        this.displayBox(this.calculateFaceLocation(response));
      })
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
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
      </div>
    );
  }
}

export default App;
