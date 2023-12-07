export function getBoardGames() {
    return fetch("https://middleman-api-8d134831a182.herokuapp.com/api/v1/board_games").then(
      (response) => {
        if (!response.ok) {
          throw new Error(`Board game not found 123`)
        }
        return response.json()
      }
    )
  }

// export function getUsers() {
//   return fetch(//(USER ENDPOINT HERE)).then(
//     (response) => {
//       if (!response.ok) {
//         throw new Error(`Board game not found.`)
//       }
//       return response.json()
//     }
//   )
// }