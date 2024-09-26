import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext(null);

export default function AppContextProvider({ children }) {
  const [scrollArea, setScrollArea] = useState({
    currentSection: 1,
    prevSection: 0,
  });

  return (
    <AppContext.Provider
      value={{
        scrollArea,
        setScrollArea,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    console.log("Error with a Context");
    return {
      scrollArea: {},
      setScrollArea: () => {},
    };
  }

  return context;
}
