import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="vinyl">
        <div className="vinyl__inner" />
      </div>

      <nav className="footer-nav">
        <h3 className="footer-nav__title">Copyright &#169; Marcin Sulowski</h3>
        <a className="footer-nav__link" href="https://github.com/MarcinSulowski/record-shop">
          <span className="footer-nav__dash">– </span>See source code<span className="footer-nav__dash"> –</span>
        </a>
        <a className="footer-nav__link" href="mailto:mr.sulowski@gmail.com">
        <span className="footer-nav__dash">– </span>Contact me<span className="footer-nav__dash"> –</span>
        </a>
      </nav>

      <div className="vinyl">
        <div className="vinyl__inner" />
      </div>
    </footer>
  );
};

export default Footer;
