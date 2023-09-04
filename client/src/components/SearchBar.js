// src/components/SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
   const [city, setCity] = useState('');

   const handleSearch = () => {
      if (city.trim()) { // Make sure city isn't empty or just whitespace
         onSearch(city);
      }
   };

   return (
      <div className="mb-3"> 
         <div className="input-group"> 
            <input style={{ marginTop: "10px" }}
                type="text" 
                className="form-control"
                placeholder="Enter city..." 
                value={city}
                onChange={e => setCity(e.target.value)}
                onKeyPress={event => { // Allow users to press 'Enter' to search
                    if (event.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
            <div className="input-group-append" style={{ marginTop: "10px" }}>
                <button 
                    className="btn btn-primary" 
                    onClick={handleSearch}>
                    Search
                </button>
            </div>
         </div>
      </div>
   );
}

export default SearchBar;
