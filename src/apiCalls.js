export function getBoardGames() {
    return fetch("https://ac689483-544e-4335-a572-bbf61c716c89.mock.pstmn.io/boardgames?category=strategy").then(
      (response) => {
        if (!response.ok) {
          throw new Error(`Board game not found.`)
        }
        return response.json()
      }
    )
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