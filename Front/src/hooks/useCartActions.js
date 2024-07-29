import { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Assurez-vous de créer ce contexte

export function useCartActions() {
  const { dispatch } = useContext(CartContext);

  const addToCart = async (productId, quantity) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
        credentials: "include",
      });
      const newCartItem = await response.json();
      if (response.ok) {
        dispatch({ type: "ADD_ITEM", payload: newCartItem });
        console.log("Article ajouté.");
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  return { addToCart };
}
