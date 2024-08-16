import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { usePoemContext } from '../hooks/usePoemContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/header';
import { FaExpandAlt } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { useAuthUpdate } from "../hooks/useAuthUpdate"
import { VscSaveAs } from "react-icons/vsc";
import '../css/Poetry.css';
import BASE_URL from '../utils/url';
import InformationPO from '../components/informationPO';

const Poetry = () => {
  const { user } = useAuthContext();
  const { poems, dispatch } = usePoemContext();
  const navigate = useNavigate();
  const [showPopOut, setShowPopOut] = useState(false);
  const poemsPerPage = 9;
  const { updateAboutOne, updateAboutTwo, error, isLoading } = useAuthUpdate();
  const [aboutOneText, setAboutOneText] = useState('');
  const [aboutTwoText, setAboutTwoText] = useState('');
  const [currentPoemPage, setCurrentPoemPage] = useState(1);
  const [currentEssayPage, setCurrentEssayPage] = useState(1);
  const poemsList = poems.filter(poem => poem.type === "p");
  const essaysList = poems.filter(poem => poem.type === "e");
  const currentPoems = poemsList.slice((currentPoemPage - 1) * poemsPerPage, currentPoemPage * poemsPerPage);
  const currentEssays = essaysList.slice((currentEssayPage - 1) * poemsPerPage, currentEssayPage * poemsPerPage);

  const handleNavigateToPoem = (poem_id) => {
    navigate(`/viewPoem/${poem_id}`);
  };

  const handleUpdateAboutOne = async (e) => {
    await updateAboutOne(aboutOneText)
    setShowPopOut(true);
    setTimeout(() => {
      setShowPopOut(false);
    }, 4000);
  };

  const handleUpdateAboutTwo = async (e) => {
    await updateAboutTwo(aboutTwoText)
    setShowPopOut(true);
    setTimeout(() => {
      setShowPopOut(false);
    }, 4000);
  };

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

  useEffect(() => {
    const fetchPoems = async () => {
      const response = await fetch(`${BASE_URL}/poetry?user_id=${user.tokenUser.userId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${user.token}` },
        credentials: 'include'
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_POEMS', payload: json });
      }
    };

    const fetchAbouts = async () => {
      const response = await fetch(`${BASE_URL}/user/userAbouts/${user.tokenUser.userId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${user.token}` },
        credentials: 'include'
      });
      const json = await response.json();
      if (response.ok) {
        setAboutOneText(json.about_one);
        setAboutTwoText(json.about_two);
      }
    };

    if (user) {
      fetchPoems();
      fetchAbouts();
    }
  }, [dispatch, user]);

  if (!user) {
    return <div>Please log in to view your poems.</div>;
  }


  return (

    <div className="poetry-page-content">
      <div className="navbar-login"><Navbar /></div>
      <div id="p-page-left">
        <div id="p-about-user">
          <div className="user-settings-each"><p>{user.tokenUser.name}</p></div>
          <div className="user-settings-each"><p>{user.tokenUser.mahlas}</p></div>
          <div className="user-settings-each"><p>Toplam yazı ve şiir sayısı: {poems.length}</p></div>
        </div>
        <article id="article-left"></article>
      </div>

      <div id="poetry-page-main-content">
        <div id="p-poem-part">
          <div id="p-poem-part1">
            <div id="p-poem-part-1-head"><p>Şiirlerin</p></div>
            <div id="p-poem-poem-heads">
              {currentPoems
                .slice(0, 4)
                .map((poem) => (
                  <div id="poem-h-div" key={poem._id}>
                    <div id="h-div-title"><p>{poem.title}</p></div>
                    <div id="h-div-expand-button">
                      <div id="d-status">{poem.isVisible ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}</div>
                      <div id="d-expand"><button onClick={() => handleNavigateToPoem(poem._id)}>
                        <FaExpandAlt />
                      </button></div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div id="p-poem-part2">
            {currentPoems
            .slice(4, 9)
            .map((poem) =>
              <div id="poem-h-div">
                <div id="h-div-title"><p>{poem.title}</p></div>
                <div id="h-div-expand-button">
                      <div id="d-status">{poem.isVisible ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}</div>
                      <div id="d-expand"><button onClick={() => handleNavigateToPoem(poem._id)}>
                        <FaExpandAlt />
                      </button></div>
                    </div>
              </div>
            )}
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
            <div id="p-poem-part-1-head"><p>Yazıların</p></div>
            <div id="p-poem-poem-heads">
              {currentEssays
              .slice(0, 4)
              .map((poem) =>
                <div id="poem-h-div">
                  <div id="h-div-title"><p>{poem.title}</p></div>
                  <div id="h-div-expand-button">
                      <div id="d-status">{poem.isVisible ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}</div>
                      <div id="d-expand"><button onClick={() => handleNavigateToPoem(poem._id)}>
                        <FaExpandAlt />
                      </button></div>
                    </div>
                </div>
              )}
            </div>
          </div>
          <div id="p-poem-part2">
            {currentEssays
            .slice(4, 9)
            .map((poem) =>
              <div id="poem-h-div">
                <div id="h-div-title"><p>{poem.title}</p></div>
                <div id="h-div-expand-button">
                      <div id="d-status">{poem.isVisible ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}</div>
                      <div id="d-expand"><button onClick={() => handleNavigateToPoem(poem._id)}>
                        <FaExpandAlt />
                      </button></div>
                    </div>
              </div>
            )}
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
          <div id="p-about-part-1">
            <div id="p-about-part-1-head"><p>Hakkında bir şeyler yaz</p></div>
            <div id="p-about-part-1-content">
              <textarea
                className="input-field"
                rows="9"
                placeholder={aboutOneText ? aboutOneText : "Hakkında bir şeyler yaz."}
                onChange={(e) => setAboutOneText(e.target.value)}
                value={aboutOneText} />
                {showPopOut && <InformationPO message="Başarıyla güncellendi." />}
            </div>
            <div id="p-about-part-1-button">
              <div id="user-about-buttons">
                <button id="user-about-add-button"
                  onClick={() => handleUpdateAboutOne(aboutOneText)}>
                  <VscSaveAs /> </button>
              </div>
            </div>
          </div>
          <div id="p-about-part-1">
            <div id="p-about-part-1-head"><p>Yazmak hakkında bir şeyler yaz</p></div>
            <div id="p-about-part-1-content">
              <textarea
                className="input-field"
                rows="9"
                placeholder={aboutTwoText ? aboutTwoText : "Yazmak hakkında yaz."}
                onChange={(e) => setAboutTwoText(e.target.value)}
                value={aboutTwoText} />
                {showPopOut && <InformationPO message="Başarıyla güncellendi." />}
            </div>
            <div id="p-about-part-1-button">
              <div id="user-about-buttons">
                <button id="user-about-add-button"
                  onClick={() => handleUpdateAboutTwo(aboutTwoText)}>
                  <VscSaveAs /> </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="p-page-right">
        <div id="p-about-user">
          <div id="button-parts">
            <div className="button-new-poetry"><button id="add-new-button" onClick={() => navigate('/createPoem', { state: { type: 'p' } })}> Yeni şiir ekle</button></div>
            <div className="button-new-poetry"><button id="add-new-button" onClick={() => navigate('/createPoem', { state: { type: 'e' } })}> Yeni yazı ekle</button></div>
            <div className="button-new-poetry"><button id="add-new-button" onClick={() => navigate(`/viewPoet/${user.tokenUser.userId}` )}> Profilini gör</button></div>
            {user.tokenUser.userType === "A"  && (<div className="button-new-poetry"><button id="add-new-button" onClick={() => navigate(`/admin` )}> Profilini gör</button></div> )}
          </div>
        </div>
        <article id="article-right"></article>
      </div>
      <div className="footer">
        <p>&copy; 2024 Müteferriç.</p>
      </div>
    </div>


  );
};

export default Poetry;

