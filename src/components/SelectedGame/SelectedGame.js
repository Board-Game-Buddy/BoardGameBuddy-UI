import './SelectedGame.css'
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSelectedGame } from '../../apiCalls'
// import train from '../../Assets/train.png'
import { useDispatch } from 'react-redux'
// import { addFavorite, removeFavorite } from '../../Redux/favoriteCardsSlice'
import filled from '../../Assets/filled.png'
import unfilled from '../../Assets/unfilled.png'
import back from '../../Assets/Back.png'
import { useApi } from '../../apiHooks'

function SelectedGame({ setServerError, currentUser, userFaves }) {

    const { id } = useParams()
    const idNum = parseInt(currentUser)
    // const idNum = parseInt(id)
    const [selectedGame, setSelectedGame] = useState(false)
    // const favoriteCards = useSelector((state) => state.favoriteCards[currentUser] || [])
    const dispatch = useDispatch()
    // const isFavorite = favoriteCards.includes(id);
    // const isFavorite = useSelector((state) => {
    //   return state.favoriteCards[currentUser]?.includes(id) || false;
    // })
    const isFavorite = userFaves.some((favorite) => favorite.id === id)
    const { postUserFavorite, deleteUserFavorite } = useApi()

      useEffect(() => {
        getSelectedGame(id)
          .then((data) => {
            setSelectedGame(data.data)
          })
          .catch((error) => {
            setServerError({ hasError: true, message: `${error.message}` })
          })
      }, [id, setServerError])

    const replaceLineBreaks = (text) => {
      return text.replace(/&#10;/g, '<br />')
    }

    function generateStars(rating) {
      const totalStars = 5;
      const fullStars = Math.round(rating/2)
      const remainingStars = totalStars - fullStars
    
      const stars = Array.from({ length: fullStars }, (_, index) => (
        <span key={index} role="img" aria-label="star">
          ⭐
        </span>
      ))
    
      const transparentStars = Array.from({ length: remainingStars }, (_, index) => (
        <span key={fullStars + index} role="img" aria-label="star" className="transparent-star">
          ⭐
        </span>
      ))
    
      return [...stars, ...transparentStars];
    }

    const toggleFavorite = () => {
      if (isFavorite) {
        deleteUserFavorite(idNum, id)
    } else {
        postUserFavorite(idNum, id)
      }
    }
 
    return selectedGame && (
      <div className='entire-page'>
        <div className='selected-game-container'>
          <div className='selected-game-info'>
            <Link to={`/${currentUser}/home`}>
              <img src={back} alt='back button' className='back-button' />
            </Link>
            <div className='above-image'>
              <h1 className='game-title'>{selectedGame.attributes.title}</h1>
                <h3 className='players'>{selectedGame.attributes.min_players}-{selectedGame.attributes.max_players} players</h3>
                { selectedGame.attributes.rating > 0 ? (
                  <h3 className='rating'>
                  Average Rating: {Math.round(selectedGame.attributes.rating?.toFixed(1) / 2)}/5 {generateStars(selectedGame.attributes.rating)}
                  </h3>
                ) : (
                  <h3 className='rating'>
                  Average Rating: Not yet rated
                  </h3>
                )
                }
            </div>
            <div className='image-container'>
              <img className='selected-game-image' src={selectedGame.attributes.image_path} alt={`boardgame cover for ${selectedGame.attributes.title}`} />
            </div>
            <h3 className='categories'>{selectedGame.attributes.categories}</h3>
            <div className='selected-favorite-button' id="save" onClick={() => toggleFavorite()}>
                {isFavorite ? (
                    <img src={filled} alt='filled in collection icon showing that this game is saved to the users favorites' style={{cursor: 'pointer', fontSize: '1.3em'}} />) : 
                    (
                    <img src={unfilled} alt='unfilled collection icon showing that this game is not saved to the users favorites' style={{fontSize: '1.3em'}} />
                )}
                </div>
          </div>
          <div className='selected-game-instructions-container'>
            <p className='game-instructions' dangerouslySetInnerHTML={{ __html: replaceLineBreaks(selectedGame.attributes.description) }} ></p>
          </div>
        </div>
        {/* <div className='wrap-buttons'> */}
          {/* <div className='previous-next-buttons'>  */}
            {/* <div className='previous'>
              <Link to={`/game/${idNum - 1}`}>
                <img className='previous-train' src={train} alt='train icon facing left' />
                <div className='text'>PREVIOUS</div>
              </Link>
            </div> */}
            {/* <div className='next'>
              <Link to={`/game/${idNum + 1}`}>
                <img className='next-train' src={train} alt='train icon facing right' />
                <div className='text'>NEXT</div>
              </Link>
            </div> */}
          {/* </div> */}
        {/* </div> */}
      </div>
    )
}

export default SelectedGame

SelectedGame.propTypes = {
  setServerError: PropTypes.func.isRequired,
  currentUser: PropTypes.number.isRequired,
};