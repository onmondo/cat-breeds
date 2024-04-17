import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import { useAppContext } from "../contexts/AppProvider" 
import { BreedSelection } from "../components/BreedSelection";
import { BreedCards } from "../components/BreedCards";
import { ApiErrorAlertBox } from "../components/ApiErrorAlertBox";

export function Home() {
    
    const { state, updateHasImagesLeft } = useAppContext();
    const [deckPage, setDeckPage] = useState(0);

    useEffect(() => {
        setDeckPage(0)
        updateHasImagesLeft(true)
    }, [state.chosenCat])

    return (
        <Container fluid="md">
            <ApiErrorAlertBox show={state.hasAPIError} />
            <Row>
                <Col><h1 className="p-2">Cat Breeds</h1></Col>
            </Row>
            <Row>
                <Col lg={4} md={6} sm={6} xs={12}>
                    <div className="p-2">
                        <BreedSelection />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Stack>
                        <div><BreedCards page={deckPage} /></div>
                        <div className="p-2">
                            <Button 
                                style={{ display: state.hasImagesLeft ? "inline" : "none" }}
                                disabled={(state.chosenCat == "")} 
                                variant="success"
                                onClick={() => {
                                    const newPage = deckPage + 1
                                    setDeckPage(newPage)
                                }}
                            >
                                    Load more
                                </Button>
                        </div>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}