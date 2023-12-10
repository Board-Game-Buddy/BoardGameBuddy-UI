import "./SavedGames.css"
import GameCard from '../Card/GameCard'
import { useSelector } from 'react-redux'

function SavedGames( {games, currentUser} ) {
  const favoriteCards = useSelector((state) => state.favoriteCards)

  console.log(favoriteCards)

  const savedGames = games.map((game) => {
    if (favoriteCards.includes(game.id)) {
      return (
        <GameCard
          id={game.id}
          key={game.key}
          title={game.attributes.title}
          categories={[game.attributes.categories]}
          image={game.attributes.image_path}
          description={game.attributes.description}
          min_players={game.attributes.min_players}
          max_players={game.attributes.max_players}
          currentUser={currentUser}
        />
      )
    }
    return null
  })
  
  if (favoriteCards.length === 0) {
    return (
      <div className='no-tracked'>
          <h2 className='no-tracked-text'>You do not have any saved games.</h2>
        </div>
    )
  } else {
      return (
        <div className='savedgames'>
          {savedGames}
        </div>
      )}
} 

export default SavedGames