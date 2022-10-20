import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
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
          <img src="/assets/1.jpg" />

          <img src="/assets/2.jpg" />

          <img src="/assets/3.jpg" />

          <img src="/assets/4.jpg" />

          <img src="/assets/5.jpg" />

          <img src="/assets/6.jpg" />

          <img src="/assets/7.jpg" />

          <img src="/assets/8.jpg" />
        </Carousel>
      </div>
    </div>
  );
}

export default SplashPage;
