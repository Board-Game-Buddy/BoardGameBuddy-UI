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
      img={'https://nypost.com/wp-content/uploads/sites/2/2022/10/jack-sparrow-39.jpg?quality=75&strip=all'}
    />
    )
  })

  return (
    <div className="users-container">
      {allUsers}
    </div>
  )}
  

export default Users