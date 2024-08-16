import React, { useState, useEffect } from 'react';
import '../css/PoetrySingle.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { usePoemContext } from '../hooks/usePoemContext';
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import Navbar from '../components/header';
import Loading from '../components/loading';
import BASE_URL from '../utils/url';

export const PoetrySingle = () => {
    const { poem_id } = useParams();
    const { user } = useAuthContext();
    const { dispatch } = usePoemContext();
    const navigate = useNavigate();
    const [poem, setPoem] = useState(null);
    const [p_user, setUser] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const checkIfUserPoem = (poem, user) => {
        return (user && (user.tokenUser.userId === poem.userId || user.tokenUser.userType === "A"));
    };

    useEffect(() => {
        const fetchPoem = async () => {
            try {
                // Fetch the poem data
                const response = await fetch(`${BASE_URL}/poetry/${poem_id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });
                const json = await response.json();

                if (response.ok) {
                    setPoem(json);

                    // Try fetching user data from the primary endpoint
                    let userResponse = await fetch(`${BASE_URL}/user/${json.userId}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include'
                    });
                    let userJson = await userResponse.json();

                    // If user data is not found, try the fallback endpoint
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
        navigate('/createPoem', {
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

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    };

    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`${BASE_URL}/poetry/${poem._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'DELETE_POEM', payload: json });
                navigate('/myPoetries');
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
            <div id="lleft">
                <article id="article-left-up"></article>
                <article id="article-left-down"></article>
            </div>
            <div id="poem-single-content-main">
                <div id="p-s-h"><p><strong>{poem.title}</strong></p></div>
                <div id="p-s-b">
                    <div id="p-s-b-t">
                        {poem.createdAt && (
                            <p><strong>{formatDate(poem.createdAt)}</strong></p>
                        )}
                    </div>
                    <div id="p-s-c-poem">
                        <strong>
                            <p>
                                <a href={`/viewPoet/${p_user ? p_user._id : '#'}`}>
                                    {p_user ? p_user.name : ''}
                                </a>
                            </p>
                        </strong>
                    </div>
                    {checkIfUserPoem(poem, user) && (
                        <div id="p-s-b-b">
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
                        </div>
                    )}
                </div>
                {poem.type === "p" && (
                    <div id="p-s-c-p">
                        <p dangerouslySetInnerHTML={{ __html: poem.poetry.replace(/\n/g, '<br />') }}></p>
                    </div>
                )}
                {poem.type === "e" && (
                    <div id="p-s-c-e">
                        <p dangerouslySetInnerHTML={{ __html: poem.poetry.replace(/\n/g, '<br />') }}></p>
                    </div>
                )}
            </div>
            <div id="rright">
                <article id="article-right-up"></article>
                <article id="article-right-down"></article>
            </div>
            <div className="footer">
                <p>&copy; 2024 Müteferriç.</p>
            </div>
            {showConfirmDialog && (
                <div className="confirm-dialog">
                    <p>Are you sure you want to delete this poem?</p>
                    <div className="confirm-dialog-buttons">
                        <button onClick={handleDeleteClick}>Yes</button>
                        <button onClick={() => setShowConfirmDialog(false)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PoetrySingle;