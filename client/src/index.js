import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import dayHeaderImage from './assets/day-header.png';
import nightHeaderImage from './assets/night-header.png';
import './styles.css';
import { animated } from '@react-spring/web';
import { useSpring } from '@react-spring/core';


function NightModeToggle({ toggleNightMode, isNightMode }) {
    return <button onClick={toggleNightMode} className="btn btn-outline-secondary mt-3">
        {isNightMode ? "Day Mode" : "Night Mode"}
    </button>;
}

function Root() {
    const [nightMode, setNightMode] = useState(false);
    const headerImage = nightMode ? nightHeaderImage : dayHeaderImage;

    const toggleNightMode = () => {
        setNightMode(!nightMode);
    };

    const { color, backgroundColor } = useSpring({
        color: nightMode ? '#f9f9f9' : '#212529',
        backgroundColor: nightMode ? '#212529' : '#f9f9f9',
    });

    return (
        <React.StrictMode>
            <animated.div style={{ color, backgroundColor }} className={`appContainer ${nightMode ? "night-mode" : "day-mode"}`}>
                <img src={headerImage} alt="Header" className="appHeader" />
                <h1 className="appTitle">Weather App</h1>
                <NightModeToggle toggleNightMode={toggleNightMode} isNightMode={nightMode} />
                <App isNightMode={nightMode} />
            </animated.div>
        </React.StrictMode>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

reportWebVitals();
