import React from "react";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { cartItems } = useCart();

  return (
    <div>
      <h1>Votre Panier</h1>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.product._id}>
              <img
                src={`http://localhost:5000${item.product.imageUrl}`}
                alt={item.product.description}
                width="50"
              />
              <div>
                <h2>{item.product.description}</h2>
                <p>Quantité: {item.quantity}</p>
                <p>Prix unitaire: {item.price} €</p>
                <p>Total: {item.total} €</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
