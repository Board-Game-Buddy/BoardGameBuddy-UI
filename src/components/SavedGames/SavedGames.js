import "./SavedGames.css"
import GameCard from '../Card/GameCard'

function SavedGames( {games} ) {
  const savedGames = games.map(game => {
    return (
        <GameCard 
            id={game.id}
            key={game.key}
            title={game.attributes.title}
            categories={[game.attributes.categories]}
            image={game.attributes.cover_image}
            description={game.attributes.description}
            min_players={game.attributes.min_players}
            max_players={game.attributes.max_players}
        />
    )
    })
  
  return (
    <div className='savedgames'>
        {savedGames}
    </div>
  )
  
} 



export default SavedGames

