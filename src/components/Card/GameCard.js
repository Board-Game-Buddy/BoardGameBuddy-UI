import React, { useEffect, useState, useMemo } from 'react';
import './GameCard.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import filled from '../../Assets/filled.png';
import unfilled from '../../Assets/unfilled.png';
import { useApi } from '../../apiHooks';
import { useSelector, useDispatch } from 'react-redux';
import { initFavorites } from '../../Redux/favoriteCardsSlice';

const GameCard = ( { id, title, image, currentUser } ) => {
  const dispatch = useDispatch();
  const numID = parseInt(currentUser)
  const userFaves = useSelector((state) => state.favoriteCards[currentUser] || []);
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(userFaves.some((favorite) => favorite.id === id));
  }, [id, userFaves])

  const { postUserFavorite, deleteUserFavorite, getUserFavorites } = useApi();

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await deleteUserFavorite(numID, id);
      } else {
        await postUserFavorite(numID, id);
      }
  
      // Manually update the userFaves state
      setIsFavorite(!isFavorite);
  
      // Fetch and initialize user favorites
      const updatedFavorites = await getUserFavorites(numID);
      dispatch(initFavorites({ userID: numID, favorites: updatedFavorites }));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  console.log('userFaves in component:', userFaves);

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
        <div className='selected-favorite-btn' id="save" onClick={toggleFavorite}>
          {isFavorite ? (
            <img src={filled} alt='filled in collection icon showing that this game is saved to the users favorites' style={{ cursor: 'pointer', fontSize: '1.5em'}} />
          ) : (
            <img src={unfilled} alt='unfilled collection icon showing that this game is not saved to the users favorites' style={{ fontSize: '1.5em' }} />
          )}
        </div>
      </div>
    </div>
  );
};

GameCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default GameCard;