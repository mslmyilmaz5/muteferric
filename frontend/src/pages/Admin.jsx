import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Admin.css';
import { useAuthContext } from "../hooks/useAuthContext";
import BASE_URL from '../utils/url';

const Admin = () => {
    const { user } = useAuthContext();

    const [poet, setPoet] = useState({
        name: '',
        about_one: '',
        user_type: 'VP',
        profileImage: '', // Added for profile image
    });

    const [poem, setPoem] = useState({
        title: '',
        poetry: '',
        userId: '',
        isVisible: true,
        type: 'p',
    });

    const [poets, setPoets] = useState([]);
    const [selectedPoet, setSelectedPoet] = useState('');
    const [updatedAboutOne, setUpdatedAboutOne] = useState('');
    const [todayHomeText, setTodayHomeText] = useState('');
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [profileImage, setProfileImage] = useState('');

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

    const uploadImage = async (userId) => {
        if (!profileImage || !userId) return; // Add checks to avoid errors

        const response = await fetch(`${BASE_URL}/general/uploadImage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ base64: profileImage, userId: userId }),
            credentials: 'include'
        });
        const json = await response.json();

        if (response.ok) {
            alert('Photo updated successfully');
            setIsImageSelected(false);
        } else {
            alert('Error updating photo');
        }
    };

    useEffect(() => {
        const fetchPoets = async () => {
            try {
                const response = await fetch(`${BASE_URL}/poet/getAllPoets`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                setPoets(data);
            } catch (error) {
                console.error('There was an error fetching the poets!', error);
            }
        };

        fetchPoets();
    }, []);

    const handlePoetChange = (e) => {
        const { name, value } = e.target;
        setPoet((prevPoet) => ({
            ...prevPoet,
            [name]: value,
        }));
    };

    const handlePoemChange = (e) => {
        const { name, value } = e.target;
        setPoem((prevPoem) => ({
            ...prevPoem,
            [name]: value,
        }));
    };

    const handlePoetSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/poet/registerPoet`, poet);
            alert('Poet registered successfully!');
            console.log(response.data)
            await uploadImage(response.data._id); // Assume response contains userId
        } catch (error) {
            console.error('There was an error registering the poet!', error);
        }
    };

    const handlePoemSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/poet/registerPoem`, poem);
            alert('Poem registered successfully!');
        } catch (error) {
            console.error('There was an error registering the poem!', error);
        }
    };

    const handleAboutOneUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${BASE_URL}/poet/update/aboutOne/${selectedPoet}`, { text: updatedAboutOne });
            alert('About One updated successfully!');
        } catch (error) {
            console.error('There was an error updating About One!', error);
        }
    };

    const handleUpdateHomeText = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${BASE_URL}/general/updateHomeText`, {
                updated_text: todayHomeText,
            });
            alert('Home text updated successfully!');
        } catch (error) {
            console.error('There was an error updating the home text!', error);
        }
    };

    // Handle the case where user might be null
    if (!user || !user.tokenUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin-container">
            {user.tokenUser.userType === "A" ? (
                <>
                    <div className="form-container">
                        <h2 className="form-title">Register Poet</h2>
                        <form onSubmit={handlePoetSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={poet.name}
                                    onChange={handlePoetChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="about_one">About (Part 1)</label>
                                <textarea
                                    name="about_one"
                                    value={poet.about_one}
                                    onChange={handlePoetChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="profileImage">Profile Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={convertToBase64}
                                />
                                {isImageSelected && <p>Image selected, ready to upload.</p>}
                            </div>
                            <button type="submit" className="submit-button">Register Poet</button>
                        </form>
                    </div>

                    <div className="form-container">
                        <h2 className="form-title">Register Poem</h2>
                        <form onSubmit={handlePoemSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={poem.title}
                                    onChange={handlePoemChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="poetry">Poetry</label>
                                <textarea
                                    name="poetry"
                                    value={poem.poetry}
                                    onChange={handlePoemChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userId">Select Poet</label>
                                <select
                                    name="userId"
                                    value={poem.userId}
                                    onChange={handlePoemChange}
                                    required
                                >
                                    <option value="">Select a Poet</option>
                                    {poets.map((poet) => (
                                        <option key={poet._id} value={poet._id}>
                                            {poet.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="isVisible"
                                        checked={poem.isVisible}
                                        onChange={(e) => setPoem((prevPoem) => ({ ...prevPoem, isVisible: e.target.checked }))}
                                    />
                                    Visible
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="type">Type</label>
                                <select name="type" value={poem.type} onChange={handlePoemChange}>
                                    <option value="p">Poem</option>
                                    <option value="e">Essay</option>
                                </select>
                            </div>
                            <button type="submit" className="submit-button">Register Poem</button>
                        </form>
                    </div>

                    <div className="form-container">
                        <h2 className="form-title">Update About One</h2>
                        <form onSubmit={handleAboutOneUpdate}>
                            <div className="form-group">
                                <label htmlFor="selectedPoet">Select Poet</label>
                                <select
                                    name="selectedPoet"
                                    value={selectedPoet}
                                    onChange={(e) => setSelectedPoet(e.target.value)}
                                    required
                                >
                                    <option value="">Select a Poet</option>
                                    {poets.map((poet) => (
                                        <option key={poet._id} value={poet._id}>
                                            {poet.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="updatedAboutOne">Updated About One</label>
                                <textarea
                                    name="updatedAboutOne"
                                    value={updatedAboutOne}
                                    onChange={(e) => setUpdatedAboutOne(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-button">Update About One</button>
                        </form>
                    </div>

                    <div className="form-container">
                        <h2 className="form-title">Update Home Text</h2>
                        <form onSubmit={handleUpdateHomeText}>
                            <div className="form-group">
                                <label htmlFor="todayHomeText">Home Text</label>
                                <textarea
                                    name="todayHomeText"
                                    value={todayHomeText}
                                    onChange={(e) => setTodayHomeText(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-button">Update Home Text</button>
                        </form>
                    </div>
                </>
            ) : (
                <div className="no-access">You do not have access to this page.</div>
            )}
        </div>
    );
};

export default Admin;