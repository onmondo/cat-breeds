import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useAppContext } from "../contexts/AppProvider";
import { BreedCardDetails } from "../components/BreedCardDetails";
import { fetchAPI } from "../util/fetchApi";
import { CatBreed } from "../lib/types";
import ErrorBoundary from "../errorHandlers/ErrorBoundary";
import { ApiErrorAlertBox } from "../components/ApiErrorAlertBox";

export function Details() {
    const params = useParams();
    const { state } = useAppContext();
    const [catDetails, setCatDetails] = useState<CatBreed>();
    const navigate = useNavigate();
    
    async function fetchDetails() {
        const data = await fetchAPI(`${process.env.CAT_API}/v1/breeds/${state.chosenCat || params.id}`);
        setCatDetails(data);
    }

    const handleClick = () => {
        navigate(`/cat/${state.chosenCat || params.id}`); // Navigate to the specified route
    };

    useEffect(() => {
        fetchDetails();
    }, [])

    return (
        <Container fluid="md">
            {
                (state.hasAPIError) 
                ?
                <ApiErrorAlertBox />
                :
                <></>
            }            
            <Stack gap={3}>
                <div className="p-2">
                    <Button variant="primary" onClick={handleClick}>Back</Button>
                </div>
                <div className="p-2">
                    <ErrorBoundary>
                        <BreedCardDetails 
                            imageId={params.imageId || ""} 
                            catDetails={catDetails} 
                        />
                    </ErrorBoundary>
                </div>
            </Stack>
        </Container>
    )
}