import React, { createContext, useContext, useState } from "react";
import { AppContextProps } from "../lib/types";

interface AppState {
    chosenCat: string
    hasImagesLeft: boolean
    hasAPIError: boolean
}

interface AppContextValue {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
    updateChosenCat: (chosenCat: string) => void;
    updateHasImagesLeft: (hasImagesLeft: boolean) => void;
    updateHasAPIError: (hasAPIError: boolean) => void
}

const AppContext = createContext<AppContextValue>({
    state: { 
        chosenCat: "", 
        hasImagesLeft: true,
        hasAPIError: false
    },
    setState: () => {},
    updateChosenCat: () => {},
    updateHasImagesLeft: () => {},
    updateHasAPIError: () => {}
});

export function useAppContext() {
    return useContext(AppContext);
}

// Provides App level component context
export const AppProvider: React.FC<AppContextProps> = ({ children }) => {
    const [state, setState] = useState<AppState>({ 
        chosenCat: "", 
        hasImagesLeft: true,
        hasAPIError: false
    });
  
    const updateChosenCat = (chosenCat: string) => {
      setState({ ...state, chosenCat });
    };

    const updateHasImagesLeft = (hasImagesLeft: boolean) => {
        setState({ ...state, hasImagesLeft });
    }

    const updateHasAPIError = (hasAPIError: boolean) => {
        setState({ ...state, hasAPIError });
    }
  
    // Value object that includes both state and update function
    const value: AppContextValue = {
        state,
        setState,
        updateChosenCat,
        updateHasImagesLeft,
        updateHasAPIError
    };
  
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
