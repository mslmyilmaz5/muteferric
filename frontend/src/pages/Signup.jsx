import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import login_photo_2 from "../assets/img/two.jpg"
import Navbar from '../components/header';


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mahlas, setMahlas] = useState('');
    const { signup, error, isLoading } = useSignup();
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(name, mahlas, email, password);
        if (error) {
            setShowErrorModal(true);
        }

    };


    return (

        <div className="login-page-content">
            <div className="navbar-login">
                <Navbar />
            </div>
            <article className="article-left">
            </article>

            <div className="login-from-box">
            <div className="login-from-header">
                    <p>Sen de Hemen Dolaşanların Arasına Katıl!</p>
                </div>
                <div className="img-box">
                    <img src={login_photo_2} alt="LoginPhoto" />
                </div>
               
                <div className="login-from-context">
                    <div className="name-input">
                        <input
                            type="text"
                            placeholder="İsminiz"
                            className="input-field"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className="mahlas-input">
                        <input
                            type="text"
                            placeholder="Mahlasınız"
                            className="input-field"
                            onChange={(e) => setMahlas(e.target.value)}
                            value={mahlas}
                        />
                    </div>
                    <div className="mail-input">
                        <input
                            type="text"
                            placeholder="Mail adresiniz"
                            className="input-field"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                    </div>
                    <div className="password-input">
                        <input
                            type="password"
                            placeholder="Şifreniz"
                            className="input-field"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div className="submit-button-container">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="submit-button"
                            onClick={handleSubmit}
                        >
                            {isLoading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
                        </button>
                    </div>
                </div>
                {error && (
                    <div className="error-bar">
                        <p>{error}</p>
                    </div>
                )}

            </div>

            <article className="article-right"></article>
            <div className="footer">
            <p>&copy; 2024 Müteferriç.</p>
            </div>
        </div>
    );
};

export default Signup;


