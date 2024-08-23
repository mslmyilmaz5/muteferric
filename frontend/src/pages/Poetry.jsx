import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { usePoemContext } from '../hooks/usePoemContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/header';
import { FaExpandAlt } from "react-icons/fa";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useAuthUpdate } from "../hooks/useAuthUpdate";
import { VscSaveAs } from "react-icons/vsc";
import '../css/Poetry.css';
import BASE_URL from '../utils/url';
import InformationPO from '../components/informationPO';
import one from '../assets/img/photo-default.png';
import Loading from '../components/loading';
import { formatDate } from '../utils/garbage';

const Poetry = () => {
  const { user } = useAuthContext();
  const { poems, dispatch } = usePoemContext();
  const navigate = useNavigate();
  const [showPopOut, setShowPopOut] = useState(false);
  const { updateAboutOne } = useAuthUpdate();
  const [aboutOneText, setAboutOneText] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  const poemsList = poems.filter(poem => poem.type === "p");
  const essaysList = poems.filter(poem => poem.type === "e");

  const handleNavigateToPoem = (poem_id) => {
    navigate(`/siir/${poem_id}`);
  };

  const handleUpdateAboutOne = async () => {
    await updateAboutOne(aboutOneText);
    setShowPopOut(true);
    setTimeout(() => {
      setShowPopOut(false);
    }, 4000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const poemResponse = await fetch(`${BASE_URL}/siir?user_id=${user.tokenUser.userId}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${user.token}` },
          credentials: 'include'
        });
        const poemsJson = await poemResponse.json();

        if (poemResponse.ok) {
          dispatch({ type: 'SET_POEMS', payload: poemsJson });
        }

        const aboutResponse = await fetch(`${BASE_URL}/user/userAbouts/${user.tokenUser.userId}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${user.token}` },
          credentials: 'include'
        });
        const aboutJson = await aboutResponse.json();
        if (aboutResponse.ok) {
          setAboutOneText(aboutJson.about_one);
        }

        const imageResponse = await fetch(`${BASE_URL}/general/getImage/${user.tokenUser.userId}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${user.token}` },
          credentials: 'include'
        });
        const imageJson = await imageResponse.json();
        if (imageResponse.ok) {
          setProfileImage(imageJson ? imageJson.image : one);
        }
       
        setLoading(false); // Set loading to false after all data is fetched
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
        setLoading(false); // Ensure loading state is false even if an error occurs
      }
    };

    if (user) {
      fetchData();
    }
  }, [dispatch, user]);

  const convertToBase64 = (e) => {
    var render = new FileReader();
    render.readAsDataURL(e.target.files[0]);

    render.onload = () => {
      setIsImageSelected(true);
      setProfileImage(render.result);
    };
    render.onerror = error => {
      console.log("Error:", error);
    };
  };

  const uploadImage = async () => {
    const response = await fetch(`${BASE_URL}/general/uploadImage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64: profileImage, userId: user.tokenUser.userId }),
      credentials: 'include'
    });
    const json = await response.json();

    if (response.ok) {
      alert('Fotoğrafın değiştirildi');
      setIsImageSelected(false);
    } else {
      alert('Hata');
    }
  };

  if (!user) {
    return <div>Profilinizi görmek için giriş yapın</div>;
  }

  if (loading) {
    return <Loading />; // Show loading component until data is fetched
  }

  return (
    <div className="poetry-page-content">
      <div className="navbar-login"><Navbar /></div>
      <div id="p-page-left">
        <div id="p-user-photo">
          <img src={profileImage} alt="LoginPhoto" />
        </div>
        <div id="button-parts">
          {!isImageSelected ? (
            <div className="button-new-poetry">
              <input
                id="file-input"
                accept="image/*"
                type="file"
                onChange={convertToBase64}
                style={{ display: 'none' }}
              />
              <label htmlFor="file-input" id="upload-button">Fotoğraf Seç</label>
            </div>
          ) : (
            <div className="button-new-poetry">
              <button id="add-new-button" onClick={uploadImage}>Fotoğrafı yükle</button>
            </div>
          )}
          <div className="button-new-poetry">
            <button id="add-new-button" onClick={() => navigate('/yeni-yazi-siir', { state: { type: 'p' } })}>Şiir ekle</button>
          </div>
          <div className="button-new-poetry">
            <button id="add-new-button" onClick={() => navigate('/yeni-yazi-siir', { state: { type: 'e' } })}>Yazı ekle</button>
          </div>
          <div className="button-new-poetry">
            <button id="add-new-button" onClick={() => navigate(`/sair/${user.tokenUser.userId}`)}>Profilini gör</button>
          </div>
        </div>
      </div>

      <div id="poetry-page-main-content">
        <div id="p-about-part">
          <div id="p-user-info-part">
            <div id="p-info-name"><p>İsim: <strong>{user.tokenUser.name}</strong></p></div>
            <div id="p-info-name"><p>Mahlas: <strong>{user.tokenUser.mahlas}</strong> </p></div>
            <div id="p-info-name"><p>Hesap oluşturma tarihi: <strong>{formatDate(user.tokenUser.createdAt)}</strong> </p></div>
            <div id="p-info-name"><p>Paylaşılan Şiir Sayısı: <strong>{poemsList.length}</strong></p></div>
            <div id="p-info-name"><p>Paylaşılan Yazı Sayısı: <strong>{essaysList.length}</strong></p></div>
          </div>
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
                  onClick={handleUpdateAboutOne}>
                  <VscSaveAs /> </button>
              </div>
            </div>
          </div>
        </div>

        <div id="p-yazi-part">
          <div className="c-part" id="p-poem-part">
            <div id="h-pp">Şiirlerin</div>
            <div id="ccontents0">
              {poemsList.map((poem) => (
                <div className="c-part-name" key={poem._id}>
                  <div id="h-pp-title"><p>{poem.title}</p></div>
                  <div id="h-pp-button">
                    <div id="d-status">{poem.isVisible ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}</div>
                    <div id="d-expand"><button onClick={() => handleNavigateToPoem(poem._id)}><FaExpandAlt /> </button></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="c-part" id="p-poem-part">
            <div id="h-pp">Yazıların</div>
            <div id="ccontents0">
              {essaysList.map((poem) => (
                <div className="c-part-name" key={poem._id}>
                  <div id="h-pp-title"><p>{poem.title}</p></div>
                  <div id="h-pp-button">
                    <div id="d-status">{poem.isVisible ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}</div>
                    <div id="d-expand"><button onClick={() => handleNavigateToPoem(poem._id)}><FaExpandAlt /> </button></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>&copy; 2024 Müteferriç.</p>
      </div>
    </div>
  );
};

export default Poetry;