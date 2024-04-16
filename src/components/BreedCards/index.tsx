import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ChosenCatContext } from "../../contexts/ChosenCatContextProvider";
import { CatBreedImage } from "../../lib/types";

import { fetchAPI } from "../../util/fetchApi";
import { BreedCard } from "./BreedCard";
import { uniqById } from "../../util/arrays";
import { CardDeckContext } from "../../contexts/CardDeckContextProvider";

type BreedCardProps = {
    page: number
}

export function BreedCards({ page }: BreedCardProps) {
    const MIN_LIMIT = 4;
    const [images, setImages] = useState<CatBreedImage[]>([]);
    const { chosenCat } = useContext(ChosenCatContext);
    const { updateHasRemainingImages } = useContext(CardDeckContext);

    const apiURL = `${process.env.CAT_API}/v1/images/search?page=${page}&limit=${MIN_LIMIT}&breed_ids=${chosenCat}&api_key=${process.env.CAT_API_KEY}`;

    async function fetchImages() {
        const data = await fetchAPI(apiURL);
        setImages(data);
    }

    async function fetchNextImages() {
        const data = await fetchAPI(apiURL);
        const uniqueCatImages = uniqById<CatBreedImage>(images, data);
        const limit = ((MIN_LIMIT * page) > 0)? MIN_LIMIT * page : MIN_LIMIT
        setImages(uniqueCatImages);
        if (uniqueCatImages.length < limit) {
            updateHasRemainingImages(false)
        }
    }

    useEffect(() => {
        setImages([]);
        if(chosenCat != "") {
            fetchImages();
        }
    }, [chosenCat])

    useEffect(() => {
        if(chosenCat != "") {
            fetchNextImages();
        }
    }, [page])

    return (
        <Container>
            <Row>
                {images.map((image) => 
                <Col key={image.id}>
                    <BreedCard image={image} />
                </Col>
                )}
            </Row>
        </Container>
    )
}