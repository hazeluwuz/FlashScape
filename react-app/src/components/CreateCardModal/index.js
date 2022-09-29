import React, { useState, useEffect } from "react";
import { Modal } from "../../context/Modal";
import CreateCardForm from "./CreateCardForm";
import "./CreateCardModal.css";
function CreateCardModal() {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <button className="card-modal-button" onClick={() => setShowModal(true)}>
        <i className="fas fa-plus card-modal-icon"></i>
        <div>Create New Card</div>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="card-modal">
            <div className="modal-title">New Card</div>
            <CreateCardForm closeModal={closeModal} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default CreateCardModal;
