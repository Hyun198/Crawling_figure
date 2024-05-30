import React, { useState, useEffect, CSSProperties } from 'react';
import axios from 'axios';
import './App.css'
import BounceLoader from "react-spinners/BounceLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function App() {
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedSite, setSelectedSite] = useState('All');
  const [searchInput, setSearchInput] = useState('');
  const [PoisonSearchResults, setPoisonSearchResults] = useState([]);
  const [FiguremallSearchResults, setFiguremallSearchResults] = useState([]);
  const [GlorymondaySearchResults, setGlorymondaySearchResults] = useState([]);
  const [FigureCitySearchResults, setFigureCitySearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const response = await axios.get(`/search?keyword=${encodeURIComponent(searchInput)}`)
      const responsePostData = await axios.post(`/search`, { keyword: searchInput })
      const { data1, data2 } = response.data
      setPoisonSearchResults(data1);
      setGlorymondaySearchResults(data2);
      setFiguremallSearchResults(responsePostData.data.postdata1);
      setFigureCitySearchResults(responsePostData.data.postdata2);

    } catch (error) {
      console.error('Error search results', error);

    } finally {
      setLoading(false);
    }
  };


  const resetResults = () => {
    setSelectedSite('All');
    setPoisonSearchResults([]);
    setFiguremallSearchResults([]);
    setGlorymondaySearchResults([]);
    setFigureCitySearchResults([]);
  }

  const renderProducts = (results) => {

    return results && results.length > 0 && (
      results.map((result, index) => (
        <div className='products' key={index}>
          <div className="slide-img">
            <img src={result.image} alt={result.name} width="250" />
          </div>
          <div className='detail-box'>
            <p>{result.name}</p>
            <p>{result.price}</p>
          </div>
        </div>
      ))
    );
  };

  const filteredResults = () => {

    switch (selectedSite) {
      case 'Poison':
        return renderProducts(PoisonSearchResults);
      case 'Figuremall':
        return renderProducts(FiguremallSearchResults);
      case 'FigureCity':
        return renderProducts(FigureCitySearchResults);
      case 'Glorymonday':
        return renderProducts(GlorymondaySearchResults);
      default:
        return (
          <>
            {renderProducts(PoisonSearchResults)}
            {renderProducts(FiguremallSearchResults)}
            {renderProducts(FigureCitySearchResults)}
            {renderProducts(GlorymondaySearchResults)}
          </>
        );
    }
  };


  return (
    <>

      <nav>
        <h1 style={{ color: "white" }} onClick={resetResults}>Figure Info</h1>
        <ul className='nav-list'>
          <li ><a href="/" aria-current="page">Home</a></li>
          <li ><a href="https://poisonapple.co.kr">포이즌애플</a></li>
          <li ><a href="http://www.figuremall.co.kr/" >피규어몰</a></li>
          <li ><a href="http://www.figurecity.co.kr/index.html" >피규어시티</a></li>
          <li ><a href="https://www.glorymonday.com/" >글로리먼데이</a></li>
        </ul>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="찾고 싶은 피규어"
          />
          <button type="submit">검색</button>
        </form>
      </nav>
      <div className="filter-func">
        <button onClick={() => setSelectedSite('All')}>전체</button>
        <button onClick={() => setSelectedSite('Poison')}>포이즌애플</button>
        <button onClick={() => setSelectedSite('Figuremall')}>피규어몰</button>
        <button onClick={() => setSelectedSite('FigureCity')}>피규어시티</button>
        <button onClick={() => setSelectedSite('Glorymonday')}>글로리먼데이</button>
      </div>

      {
        loading ? (
          <div className="loading-container" >
            <BounceLoader
              color={"#123abc"}
              loading={loading}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div className="results-container">
            {filteredResults()}
          </div>
        )
      }
    </>

  );
}

export default App;
