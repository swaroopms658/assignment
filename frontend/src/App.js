import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import ReceiptModal from "./components/ReceiptModal";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);

  // --- Data Fetching ---

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
      console.error(err);
    }
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      const response = await axios.get("/api/cart");
      setCart(response.data);
    } catch (err) {
      setError("Failed to fetch cart.");
      console.error(err);
    }
  }, []);

  // Fetch initial data on mount
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [fetchProducts, fetchCart]);

  // --- Event Handlers ---

  const handleAddToCart = async (productId, quantity) => {
    try {
      await axios.post("/api/cart", { productId, quantity });
      fetchCart(); // Re-fetch cart to update state
    } catch (err) {
      setError("Failed to add item to cart.");
      console.error(err);
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      await axios.delete(`/api/cart/${cartItemId}`);
      fetchCart(); // Re-fetch cart to update state
    } catch (err) {
      setError("Failed to remove item from cart.");
      console.error(err);
    }
  };

  const handleCheckout = async (userDetails) => {
    try {
      const response = await axios.post("/api/checkout", userDetails);
      setReceipt(response.data); // Show receipt modal
      setCart({ items: [], total: 0 }); // Clear cart in UI immediately
    } catch (err) {
      setError("Checkout failed.");
      console.error(err);
    }
  };

  const closeReceipt = () => {
    setReceipt(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Vibe Commerce</h1>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <main className="container">
        <div className="products-container">
          <h2>Products</h2>
          <ProductList products={products} onAddToCart={handleAddToCart} />
        </div>

        <div className="cart-container">
          <h2>Your Cart</h2>
          <Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />

          <CheckoutForm
            onCheckout={handleCheckout}
            cartIsEmpty={cart.items.length === 0}
          />
        </div>
      </main>

      {receipt && <ReceiptModal receipt={receipt} onClose={closeReceipt} />}
    </div>
  );
}

export default App;
