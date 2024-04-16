import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { ChosenCatContext } from "../contexts/ChosenCatContextProvider";
import { BreedCardDetails } from "../components/BreedCardDetails";
import { fetchAPI } from "../util/fetchApi";
import { CatBreed, CatImageDetails } from "../lib/types";
import ErrorBoundary from "../errorHandlers/ErrorBoundary";
import { BreedsRetrievalError } from "../errorHandlers/BreedSelection/BreedsRetrievalError";

export function Details() {
    const { id } = useParams();
    const { chosenCat } = useContext(ChosenCatContext);
    const [catDetails, setCatDetails] = useState<CatBreed>();
    const [catImages, setCatImages] = useState<CatImageDetails[]>([]);
    const navigate = useNavigate();
    
    async function fetchDetails() {
        const data = await fetchAPI(`${process.env.CAT_API}/v1/breeds/${chosenCat || id}`);
        setCatDetails(data);
    }

    async function fetchImage() {
        const data = await fetchAPI(`${process.env.CAT_API}/v1/images/search?breed_ids=${chosenCat || id}`);
        setCatImages(data);
    }

    const handleClick = () => {
        navigate(`/cat/${chosenCat || id}`); // Navigate to the specified route
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
                    <BreedCardDetails catImages={catImages} catDetails={catDetails} />
                </div>
            </Stack>
        </Container>
    )
}