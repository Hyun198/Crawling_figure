import React, { useState } from 'react';
import axios from 'axios';
import './App.css'



function App() {
  const [searchInput, setSearchInput] = useState('');
  const [PoisonSearchResults, setPoisonSearchResults] = useState([]);
  const [FiguremallSearchResults, setFiguremallSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/search?keyword=${encodeURIComponent(searchInput)}`)
      const response2 = await axios.post(`/search`, { keyword: searchInput })
      setPoisonSearchResults(response.data);
      setFiguremallSearchResults(response2.data);
    } catch (error) {
      console.error('Error search results', error);
    }
  };



  return (
    <>
      <h1>Figure homepage</h1>
      <div className="container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="찾고 싶은 피규어"
          />
          <button type="submit">검색</button>
        </form>
        <h2>포이즌 애플</h2>
        <div className="searchResults" id="searchResults">
          {PoisonSearchResults.map((result, index) => (
            <div className="products" key={index}>
              <h3>{result.name}</h3>
              <img src={result.image} alt={result.name} width="250" />
              <p>{result.price}</p>
            </div>
          ))}
        </div>
        <h2>피규어 몰</h2>
        <div className="searchResults" id="searchResults">
          {FiguremallSearchResults.map((result, index) => (
            <div className="products" key={index}>
              <h3>{result.name}</h3>
              <img src={result.image} alt={result.name} width="250" />
              <p>{result.price}</p>
            </div>
          ))}
        </div>
        <h2>피규어 시티</h2>

        <h2>ASL 스토어</h2>

        <h2>글로리 먼데이</h2>
      </div>
    </>

  );
}

export default App;
