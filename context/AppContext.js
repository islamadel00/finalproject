export const __expo_router_ignore = true;
import React, { createContext, useContext, useState } from "react";
import Toast from "react-native-toast-message";


const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [favorites, setFavorites] = useState([]);

 
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };


const toggleFavorite = (movie) => {
  setFavorites((prevFavorites) => {
    const exists = prevFavorites.some((fav) => fav.id === movie.id);
    if (exists) {
      Toast.show({
        type: "info",
        text1: "Removed from favorites 💔",
        position: "bottom",
      });
      return prevFavorites.filter((fav) => fav.id !== movie.id);
    } else {
      Toast.show({
        type: "success",
        text1: "Added to favorites ❤️",
        position: "bottom",
      });
      return [...prevFavorites, movie];
    }
  });
};


  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        theme,
        toggleTheme,
        favorites,
        toggleFavorite, 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

export default AppContext;
