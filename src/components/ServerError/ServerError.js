import './ServerError.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function ServerError({ resetError, serverError}) {

    const errorMessage = serverError && serverError.message ? serverError.message : 'Unknown error occurred.'

    return (
        <div className='serverError'>
            <img className='error-image' alt='monopoly bankruptcy card' src='https://static.wikia.nocookie.net/monopoly/images/9/90/Bankruptcy_monopoly.jpg/revision/latest?cb=20130910230033' /> 
            <p className='error-message'>Oh no! {errorMessage}</p>
            <Link to={'/home'} onClick={() => {resetError()}} className='home-link'>
                <button className='return-button'>Return Home</button>
            </Link>
        </div>
    )
}

export default ServerError

ServerError.propTypes = {
    serverError: PropTypes.shape({
        hasError: PropTypes.bool.isRequired,
        message:  PropTypes.string.isRequired,
    }),
    resetError: PropTypes.func.isRequired,
  }