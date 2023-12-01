import './GameCard.css'

function GameCard({ id, title, image }) {

    return (
        <div className='card'>
          <img 
            id={id}
            key={id}
            className='game-image'
            src={image}
            alt={`Board game cover for ${title}`}
          />
        </div>
    )
}

export default GameCard