import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { CatImageDetails, CatBreed } from "../../lib/types";
import { BreedCardDetailsLoader } from "./loader";
import { fetchAPI } from "../../util/fetchApi";
import { BreedCardDetailsProps } from "../../lib/typeProps";

export const BreedCardDetails: React.FC<BreedCardDetailsProps> = ({ imageId, catDetails }) => {

    const [catImageLoaded, setCatImageLoaded] = useState(false);
    const [catImage, setCatImage] = useState<CatImageDetails>();

    async function fetchImage(imageId: string) {
        const data = await fetchAPI(`${process.env.CAT_API}/v1/images/${imageId}`);
        setCatImage(data);
    }

    useEffect(() => {
        fetchImage(imageId);
    }, [])

    useEffect(() => {
        const img = new Image();

        img.onload = () => {
            setCatImageLoaded(true)
        }
        img.src = catImage?.url || ""
    }, [catImage?.url])

    return (
        (catImageLoaded) 
        ?
        <Card>
            <Card.Img variant="top" src={catImage?.url} />
            <Card.Body>
                <Card.Title>{catDetails?.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{catDetails?.origin}</Card.Subtitle>
                <Card.Text>{catDetails?.temperament}</Card.Text>
                <blockquote className="blockquote mb-0">
                <p>
                    {' '}{catDetails?.description}{' '}
                </p>
                </blockquote>
            </Card.Body>
        </Card>
        :
        <BreedCardDetailsLoader />
    )
}