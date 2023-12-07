import "./UserCard.css" 
import { Link } from "react-router-dom" 
 
function UserCard({img, name, id}) {
  return (
    <div>
      <Link to={`${name}/${id}/home`}>
        <div className="usercard" >
          <img src={img} style={{scale: "15%"}}/> 
        </div>
      </Link>
      <p>{name}</p>
    </div>
  )
}
// we will need to make this an image!

export default UserCard