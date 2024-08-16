import React, { useState, useEffect } from 'react';
import Navbar from '../components/header';
import '../css/home.css';
import { MdOutlineReadMore } from "react-icons/md";
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading';
import BASE_URL from '../utils/url';

const Home = () => {
  
  const [poems, setPoems] = useState([]);
  const [essays, setEssays] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [dbInfo, setDbInfo] = useState(0);

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [poemsRes, essaysRes, dbInfoRes] = await Promise.all([
          fetch(`${BASE_URL}/poetry/getLastPoems`),
          fetch(`${BASE_URL}/poetry/getLastEssays`),
          fetch(`${BASE_URL}/poetry/dbinfo`),
        ]);

        if (poemsRes.ok) {
          setPoems(await poemsRes.json());
        }
        if (essaysRes.ok) {
          setEssays(await essaysRes.json());
        }
        if (dbInfoRes.ok) {
          setDbInfo(await dbInfoRes.json());
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      try {
        const response = await fetch(`${BASE_URL}/poetry/search?q=${value}`);
        const json = await response.json();
        setResults(json);
      } catch (err) {
        console.error('Error searching:', err);
      }
    } else {
      setResults([]);
    }
  };

  const handleNavigateToPoem = (poem_id) => {
    navigate(`/viewPoem/${poem_id}`);
  };

  return (
    <div className="home-page-content">
      <div className="navbar-login">
        <Navbar />
      </div>
      <div id="leftt-content">
        {user ? (
          <div id="user-info">
            <p>Hoş geldin <strong>{user.tokenUser.name}!</strong></p>
          </div>
        ) : (
          <div id="user-info">
            <p>Hemen kayıt olun ve paylaşmaya başlayın!</p>
          </div>
        )}
        <div id="left-1"></div>
      </div>

      <div id="main-content">
        <div id="search-bar-content">
          <div id="title-search">
            <p>Müteferriç'de şiir veya yazı ara!</p>
          </div>
          <div id="search-bar-div">
            <input
              type="text"
              id="search-bar"
              placeholder="Şimdi ara..."
              value={query}
              onChange={handleInputChange}
            />
          </div>
          <div id="some-poet-part">
            {results.map((result) => (
              <div id="poet-1" key={result._id}>
                <p>{result.title}</p>
                <button
                  id="bbutton"
                  onClick={() => handleNavigateToPoem(result._id)}
                >
                  <MdOutlineReadMore />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div id="main-content-bottom">
          <div id="bottom-1">
            <div id="bottom-1-head">
              <p>Son eklenen şiirler</p>
            </div>
            <div id="bottom-1-content">
              {poems.length > 0 ? (
                poems.map((poem) => (
                  <div id="content-1" key={poem._id}>
                    <div id="content-1-head">
                      <p>{poem.title}</p>
                    </div>
                    <div id="content-1-button">
                      <button
                        id="ar-small-button"
                        onClick={() => handleNavigateToPoem(poem._id)}
                      >
                        <MdOutlineReadMore />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p><Loading /></p>
              )}
            </div>
          </div>

          <div id="bottom-1">
            <div id="bottom-1-head">
              <p>Son eklenen yazılar</p>
            </div>
            <div id="bottom-1-content">
              {essays.length > 0 ? (
                essays.map((essay) => (
                  <div id="content-1" key={essay._id}>
                    <div id="content-1-head">
                      <p>{essay.title}</p>
                    </div>
                    <div id="content-1-button">
                      <button
                        id="ar-small-button"
                        onClick={() => handleNavigateToPoem(essay._id)}
                      >
                        <MdOutlineReadMore />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p><Loading /></p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div id="right-content">
        <div id="user-info">
          <p>Mütefferiç'te toplam yazı ve şiir sayısı: {dbInfo}</p>
        </div>
        <div id="right-1"></div>
      </div>

      <div className="footer">
        <p>&copy; 2024 Müteferriç.</p>
      </div>
    </div>
  );
};

export default Home