import './SavedCarousel.css';
import PropTypes from 'prop-types';
import GameCard from '../../Card/GameCard';
import { useRef, useState, useEffect } from 'react';
import { useApi } from '../../../apiHooks';
import { useSelector } from 'react-redux';

function SavedCarousel({ setServerError, currentUser}) {
  const { getUserFavorites } = useApi();
  const [savedGames, setSavedGames] = useState([]);
  const favoriteCardsRedux = useSelector((state) => state.favoriteCards[currentUser]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      getUserFavorites(currentUser)
        .then((data) => {
          setSavedGames(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setServerError({ hasError: true, message: `${error.message}` });
        });
    }, 
    [setServerError, currentUser]);

  const sliderRef = useRef(null);

  const handleMouseDown = (e) => {
    // ... (unchanged code)
  };

  const handleMouseLeave = () => {
    // ... (unchanged code)
  };

  const handleMouseUp = () => {
    // ... (unchanged code)
  };

  const handleMouseMove = (e) => {
    // ... (unchanged code)
  };

  const scrollBy = (distance) => {
    // ... (unchanged code)
  };

  if (isLoading) {
    return (
      <div className='carousel-title'>
        Loading Saved Games...
      </div>
    );
  }

  return (
    <div className='saved-carousel-container' id='save-car'>
      {savedGames.length === 0 ? (
        <div className='carousel-title'>
          Save your favorite games to see them here!
        </div>
      ) : (
        <>
          <div className='carousel-title'>My Saved Games</div>
          <div className='navigation-btn left' onClick={() => scrollBy(-200)}>
            &lt;
          </div>
          <div
            className='saved-carousel carousel items'
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {savedGames.map((game, index) => (
              <GameCard
                key={game.id}
                title={game.title}
                image={game.image_path}
                currentUser={currentUser}
                id={game.id}
                favoriteCardsRedux={favoriteCardsRedux}
              />
            ))}
          </div>
          <div className='navigation-btn right' onClick={() => scrollBy(200)}>
            &gt;
          </div>
        </>
      )}
    </div>
  );
}

export default SavedCarousel;

SavedCarousel.propTypes = {
  setServerError: PropTypes.func.isRequired,
};
