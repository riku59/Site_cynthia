import React from "react";
import { useCart } from "../hooks/useCart";

const Cart = ({ isVisible }) => {
  const { cartItems } = useCart();

  // Filtrez les éléments nuls ou supprimés
  const validCartItems = cartItems.filter((item) => item.product !== null);

  const total = validCartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <div className={`cart-container ${isVisible ? "visible" : "hiden"}`}>
      <div className="cart-header">
        <h1>Votre Panier</h1>
      </div>
      <div className="cart-items">
        {validCartItems.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <ul>
            {validCartItems.map((item) => (
              <li key={item.product._id}>
                <img
                  src={`http://localhost:5000${item.product.imageUrl}`}
                  alt={item.product.description}
                  width="50"
                />
                <div className="cart_info">
                  <h2>{item.product.description}</h2>
                  <p>Quantité: {item.quantity}</p>
                  <p>Prix unitaire: {item.product.price} €</p>
                  <p>Total: {item.product.price * item.quantity} €</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="cart-footer">
        <div className="total">Total: {total} €</div>
        <a href="/checkout" className="checkout-button">
          Payer
        </a>
      </div>
    </div>
  );
};

export default Cart;
