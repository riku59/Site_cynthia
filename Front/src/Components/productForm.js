import React from "react";
import { useForm } from "react-hook-form";

const ProductForm = ({
  onSubmit,
  onImageChange,
  description,
  setDescription,
  price,
  setPrice,
  setIsModalOpen,
  imageRequired = false,
}) => {
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit();
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
      <button type="submit">Soumettre</button>
      <button type="button" onClick={() => setIsModalOpen(false)}>
        Annuler
      </button>
    </form>
  );
};

export default ProductForm;
