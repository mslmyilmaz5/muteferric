import React, { useState, useEffect } from 'react';
import Navbar from '../components/header';
import '../css/home.css';
import { MdOutlineReadMore } from "react-icons/md";
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading';
import BASE_URL from '../utils/url';
import { formatDate } from '../utils/garbage';

const Home = () => {

  const [poems, setPoems] = useState([]);
  const [essays, setEssays] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [dbInfo, setDbInfo] = useState(0);
  const [dbInfoUser, setDbInfoUser] = useState(0);
  const [dbInfoPoet, setDbInfoPoet] = useState(0);
  const [poets, setPoets] = useState([]);
  const [users, setUsers] = useState([]);
  const [generalInfo, setGeneralInfo] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [poemsRes, essaysRes, dbInfoRes, poetRes, userRes, dbInfoUserRes, dbInfoPoetRes, muteferricRes] = await Promise.all([
          fetch(`${BASE_URL}/siir/son-yazilar`),
          fetch(`${BASE_URL}/siir/son-siirler`),
          fetch(`${BASE_URL}/siir/database-bilgi`),
          fetch(`${BASE_URL}/poet/getLastPoets`),
          fetch(`${BASE_URL}/user/getLastUsers`),
          fetch(`${BASE_URL}/user/dbinfo`),
          fetch(`${BASE_URL}/poet/dbinfo`),
          fetch(`${BASE_URL}/general/getGeneralInfo`),
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
        if (poetRes.ok) {
          setPoets(await poetRes.json());
        }
        if (userRes.ok) {
          setUsers(await userRes.json());
        }
        if (userRes.ok) {
          setDbInfoUser(await dbInfoUserRes.json());
        }
        if (dbInfoPoetRes.ok) {
          setDbInfoPoet(await dbInfoPoetRes.json());
        }
        if (muteferricRes.ok) {
          setGeneralInfo(await muteferricRes.json());
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
        const response = await fetch(`${BASE_URL}/siir/ara?q=${value}`);
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
    navigate(`/siir/${poem_id}`);
  };

  const handleNavigateToPoet = (poet_id) => {
    navigate(`/sair/${poet_id}`);
  };


  return (
    <div className="home-page-content">
      <div className="navbar-login">

        <Navbar />
      </div>
      <div id="leftt-content">
        <div id="left-1">
          {user ? <div id="left1-b"><p> Hoşgeldin <strong>{user.tokenUser.name}</strong></p></div>
            : <div id="left1-b"><p> Sen de kayıt olup hemen dolaşanların arasına katıl!</p></div>}
          <div id="left1-c"><p> Müteferriç'te toplam</p></div>

          <div id="left1-c"><p> <strong>{dbInfoUser} </strong>dolaşan</p></div>
          <div id="left1-c"><p> <strong>{dbInfoPoet} </strong> varan</p></div>
          <div id="left1-c"><p> <strong>{dbInfo} </strong>yazı ve şiir</p></div>
        </div>
        <div id="left-2">
          <div id="left1-b"><p><strong>Günün Köşeşi</strong></p></div>
          <div id="left-2c"><p> {generalInfo ? generalInfo.today_home_text : ''}</p></div>
        </div>
      </div>

      <div id="main-content">
        <div id="search-bar-content">
          <div id="title-search">
            <p><strong>Müteferriç'de ara!</strong></p>
          </div>
          <div id="search-bar-div">
            <input
              type="text"
              id="search-bar"
              placeholder="Şair,şiir veya yazı ara..."
              value={query}
              onChange={handleInputChange}
            />
          </div>
          <div id="some-poet-part">
            {results.map((result) => (
              <div id="poet-1" key={result._id}
                onClick={() => {
                  if (result.type === 'poem') {
                    handleNavigateToPoem(result._id);
                  } else {
                    handleNavigateToPoet(result._id);
                  }
                }}
                style={{ cursor: 'pointer' }} >
                <p>{result.title} </p>
              </div>
            ))}
          </div>
        </div>
        <div id="main-content-bottom">
          <div id="bottom-1">
            <div id="bottom-1-head">
              <p><strong>Son eklenen şiirler</strong></p>
            </div>
            <div id="bottom-1-content">
              {poems.length > 0 ? (
                poems.map((poem) => (
                  <div
                    id="content-1"
                    key={poem._id}
                    onClick={() => handleNavigateToPoem(poem._id)}
                    style={{ cursor: 'pointer' }} // Tıklanabilir olduğunu belirtmek için cursor stilini değiştirdik
                  >
                    <div id="content-1-head">
                      <p>{poem.title}</p>
                      <p className="date-right">{formatDate(poem.createdAt)}</p>
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
              <p><strong>Son eklenen yazılar</strong></p>
            </div>
            <div id="bottom-1-content">
              {essays.length > 0 ? (
                essays.map((essay) => (
                  <div id="content-1"
                    key={essay._id}
                    onClick={() => handleNavigateToPoem(essay._id)}
                    style={{ cursor: 'pointer' }} >
                    <div id="content-1-head">
                      <p>{essay.title} </p>
                      <p className="date-right">{formatDate(essay.createdAt)}</p>
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

        <div id="right-1">
          <div id="right-1-h"><p><strong>Varanlar</strong></p></div>
          <div id="right-1-c">
            {poets.length > 0 ? (
              poets.map((poet) => (
                <div id="content-1"
                  key={poet._id}
                  onClick={() => handleNavigateToPoet(poet._id)}
                  style={{ cursor: 'pointer' }} >
                  <div id="content-1-head">
                    <p>{poet.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <p><Loading /></p>
            )}
          </div>
        </div>
        <div id="right-2">
          <div id="right-1-h"><p><strong>Dolaşanlar</strong></p></div>
          <div id="right-1-c">
            {users.length > 0 ? (
              users.map((user) => (
                <div id="content-1" key={user._id}
                  onClick={() => handleNavigateToPoet(user._id)}
                  style={{ cursor: 'pointer' }} >
                  <div id="content-1-head">
                    <p>{user.name}</p>
                  </div>

                </div>
              ))
            ) : (
              <p><Loading /></p>
            )}



          </div>
        </div>
      </div>

      <div className="footer">
        <p>&copy; 2024 Müteferriç.</p>
      </div>
    </div>
  );
};

export default Home