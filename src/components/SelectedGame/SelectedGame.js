import './SelectedGame.css'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {getSelectedGame} from '../../apiCalls'

function SelectedGame({ setServerError }) {
    const { id } = useParams()
    const [selectedGame, setSelectedGame] = useState(false)

    useEffect( () => {  
      getSelectedGame(id)
        .then(data => setSelectedGame(data.data))
        .catch(error => setServerError({hasError: true, message: `${error.message}`}))
      }, [id, setServerError])

      if (!selectedGame) {
        return <div>Loading...</div>
      }

    const replaceLineBreaks = (text) => {
      return text.replace(/&#10;/g, '<br />')
    }

    return selectedGame && (
        <div className='selected-game-container'>
            <div className='selected-game-image-container'>
                <img className='selected-game-image' src={selectedGame.attributes.cover_image} alt={`boardgame cover for ${selectedGame.attributes.title}`} />
            </div>
            <div className='selected-game-info'>
                <h2 className='game-title'>{selectedGame.attributes.title}</h2>
                <div className='player-range'>
                  <h3>{selectedGame.attributes.min_players}-{selectedGame.attributes.max_players} players</h3>
                </div>
                <h3 className='rating'>
                  Average Rating: {selectedGame.attributes.rating?.toFixed(1/2)/2}/5 <br />
                  {selectedGame.attributes.categories?.join(', ')}
                </h3>
                <p className='description' dangerouslySetInnerHTML={{ __html: replaceLineBreaks(selectedGame.attributes.description) }} />
            </div>
        </div>
    )
}

export default SelectedGame