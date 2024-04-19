import React from "react";
import Alert from "react-bootstrap/Alert";
import { useAppContext } from "../contexts/AppProvider";

export const ApiErrorAlertBox: React.FC<{show: boolean}> = ({show}) => {
    const { updateHasAPIError } = useAppContext();
    const handleClose = () => {
        updateHasAPIError(false)
    }
    return (
        <Alert variant="danger" show={show} onClose={handleClose} dismissible>
            "Apologies but we could not load new cats for you at this time! Miau!"
        </Alert>
    )
}