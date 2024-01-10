import "./SavedGames.css"
import PropTypes from 'prop-types';
import GameCard from '../Card/GameCard'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { getSelectedGame } from "../../apiCalls";
import LoadingComponent from "../Loading/Loading";

function SavedGames({ currentUser, setServerError}) {
  const [renderedGames, setRenderedGames] = useState([])
  const [loading, setLoading] = useState(true)
  const favoriteCardsRedux = useSelector((state) => state.favoriteCards[currentUser])

  useEffect(() => {
    const renderGameCards = async () => {
      const gamesToRender = []
      for (const game of favoriteCardsRedux) {
        try {
          const selectedGameData = await getSelectedGame(game.id)
          gamesToRender.push(
            
            <GameCard
            id={selectedGameData.data.id}
            key={selectedGameData.data.id}
            title={selectedGameData.data.attributes.title}
            image={selectedGameData.data.attributes.image_path}
            currentUser={currentUser}
            />
            )
          } catch (error) {
            console.error(`Error fetching selected game with ID ${game.id}:`, error)
            setServerError({ hasError: true, message: `${error.message}` })
          }
        }
        setRenderedGames(gamesToRender)
      }
      renderGameCards()
      setLoading(false)
    }, [currentUser, setServerError, favoriteCardsRedux])
    
  if (loading) {
    return <LoadingComponent />
  }

  if (favoriteCardsRedux.length === 0) {
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
  currentUser: PropTypes.number.isRequired,
};