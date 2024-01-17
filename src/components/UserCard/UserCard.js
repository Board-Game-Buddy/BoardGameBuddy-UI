import "./UserCard.css" 
import PropTypes from 'prop-types';
import { Link } from "react-router-dom" 
import { useDispatch } from 'react-redux';
import LoadingComponent from "../Loading/Loading";
import { useState } from "react";
import { initFavorites } from '../../Redux/favoriteCardsSlice';
import { useApi } from '../../apiHooks';

 
function UserCard({ img, name, id, setCurrentUser }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  const { getUserFavorites } = useApi();

  const handleCardClick = async () => {
    setCurrentUser(id);
    setIsLoading(true)
    try {
      const updatedFavorites = await getUserFavorites(id);
      dispatch(initFavorites({ userID: id, favorites: updatedFavorites }));
    } catch (error) {
      console.error('Error fetching saved games:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
          <LoadingComponent />
        ) : (
        <Link to={`/${id}/home`} onClick={handleCardClick}>
          <div className="usercard">
            <img src={img} alt='user profile' style={{ transform: 'scale(0.3)' }} />
          </div>
        </Link>
      )}
      <p className="name">{name}</p>
    </div>
  );
}

export default UserCard

UserCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};