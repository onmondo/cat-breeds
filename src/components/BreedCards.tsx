import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { ChosenCatContext } from "../contexts/ChosenCatContextProvider";
import { CatBreedImage } from "../lib/types";
import { CardGroup, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../util/fetchApi";

export function BreedCards() {
    const [images, setImages] = useState<CatBreedImage[]>([]);
    const { chosenCat } = useContext(ChosenCatContext);
    const navigate = useNavigate();
    async function fetchImages() {
        const apiURL = `${process.env.CAT_API}/v1/images/search?limit=10&breed_ids=${chosenCat}&api_key=${process.env.CAT_API_KEY}`
        const data = await fetchAPI(apiURL);
        setImages(data)
    }

    function handleViewDetails(catImage: CatBreedImage) {
        navigate(`/cat/${catImage.breeds[0].id}/image/${catImage.id}`)
    }

    useEffect(() => {
        if(chosenCat != "") {
            fetchImages();
        }
    }, [chosenCat])

    return (
        <Container>
            <Row>
                {images.map((image) => 
                <Col key={image.id}>
                    <Card className="text-center" style={{ width: '18rem' }}>
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
                </Col>
                )}
            </Row>
        </Container>
        // <CardGroup>
        //     {images.map((image) => 
        //         <Card key={image.id} className="text-center" style={{ width: '18rem' }}>
        //             <Card.Img variant="top" src={image.url} />
        //             <Card.Body>
        //                 <Button 
        //                     variant="primary"
        //                     onClick={() => {handleViewDetails(image)}}
        //                 >
        //                     View details
        //                 </Button>
        //             </Card.Body>
        //         </Card>
        //         )}
        // </CardGroup>

    )
}