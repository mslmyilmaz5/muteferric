
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogOut } from '../hooks/useLogOut';
import '../css/header.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { logout } = useLogOut()
  const { user } = useAuthContext()
  const navigate = useNavigate();

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div id="header-content">
        <div id="main">
        <a href="/">MÜTEFERRİÇ</a>
        </div>
        <div id="poem-page-link">
        { user ? <a href="/myPoetries">Profilim</a> : ''}
        </div>
      </div>
      {user && (
        <div className="header-buttons">
          <button className="header-button" onClick={handleClick}>Çıkış yap</button>
        </div>
      )}
      {!user && (
        <div className="header-buttons">
          <button className="header-button" onClick={() => navigate('/login')}>Giriş yap</button>
          <button className="header-button" onClick={() => navigate('/signup')}>Kayıt Ol</button>
        </div>
      )}
    </header>
  )
}

export default Navbar
