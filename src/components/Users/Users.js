import './Users.css'
import PropTypes from 'prop-types';
import UserCard from "../UserCard/UserCard"


function Users( {users, setCurrentUser} ) {
  const allUsers = users.map((user) => {
    return (
      <UserCard 
      key={user.data.id}
      id={user.data.id}
      name={user.data.attributes.name}
      setCurrentUser={setCurrentUser}
      img={user.data.attributes.image_path}
    />
    )
  })

  return (
    <div className="user-selection">
      <div className='add-remove-profiles'>
        <h2 className='add-profile'>Add Profile</h2>
        <h2 className='remove-profile'>Remove Profile</h2>
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