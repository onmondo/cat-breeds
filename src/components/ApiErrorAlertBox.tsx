import React from "react";
import Alert from "react-bootstrap/Alert";

export function ApiErrorAlertBox() {
    return (
        <Alert variant="danger" dismissible>
            "Apologies but we could not load new cats for you at this time! Miau!"
        </Alert>
    )
}