import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import '../css/Login.css';
import Navbar from '../components/header';
import one from '../assets/img/one.jpg';
import { Helmet } from 'react-helmet-async';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (

        <>
        <Helmet>
          <title>Şiirle | Giriş</title>
          <meta name="description" content="Giriş yap." />
          <link rel="canonical" href="/giris" />
        </Helmet>

        <div className="login-page-content">
        <div className="navbar-login">
            <Navbar />
        </div>
        <article className="article-left">  
        </article>

        <div className="login-from-box">
            <div className="login-from-header">
                <p>Dolaşmaya Başla!</p>
            </div>
            <div className="img-box">
                <img src={one} alt="LoginPhoto" />
            </div>
            <div className="login-from-context">
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
                        {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                    </button>
                </div>
            </div>
            {error && (
                <div className="error-bar">
                    <p>{error}</p>
                </div>
            )}

        </div>

        <article className="article-right">
            
        </article>
        <div className="footer">
        <p>&copy; 2024 Müteferriç.</p>
        </div>
    </div>

    </>
    )

}

export default Login