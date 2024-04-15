import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { ChosenCatContext } from "../contexts/ChosenCatContextProvider";
import { fetchAPI } from "../util/fetchApi";
import { CatBreed, CatImageDetails } from "../lib/types";
import { useNavigate } from "react-router-dom";
import { Stack } from "react-bootstrap";

export function Details() {
    const { chosenCat } = useContext(ChosenCatContext);
    const [catDetails, setCatDetails] = useState<CatBreed>();
    const [catImages, setCatImages] = useState<CatImageDetails[]>([]);
    const navigate = useNavigate();
    
    async function fetchDetails() {
        const data = await fetchAPI(`${process.env.CAT_API}/v1/breeds/${chosenCat}`);
        setCatDetails(data);
    }

    async function fetchImage() {
        const data = await fetchAPI(`${process.env.CAT_API}/v1/images/search?breed_ids=${chosenCat}`);
        console.log("image data", data);
        setCatImages(data);
    }

    const handleClick = () => {
        navigate(`/cat/${chosenCat}`); // Navigate to the specified route
    };

    useEffect(() => {
        fetchDetails();
        fetchImage();
    }, [])

    return (
        <Container fluid="md">
            <Stack gap={3}>
                <div className="p-2">
                    <Button variant="primary" onClick={handleClick}>Back</Button>
                </div>
                <div className="p-2">
                    <Card>
                        <Card.Img variant="top" src={catImages[0]?.url} />
                        <Card.Body>
                            <Card.Title>{catDetails?.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{catDetails?.origin}</Card.Subtitle>
                            <Card.Text>{catDetails?.temperament}</Card.Text>
                            <blockquote className="blockquote mb-0">
                            <p>
                                {' '}{catDetails?.description}{' '}
                            </p>
                            {/* <footer className="blockquote-footer">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                            </footer> */}
                            </blockquote>
                        </Card.Body>
                    </Card>
                </div>
            </Stack>
        </Container>
    )
}