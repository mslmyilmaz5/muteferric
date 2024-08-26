import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogOut } from '../hooks/useLogOut';
import { Link, useNavigate } from 'react-router-dom';
import '../css/header.css';
import { RiMenuLine } from "react-icons/ri";

const Navbar = () => {
  const { logout } = useLogOut();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div id="header-content">
        <div id="main">
          <Link to="/">MÜTEFERRİÇ</Link>
          <button className="menu-button" onClick={toggleMenu}>
          <RiMenuLine />
          </button>
        </div>
        <div id="nav-links" className={menuOpen ? 'open' : ''}>
          <Link to="/hakkimizda">Hakkımızda</Link>
          <Link to="/varanlar">Varanlar</Link>
          <Link to="/dolasanlar">Dolaşanlar</Link>
          {user && <Link to="/profilim">Profilim</Link>}
        </div>
      </div>
      <div className="header-buttons">
        {user ? (
          <button className="header-button" onClick={handleClick}>Çıkış yap</button>
        ) : (
          <>
            <button className="header-button" onClick={() => navigate('/giris')}>Giriş yap</button>
            <button className="header-button" onClick={() => navigate('/kayit-ol')}>Kayıt Ol</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;