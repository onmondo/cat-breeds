import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { BreedSelection } from "../components/BreedSelection";
import { useAppContext } from "../contexts/AppProvider" 
import { BreedCards } from "../components/BreedCards";
import { ApiErrorAlertBox } from "../components/ApiErrorAlertBox";

export function Home() {
    
    const { 
        state, 
        updateHasImagesLeft, 
        updateDeckHeight 
    } = useAppContext();

    const [deckPage, setDeckPage] = useState(0);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    //   setWindowHeight(window.innerHeight);
    };

    const computeAdditionalHeight = () =>{
        if (windowWidth >= 1200) {
            return 8;
        } else if (windowWidth >= 1140) {
            return 12;
        } else if (windowWidth >= 960) {
            return 16;
        } else if (windowWidth >= 768) {
            return 20;
        }
        return 16;
    }
  
    useEffect(() => {
      // Add event listener when component mounts
      window.addEventListener('resize', handleResize);
  
      // Remove event listener when component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); 

    useEffect(() => {
        setDeckPage(0)
        updateHasImagesLeft(true)
    }, [state.chosenCat])

    console.log("state", state)
    console.log("windowWidth", windowWidth)
    return (
        <Container fluid="md">
            <ApiErrorAlertBox show={state.hasAPIError} />
            <Row>
                <Col><h1 className="p-2">Cat Browser</h1></Col>
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
                                    const newPage = deckPage + 1;
                                    setDeckPage(newPage);
                                    const newDeckHeight = state.deckHeight + computeAdditionalHeight();
                                    updateDeckHeight(newDeckHeight);
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