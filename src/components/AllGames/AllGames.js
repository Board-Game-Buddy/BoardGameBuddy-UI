import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import { getGamesByPage } from '../../apiCalls'
import GameCard from "../Card/GameCard"

function AllGames( {currentUser, setServerError} ) {
  const [pageNumber, setPageNumber] = useState(1)
  const [currentGames, setCurrentGames] = useState([]);

  useEffect(() => {
    getGamesByPage(pageNumber)
      .then((data) => {
        setCurrentGames(data.data)
        console.log(currentGames)
      })
      .catch((error) => {
        setServerError({ hasError: true, message: `${error.message}` })
      });
  }, [pageNumber]);

  useEffect(() => {
    console.log(currentGames);
  }, [currentGames]);

  const displayedGames = currentGames.map((game) => {
    if (currentGames.includes(game.id)) {
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
  
    return (
      <div className='allgames'>
        {displayedGames}
      </div>
    )
} 

export default AllGames