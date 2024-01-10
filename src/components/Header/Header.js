import './Header.css'
import PropTypes from 'prop-types';
import Logo from '../../Logo.png'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Header({ resetError, currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isBasePath = location.pathname === '/';
  const isSavedPath = location.pathname === `/${currentUser}/saved`;

  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleHomeClick = () => {
    if (currentUser) {
      navigate(`/${currentUser}/home`);
    } else {
      navigate('/');
    }
    closeNav();
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const isProfileVisible = !isBasePath;

  return (
    <nav>
      <input
        type="checkbox"
        id="nav-toggle"
        checked={isNavOpen}
        onChange={toggleNav}
      />
      <img className="logo" src={Logo} alt="Logo" />
      {!isBasePath && (
        <ul className="links">
          <li
            onClick={() => {
              resetError();
              handleHomeClick();
            }}
          >
            <div className="a">Home</div>
          </li>
          {isProfileVisible && (
            <>
              {!location.pathname.includes(`/${currentUser}/saved`) && (
                <li>
                  <Link to={`/${currentUser}/saved`} onClick={closeNav}>
                    Saved Games
                  </Link>
                </li>
              )}
              {!isBasePath && (
                <li>
                  <Link to={`/`} onClick={() => { setCurrentUser(null); closeNav(); }}>
                    Change Profile
                  </Link>
                </li>
              )}
              <Link to={`/${currentUser}/1`} onClick={closeNav}>
                All Games
              </Link>
            </>
          )}
        </ul>
      )}
      <label htmlFor="nav-toggle" className="icon-burger">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </label>
    </nav>
  );
}

export default Header;

Header.propTypes = {
  resetError: PropTypes.func.isRequired,
  currentUser: PropTypes.number.isRequired,
};
