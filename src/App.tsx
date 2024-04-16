import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Details } from "./pages/Details";
import { ChosenCatContextProvider } from "./contexts/ChosenCatContextProvider";
import './App.scss';

export default function App() {    
    return (
        <ChosenCatContextProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cat/:id" element={<Home />} />
                <Route path="/cat/:id/image/:imageId" element={<Details />} />
            </Routes>
        </ChosenCatContextProvider>
    )
}