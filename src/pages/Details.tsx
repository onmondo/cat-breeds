import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useAppContext } from "../contexts/AppProvider";

import { fetchAPI } from "../util/fetchApi";
import { CatBreed } from "../lib/types";
import { ApiErrorAlertBox } from "../components/ApiErrorAlertBox";
import { BreedCardDetails } from "../components/BreedCardDetails";

export function Details() {
    const params = useParams();
    const { state, updateHasAPIError } = useAppContext();
    const [catDetails, setCatDetails] = useState<CatBreed>();
    const navigate = useNavigate();
    
    async function fetchDetails() {
        try {
            const data = await fetchAPI(`${process.env.CAT_API}/v1/breeds/${state.chosenCat || params.id}`);
            setCatDetails(data);
        } catch(error) {
            updateHasAPIError(true)
        }
    }

    const handleClick = () => {
        navigate(`/cat/${state.chosenCat || params.id}`); // Navigate to the specified route
    };

    useEffect(() => {
        fetchDetails();
    }, [])

    return (
        <Container fluid="md">
            <ApiErrorAlertBox show={state.hasAPIError} />           
            <Stack gap={3}>
                <div className="p-2">
                    <Button variant="primary" onClick={handleClick}>Back</Button>
                </div>
                <div className="p-2">
                    <BreedCardDetails 
                        imageId={params.imageId || ""} 
                        catDetails={catDetails} 
                    />
                </div>
            </Stack>
        </Container>
    )
}