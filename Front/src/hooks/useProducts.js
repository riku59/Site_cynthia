import { useEffect, useState } from "react";
import { addProducts, deleteProduct, fetchProducts } from "../utils/product";

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

  const addProduct = async (formData) => {
    try {
      const newProduct = await addProducts(formData);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
    }
  };

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

  return { products, addProduct, deleteProductById };
};

export default useProducts;
