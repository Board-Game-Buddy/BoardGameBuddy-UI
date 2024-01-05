import './GameCard.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import filled from '../../Assets/filled.png';
import unfilled from '../../Assets/unfilled.png';
import { useApi } from '../../apiHooks';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite, initFavorites } from '../../Redux/favoriteCardsSlice';

function GameCard({ id, title, image, currentUser }) {
  const idNum = parseInt(currentUser);
  const dispatch = useDispatch();
  const userFaves = useSelector((state) => state.favoriteCards[currentUser] || []);
  const isFavorite = userFaves.some((favorite) => favorite.id === id);
  const { postUserFavorite, deleteUserFavorite } = useApi();

  const toggleFavorite = () => {
    if (isFavorite) {
      deleteUserFavorite(idNum, id);
    } else {
      postUserFavorite(idNum, id);
    }
  };

  return (
    <div className='card'>
      <div className='image-container'>
        <Link to={`/game/${id}`} className='selected-game-link'>
          <img
            id={id}
            key={id}
            className='game-image'
            src={image || 'https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png'}
            alt={`Board game cover for ${title}`}
          />
        </Link>
        <div className='selected-favorite-btn' id="save" onClick={() => toggleFavorite()}>
          {isFavorite ? (
            <img src={filled} alt='filled in collection icon showing that this game is saved to the users favorites' style={{ cursor: 'pointer', fontSize: '1.3em' }} />
          ) : (
            <img src={unfilled} alt='unfilled collection icon showing that this game is not saved to the users favorites' style={{ fontSize: '1.3em' }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default GameCard;

GameCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
        