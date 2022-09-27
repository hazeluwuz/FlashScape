import React, { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal";
import LoginForm from "./LoginForm";
import "./LoginModal.css";
function LoginModal() {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <button className="login-button" onClick={() => setShowModal(true)}>
        Log In
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="login-modal">
            <div className="modal-title">Log In</div>
            <LoginForm closeModal={closeModal} />
            {/* Footer */}
          </div>
        </Modal>
      )}
    </>
  );
}

export default LoginModal;
