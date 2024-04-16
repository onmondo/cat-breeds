import { CatBreed, CatBreedImage } from "./types"

export type BreedCardProps = {
    image: CatBreedImage
}

export type BreedCardDetailsProps = {
    imageId: string,
    catDetails?: CatBreed
}

export type BreedCardsProps = {
    page: number
}