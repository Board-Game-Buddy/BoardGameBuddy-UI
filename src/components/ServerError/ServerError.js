import './ServerError.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function ServerError({ resetError, serverError, currentUser }) {

    const errorMessage = serverError && serverError.message ? serverError.message : 'Unknown error occurred.'

    return (
        <div className='serverError'>
            <img className='error-image' alt='monopoly bankruptcy card' src='https://render.fineartamerica.com/images/rendered/default/greeting-card/images/artworkimages/medium/3/chance-bankruptcy-card-vintage-monopoly-design-turnpike.jpg?&targetx=0&targety=0&imagewidth=700&imageheight=500&modelwidth=700&modelheight=500&backgroundcolor=280F08&orientation=0' /> 
            <p className='error-message'>Oh no! {errorMessage}</p>
            <Link to={`/${currentUser}/home`} onClick={() => {resetError()}} className='home-link'>
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