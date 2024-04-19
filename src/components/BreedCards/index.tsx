import React, { useEffect, useState } from "react";

import { useAppContext } from "../../contexts/AppProvider";
import { fetchAPI } from "../../util/fetchApi";
import { uniqById } from "../../util/arrays";
import { CatBreedImage } from "../../lib/types";
import { BreedCardsProps } from "../../lib/typeProps";

import { BreedCard } from "./BreedCard";

export const BreedCards: React.FC<BreedCardsProps> = ({ page }) => {
    const MIN_LIMIT = 4;
    const [images, setImages] = useState<CatBreedImage[]>([]);
    const { state, updateHasImagesLeft, updateHasAPIError } = useAppContext();
    const apiURL = `${process.env.CAT_API}/v1/images/search?page=${page}&limit=${MIN_LIMIT}&breed_ids=${state.chosenCat}&api_key=${process.env.CAT_API_KEY}`;

    async function fetchImages() {
        try {
            const data = await fetchAPI(apiURL);
            setImages(data);
        } catch(error) {
            updateHasAPIError(true)
        }
    }

    async function fetchNextImages() {
        try {
            const data = await fetchAPI(apiURL);
            const uniqueCatImages = uniqById<CatBreedImage>(images, data);
            const limit = ((MIN_LIMIT * page) > 0)? MIN_LIMIT * page : MIN_LIMIT
            setImages(uniqueCatImages);
            if (uniqueCatImages.length < limit) {
                updateHasImagesLeft(false)
            }
        } catch(error) {
            updateHasAPIError(true)
        }
    }

    useEffect(() => {
        setImages([]);
        if(state.chosenCat != "") {
            fetchImages();
        }
    }, [state.chosenCat])

    useEffect(() => {
        if(state.chosenCat != "") {
            fetchNextImages();
        }
    }, [page])

    return (
        <section id="catimages">
            {images.map((image) => 
            <div key={image.id}>
                <BreedCard image={image} />
            </div>
            )}
        </section>
    )
}