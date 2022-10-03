import ClassAboutSectionEdit from "../ClassAboutSectionEdit";
import { useState } from "react";
function ClassAboutSection({ field, classData }) {
  const [isEditing, setIsEditing] = useState(false);
  const key = field.toLowerCase();
  return (
    <div className="class-about-container">
      <div className="class-about-title-container">
        <div className="class-about-title">
          {field}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="class-about-edit-button"
            >
              <i className="fas fa-pencil" />
            </button>
          )}
        </div>
      </div>
      <div className="class-about-content-container">
        {isEditing ? (
          <ClassAboutSectionEdit
            classKey={key}
            classData={classData}
            setIsEditing={setIsEditing}
          />
        ) : (
          <div className="class-about-content">
            {classData[key] ||
              `No ${field}. Click the Edit button to add a $
            {field}.`}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassAboutSection;
