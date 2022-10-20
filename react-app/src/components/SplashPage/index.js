import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";
import img7 from "./images/7.jpg";
import img8 from "./images/8.jpg";
import Footer from "../Footer";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import "./SplashPage.css";
function SplashPage() {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  if (user) {
    history.push("/dashboard");
  }

  return (
    <div className="main-splash-container">
      <div className="carousel-overlay"></div>
      <div className="splash-details">
        <h1 className="splash-header">{`Rise to
        your challenge.`}</h1>
        <h2 className="splash-subheader">
          Flashcards for <b>serious learners.</b>
        </h2>
        <Footer />
      </div>
      <div className="carousel-container">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          showIndicators
          interval={5000}
          transitionTime={1000}
          styles={{ ...styles, height: "100%" }}
        >
          <img src={img1} />

          <img src={img2} />

          <img src={img3} />

          <img src={img4} />

          <img src={img5} />

          <img src={img6} />

          <img src={img7} />

          <img src={img8} />
        </Carousel>
      </div>
    </div>
  );
}

export default SplashPage;
