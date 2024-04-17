import React, { useEffect, useState } from "react";

import { useAppContext } from "../../contexts/AppProvider";
import { fetchAPI } from "../../util/fetchApi";
import { uniqById } from "../../util/arrays";
import { CatBreedImage } from "../../lib/types";
import { BreedCardsProps } from "../../lib/typeProps";

import { BreedCard } from "./BreedCard";
import "./index.scss";

export const BreedCards: React.FC<BreedCardsProps> = ({ page }) => {
    const MIN_LIMIT = 4;
    const [images, setImages] = useState<CatBreedImage[]>([]);
    const { 
        state, 
        updateHasImagesLeft, 
        updateHasAPIError, 
        updateDeckHeight
    } = useAppContext();
    const apiURL = `${process.env.CAT_API}/v1/images/search?page=${page}&limit=${MIN_LIMIT}&breed_ids=${state.chosenCat}&api_key=${process.env.CAT_API_KEY}`;

    async function fetchImages() {
        try {
            const data = await fetchAPI(apiURL);
            setImages(data);
            updateDeckHeight(20);
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


    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
  
    useEffect(() => {
      // Add event listener when component mounts
      window.addEventListener('resize', handleResize);
  
      // Remove event listener when component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const currentNumCardsAsPerScreenWidth = windowWidth/256
    const numberOfpixelsToAdd = 10;
    console.log((currentNumCardsAsPerScreenWidth/numberOfpixelsToAdd)*currentNumCardsAsPerScreenWidth)
    return (
        // <Container>
        //     <Row>
        <section id="catimages" style={{ height: `${state.deckHeight}rem` }}>
            {images.map((image) => 
            <div key={image.id}>
                <BreedCard image={image} />
            </div>
            )}
        </section>

        //     </Row>
        // </Container>
    )
}