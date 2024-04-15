import React, { ReactNode, createContext, useState } from "react";

export const ChosenCatContext = createContext({chosenCat: "", updateChosenCat: (chosenCat: string) => console.log(chosenCat)});

type AppContextProps = {
    children: ReactNode
};

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