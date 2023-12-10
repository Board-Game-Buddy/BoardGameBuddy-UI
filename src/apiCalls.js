export function getBoardGames() {
    return fetch("https://middleman-api-8d134831a182.herokuapp.com/api/v1/board_games").then(
      (response) => {
        if (!response.ok) {
          throw new Error(`Board games not found`)
        }
        return response.json()
      }
    )
  }

export function getUsers() {
  return fetch(`https://boardgamebuddy-api-a3b5bf335532.herokuapp.com/users`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(`Users not found.`)
      }
     return response.json()
    }
  )
}

export function getSelectedGame(id) {
  return fetch(`https://middleman-api-8d134831a182.herokuapp.com/api/v1/board_games/${id}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Game not found.')
    }
    return response.json()
  })
}

export function getSearchedGames(searchCriteria) {
  return fetch(`https://middleman-api-8d134831a182.herokuapp.com/api/v1/board_games/all_by_params?${searchCriteria}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Two player games not found.')
    }
    return response.json()
  })
}