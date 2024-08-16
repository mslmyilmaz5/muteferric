import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/header';
import { FaExpandAlt, FaGreaterThan, FaLessThan } from "react-icons/fa";
import '../css/PoetryStatic.css';
import BASE_URL from '../utils/url';

export const PoetryStatic = () => {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  const [poems, setPoems] = useState([]);
  const [aboutOne, setAboutOne] = useState('');
  const [aboutTwo, setAboutTwo] = useState('');
  const [currentPoemPage, setCurrentPoemPage] = useState(1);
  const [currentEssayPage, setCurrentEssayPage] = useState(1);
  const navigate = useNavigate();
  const poemsPerPage = 9;
  const poemsList = poems.filter(poem => poem.type === "p");
  const essaysList = poems.filter(poem => poem.type === "e");
  const currentPoems = poemsList.slice((currentPoemPage - 1) * poemsPerPage, currentPoemPage * poemsPerPage);
  const currentEssays = essaysList.slice((currentEssayPage - 1) * poemsPerPage, currentEssayPage * poemsPerPage);

  const handleNextPoemPage = () => {
    if (currentPoemPage < Math.ceil(poemsList.length / poemsPerPage)) {
      setCurrentPoemPage(currentPoemPage + 1);
    }
  };

  const handlePrevPoemPage = () => {
    if (currentPoemPage > 1) {
      setCurrentPoemPage(currentPoemPage - 1);
    }
  };

  const handleNextEssayPage = () => {
    if (currentEssayPage < Math.ceil(essaysList.length / poemsPerPage)) {
      setCurrentEssayPage(currentEssayPage + 1);
    }
  };

  const handlePrevEssayPage = () => {
    if (currentEssayPage > 1) {
      setCurrentEssayPage(currentEssayPage - 1);
    }
  };

  const handleNavigateToPoem = (poem_id) => {
    navigate(`/viewPoem/${poem_id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data first
        let responseUser = await fetch(`${BASE_URL}/user/${user_id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });

        let userData = await responseUser.json();

        if (!userData) {
          responseUser = await fetch(`${BASE_URL}/poet/${user_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
          });
          userData = await responseUser.json();
        }

        if (responseUser.ok) {
          setUser(userData);
          setAboutOne(userData.about_one);
          setAboutTwo(userData.about_two);

          const responsePoems = await fetch(`${BASE_URL}/poetry/v?user_id=${user_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
          });

          const poemsData = await responsePoems.json();

          if (responsePoems.ok) {
            setPoems(poemsData);
          } else {
            console.error(poemsData.error);
          }
        } else {
          console.error(userData.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user_id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="poetry-page-content">
      <div className="navbar-login"><Navbar /></div>

      <div id="p-page-left">
        <div id="p-about-user">
          <div className="user-settings-each"><p>{user.name}</p></div>
          <div className="user-settings-each"><p>{user.mahlas}</p></div>
          <div className="user-settings-each">
            <p>Paylaşılan toplam şiir ve yazı sayısı: {poems.length}</p>
          </div>
        </div>
        <article id="article-left"></article>
      </div>

      <div id="poetry-page-main-content">
        <div id="p-poem-part">
          <div id="p-poem-part1">
            <div id="p-poem-part-1-head"><p>Paylaşılan Şiirler</p></div>
            <div id="p-poem-poem-heads">
              {currentPoems.slice(0, 4).map(poem => (
                <div id="poem-h-div" key={poem._id}>
                  <div id="h-div-title"><p>{poem.title}</p></div>
                  <div id="h-div-expand-button">
                    <button onClick={() => handleNavigateToPoem(poem._id)}><FaExpandAlt /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="p-poem-part2">
            {currentPoems.slice(4, 9).map(poem => (
              <div id="poem-h-div" key={poem._id}>
                <div id="h-div-title"><p>{poem.title}</p></div>
                <div id="h-div-expand-button">
                  <button onClick={() => handleNavigateToPoem(poem._id)}><FaExpandAlt /></button>
                </div>
              </div>
            ))}
          </div>

          <div id="p-poem-button">
            <div className="pagination-buttons">
              <button
                className="pagination-button"
                onClick={handlePrevPoemPage}
                disabled={currentPoemPage === 1}
              >
                <FaLessThan />
              </button>
              <button
                className="pagination-button"
                onClick={handleNextPoemPage}
                disabled={currentPoemPage >= Math.ceil(poemsList.length / poemsPerPage)}
              >
                <FaGreaterThan />
              </button>
            </div>
          </div>
        </div>

        <div id="p-poem-part">
          <div id="p-poem-part1">
            <div id="p-poem-part-1-head"><p>Paylaşılan Yazılar</p></div>
            <div id="p-poem-poem-heads">
              {currentEssays.slice(0, 4).map(essay => (
                <div id="poem-h-div" key={essay._id}>
                  <div id="h-div-title"><p>{essay.title}</p></div>
                  <div id="h-div-expand-button">
                    <button onClick={() => handleNavigateToPoem(essay._id)}><FaExpandAlt /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="p-poem-part2">
            {currentEssays.slice(4, 9).map(essay => (
              <div id="poem-h-div" key={essay._id}>
                <div id="h-div-title"><p>{essay.title}</p></div>
                <div id="h-div-expand-button">
                  <button onClick={() => handleNavigateToPoem(essay._id)}><FaExpandAlt /></button>
                </div>
              </div>
            ))}
          </div>

          <div id="p-poem-button">
            <div className="pagination-buttons">
              <button
                className="pagination-button"
                onClick={handlePrevEssayPage}
                disabled={currentEssayPage === 1}
              >
                <FaLessThan />
              </button>
              <button
                className="pagination-button"
                onClick={handleNextEssayPage}
                disabled={currentEssayPage >= Math.ceil(essaysList.length / poemsPerPage)}
              >
                <FaGreaterThan />
              </button>
            </div>
          </div>
        </div>

        <div id="p-about-part">
          <div id="p-about-part-1-f">
            <div id="p-about-part-1-head"><p>Hakkında</p></div>
            <div id="p-about-part-1-content">
              <p>{aboutOne}</p>
            </div>
          </div>

          <div id="p-about-part-1-f">
            <div id="p-about-part-1-head"><p>Yazısı Hakkında</p></div>
            <div id="p-about-part-1-content">
              <p>{aboutTwo}</p>
            </div>
          </div>
        </div>
      </div>

      <article id="article-right"></article>

      <div className="footer">
        <p>&copy; 2024 Müteferriç.</p>
      </div>
    </div>
  );
};

export default PoetryStatic;