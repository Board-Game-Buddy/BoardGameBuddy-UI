import "./UserCard.css" 

function UserCard({img, name}) {
  return (
    <div>
      <div className="usercard" >
        <img src={img} style={{scale: "15%"}}/> 
      </div>
      <p>{name}</p>
    </div>
  )
}
// we will need to make this an image!

export default UserCard