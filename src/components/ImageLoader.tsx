import React from "react";
import Spinner from "react-bootstrap/Spinner";

function ImageLoader() {
  return (
    <Spinner animation="grow" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default ImageLoader;