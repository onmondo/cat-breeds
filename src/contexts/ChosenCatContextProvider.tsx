import React, { ReactNode, createContext, useState } from "react";
import { AppContextProps } from "../lib/types";

export const ChosenCatContext = createContext({chosenCat: "", updateChosenCat: (chosenCat: string) => console.log(chosenCat)});

export function ChosenCatContextProvider({ children }: AppContextProps) {
    const [chosenCat, setChosenCat] = useState("")

    function updateChosenCat(chosenCat: string) {
        setChosenCat(chosenCat)

    }
    return (
        <ChosenCatContext.Provider value={{chosenCat, updateChosenCat}}>
            {children}
        </ChosenCatContext.Provider>
    )    

}