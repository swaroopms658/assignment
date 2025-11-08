# 🛒 Mock E-Commerce Cart — Full Stack Assignment

A fully functional **full-stack shopping cart application** built as part of the **Vibe Commerce Full-Stack Screening Assignment**.  
This project demonstrates a complete **UI → API → DB** workflow simulating an e-commerce cart with a mock checkout flow.

🔗 **GitHub Repository:** https://github.com/swaroopms658/assignment

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React (JavaScript), Axios |
| Backend | Node.js, Express.js |
| Database | SQLite (for persistence) |
| Architecture | REST API |

---

## ✨ Features

### 🧑‍💻 Frontend (React)
- Product listing grid UI
- Add to Cart
- Cart page with:
  - Update quantity
  - Remove item
  - Auto total calculation
- Checkout modal (name + email)
- Mock payment → Receipt popup
- Fully responsive design

### 🔧 Backend (Node + Express + SQLite)
| Method | Endpoint | Description |
|--------|-----------|----------------|
| GET | `/api/products` | Fetch products (5–10 mock items) |
| POST | `/api/cart` | Add to cart `{ productId, qty }` |
| DELETE | `/api/cart/:id` | Remove cart item |
| PATCH | `/api/cart/:id` | Update quantity `{ qty }` |
| GET | `/api/cart` | Get cart with total |
| POST | `/api/checkout` | Process mock checkout & generate receipt |

### ⭐ Bonus Implementations
- SQLite DB persistence for Products, Cart & Orders
- Optional Fake Store API support → `GET /api/products?fake=true`
- Error handling responses on all endpoints

---

## 📂 Project Structure

assignment/
│
├── backend/ # Node + Express + SQLite API
│ ├── index.js
│ ├── db.js
│ ├── package.json
│ └── README.md
│
├── frontend/ # React UI
│ ├── src/
│ ├── package.json
│ └── README.md
│
└── README.md # Main Documentation (this file)


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/swaroopms658/assignment
cd assignment

cd backend
npm install
npm run seed     # seed initial products into SQLite
npm run dev      # start server with nodemon

cd frontend
npm install
npm start

