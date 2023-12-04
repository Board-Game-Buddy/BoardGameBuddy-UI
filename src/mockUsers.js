const mockUsers = 
[
  {
  "data": {
    "type": "users",
    "id": "123",
    "attributes": {
      "name": "Example",
      "email": "user@example.com"
    },
    "favorites": [
      {
        "id": "1",
        "title": "Board Game 1"
      },
      {
        "id": "2",
        "title": "Board Game 2"
      }
    ]
  }
},
{
  "data": {
    "type": "users",
    "id": "456",
    "attributes": {
      "name": "Frodo",
      "email": "frodo@example.com"
    },
    "favorites": [
      {
        "id": "3",
        "title": "LOTR THE GAME"
      },
      {
        "id": "4",
        "title": "THE SILMARILLION"
      }
    ]
  }
}
]

export default mockUsers