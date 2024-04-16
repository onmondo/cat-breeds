import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { CatImageDetails, CatBreed } from "../lib/types";
import { BreedCardDetailsLoader } from "./BreedCardDetailsLoader";

type BreedCardDetailsProps = {
    catImages: CatImageDetails[],
    catDetails?: CatBreed
}

export function BreedCardDetails({ catImages, catDetails}: BreedCardDetailsProps) {
    const firstImage = catImages[0];

    const [catImageLoaded, setCatImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();

        img.onload = () => {
            setCatImageLoaded(true)
        }
        img.src = firstImage?.url
    }, [firstImage?.url])

    return (
        (catImageLoaded) 
        ?
        <Card>
            <Card.Img variant="top" src={firstImage?.url} />
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