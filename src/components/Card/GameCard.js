import React, { useEffect, useState } from 'react';
import './GameCard.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import filled from '../../Assets/filled.png';
import unfilled from '../../Assets/unfilled.png';
import { useApi } from '../../apiHooks';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite, updateFavoriteStatus } from '../../Redux/favoriteCardsSlice';

const GameCard = ({ id, title, image, currentUser }) => {
  const idNum = parseInt(currentUser);
  const dispatch = useDispatch();
  const [localIsFavorite, setLocalIsFavorite] = useState(false);

  // Provide a default empty array if userFaves is undefined
  const userFaves = useSelector((state) => state.favoriteCards[currentUser] || []);

  const isFavorite = userFaves.some((favorite) => favorite && favorite.id === id);
  const { postUserFavorite, deleteUserFavorite, getUserFavorites } = useApi();

  useEffect(() => {
    setLocalIsFavorite(isFavorite);
    const updateFavoriteUI = () => {
      dispatch(updateFavoriteStatus({ gameID: id, isFavorite }));
    };

    updateFavoriteUI();
  }, [isFavorite, dispatch, id]);

  const toggleFavorite = async () => {
    try {
      setLocalIsFavorite(!localIsFavorite); // Update UI immediately

      if (localIsFavorite) {
        await deleteUserFavorite(idNum, id);
        dispatch(removeFavorite({ userID: idNum, gameID: id }));
      } else {
        await postUserFavorite(idNum, id);
        dispatch(addFavorite({ userID: idNum, gameID: id }));
      }

      // Fetch the updated user favorites
      await getUserFavorites(idNum);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Handle error if needed
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
          {localIsFavorite ? (
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
