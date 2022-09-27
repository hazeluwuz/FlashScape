import "./SplashPage.css";
function SplashPage() {
  return (
    <div className="main-splash-container">
      <div className="carousel-overlay"></div>
      <div className="splash-details">
        <h1 className="splash-header">Rise to</h1>
        <h1 className="splash-header">your challenge.</h1>
        <h2 className="splash-subheader">
          Flashcards for <b>serious learners.</b>
        </h2>
      </div>
      <div className="carousel-container">
        {/* Plan to implement carousel similar to BrainScape Eventually */}
        <div className="carousel-item"></div>
      </div>
    </div>
  );
}

export default SplashPage;
