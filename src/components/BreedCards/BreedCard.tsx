import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom";
import { CatBreedImage } from "../../lib/types"
import React, { useEffect, useState } from "react";
import { BreedCardLoader } from "./BreedCardLoader";
import { BreedCardProps } from "../../lib/typeProps";

export const BreedCard: React.FC<BreedCardProps> = ({ image }) => {
    const navigate = useNavigate();

    function handleViewDetails(catImage: CatBreedImage) {
        navigate(`/cat/${catImage.breeds[0].id}/image/${catImage.id}`)
    }
    
    const [catImageLoaded, setCatImageLoaded] = useState(false);
    
    useEffect(() => {
        const img = new Image();

        img.onload = () => {
            setCatImageLoaded(true)
        }
        img.src = image.url
    }, [image.url])

    return (
        (catImageLoaded) 
        ?
        <Card className="text-center" style={{ width: '16rem' }}>
            <Card.Img variant="top" src={image.url} />
            <Card.Body>
                <Button 
                    variant="primary"
                    onClick={() => {handleViewDetails(image)}}
                >
                    View details
                </Button>
            </Card.Body>
        </Card>
        :
        <BreedCardLoader />
    )
}