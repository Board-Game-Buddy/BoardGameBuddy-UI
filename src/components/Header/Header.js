import './Header.css';
import Logo from '../../Logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Header({ resetError, currentUser }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.remove("links");
    }
  }, [location]);

  const isBasePath = location.pathname === '/';
  const isSavedPath = location.pathname === `/${currentUser}/saved`;

  return (
    <nav>
      <input type="checkbox" id="nav-toggle" />
      <img className='logo' src={Logo} alt="Logo" />
      <ul className="links">
        <li>
          <Link to={`/${currentUser}/home`} onClick={() => {resetError()}}>Home</Link>
        </li>
        {!isBasePath && !isSavedPath && (
          <>
            <li>
              <Link to={`/${currentUser}/saved`}>Saved Games</Link>
            </li>
            {/* Additional menu items */}
          </>
        )}
      </ul>
      <label htmlFor="nav-toggle" className="icon-burger">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </label>
    </nav>
  );
}

export default Header;
