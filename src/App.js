import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';
import { getBoardGames, getUsers } from './apiCalls';
import Carousels from "./components/Carousel/Carousels";
import Header from "./components/Header/Header";
import Users from "./components/Users/Users"
import mockUsers from "./mockUsers";
import SavedGames from "./components/SavedGames/SavedGames"
import mockGames from "./mockGames";

function App() {
  const [games, setGames] = useState([])
  const [serverError, setServerError] = useState({hasError: false, message: ''})
  const [isLoggedIn, setIsLoggedIn] = useState(false) // might want this for later?
  const [users, setUsers] = useState([])

  useEffect(() => {
    getBoardGames()
      .then((data) => {
        setGames(data.data)
      })
      .catch((error) => {
        setServerError({hasError: true, message: `${error.message}`})
      })
  }, [])

  // DELETE THIS ONCE WE HAVE A USERS ENDPOINT!
  // useEffect(() => {
  //   setUsers(mockUsers)
  //   setGames(mockGames)
  //   console.log(users)
  // }, [])


  // USING MOCK DATA CURRENTLY, UNCOMMENT THIS ONCE THE ENDPOINT IS READY

  // useEffect(() => {
  //   getUsers()
  //     .then((data) => {
  //       setUsers(data.data)
  //     })
  //     .catch((error) => {
  //       setServerError({hasError: true, message: `${error.message}`})

  //     })
  // }, [])


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path='/'
          element={<Users users={users} />}
        />
        <Route
          path='/home'
          element={<Carousels games={games} />}
        />
        <Route
          path='/saved'
          element={<SavedGames games={games} />}
        />
      </Routes>
    </div>
  )
}

export default App;
