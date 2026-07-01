import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false); // 👈 Novo estado

  // Carrega o usuário ao iniciar
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Erro ao carregar o usuário do localStorage:", error);
      setCurrentUser(null);
    } finally {
      setIsUserLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  const clearUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, clearUser, isUserLoaded }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
