export const checkAdmin = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const response = await fetch("http://localhost:5000/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.user && data.user.role === "admin") {
      return true;
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du rôle admin:", error);
  }
  return false;
};
