import React from "react";

const Footer = ({ length }) => {
  let today = new Date().getFullYear();
  return (
    <footer>
      {length} - list {length == 1 ? "item" : "items"}
    </footer>
  );
};

export default Footer;
