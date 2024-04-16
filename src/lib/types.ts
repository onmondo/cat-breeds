import { ReactNode } from "react"

export type CatBreed = {
    id: string
    name: string
    origin: string
    temperament: string
    description: string
}

export type CatImage = {
    id: string
    url: string
}

export interface CatBreedImage extends CatImage {
    breeds: CatBreed[]
}

export interface CatImageDetails extends CatImage {
    width: number,
    height: number
}

export type AppContextProps = {
    children: ReactNode
};