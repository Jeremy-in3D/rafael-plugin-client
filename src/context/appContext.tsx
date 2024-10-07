import React, { createContext, useContext, useState } from "react";

type AppContextProviderProps = {
  children: React.ReactNode;
};

type Context = {
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: string;
  setModalData: React.Dispatch<React.SetStateAction<string>>;
  searchOption: string;
  setSearchOption: React.Dispatch<React.SetStateAction<string>>;
  fullPluginData: any;
  setFullPluginData: React.Dispatch<any>;
  operationType: string;
  setOperationType: React.Dispatch<React.SetStateAction<string>>;
};

export const AppContext = createContext<Context | null>(null);

export default function AppContextProvider({
  children,
}: AppContextProviderProps) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<string>("");
  const [searchOption, setSearchOption] = useState<string>("");
  const [fullPluginData, setFullPluginData] = useState<any>(null);
  const [operationType, setOperationType] = useState<string>("Maintenance");

  return (
    <AppContext.Provider
      value={{
        modalIsOpen,
        setIsOpen,
        modalData,
        setModalData,
        searchOption,
        setSearchOption,
        fullPluginData,
        setFullPluginData,
        operationType,
        setOperationType,
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
      searchOption: "",
      setSearchOption: () => {},
      fullPluginData: "",
      setFullPluginData: () => {},
      operationType: "",
      setOperationType: () => {},
    };
  }

  return context;
}
