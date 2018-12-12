import React from "react";

const imgStyle = {
  width: 50,
  height: 50
};

function ListItem({ src }) {
  return <img src={src} style={imgStyle} />;
}

export default ListItem;
