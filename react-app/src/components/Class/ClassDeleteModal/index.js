import React, { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal";
import ClassDelete from "./ClassDelete";
import "./ClassDeleteModal.css";
function ClassDeleteModal({ classData }) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <button className="class-modal-delete" onClick={() => setShowModal(true)}>
        <i class="fa-solid fa-x"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="class-delete-modal">
            <div className="modal-title">Caution</div>
            <ClassDelete classData={classData} closeModal={closeModal} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default ClassDeleteModal;
