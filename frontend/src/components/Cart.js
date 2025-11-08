import React from "react";

function Cart({ cart, onRemoveFromCart }) {
  if (!cart.items || cart.items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart-contents">
      {cart.items.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-details">
            <span className="name">{item.name}</span>
            <span className="quantity">
              Qty: {item.quantity} @ ${item.price.toFixed(2)}
            </span>
          </div>
          <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3 className="cart-total">Total: ${cart.total.toFixed(2)}</h3>
    </div>
  );
}

export default Cart;
