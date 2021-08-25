import React from "react";

const Footer = () => {
  return (
    <footer className="footer-nav">
      <div className="container">
        <div className="flex">
          <div className="footer-content">
            <p>123.555.4321</p>
            <p>info@contact.com</p>
          </div>
          <div className="footer-content">
            <p>15 Main St</p>
            <p>City, State 99999</p>
          </div>
          <div className="footer-social">
            <a href="">
              <div className="instagram"></div>
            </a>
            <a href="">
              <div className="facebook"></div>
            </a>
            <a href="">
              <div className="vimeo"></div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
