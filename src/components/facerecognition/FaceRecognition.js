import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img src={imageUrl} alt="" width="500px" height="auto" id="inputImg" />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
            inset: `${box.topRow}, ${box.rightCol}, ${box.bottomRow}, ${
              box.leftCol
            }`
          }}
        />
      </div>
    </div>
  );
};

export default FaceRecognition;
