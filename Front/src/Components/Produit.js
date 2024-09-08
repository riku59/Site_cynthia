import React, { useEffect, useState } from "react";
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
  const [category, setcategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const { products, addProduct, deleteProductById, modifProduct } =
    useProducts();
  const isAdmin = useAdminCheck();
  const { addToCart } = useCartActions();

  const parseCategories = (categoriesStr) => {
    try {
      return JSON.parse(categoriesStr);
    } catch (error) {
      return [];
    }
  };

  // Filtrage des produits selon les catégories sélectionnées
  const filteredProducts = products.filter((product) => {
    const productCategories = parseCategories(product.category); // Convertir les catégories JSON en tableau

    // Vérifiez que toutes les catégories sélectionnées sont présentes dans les catégories du produit
    return selectedCategories.every((cat) => productCategories.includes(cat));
  });

  useEffect(() => {
    // Réinitialiser les catégories sélectionnées si les produits changent
    setSelectedCategories([]);
  }, [products]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAdd = async (e) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", JSON.stringify(category));
    await addProduct(formData);
    setIsModalOpen(false);
  };

  const handleEdit = async () => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", JSON.stringify(category));
    await modifProduct(currentProduct._id, formData);
    setEditModalOpen(false);
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setDescription(product.description);
    setPrice(product.price);
    setcategory(product.category);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteProductById(id);
  };

  const handleCategoryFilterChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== value));
    }
  };

  return (
    <div>
      <h1>Mes créations</h1>

      <div>
        <h2>Filtrer par catégorie</h2>
        <div>
          {["disney", "jeux vidéo", "verre", "ardoise", "fleur", "mirroir"].map(
            (cat) => (
              <div key={cat}>
                <input
                  type="checkbox"
                  value={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={handleCategoryFilterChange}
                />
                <label>{cat}</label>
              </div>
            )
          )}
        </div>
      </div>

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
          category={category}
          setCategory={setcategory}
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
          setCategory={setcategory}
          setIsModalOpen={setEditModalOpen}
          imageRequired={false}
        />
      </Modal>
      <div className="produit">
        {filteredProducts.map((product) => (
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