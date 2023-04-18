import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import ClassForm from "./ClassForm";
import "./ClassModal.css";
function ClassModal({ edit }) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <button className="class-modal-button" onClick={() => setShowModal(true)}>
        {edit ? (
          <i class="fa-solid fa-pencil class-edit-button"></i>
        ) : (
          <i class="fa-solid fa-plus class-button"></i>
        )}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="class-modal">
            <div className="modal-title">New Class</div>
            <ClassForm closeModal={closeModal} edit={edit} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default ClassModal;
