const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./cart.db");

const MOCK_PRODUCTS = [
  { name: "Vibe T-Shirt (Black)", price: 25.99 },
  { name: "Vibe Hoodie (Gray)", price: 49.99 },
  { name: "Vibe Beanie", price: 18.0 },
  { name: "Vibe Sticker Pack", price: 7.5 },
  { name: "Vibe Water Bottle", price: 15.0 },
];

db.serialize(() => {
  // Create Products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL
    )
  `);

  // Create Cart table
  db.run(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (productId) REFERENCES products (id)
    )
  `);

  // Seed products table if it's empty
  const stmt = db.prepare("INSERT INTO products (name, price) VALUES (?, ?)");
  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (row.count === 0) {
      console.log("Seeding mock products...");
      MOCK_PRODUCTS.forEach((product) => {
        stmt.run(product.name, product.price);
      });
      console.log("Seeding complete.");
    } else {
      console.log("Database already seeded.");
    }
    stmt.finalize();
  });
});

module.exports = db;
