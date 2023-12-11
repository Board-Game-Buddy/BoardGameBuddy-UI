import "./SavedGames.css"
import PropTypes from 'prop-types';
import GameCard from '../Card/GameCard'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { getSelectedGame } from "../../apiCalls";
import LoadingComponent from "../Loading/Loading";

function SavedGames({ currentUser, setServerError, userFaves}) {
  const idNum = parseInt(currentUser)
  const favoriteCards = useSelector((state) => state.favoriteCards[currentUser] || [])
  const [renderedGames, setRenderedGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const renderGameCards = async () => {
      const gamesToRender = []

      for (const game of userFaves) {
        try {
          const selectedGameData = await getSelectedGame(game.id)
          gamesToRender.push(
            
            <GameCard
              id={selectedGameData.data.id}
              key={selectedGameData.data.id}
              title={selectedGameData.data.attributes.title}
              image={selectedGameData.data.attributes.image_path}
              currentUser={currentUser}
              userFaves={userFaves}
            />
          )
        } catch (error) {
          console.error(`Error fetching selected game with ID ${game.id}:`, error)
        }
      }
      setRenderedGames(gamesToRender)
    }
    renderGameCards()
    setLoading(false)
  }, [userFaves, currentUser])

  if (loading) {
    return <LoadingComponent />
  }

  if (userFaves.length === 0) {
    return (
      <div className="no-tracked">
        <h2 className="no-tracked-text">You do not have any saved games.</h2>
      </div>
    )
  } else {
    return <div className="savedgames">{renderedGames}</div>
  }
}

export default SavedGames

SavedGames.propTypes = {
  games: PropTypes.array.isRequired,
  currentUser: PropTypes.number.isRequired,
};