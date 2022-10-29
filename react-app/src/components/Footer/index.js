import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-details">
        <div className="footer-title">Dev Links</div>
        <div className="footer-links">
          <a
            className="footer-icon-container"
            href="https://github.com/hazeluwuz/FlashScape"
            target="_blank"
          >
            <i className="fab fa-github fa-xl footer-icon " />
          </a>
          <a
            className="footer-icon-container"
            href="https://www.linkedin.com"
            target="_blank"
          >
            <i className="fab fa-linkedin fa-xl footer-icon " />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
