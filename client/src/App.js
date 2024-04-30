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



  return (
    <>
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

        {loading ?
          (
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

          )
          :
          (
            <>
              <h2>포이즌 애플</h2>
              <div className="poisonapple_container">
                <div className="searchResults" id="searchResults">
                  {PoisonSearchResults && PoisonSearchResults.length > 0 && (
                    PoisonSearchResults.map((result, index) => (
                      <div className="products" key={index}>
                        <div className='slide-img'>
                          <img src={result.image} alt={result.name} width="250" />
                        </div>
                        <div className='detail-box'>
                          <p>{result.name}</p>
                          <p>{result.price}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <h2>피규어 몰</h2>
              <div className="figuremall_container">
                <div className="searchResults" id="searchResults">
                  {FiguremallSearchResults && FiguremallSearchResults.length > 0 && (
                    FiguremallSearchResults.map((result, index) => (
                      <div className="products" key={index}>
                        <div className='slide-img'>
                          <img src={result.image} alt={result.name} width="250" />
                        </div>
                        <div className='detail-box'>
                          <p>{result.name}</p>
                          <p>{result.price}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>


              <h2>피규어 시티</h2>
              <div className="figurecity_container">
                <div className="searchResults" id="searchResults">
                  {FigureCitySearchResults && FigureCitySearchResults.length > 0 && (
                    FigureCitySearchResults.map((result, index) => (
                      <div className="products" key={index}>
                        <div className='slide-img'>
                          <img src={result.image} alt={result.name} width="250" />
                        </div>
                        <div className='detail-box'>
                          <p>{result.name}</p>
                          <p>{result.price}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>


              <h2>글로리 먼데이</h2>
              <div className='glorymonday_container'>
                <div className="searchResults" id="searchResults">
                  {GlorymondaySearchResults && GlorymondaySearchResults.length > 0 && (
                    GlorymondaySearchResults.map((result, index) => (
                      <div className="products" key={index}>
                        <div className='slide-img'>
                          <img src={result.image} alt={result.name} width="250" />
                        </div>
                        <div className='detail-box'>
                          <p>{result.name}</p>
                          <p>{result.price}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )
        }
      </>

    </>

  );
}

export default App;
