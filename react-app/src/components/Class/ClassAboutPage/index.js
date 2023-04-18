import "./ClassAboutPage.css";
import ClassAboutSection from "./ClassAboutSection";
function ClassAboutPage({ classData }) {
  return (
    <div className="class-about-outer-container">
      <ClassAboutSection field="Purpose" classData={classData} />
      <ClassAboutSection field="Description" classData={classData} />
    </div>
  );
}

export default ClassAboutPage;
