import "./UserCard.css" 
import PropTypes from 'prop-types';
import { Link } from "react-router-dom" 
 
function UserCard({ img, name, id, setCurrentUser }) {
  const handleCardClick = () => {
    setCurrentUser(id);
  };

  return (
    <div>
      <Link to={`/${id}/home`} onClick={handleCardClick}>
        <div className="usercard">
          <img src={img} alt='user profile' style={{ transform: 'scale(0.3)' }} />
        </div>
      </Link>
      <p className="name">{name}</p>
    </div>
  );
}
// we will need to make this an image!

export default UserCard

UserCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};