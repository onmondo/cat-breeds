import React from "react";
import Card from "react-bootstrap/Card"
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button"

import ImageLoader from "../ImageLoader";

export function BreedCardLoader() {
    return (
        <Card className="catbreeds text-center">
            <Card.Header>
                <ImageLoader />
            </Card.Header>
            <Card.Body>
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Loading...
            </Button>{' '}
            </Card.Body>
        </Card>        
    )
}