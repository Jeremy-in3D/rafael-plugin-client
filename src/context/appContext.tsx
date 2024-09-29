import React, { createContext, useContext, useState } from "react";

type AppContextProviderProps = {
  children: React.ReactNode;
};

type Context = {
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: string;
  setModalData: React.Dispatch<React.SetStateAction<string>>;
};

export const AppContext = createContext<Context | null>(null);

export default function AppContextProvider({
  children,
}: AppContextProviderProps) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(true);
  const [modalData, setModalData] = useState<string>("");

  return (
    <AppContext.Provider
      value={{
        modalIsOpen,
        setIsOpen,
        modalData,
        setModalData,
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
      modalIsOpen: false,
      setIsOpen: () => {},
      modalData: "",
      setModalData: () => {},
    };
  }

  return context;
}
