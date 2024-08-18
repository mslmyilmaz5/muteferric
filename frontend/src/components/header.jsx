import { useAuthContext } from '../hooks/useAuthContext';
import { useLogOut } from '../hooks/useLogOut';
import { Link, useNavigate } from 'react-router-dom';
import '../css/header.css';

const Navbar = () => {
  const { logout } = useLogOut();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div id="header-content">
        <div id="main">
          <Link to="/">MÜTEFERRİÇ</Link>
        </div>
        <div id="poem-page-link">
          {user && <Link to="/profilim">Profilim</Link>}
        </div>
      </div>
      {user ? (
        <div className="header-buttons">
          <button className="header-button" onClick={handleClick}>Çıkış yap</button>
        </div>
      ) : (
        <div className="header-buttons">
          <button className="header-button" onClick={() => navigate('/giris')}>Giriş yap</button>
          <button className="header-button" onClick={() => navigate('/kayit-ol')}>Kayıt Ol</button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
