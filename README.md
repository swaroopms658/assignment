# Mock E-Commerce Cart — Full‑Stack Assignment

A simple full‑stack shopping cart application built for the Vibe Commerce Full‑Stack screening assignment.  
This repository demonstrates a complete UI → API → DB workflow: React frontend, Node/Express API, and SQLite persistence. It includes a mock checkout flow and basic order receipt generation.

Repository: https://github.com/swaroopms658/assignment

## Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Installation & Running Locally](#installation--running-locally)
- [Scripts](#scripts)
- [Notes](#notes)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Tech Stack
- Frontend: React (JavaScript), Axios
- Backend: Node.js, Express
- Database: SQLite (file persistence)
- Architecture: REST API

## Features
Frontend
- Product listing grid
- Add product to cart
- Cart page with:
  - Update item quantity
  - Remove item
  - Auto-calculated totals
- Checkout modal (collects name + email)
- Mock payment flow → receipt popup
- Responsive layout

Backend
- Persistent storage using SQLite for Products, Cart, and Orders
- Error handling for endpoints
- Optional Fake Store API support for product fetching

## API Endpoints
The backend exposes the following REST endpoints:

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/products | List products (supports `?fake=true` to use Fake Store API) |
| GET | /api/cart | Get cart items with totals |
| POST | /api/cart | Add item to cart — body: `{ productId, qty }` |
| PATCH | /api/cart/:id | Update cart item quantity — body: `{ qty }` |
| DELETE | /api/cart/:id | Remove an item from the cart |
| POST | /api/checkout | Process mock checkout and create a receipt |

All endpoints return appropriate success/error JSON responses.

## Project Structure
assignment/
```
backend/        # Node + Express + SQLite API
  ├─ index.js
  ├─ db.js
  ├─ package.json
  └─ README.md

frontend/       # React application
  ├─ src/
  ├─ package.json
  └─ README.md

README.md       # This file
```

## Installation & Running Locally

1. Clone the repository
```bash
git clone https://github.com/swaroopms658/assignment.git
cd assignment
```

2. Backend
```bash
cd backend
npm install
npm run seed     # (if provided) seeds initial products into SQLite
npm run dev      # starts server (nodemon)
# or: npm start  # production mode
```

3. Frontend
```bash
cd ../frontend
npm install
npm start
```

Open the frontend in your browser (usually http://localhost:3000). The frontend communicates with the backend (commonly http://localhost:4000 or the port set in backend/index.js).

## Scripts
Check each package.json for available scripts:
- backend/package.json: start, dev, seed (example)
- frontend/package.json: start, build, test (example)

Adjust ports or environment variables if needed (e.g., proxy in frontend package.json or BACKEND_URL env var).

## Notes & Tips
- SQLite file is used for persistence — you can inspect it with any SQLite client.
- The seed script (backend) populates initial mock products.
- If using the Fake Store API option, ensure outbound network requests are allowed.

## Contributing
Contributions are welcome. Please open issues or pull requests with a clear description of the change. For larger changes, open an issue first to discuss design.

## License
This project does not include a formal license file. Add one (e.g., MIT) if you wish to permit reuse.

## Contact
Maintainer: swaroopms658  
Repo: https://github.com/swaroopms658/assignment
