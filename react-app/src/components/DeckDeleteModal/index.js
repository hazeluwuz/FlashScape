import React, { useState, useEffect } from "react";
import { Modal } from "../../context/Modal";
import DeckDelete from "./DeckDelete";
import "./DeckDeleteModal.css";
function DeckDeleteModal({ deckData }) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <button className="deck-delete-button" onClick={() => setShowModal(true)}>
        <i class="fa-solid fa-trash"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="class-delete-modal">
            <div className="modal-title">Caution</div>
            <DeckDelete deckData={deckData} closeModal={closeModal} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default DeckDeleteModal;
