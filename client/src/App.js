import React, { useState } from 'react';
import axios from 'axios';
import './App.css'



function App() {
  const [searchInput, setSearchInput] = useState('');
  const [PoisonSearchResults, setPoisonSearchResults] = useState([]);
  const [FiguremallSearchResults, setFiguremallSearchResults] = useState([]);
  const [GlorymondaySearchResults, setGlorymondaySearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/search?keyword=${encodeURIComponent(searchInput)}`)
      const response2 = await axios.post(`/search`, { keyword: searchInput })
      const { data1, data2 } = response.data
      setPoisonSearchResults(data1);
      setGlorymondaySearchResults(data2);
      setFiguremallSearchResults(response2.data);
    } catch (error) {
      console.error('Error search results', error);
    }
  };



  return (
    <>
      <h1>Figure homepage</h1>
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
      <div className="poisonapple_container">

        <div className="searchResults" id="searchResults">
          {PoisonSearchResults.map((result, index) => (
            <div className="products" key={index}>
              <div className='slide-img'>
                <img src={result.image} alt={result.name} width="250" />
              </div>
              <div className='detail-box'>
                <p>{result.name}</p>
                <p>{result.price}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
      <h2>피규어 몰</h2>
      <div className="figuremall_container">

        <div className="searchResults" id="searchResults">
          {FiguremallSearchResults.map((result, index) => (
            <div className="products" key={index}>
              <div className='slide-img'>
                <img src={result.image} alt={result.name} width="250" />
              </div>
              <div className='detail-box'>
                <p>{result.name}</p>
                <p>{result.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2>피규어 시티</h2>

      <h2>ASL 스토어</h2>

      <h2>글로리 먼데이</h2>
      <div className='glorymonday_container'>

        <div className="searchResults" id="searchResults">
          {GlorymondaySearchResults.map((result, index) => (
            <div className="products" key={index}>
              <div className='slide-img'>
                <img src={result.image} alt={result.name} width="250" />
              </div>
              <div className='detail-box'>
                <p>{result.name}</p>
                <p>{result.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>

  );
}

export default App;
