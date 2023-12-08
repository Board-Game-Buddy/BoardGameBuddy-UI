import "./UserCard.css" 
import { Link } from "react-router-dom" 
 
function UserCard({ img, name, id, setCurrentUser }) {
  const handleCardClick = () => {
    setCurrentUser(id);
  };

  return (
    <div>
      <Link to={`/${id}/home`} onClick={handleCardClick}>
        <div className="usercard">
          <img src={img} style={{ transform: 'scale(0.15)' }} />
        </div>
      </Link>
      <p>{name}</p>
    </div>
  );
}
// we will need to make this an image!

export default UserCard