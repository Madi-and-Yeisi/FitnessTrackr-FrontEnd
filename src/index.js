import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
    return (
        <div>
            <p>Welcome to FitnessTrackr Homepage</p>
        </div>
    )
};

const appElement = document.getElementById("app");
const root = createRoot(appElement);
root.render(<App />);