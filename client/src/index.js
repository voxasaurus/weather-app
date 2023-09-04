import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import headerImage from './assets/header.png';
import './styles.css';

function NightModeToggle({ toggleNightMode, isNightMode }) {
    return <button onClick={toggleNightMode} className="btn btn-outline-secondary mt-3">
        {isNightMode ? "Day Mode" : "Night Mode"}
    </button>;
}

function Root() {
    const [nightMode, setNightMode] = useState(false);

    const toggleNightMode = () => {
        setNightMode(!nightMode);
    };

    return (
        <React.StrictMode>
            <div className={`appContainer ${nightMode ? "night-mode" : "day-mode"}`}>
                <img src={headerImage} alt="Header" className="appHeader" />
                <h1 className="appTitle">Weather App</h1>
                <NightModeToggle toggleNightMode={toggleNightMode} isNightMode={nightMode} />
                <App isNightMode={nightMode} />
            </div>
        </React.StrictMode>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

reportWebVitals();
