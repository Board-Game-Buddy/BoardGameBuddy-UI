import './Users.css'
import UserCard from "../UserCard/UserCard"

function Users( {users} ) {
  const allUsers = users.map((user) => {
    return (
      <UserCard 
      key={user.data.attributes.id}
      id={user.data.attributes.id}
      img={user.data.attributes.picture}
      name={user.data.attributes.name}
    />
    )
  })

  return (
    <div className="users-container">
      {allUsers}
    </div>
  )}
  

export default Users