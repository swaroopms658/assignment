import React from "react";

function ProductList({ products, onAddToCart }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <div>
            <h3>{product.name}</h3>
            <div className="price">${product.price.toFixed(2)}</div>
          </div>
          <button onClick={() => onAddToCart(product.id, 1)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
