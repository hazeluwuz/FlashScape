import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-repo round-button">
        Repository
        <a href="https://github.com/hazeluwuz/FlashScape" target="_blank">
          <i className="fab fa-github fa-xl" />
        </a>
      </div>
      <div className="footer-details round-button">
        Developer
        <div className="footer-links">
          <a href="https://github.com/hazeluwuz" target="_blank">
            <i className="fab fa-github fa-xl" />
          </a>
          <a href="https://www.linkedin.com" target="_blank">
            <i className="fab fa-linkedin fa-xl" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
