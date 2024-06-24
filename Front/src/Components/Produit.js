import React, { useState } from "react";
// import gsap from "gsap/src";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import Modal from "react-modal";
import useAdminCheck from "../hooks/useAdminCheck";
import useProducts from "../hooks/useProducts";

Modal.setAppElement("#root");

const Produit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const { products, addProduct, deleteProductById } = useProducts();
  const isAdmin = useAdminCheck();

  // gsap.registerPlugin(ScrollTrigger);
  // gsap.to(".d", {
  //   scrollTrigger: {
  //     trigger: ".d",
  //     start: "top 300px",
  //     end: "top 0px",
  //     markers: true,
  //     scrub: true,
  //     pin: true,
  //     x: 250,
  //     rotation: 360,
  //     duration: 1,
  //     ease: "none",
  //   },
  // });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    formData.append("price", price);
    await addProduct(formData); // ajouter un article
    setIsModalOpen(false);
  };

  // supprimer un produit
  const handleDelete = async (id) => {
    await deleteProductById(id);
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
        <form onSubmit={handleAdd}>
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
