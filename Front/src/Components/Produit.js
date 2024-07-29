import React, { useState } from "react";
// import gsap from "gsap/src";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import Modal from "react-modal";
import useAdminCheck from "../hooks/useAdminCheck";
import useProducts from "../hooks/useProducts";
import ProductForm from "./productForm";
import { FaPen, FaTrash } from "react-icons/fa";
import { useCartActions } from "../hooks/useCartActions";

Modal.setAppElement("#root");

const Produit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const { products, addProduct, deleteProductById, modifProduct } =
    useProducts();
  const isAdmin = useAdminCheck();
  const { addToCart } = useCartActions();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAdd = async (e) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    formData.append("price", price);
    await addProduct(formData);
    setIsModalOpen(false);
  };

  const handleEdit = async (e) => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("description", description);
    formData.append("price", price);
    await modifProduct(currentProduct._id, formData);
    setEditModalOpen(false);
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setDescription(product.description);
    setPrice(product.price);
    setEditModalOpen(true);
  };

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
        <ProductForm
          onSubmit={handleAdd}
          onImageChange={handleImageChange}
          description={description}
          setDescription={setDescription}
          price={price}
          setPrice={setPrice}
          setIsModalOpen={setIsModalOpen}
          imageRequired={true}
        />
      </Modal>
      <Modal
        isOpen={editModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        contentLabel="Modifier un article"
      >
        <h2>Modifier un article</h2>
        <ProductForm
          onSubmit={handleEdit}
          onImageChange={handleImageChange}
          description={description}
          setDescription={setDescription}
          price={price}
          setPrice={setPrice}
          setIsModalOpen={setEditModalOpen}
          imageRequired={false}
        />
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
            {isAdmin ? (
              <>
                <button
                  onClick={() => openEditModal(product)}
                  className="edit-button"
                >
                  <FaPen />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="delete-button"
                >
                  <FaTrash />
                </button>
              </>
            ) : (
              <button onClick={() => addToCart(product._id, 1)}>
                Ajouter au panier
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Produit;
