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

  return (
    <>
      <>
        <nav>
          <h1 style={{ color: "white" }}>Figure Info</h1>
          <ul className='nav-list'>
            <li className='active'><a href="#" aria-current="page">Home</a></li>
            <li className={selectedSite === 'Poison' ? 'active' : ''}><a href="#" onClick={() => setSelectedSite()}>포이즌애플</a></li>
            <li className={selectedSite === 'Figuremall' ? 'active' : ''}><a href="#" onClick={() => setSelectedSite()} >피규어몰</a></li>
            <li className={selectedSite === 'FigureCity' ? 'active' : ''}><a href="#" onClick={() => setSelectedSite()}>피규어시티</a></li>
            <li className={selectedSite === 'Glorymonday' ? 'active' : ''}><a href="#" onClick={() => setSelectedSite()}>글로리먼데이</a></li>
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

        {loading ? (
          <div className="loading-container">
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
          <>
            {(selectedSite === 'All' || selectedSite === 'Poison') && (
              <>
                <h2>포이즌 애플</h2>
                <div className="poisonapple_container">
                  <div className="searchResults" id="searchResults">
                    {renderProducts(PoisonSearchResults)}
                  </div>
                </div>
              </>
            )}
            {(selectedSite === 'All' || selectedSite === 'Figuremall') && (
              <>
                <h2>피규어 몰</h2>
                <div className="figuremall_container">
                  <div className="searchResults" id="searchResults">
                    {renderProducts(FiguremallSearchResults)}
                  </div>
                </div>
              </>
            )}
            {(selectedSite === 'All' || selectedSite === 'FigureCity') && (
              <>
                <h2>피규어 시티</h2>
                <div className="figurecity_container">
                  <div className="searchResults" id="searchResults">
                    {renderProducts(FigureCitySearchResults)}
                  </div>
                </div>
              </>
            )}
            {(selectedSite === 'All' || selectedSite === 'Glorymonday') && (
              <>
                <h2>글로리 먼데이</h2>
                <div className='glorymonday_container'>
                  <div className="searchResults" id="searchResults">
                    {renderProducts(GlorymondaySearchResults)}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </>
    </>
  );
}

export default App;
