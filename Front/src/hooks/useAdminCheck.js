import { useState, useEffect } from "react";
import { checkAdmin } from "../utils/auth";

const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const result = await checkAdmin();
      setIsAdmin(result);
    };

    verifyAdmin();
  }, []);

  return isAdmin;
};

export default useAdminCheck;
