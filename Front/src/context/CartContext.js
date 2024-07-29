import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      // logique pour ajouter un article
      break;
    // autres cas
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const initialState = { items: [] };
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
