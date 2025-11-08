import React from "react";

function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Checkout Successful!</h2>
        <p>Thank you for your order, {receipt.userDetails.name}.</p>

        <div className="receipt-details">
          <p>
            <strong>Confirmation ID:</strong> {receipt.confirmationId}
          </p>
          <p>
            <strong>Order Total:</strong> ${receipt.total.toFixed(2)}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(receipt.timestamp).toLocaleString()}
          </p>
          <p>
            <strong>Email:</strong> {receipt.userDetails.email}
          </p>
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ReceiptModal;
