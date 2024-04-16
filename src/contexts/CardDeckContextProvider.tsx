import React, { ReactNode, createContext, useState } from "react";
import { AppContextProps } from "../lib/types";

export const CardDeckContext = createContext({hasRemainingImages: true, updateHasRemainingImages: (hasRemaining: boolean) => console.log(hasRemaining)});

export function CardDeckContextProvider({ children }: AppContextProps) {
    const [hasRemainingImages, setHasRemainingImages] = useState(true)

    function updateHasRemainingImages(hasRemaining: boolean) {
        setHasRemainingImages(hasRemaining)

    }
    return (
        <CardDeckContext.Provider value={{hasRemainingImages, updateHasRemainingImages}}>
            {children}
        </CardDeckContext.Provider>
    )    

}