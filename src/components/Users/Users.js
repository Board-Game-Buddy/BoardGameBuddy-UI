import './Users.css'
import UserCard from "../UserCard/UserCard"

function Users( {users} ) {
  const allUsers = users.map((user) => {
    return (
      <UserCard 
      key={user.id}
      id={user.id}
    />
    )
  })

  return (
    <div className="users-container">
      {allUsers}
    </div>
  )}
  

export default Users