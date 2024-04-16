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

export function Home() {
    const MIN_LIMIT = 4;
    const { chosenCat } = useContext(ChosenCatContext);
    const [cardLimit, setCardLimit] = useState(MIN_LIMIT);

    useEffect(() => {
        setCardLimit(MIN_LIMIT)
    }, [chosenCat])

    console.log("cardLimit", cardLimit);
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
                        <div><BreedCards limit={cardLimit} /></div>
                        <div className="p-2">
                            <Button 
                                disabled={(chosenCat == "")} 
                                variant="success"
                                onClick={() => {
                                    const newLimit = cardLimit + 1
                                    setCardLimit(newLimit)
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