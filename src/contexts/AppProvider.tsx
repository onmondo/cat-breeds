import React, { createContext, useContext, useState } from "react";
import { AppContextProps } from "../lib/types";

interface AppState {
    chosenCat: string
    hasImagesLeft: boolean
}

interface AppContextValue {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
    updateChosenCat: (chosenCat: string) => void;
    updateHasImagesLeft: (hasImagesLeft: boolean) => void;
}

const AppContext = createContext<AppContextValue>({
    state: { chosenCat: "", hasImagesLeft: true },
    setState: () => {},
    updateChosenCat: () => {},
    updateHasImagesLeft: () => {}
});

export function useAppContext() {
    return useContext(AppContext);
}

// Provides App level component context
export const AppProvider: React.FC<AppContextProps> = ({ children }) => {
    const [state, setState] = useState<AppState>({ chosenCat: "", hasImagesLeft: true });
  
    const updateChosenCat = (chosenCat: string) => {
      setState({ ...state, chosenCat });
    };

    const updateHasImagesLeft = (hasImagesLeft: boolean) => {
        setState({ ...state, hasImagesLeft });
    }
  
    // Value object that includes both state and update function
    const value: AppContextValue = {
        state,
        setState,
        updateChosenCat,
        updateHasImagesLeft,
    };
  
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
