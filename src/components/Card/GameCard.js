import React, { useEffect, useState, useMemo } from 'react';
import './GameCard.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import filled from '../../Assets/filled.png';
import unfilled from '../../Assets/unfilled.png';
import { useApi } from '../../apiHooks';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../Redux/favoriteCardsSlice';

const GameCard = ( { id, title, image, currentUser } ) => {
  const dispatch = useDispatch();
  const numID = parseInt(currentUser)
  const userFaves = useSelector((state) => state.favoriteCards[currentUser] || []);
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(userFaves.some((favorite) => favorite.id === id));
    console.log('userFaves in useEffect:', userFaves);
  }, [id, userFaves])

  const { postUserFavorite, deleteUserFavorite } = useApi();

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await deleteUserFavorite(numID, id);
      } else {
        await postUserFavorite(numID, id);
      }
  
      // Manually update the userFaves state
      setIsFavorite(!isFavorite);
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

// const GameCard = ({ id, title, image, currentUser }) => {
//   const dispatch = useDispatch();
//   const numID = parseInt(currentUser);
//   const userFaves = useSelector((state) => state.favoriteCards[currentUser] || []);
//   const isFavorite = userFaves.some((favorite) => favorite.id === id);

//   const { postUserFavorite, deleteUserFavorite } = useApi();

//   const toggleFavorite = async () => {
//     try {
//       if (isFavorite) {
//         await deleteUserFavorite(numID, id);
//         dispatch(removeFavorite({ userID: numID, cardID: id }));
//       } else {
//         await postUserFavorite(numID, id);
//         dispatch(addFavorite({ userID: numID, cardID: id }));
//       }
//     } catch (error) {
//       console.error('Error toggling favorite:', error);
//     }
//   };

//   return (
//     <div className='card'>
//       <div className='image-container'>
//         <Link to={`/game/${id}`} className='selected-game-link'>
//           <img
//             id={id}
//             key={id}
//             className='game-image'
//             src={image || 'https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png'}
//             alt={`Board game cover for ${title}`}
//           />
//         </Link>
//         <div className='selected-favorite-btn' id="save" onClick={toggleFavorite}>
//           {isFavorite ? (
//             <img src={filled} alt='filled in collection icon showing that this game is saved to the users favorites' style={{ cursor: 'pointer', fontSize: '1.5em'}} />
//           ) : (
//             <img src={unfilled} alt='unfilled collection icon showing that this game is not saved to the users favorites' style={{ fontSize: '1.5em' }} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

GameCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default GameCard;


  // const toggleFavorite = async () => {
  //   try {
  //     if (isFavorite) {
  //       await deleteUserFavorite(numID, id);
  //       dispatch(removeFavorite({ userID: numID, cardID: id }));
  //     } else {
  //       await postUserFavorite(numID, id);
  //       dispatch(addFavorite({ userID: numID, cardID: id }));
  //     }
  //   } catch (error) {
  //     console.error('Error toggling favorite:', error);
  //   }
  // };