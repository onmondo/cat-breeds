import React, { useEffect, useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import { CatBreed } from "../lib/types"
import { useAppContext } from "../contexts/AppProvider" 
import { fetchAPI } from "../util/fetchApi";

export function BreedSelection() {
    const [breeds, setBreeds] = useState<CatBreed[]>([]);
    const { state, updateChosenCat, updateHasAPIError } = useAppContext();

    async function fetchBreeds() {
        try {
            const data = await fetchAPI(`${process.env.CAT_API}/v1/breeds`);
            setBreeds(data)
        } catch(error) {
            updateHasAPIError(true)
        }
    }
    
    useEffect(() => {
        fetchBreeds() 
    }, []);

    function handleClick(event: any) {
        updateChosenCat(event.target.value);
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Breed</Form.Label>
                <Form.Select 
                    aria-label="Cat breeds" 
                    onChange={handleClick}
                    value={(state.chosenCat != "") ? state.chosenCat : ""}
                >
                    <option>Select breed</option>
                    {
                        breeds.map(
                            breed => 
                                <option 
                                    key={breed.id} 
                                    value={breed.id}
                                >
                                    {breed.name}
                                </option>
                        )
                    }                    
                </Form.Select>                    
            </Form.Group>
        </Form>
    )
}