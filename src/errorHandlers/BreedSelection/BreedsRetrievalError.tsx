import React from "react";
import Form from "react-bootstrap/Form";

export function BreedsRetrievalError() {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Breed</Form.Label>
                <Form.Select aria-label="Cat breeds">
                    <option>No cats available</option>                  
                </Form.Select>                    
            </Form.Group>
        </Form>
    )
}