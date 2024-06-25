export const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/products");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des produits.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    throw error;
  }
};

export const addProducts = async (formData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("l'utilisateur n'est pas identifié.");
  }

  try {
    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error(" Erreur lors de l'ajout du produit");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur réseau:", error);
    throw error;
  }
};

export const updateProduct = async (id, formData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("l'utilisateur n'est pas identifié.");
  }

  try {
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour du produit");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur réseau:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du produit");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur réseau:", error);
    throw error;
  }
};
