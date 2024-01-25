import "./UserCard.css" 
import PropTypes from 'prop-types';
import { Link } from "react-router-dom" 
import { useDispatch } from 'react-redux';
import LoadingComponent from "../Loading/Loading";
import { useState } from "react";
import { initFavorites } from '../../Redux/favoriteCardsSlice';
import { useApi } from '../../apiHooks';

 
function UserCard({ img, name, id, setCurrentUser, onRemoveUser, showRemoveButton, setShowRemoveButton, setServerError }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)

  const { getUserFavorites, deleteUserProfile } = useApi();

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

  const handleRemoveProfile = (e, id) => {
    e.preventDefault();
    setSelectedUserId(id);
    setShowConfirmationDialog(true);
  };
  
  const handleConfirmRemove = () => {
    deleteUserProfile(selectedUserId)
    .then(() => {
      onRemoveUser(selectedUserId);
      setSelectedUserId(null);
      setShowConfirmationDialog(false);
      setShowRemoveButton(false);
    })
    .catch((error) => {
      console.error("Error deleting user profile:", error);
      setServerError({ hasError: true, message: `${error.message}` });
      })
  };
  
  const handleCancelRemove = () => {
    setSelectedUserId(null);
    setShowConfirmationDialog(false);
    setShowRemoveButton(false);
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
      <div className="remove-action">
        {showRemoveButton && (
          <button onClick={(e) => handleRemoveProfile(e, id)}>X</button>
        )}
      </div>
      {showConfirmationDialog && (
        <div className="confirmation-pop-up">
          <p className="warning">Are you sure?😱 <br /> This is not reversible.</p>
          <button className="yes-delete" onClick={handleConfirmRemove}>Yes, permanently delete.</button>
          <button className="do-not-delete" onClick={handleCancelRemove}>No, take me back.</button>
        </div>
      )}
    </div>
  );
}

export default UserCard

UserCard.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  isRemovedClicked: PropTypes.bool.isRequired, // Make sure it's defined as a bool
};