import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogOut } from '../hooks/useLogOut';
import { Link, useNavigate } from 'react-router-dom';
import { RiMenuLine } from "react-icons/ri";
import '../css/header.css';

const Navbar = () => {
  const { logout } = useLogOut();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => setMenuOpen(prevState => !prevState);

  return (
    <header>
      <div id="header-content">
        <div id="main">
          <Link to="/">MÜTEFERRİÇ</Link>
          <button className="menu-button" onClick={toggleMenu}>
            <RiMenuLine />
          </button>
        </div>
        <nav id="nav-links" className={menuOpen ? 'open' : ''}>
          <Link to="/hakkimizda">Hakkımızda</Link>
          {user && <Link to="/profilim">Profilim</Link>}
          <div className="header-buttons">
            {user ? (
              <button className="header-button" onClick={handleLogout}>Çıkış yap</button>
            ) : (
              <>
                <button className="header-button" onClick={() => navigate('/giris')}>Giriş yap</button>
                <button className="header-button" onClick={() => navigate('/kayit-ol')}>Kayıt Ol</button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;