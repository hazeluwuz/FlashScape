import React, { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal";
import DeckForm from "./DeckForm";
import "./DeckModal.css";
function DeckModal({ edit }) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <button
        className="deck-modal-button"
        id="create-deck-button"
        onClick={() => setShowModal(true)}
      >
        {edit ? (
          <i className="fa-solid fa-pencil deck-edit-button"></i>
        ) : (
          <i className="fa-solid fa-plus deck-button"></i>
        )}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="deck-modal">
            <div className="modal-title">New Deck</div>
            <DeckForm closeModal={closeModal} edit={edit} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default DeckModal;
