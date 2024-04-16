import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ChosenCatContext } from "../contexts/ChosenCatContextProvider";
import { CatBreedImage } from "../lib/types";

import { fetchAPI } from "../util/fetchApi";
import { BreedCard } from "./BreedCard";

type BreedCardProps = {
    limit: number
}
export function BreedCards({ limit }: BreedCardProps) {
    const [images, setImages] = useState<CatBreedImage[]>([]);
    const { chosenCat } = useContext(ChosenCatContext);
    
    async function fetchImages() {
        const apiURL = `${process.env.CAT_API}/v1/images/search?limit=${limit}&breed_ids=${chosenCat}&api_key=${process.env.CAT_API_KEY}`
        const data = await fetchAPI(apiURL);
        setImages(data)
    }

    useEffect(() => {
        if(chosenCat != "") {
            fetchImages();
        }
    }, [chosenCat, limit])

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