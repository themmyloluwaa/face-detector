import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3 white">
        {
          "This Artifical Intelligence Powered Brain Will Detect Your Face! Give it a Try!"
        }
      </p>
      <div className="center">
        <div className=" form center pa4 br3 shadow-5">
          <input
            type="tex"
            className="f4 pa2 w-70 center "
            placeholder="Submit your face url"
            onChange={onInputChange}
          />
          <button
            className="w-30 ma2 white f3 grow link ph3 pv2 dib white  button"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
