import React, { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal";
import CardDelete from "./CardDelete";
import "./CardDeleteModal.css";
function CardDeleteModal({ setShowModal, showModal, cardData }) {
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <button
        className="card-edit-action-button"
        onMouseDown={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
      >
        <i className="fas fa-trash"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="class-delete-modal">
            <div className="modal-title">Caution</div>
            <CardDelete cardData={cardData} closeModal={closeModal} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default CardDeleteModal;
