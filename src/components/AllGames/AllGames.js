import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import { getGamesByPage } from './apiCalls'

function AllGames( {currentUser} ) {
  


  const currentGames = games.map((game) => {
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
        {currentGames}
      </div>
    )
} 

export default AllGames