import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useApi } from '../../apiHooks';
import "./AddUserForm.css"

function AddUserProfileForm( { addUser, setServerError } ) {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    // const [imagePath, setImagePath] = useState('')

    const { createUserProfile } = useApi();

    function submitUser(e) {
        e.preventDefault();
        console.log("Submit button clicked");
        const newUser = {
          name: name,
          email: email,
        };
        createUserProfile(newUser)
          .then(data => {
            console.log("User profile created:", data);
            addUser(data);
            console.log("Navigating to the home page");
            navigate('/');
          })
        .catch((error) => {
        console.error("Error creating user profile:", error);
        setServerError({ hasError: true, message: `${error.message}` });
        })
      }
      

    return (
      <div className='form-container'>
        <form className="new-user-form">
          <h2 className="form-title">Create New Profile</h2>
          <input
            className="new-input"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="new-input"
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className='form-buttons'>
            <button className="submit-new-profile" onClick={e => submitUser(e)}>
              Create New Profile
            </button>
            <Link to='/' >
              <button className="go-back">
                  Nevermind, Go Home
              </button>
            </Link>
          </div>
        </form>
    </div>
    )
}

export default AddUserProfileForm