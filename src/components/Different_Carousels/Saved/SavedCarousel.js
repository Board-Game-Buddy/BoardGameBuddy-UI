import './SavedCarousel.css';
import PropTypes from 'prop-types';
import GameCard from '../../Card/GameCard';
import { useRef, useState, useEffect } from 'react';
import { useApi } from '../../../apiHooks';

function SavedCarousel({ setServerError, currentUser, userFaves }) {

  const { getUserFavorites } = useApi()
  const [savedGames, setSavedGames] = useState([])

  useEffect(() => {
    getUserFavorites(currentUser)
      .then((data) => {
        setSavedGames(data)
        })
      .catch((error) => {
        setServerError({ hasError: true, message: `${error.message}` })
        })
    }, [setServerError, currentUser])

    const sliderRef = useRef(null)

    const savedGameCards = savedGames.map((game, index) => (
        <GameCard
          key={game.id}
          title={game.title}
          image={game.image_path}
          currentUser={currentUser}
          id={game.id}
          userFaves={userFaves}
        />
      ))

  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    sliderRef.current.classList.add('active');
    startX = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    sliderRef.current.classList.remove('active');
  };

  const handleMouseUp = () => {
    isDown = false;
    sliderRef.current.classList.remove('active');
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1; 
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollBy = (distance) => {
    sliderRef.current.scrollLeft += distance;
  };

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
        {savedGameCards}
      </div>
      <div className='navigation-btn right' onClick={() => scrollBy(200)}>
        &gt;
      </div>
      </>
    )}
    </div>
  )
}


export default SavedCarousel

SavedCarousel.propTypes = {
  setServerError: PropTypes.func.isRequired,
};