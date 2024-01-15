import './Header.css'
import PropTypes from 'prop-types';
import Logo from '../../Logo.png'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Header({ resetError, currentUser, setCurrentUser, users }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isBasePath = location.pathname === '/';
  const [currentProfile, setCurrentProfile] = useState(null)

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

  useEffect(() => {
    const foundProfile = users.find((profile) => profile.data.id === currentUser);
    setCurrentProfile(foundProfile);
  }, [users, currentUser])

  return (
    <nav>
      <input
        type="checkbox"
        id="nav-toggle"
        checked={isNavOpen}
        onChange={toggleNav}
      />
      <Link to={isBasePath ? '/' : `/${currentUser}/home`}>
        <img className="logo" src={Logo} alt="Logo" />
      </Link>
      <img
        className='userPicHidden'
        src={currentProfile ? currentProfile.data.attributes.image_path : ''}
        alt={currentProfile ? `${currentProfile.data.attributes.name} user number ${currentUser}` : ''}
      />
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
                  <Link className='profile-change' to={`/`} onClick={() => { setCurrentUser(null); closeNav(); }}>
                    Change Profile
                  </Link>
                </li>
              )}
              <Link to={`/${currentUser}/1`} onClick={closeNav}>
                All Games
              </Link>
              <img
                className='userPic'
                src={currentProfile ? currentProfile.data.attributes.image_path : ''}
                alt={currentProfile ? `${currentProfile.data.attributes.name} user number ${currentUser}` : ''}
              />
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
  currentUser: PropTypes.number,
};
