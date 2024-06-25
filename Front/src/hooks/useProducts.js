import { useEffect, useState } from "react";
import {
  addProducts,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../utils/product";

const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // récupère les produits
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };

    fetchData();
  }, []);

  // ajout d'un produit
  const addProduct = async (formData) => {
    try {
      const newProduct = await addProducts(formData);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
    }
  };
  // modifier un produit.
  const modifProduct = async (id, formData) => {
    try {
      const updatedProduct = await updateProduct(id, formData);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? updatedProduct : product
        )
      );
    } catch (error) {
      console.error("Erreur lors de la modification du produit", error);
    }
  };

  //supprimer un produit
  const deleteProductById = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression du produit", error);
    }
  };

  return { products, addProduct, deleteProductById, modifProduct };
};

export default useProducts;
