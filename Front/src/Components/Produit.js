import React, { useEffect, useState } from "react";
import gsap from "gsap/src";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Modal from "react-modal";
import { checkAdmin } from "../utils/auth";
import { deleteProduct, fetchProducts } from "../utils/product";

Modal.setAppElement("#root");

const Produit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".d", {
      scrollTrigger: {
        trigger: ".d",
        start: "top 300px",
        end: "top 0px",
        markers: true,
        scrub: true,
        pin: true,
        x: 250,
        rotation: 360,
        duration: 1,
        ease: "none",
      },
    });

    const fetchData = async () => {
      //vérifie si l'utilisateur est Admin
      const isAdmin = await checkAdmin();
      setIsAdmin(isAdmin);

      // Récupérer les produits
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    formData.append("price", price);

    // ajouter un article
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Produit ajouté:", data);
        setProducts((prevProducts) => [...prevProducts, data]);
        setIsModalOpen(false);
      } else {
        console.error("Erreur lors de l'ajout du produit:", data.message);
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  // supprimer un produit
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
      alert("Article supprimé avec succès!");
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
    }
  };

  return (
    <div>
      <h1>Mes créations</h1>
      {isAdmin && (
        <button onClick={() => setIsModalOpen(true)}>Ajouter un article</button>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Ajouter un article"
      >
        <h2>Ajouter un article</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Photo:
            <input type="file" onChange={handleImageChange} required />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Prix:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <button type="submit">Ajouter</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>
            Annuler
          </button>
        </form>
      </Modal>
      <div className="produit">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <img
              src={`http://localhost:5000${product.imageUrl}`}
              alt={product.description}
            />
            <p>{product.description}</p>
            <p>{product.price} €</p>
            {isAdmin && (
              <button
                onClick={() => handleDelete(product._id)}
                className="delete-button"
              >
                <img src="/path/to/trash-icon.png" alt="Supprimer" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Produit;
