import React from "react";
import { useForm } from "react-hook-form";

const ProductForm = ({
  onSubmit,
  onImageChange,
  description,
  setDescription,
  price,
  setPrice,
  category,
  setCategory,
  setIsModalOpen,
  imageRequired = false,
}) => {
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit();
  };

  const categories = [
    "disney",
    "jeux vidéo",
    "verre",
    "ardoise",
    "fleur",
    "mirroir",
  ];

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Ajouter la catégorie si elle est cochée
      setCategory([...category, value]);
    } else {
      // Supprimer la catégorie si elle est décochée
      setCategory(category.filter((cat) => cat !== value));
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label>
        Photo:
        <input
          type="file"
          {...register("image", { required: imageRequired })}
          onChange={onImageChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          {...register("description", { required: true })}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Prix:
        <input
          type="number"
          {...register("price", { required: true })}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label>
        Catégorie:
        <div>
          {categories.map((cat) => (
            <div key={cat}>
              <input
                type="checkbox"
                value={cat}
                checked={category.includes(cat)}
                onChange={handleCategoryChange}
              />
              <label>{cat}</label>
            </div>
          ))}
        </div>
      </label>
      <button type="submit">Soumettre</button>
      <button type="button" onClick={() => setIsModalOpen(false)}>
        Annuler
      </button>
    </form>
  );
};

export default ProductForm;
