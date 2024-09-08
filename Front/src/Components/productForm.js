import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CATEGORIES } from "../constants/categories";

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
  existingImage = null,
}) => {
  const { register, handleSubmit } = useForm();
  const [imagePreview, setImagePreview] = useState(existingImage);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      onImageChange(e); // Appeler la fonction passée en prop
    }
  };

  useEffect(() => {
    // Réinitialiser l'aperçu lorsque l'image existante change
    setImagePreview(existingImage);
  }, [existingImage]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    setCategory((prevCategory) => {
      if (checked) {
        // Ajouter la catégorie si elle est cochée
        return [...prevCategory, value];
      } else {
        // Supprimer la catégorie si elle est décochée
        return prevCategory.filter((cat) => cat !== value);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label>
        Photo:
        <input
          type="file"
          {...register("image", { required: imageRequired })}
          onChange={handleImageChange}
        />
      </label>
      {imagePreview && (
        <div>
          <img
            src={imagePreview}
            alt="Aperçu"
            style={{ maxWidth: "100px", maxHeight: "100px", marginTop: "10px" }}
          />
        </div>
      )}
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
          {CATEGORIES.map((cat) => (
            <div key={cat}>
              <input
                type="checkbox"
                value={cat}
                checked={Array.isArray(category) && category.includes(cat)}
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
