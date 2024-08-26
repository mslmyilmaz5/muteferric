import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/header';
import '../css/PoetryStatic.css';
import BASE_URL from '../utils/url';
import Loading from '../components/loading';
import one from '../assets/img/photo-default.png';
import { formatDate } from '../utils/garbage';

export const PoetryStatic = () => {

  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  const [poems, setPoems] = useState([]);
  const [aboutOne, setAboutOne] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const poemsList = poems.filter(poem => poem.type === "p");
  const essaysList = poems.filter(poem => poem.type === "e");
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleNavigateToPoem = (poem_id) => {
    navigate(`/siir/${poem_id}`);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
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

          const responsePoems = await fetch(`${BASE_URL}/siir/gorunur-siirler?user_id=${user_id}`, {
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

          const imageResponse = await fetch(`${BASE_URL}/general/getImage/${user_id}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${userData.token}` },
            credentials: 'include'
          });

          const imageJson = await imageResponse.json();
          if (imageResponse.ok) {
            setProfileImage(imageJson ? imageJson.image : one);
          } else {
            console.error('Error fetching image:', imageJson.error);
          }
        } else {
          console.error(userData.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user_id]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <div>Error: User not found</div>;
  }

  return (
    <div className="poetry-page-content">
      <div className="navbar-login"><Navbar /></div>
      <div id="p-page-left">
        <div id="p-user-photo">
          <img src={profileImage} alt="LoginPhoto" />
        </div>
        <div id="banner"></div>
      </div>
      <div id="poetry-page-main-content">
        <div id="p-about-part">
          <div id="p-user-info-part">
            <div id="p-info-name"><p>İsim: <strong>{user.name}</strong></p></div>
            {(user.user_type != "VP" && <div id="p-info-name"><p>Mahlas: <strong>{user.mahlas}</strong></p></div>)}
            <div id="p-info-name"><p>Hesap oluşturma tarihi: <strong>{formatDate(user.createdAt)}</strong></p></div>
            <div id="p-info-name"><p>Paylaşılan Şiir Sayısı: <strong>{poemsList.length}</strong></p></div>
            <div id="p-info-name"><p>Paylaşılan Yazı Sayısı: <strong>{essaysList.length}</strong></p></div>
          </div>
          <div id="p-about-part-1">
            <div id="p-about-part-1-head"><p><strong>Hakkında</strong></p></div>
            <div id="p-about-part-1-static-content">
              {aboutOne.length > 0 ? (
                <p>{aboutOne}</p>
              ) : (
                <div className="empty-message"><p>Hakkında kısmı eklenmedi</p></div>
              )}
            </div>
          </div>
        </div>

        <div id="p-yazi-part">
          <div className="c-part" id="p-poem-part">
            <div id="h-pp"><strong>Şiirleri</strong></div>
            <div id="ccontents0">
              {poemsList.length > 0 ? (
                poemsList.map((poem) => (
                  <div className="c-part-name" key={poem._id}
                    onClick={() => handleNavigateToPoem(poem._id)}
                    style={{ cursor: 'pointer' }}>
                    <div id="h-pp-title"><p>{poem.title}</p></div>
                  </div>
                ))
              ) : (
                <div className="empty-message"><p>Henüz eklenen şiir yok</p></div>
              )}
            </div>
          </div>
          <div className="c-part" id="p-poem-part">
            <div id="h-pp"><strong>Yazıları</strong></div>
            <div id="ccontents">
              {essaysList.length > 0 ? (
                essaysList.map((essay) => (
                  <div className="c-part-name" key={essay._id}
                    onClick={() => handleNavigateToPoem(essay._id)}
                    style={{ cursor: 'pointer' }}>
                    <div id="h-pp-title"><p>{essay.title}</p></div>

                  </div>
                ))
              ) : (
                <div className="empty-message"><p>Henüz eklenen yazı yok</p></div>
              )}
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

export default PoetryStatic;