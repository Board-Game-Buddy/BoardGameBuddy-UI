import './Users.css'
import PropTypes from 'prop-types';
import UserCard from "../UserCard/UserCard"
import { Link } from 'react-router-dom';
import { useState } from 'react';


function Users( {users, setCurrentUser, onRemoveUser, setServerError } ) {
  const [isRemoveProfileClicked, setIsRemoveProfileClicked] = useState(false)

  const toggleRemoveProfile = () => {
    setIsRemoveProfileClicked(!isRemoveProfileClicked);
  }

  const allUsers = users.map((user) => {
    return (
      <UserCard 
      key={user.data.id}
      id={user.data.id}
      name={user.data.attributes.name}
      setCurrentUser={setCurrentUser}
      img={user.data.attributes.image_path || 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='}
      onRemoveUser={onRemoveUser}
      showRemoveButton={isRemoveProfileClicked}
      setShowRemoveButton={setIsRemoveProfileClicked}
      setServerError={setServerError}
    />
    )
  })

  return (
    <div className="user-selection">
      <div className='add-remove-profiles'>
        <Link to='/newuser' >
          <h2 className='add-profile'>Add Profile</h2>
        </Link>
        {/* <h2 className='remove-profile' onClick={toggleRemoveProfile}>Remove Profile</h2> */}
      </div>
      <div className='users-container'>
      {allUsers}
      </div>
    </div>
  )}
  

export default Users

Users.propTypes = {
  users: PropTypes.array.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};