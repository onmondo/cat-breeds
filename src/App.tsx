import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Details } from "./pages/Details";
import { AppProvider } from "./contexts/AppProvider";
import './App.scss';

export default function App() {    
    return (
        <AppProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cat/:id" element={<Home />} />
                <Route path="/cat/:id/image/:imageId" element={<Details />} />
            </Routes>
        </AppProvider>
    )
}