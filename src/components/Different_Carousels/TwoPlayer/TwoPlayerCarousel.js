import './TwoPlayerCarousel.css'
import GameCard from '../../Card/GameCard'

function TwoPlayerCarousel({ games }) {

    // change to two but also only if we don't have endpoints
    // const twoPlayers = games.filter(game => game.attributes.max_players === 4)
    //     .map(game => (
    //         <GameCard
    //         id={game.id}
    //         key={game.key}
    //         title={game.attributes.title}
    //         categories={[game.attributes.categories]}
    //         image={game.attributes.cover_image}
    //         description={game.attributes.description}
    //         min_players={game.attributes.min_players}
    //         max_players={game.attributes.max_players}
    //         />
    //     ))

    const twoPlayers = games.map(game => {
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
        <div className='twoPlayer-carousel, carousel'>
            {twoPlayers}
        </div>
    )

}

export default TwoPlayerCarousel