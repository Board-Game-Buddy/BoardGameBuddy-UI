import './SelectedGame.css'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSelectedGame } from '../../apiCalls'
import train from '../../Assets/train.png'
import { useSelector, useDispatch } from 'react-redux'
import { addFavorite, removeFavorite } from '../../Redux/favoriteCardsSlice'
import filled from '../../Assets/filled.png'
import unfilled from '../../Assets/unfilled.png'

function SelectedGame({ setServerError, currentUser }) {
    const { id } = useParams()
    const idNum = parseInt(id)
    const [selectedGame, setSelectedGame] = useState(false)
    const favoriteCards = useSelector((state) => state.favoriteCards)
    const dispatch = useDispatch()
    const isFavorite = favoriteCards.includes(id);

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
        dispatch(removeFavorite(id))
    } else {
        dispatch(addFavorite(id));
      }
  }

  // if (currentUser === null) {
  //   window.location.href = '/';
  //   return null;
  // }
 
    return selectedGame && (
      <div className='entire-page'>
        <div className='selected-game-container'>
          <div className='selected-game-info'>
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
        <div className='wrap-buttons'>
          <div className='previous-next-buttons'> 
            <div className='previous'>
              <Link to={`/game/${idNum - 1}`}>
                <img className='previous-train' src={train} alt='train icon facing left' />
                <div className='text'>PREVIOUS</div>
              </Link>
            </div>
            <div className='next'>
              <Link to={`/game/${idNum + 1}`}>
                <img className='next-train' src={train} alt='train icon facing right' />
                <div className='text'>NEXT</div>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    )
}

export default SelectedGame





// function SelectedGame({ setServerError }) {
//     const { id } = useParams()
//     const [selectedGame, setSelectedGame] = useState(false)

//     useEffect( () => {  
//       getSelectedGame(id)
//         .then(data => setSelectedGame(data.data))
//         .catch(error => setServerError({hasError: true, message: `${error.message}`}))
//       }, [id, setServerError])

//       if (!selectedGame) {
//         return <div>Loading...</div>
//       }

//     const replaceLineBreaks = (text) => {
//       return text.replace(/&#10;/g, '<br />')
//     }

//     return selectedGame && (
//         <div className='selected-game-container'>
//             <div className='selected-game-image-container'>
//                 <img className='selected-game-image' src={selectedGame.attributes.cover_image} alt={`boardgame cover for ${selectedGame.attributes.title}`} />
//             </div>
//             <div className='selected-game-info'>
//                 <h2 className='game-title'>{selectedGame.attributes.title}</h2>
//                 <div className='player-range'>
//                   <h3>{selectedGame.attributes.min_players}-{selectedGame.attributes.max_players} players</h3>
//                 </div>
//                 <h3 className='rating'>
//                   Average Rating: {selectedGame.attributes.rating?.toFixed(1/2)/2}/5 <br />
//                   {selectedGame.attributes.categories?.join(', ')}
//                 </h3>
//                 <p className='description' dangerouslySetInnerHTML={{ __html: replaceLineBreaks(selectedGame.attributes.description) }} />
//             </div>
//         </div>
//     )
// }

// export default SelectedGame