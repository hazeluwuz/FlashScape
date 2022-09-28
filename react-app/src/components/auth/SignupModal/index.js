import React, { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal";
import SignupForm from "./SignUpForm";
import "./SignupModal.css";
function SignupModal() {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <button className="signup-button" onClick={() => setShowModal(true)}>
        Get Started
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="signup-modal">
            <div className="modal-title">Get Started</div>
            <SignupForm closeModal={closeModal} />
            {/* Footer */}
          </div>
        </Modal>
      )}
    </>
  );
}

export default SignupModal;
