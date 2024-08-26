import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePoemFormPost } from '../hooks/usePoemFormPost';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/header';
import '../css/CreatePoem.css';

export const CreatePoem = () => {
  
  const location = useLocation();
  const { submitPoem, error, isLoading } = usePoemFormPost();
  const { user } = useAuthContext();
  const [title, setTitle] = useState('');
  const [poetry, setPoetry] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [updatedPoemId, setUpdatedPoemId] = useState('');
  const type = location.state?.type;

  useEffect(() => {
  
    if (location.state) {
      setTitle(location.state.defaultTitle || '');
      setPoetry(location.state.defaultPoetry || '');
      setIsVisible(location.state.defaultVisibility || false);
      setIsUpdated(location.state.defaultIsUpdated || false)
      setUpdatedPoemId(location.state.defaultPoemId || '');
    }
  }, [location.state]);
  
  if (!user) {
    return <div>Please log in to create poems.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitPoem(title, poetry, isVisible, isUpdated, updatedPoemId, type );
    
  };

  const handleCheckboxChange = (e) => {
    setIsVisible(e.target.checked);
  };
  
  const setPtags = (type) => {
    const result = [];
  
    if (type === "p") {
      result[0] = "\"Şiir hassastır. Öyle üstün körü yazmaya gelmez. İyice ölçüp tarttıktan sonra dizeceksin kelimeleri. Sonunu uyduracağım diye hakikati incitmeyeceksin.\""
  
    } else if (type === "e") {
      result[0] = "\"Alim unutmuş, kalem unutmamış.\"";
      
    } 
  
    return result;
  };


  
  const ptags = setPtags(type); // Make sure type is defined or passed as a prop
  return (
    <div className="create-poem-page">
      <div className="navbar-login">
        <Navbar />
      </div>
      <div id="left-part"></div>
      <div id="main-part">
        <div id="main-part-header">
          <p>{ptags[0]}</p>
        </div>
        
        <div id="main-part-form">
          <div id="form-head-input">
            <input
              type="text"
              placeholder="SERLEVHA"
              id="input-field-h"
              maxLength={50}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div id="form-poem-input">
            <textarea
              className="input-field"
              rows="28"
           
              onChange={(e) => setPoetry(e.target.value)}
              value={poetry}
            />
          </div>
          <div id="form-poem-button-container">
            <div id="check-box-part">
              <input
                type="checkbox"
                id="isVisible"
                onChange={handleCheckboxChange}
                checked={isVisible}
              />
              <label htmlFor="isVisible">Herkes tarafından görülebilsin istiyorum.</label>
            </div>
            <div id="button-part">
              <button
                type="submit"
                className="submit-button-poem"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
        <div className="error-bar">
          {error && <p>{error}</p>}
        </div>
      </div>
      <div id="right-part"></div>
      <div className="footer">
      <p>&copy; 2024 Müteferriç.</p>
      </div>
    </div>
  );
};

export default CreatePoem;
