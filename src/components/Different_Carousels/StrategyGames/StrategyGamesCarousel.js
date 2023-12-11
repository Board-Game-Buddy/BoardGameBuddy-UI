import './StrategyGamesCarousel.css';
import PropTypes from 'prop-types';
import GameCard from '../../Card/GameCard';
import { useRef, useState, useEffect } from 'react';
import { getSearchedGames } from '../../../apiCalls';

function StrategyGamesCarousel({ setServerError, currentUser, userFaves }) {

  const [strategyGames, setStrategyGames] = useState([])

  useEffect(() => {
    getSearchedGames(`categories=strategy`)
      .then((data) => {
        setStrategyGames(data.data)
        })
      .catch((error) => {
        setServerError({ hasError: true, message: `${error.message}` })
        })
    }, [setServerError])

    const sliderRef = useRef(null)

    if (strategyGames.length === 0) {
        return null;
      }

    const familyGames = strategyGames.map((game, index) => (
        <GameCard
          key={game.id}
          title={game.attributes.title}
          categories={[game.attributes.categories]}
          image={game.attributes.image_path}
          description={game.attributes.description}
          min_players={game.attributes.min_players}
          max_players={game.attributes.max_players}
          id={game.id}
          currentUser={currentUser}
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
    <div className='saved-carousel-container'>
        <div className='carousel-title'>Top Strategy Games</div>
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
        {familyGames}
      </div>
      <div className='navigation-btn right' onClick={() => scrollBy(200)}>
        &gt;
      </div>
    </div>
  );
}

export default StrategyGamesCarousel;

StrategyGamesCarousel.propTypes = {
  setServerError: PropTypes.func.isRequired,
};