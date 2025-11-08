const express = require("express");
const cors = require("cors");
const db = require("./database.js");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// --- API Routes ---

// GET /api/products: 5-10 mock items
app.get("/api/products", (req, res) => {
  try {
    db.all("SELECT * FROM products", [], (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  } catch (err) {
    res.status(500).json({ error: "Server error fetching products" });
  }
});

// GET /api/cart: Get cart + total.
app.get("/api/cart", (req, res) => {
  try {
    db.all("SELECT * FROM cart", [], (err, items) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
      }

      // Calculate total on the server
      db.get("SELECT SUM(price * quantity) as total FROM cart", (err, row) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: err.message });
        }
        res.json({
          items: items,
          total: row.total || 0,
        });
      });
    });
  } catch (err) {
    res.status(500).json({ error: "Server error fetching cart" });
  }
});

// POST /api/cart: Add {productId, qty}.
app.post("/api/cart", (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid productId or quantity" });
  }

  try {
    // 1. Get product details from the products table
    db.get(
      "SELECT * FROM products WHERE id = ?",
      [productId],
      (err, product) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }

        // 2. Check if item is already in cart
        db.get(
          "SELECT * FROM cart WHERE productId = ?",
          [productId],
          (err, cartItem) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            if (cartItem) {
              // 3a. If yes, update quantity
              const newQuantity = cartItem.quantity + quantity;
              db.run(
                "UPDATE cart SET quantity = ? WHERE id = ?",
                [newQuantity, cartItem.id],
                function (err) {
                  if (err) {
                    return res.status(500).json({ error: err.message });
                  }
                  res.json({ ...cartItem, quantity: newQuantity });
                }
              );
            } else {
              // 3b. If no, insert new item
              const { name, price } = product;
              db.run(
                "INSERT INTO cart (productId, name, price, quantity) VALUES (?, ?, ?, ?)",
                [productId, name, price, quantity],
                function (err) {
                  if (err) {
                    return res.status(500).json({ error: err.message });
                  }
                  res
                    .status(201)
                    .json({
                      id: this.lastID,
                      productId,
                      name,
                      price,
                      quantity,
                    });
                }
              );
            }
          }
        );
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Server error adding to cart" });
  }
});

// DELETE /api/cart/:id: Remove item.
app.delete("/api/cart/:id", (req, res) => {
  const { id } = req.params;
  try {
    db.run("DELETE FROM cart WHERE id = ?", [id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Cart item not found" });
      }
      res.json({ message: "Item removed" });
    });
  } catch (err) {
    res.status(500).json({ error: "Server error removing from cart" });
  }
});

// POST /api/checkout: {cartItems} → mock receipt (total, timestamp).
app.post("/api/checkout", (req, res) => {
  const userDetails = req.body; // e.g., { name, email }

  try {
    // 1. Get the current cart total
    db.get("SELECT SUM(price * quantity) as total FROM cart", (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const total = row.total || 0;
      if (total === 0) {
        return res
          .status(400)
          .json({ error: "Cannot checkout with an empty cart" });
      }

      // 2. Clear the cart
      db.run("DELETE FROM cart", [], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // 3. Send mock receipt
        const receipt = {
          confirmationId: `VIBE-${Date.now()}`,
          timestamp: new Date().toISOString(),
          total: total,
          userDetails: userDetails,
        };
        res.status(200).json(receipt);
      });
    });
  } catch (err) {
    res.status(500).json({ error: "Server error during checkout" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
