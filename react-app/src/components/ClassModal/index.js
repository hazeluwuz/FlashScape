import React, { useState, useEffect } from "react";
import { Modal } from "../../context/Modal";
import ClassForm from "./ClassForm";
import "./ClassModal.css";
function ClassModal() {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <button className="class-modal-button" onClick={() => setShowModal(true)}>
        <i class="fa-solid fa-plus class-button"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="class-modal">
            <div className="modal-title">New Class</div>
            <ClassForm closeModal={closeModal} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default ClassModal;
