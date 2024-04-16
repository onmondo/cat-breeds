import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BreedSelection } from "../components/BreedSelection";
import { ChosenCatContext } from "../contexts/ChosenCatContextProvider" 
import { BreedCards } from "../components/BreedCards";
import { Stack } from "react-bootstrap";
import ErrorBoundary from "../errorHandlers/ErrorBoundary";
import { BreedsRetrievalError } from "../errorHandlers/BreedSelection/BreedsRetrievalError";
import { CardDeckContext } from "../contexts/CardDeckContextProvider";

export function Home() {
    
    const { chosenCat } = useContext(ChosenCatContext);
    const [deckPage, setDeckPage] = useState(0);
    const [loadMore, setLoadMore] = useState(true);
    const { hasRemainingImages } = useContext(CardDeckContext);
    useEffect(() => {
        setDeckPage(0)
    }, [chosenCat])

    useEffect(() => {
        setLoadMore(hasRemainingImages)
    }, [hasRemainingImages])

    console.log("loadMore", loadMore)
    return (
        <Container fluid="md">
            <Row>
                <Col><h1 className="p-2">Cat Browser</h1></Col>
            </Row>
            <Row>
                <Col lg={3} md={4} sm={12} xs={12}>
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
                                style={{ display: loadMore ? "inline" : "none" }}
                                disabled={(chosenCat == "")} 
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