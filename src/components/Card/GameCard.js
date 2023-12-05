import './GameCard.css'
import { Link } from 'react-router-dom'

function GameCard({ id, title, image }) {

    return (
        <div className='card'>
          <Link to={`/game/${id}`}className='selected-game-link'>
            <img 
              id={id}
              key={id}
              className='game-image'
              src={image}
              alt={`Board game cover for ${title}`}
            />
          </Link>
        </div>
    )
}

export default GameCard