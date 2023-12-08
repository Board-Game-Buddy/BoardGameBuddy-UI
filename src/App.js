import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';
import { getBoardGames, getUsers } from './apiCalls';
import Carousels from "./components/Carousel/Carousels";
import Header from "./components/Header/Header";
import SelectedGame from "./components/SelectedGame/SelectedGame";
import Users from "./components/Users/Users"
import mockUsers from "./mockUsers";
import ServerError from "./components/ServerError/ServerError";
import LoadingComponent from "./components/Loading/Loading";
import SavedGames from "./components/SavedGames/SavedGames"
import mockGames from "./mockGames";

function App() {
  const [games, setGames] = useState([])
  const [serverError, setServerError] = useState({hasError: false, message: ''})
  const [isLoggedIn, setIsLoggedIn] = useState(false) // might want this for later?
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    getBoardGames()
      .then((data) => {
        setGames(data.data)
        setIsLoading(false)
      })
      .catch((error) => {
        setServerError({hasError: true, message: `${error.message}`})
      })
  }, [])

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data)
      })
      .catch((error) => {
        setServerError({hasError: true, message: `${error.message}`})

      })
  }, [])

  const resetError = () => {
    setServerError({hasError: false, message: ''})
  }
  
 


  // 
  return (
    <div className="App">
      <Header resetError={resetError} currentUser={currentUser} />
      {serverError.hasError ? (
      <ServerError resetError={resetError} serverError={serverError} />
    ) : isLoading ? (
        <LoadingComponent />
    ) : (
      <Routes>
        <Route path='/:userid/home'
            element={
              <Carousels
                games={games}
                currentUser={currentUser}
              />
            }>
          </Route>
          <Route path='/game/:id'
            element={
              <SelectedGame setServerError={setServerError} currentUser={currentUser} />
            }>
          </Route>
        <Route
          path='/'
          element={<Users users={users} setCurrentUser={setCurrentUser} />}
        />
        <Route
          path='/:userid/saved'
          element={<SavedGames games={games} currentUser={currentUser} />}
        />
      </Routes>
    )}
    </div>
  )
}

export default App;
