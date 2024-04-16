import React from "react";
import Alert from "react-bootstrap/Alert";

export const ApiErrorAlertBox: React.FC<{show: boolean}> = ({show}) => {
    return (
        <Alert variant="danger" show={show} dismissible>
            "Apologies but we could not load new cats for you at this time! Miau!"
        </Alert>
    )
}