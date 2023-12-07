export function getBoardGames() {
    return fetch("https://middleman-api-8d134831a182.herokuapp.com/api/v1/board_games").then(
      (response) => {
        if (!response.ok) {
          throw new Error(`Board game not found.`)
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

export function getUses() {
  return fetch(//(USER ENDPOINT HERE)).then(
    (response) => {
      if (!response.ok) {
        throw new Error(`Board game not found.`)
      }
      return response.json()
    }
  )
}

