import { useDispatch } from 'react-redux'
import { addFavorite, removeFavorite, initFavorites } from './Redux/favoriteCardsSlice'

export function useApi() {
  const dispatch = useDispatch()

  const getUserFavorites = (userID) => {
    return fetch(`https://boardgamebuddy-api-a3b5bf335532.herokuapp.com/users/${userID}/favorites`)
      .then(response => {
        if (!response.ok) {
          throw new Error('User favorites not found.')
        }
        return response.json()
      })
      .then(data => {
        dispatch(initFavorites({ userID, favorites: data }))
        return data
      })
  }

  const postUserFavorite = (userID, gameID) => {
    return fetch(`https://boardgamebuddy-api-a3b5bf335532.herokuapp.com/users/${userID}/favorites?board_game_id=${gameID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to add favorite. Status: ${response.status}`)
        }
        dispatch(addFavorite({ userID, cardID: gameID.toString() }))
        return response.json()
      })
  }

  const deleteUserFavorite = (userID, gameID) => {
    return fetch(`https://boardgamebuddy-api-a3b5bf335532.herokuapp.com/users/${userID}/favorites?board_game_id=${gameID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to delete favorite. Status: ${response.status}`)
        }
        dispatch(removeFavorite({ userID, cardID: gameID.toString() }))
        return { success: true }
      })
      .catch(error => {
        console.error('Error deleting favorite:', error)
        return { success: false, error: error.message }
      })
  }

  return { getUserFavorites, postUserFavorite, deleteUserFavorite }
}