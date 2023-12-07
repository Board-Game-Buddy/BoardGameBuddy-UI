import './Users.css'
import UserCard from "../UserCard/UserCard"

function Users( {users, setCurrentUser} ) {
  const allUsers = users.map((user) => {
    return (
      <UserCard 
      key={user.data.id}
      id={user.data.id}
      name={user.data.attributes.name}
      setCurrentUser={setCurrentUser}
    />
    )
  })

  return (
    <div className="users-container">
      {allUsers}
    </div>
  )}
  

export default Users