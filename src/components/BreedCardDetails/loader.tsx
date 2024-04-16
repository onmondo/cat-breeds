import React from "react";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import ImageLoader from "../ImageLoader";

export function BreedCardDetailsLoader() {
    return (
        <Card>
            <Card.Header>
                <ImageLoader />
            </Card.Header>
            <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Subtitle} animation="glow">
                    <Placeholder xs={2} />{' '}
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={3} size="lg" /> <Placeholder xs={7} size="lg" /> {' '}
                    <Placeholder xs={4} size="lg" /> {' '}
                </Placeholder>
            </Card.Body>
        </Card>
    )
}