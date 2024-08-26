import React, { useState, useEffect } from 'react';
import '../css/PoetrySingle.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { usePoemContext } from '../hooks/usePoemContext';
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import Navbar from '../components/header';
import Loading from '../components/loading';
import { Link } from 'react-router-dom';
import BASE_URL from '../utils/url';
import { formatDate } from '../utils/garbage';
import one from '../assets/img/photo-default.png';

export const PoetrySingle = () => {
    const { poem_id } = useParams();
    const { user } = useAuthContext();
    const { dispatch } = usePoemContext();
    const navigate = useNavigate();
    const [poem, setPoem] = useState(null);
    const [p_user, setUser] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [profileImage, setProfileImage] = useState('');

    const checkIfUserPoem = (poem, user) => {
        return (user && (user.tokenUser.userId === poem.userId || user.tokenUser.userType === "A"));
    };


    useEffect(() => {
        const fetchPoem = async () => {
            try {
                const response = await fetch(`${BASE_URL}/siir/${poem_id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });
                const json = await response.json();

                if (response.ok) {
                    setPoem(json);

                    let userResponse = await fetch(`${BASE_URL}/user/${json.userId}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include'
                    });
                    let userJson = await userResponse.json();

                    if (!userJson) {
                        userResponse = await fetch(`${BASE_URL}/poet/${json.userId}`, {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                            credentials: 'include'
                        });
                        userJson = await userResponse.json();
                    }

                    if (userResponse.ok) {
                        setUser(userJson);
                    } else {
                        console.error(userJson.error);
                    }

                    // Fetch profile image after poem is loaded
                    const fetchProfileImage = async () => {
                        try {
                            const imageResponse = await fetch(`${BASE_URL}/general/getImage/${json.userId}`, {
                                method: 'GET',
                            });
                            const imageJson = await imageResponse.json();
                            if (imageResponse.ok) {
                                setProfileImage(imageJson ? imageJson.image : one);
                            }
                        } catch (error) {
                            console.error('Error fetching profile image:', error);
                        }
                    };

                    fetchProfileImage();
                } else {
                    console.error(json.error);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

       

        fetchPoem();
    }, [poem_id]);
    
    const handleUpdate = (title, poetry, visibility, isUpdated, poemId, poemType) => {
        navigate('/yeni-yazi-siir', {
            state: {
                defaultTitle: title,
                defaultPoetry: poetry,
                defaultVisibility: visibility,
                defaultIsUpdated: isUpdated,
                defaultPoemId: poemId,
                defaultPoemType: poemType
            },
        });
    };


    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`${BASE_URL}/siir/${poem._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'DELETE_POEM', payload: json });
                navigate('/profilim');
            } else {
                console.error(json.error);
            }
        } catch (error) {
            console.error('Error deleting poem:', error);
        }
    };

    if (!poem) {
        return <Loading />;
    }

    return (

        <div className="poem-single-content-page">
            <div className="navbar-login"><Navbar /></div>
            <div id="left"></div>
            <div id="content">
                <div id="ct-header">
                    <div id="ct-header-photo">
                        <img src={profileImage} alt="" />

                    </div>
                    <div id="ct-header-title">
                        <div class="ct-header-title-head">
                            <p><strong>{poem.title}</strong></p>
                        </div>
                        <div class="ct-header-title-head" id="poet">
                            <p><Link to={`/sair/${p_user ? p_user._id : '#'}`}>
                                {p_user ? p_user.name : ''}
                            </Link></p>
                            <div id="div-buttons">
                            {checkIfUserPoem(poem, user) && (
                                <div id="div-buttons">
                                    <button
                                        className="arr-small-button"
                                        onClick={() => handleUpdate(poem.title, poem.poetry, poem.isVisible, true, poem._id, poem.type)}
                                    >
                                        <GrUpdate />
                                    </button>
                                    <button
                                        className="arr-small-button"
                                        onClick={() => setShowConfirmDialog(true)}
                                    >
                                        <MdDelete />
                                    </button>

                                </div>)}
                            </div>
                        </div>
                        <div class="ct-header-title-head" id="date"><p>{formatDate(poem.createdAt)}</p></div>

                    </div>
                </div>
                <div id="ct-text">
                    <p dangerouslySetInnerHTML={{ __html: poem.poetry.replace(/\n/g, '<br />') }}></p>
                </div>

            </div>
            <div id="right"></div>

            <div className="footer">
                <p>&copy; 2024 Müteferriç.</p>
            </div>
            {showConfirmDialog && (
             <div className="confirm-dialog">
                 <p>Silmek istediğine emin misin?</p>
                 <div className="confirm-dialog-buttons">
                     <button onClick={handleDeleteClick}>Evet</button>
                     <button onClick={() => setShowConfirmDialog(false)}>Hayır</button>
                 </div>
             </div>
         )}
        </div>

    );
};

export default PoetrySingle;
