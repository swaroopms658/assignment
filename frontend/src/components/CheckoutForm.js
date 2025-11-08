import React, { useState } from "react";

function CheckoutForm({ onCheckout, cartIsEmpty }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill out your name and email.");
      return;
    }
    onCheckout({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h3>Checkout</h3>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={cartIsEmpty}>
        Place Order
      </button>
    </form>
  );
}

export default CheckoutForm;
