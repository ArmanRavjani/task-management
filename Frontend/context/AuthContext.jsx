import { useState, useContext, createContext, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const checkAuth = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/api/auth/user/check",
        { withCredentials: true },
      );
      if (data.success) {
        setAuthUser(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  const values = {
    authUser,
    setAuthUser,
    loading,
    setLoading,
    showAddTask,
    setShowAddTask,
    selectedImage,
    setSelectedImage,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
