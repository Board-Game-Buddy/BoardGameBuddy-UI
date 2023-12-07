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

  const resetError = () => {
    setServerError({hasError: false, message: ''})
  }
  
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
      {serverError.hasError ? (
      <ServerError resetError={resetError} serverError={serverError} />
    ) : isLoading ? (
        <LoadingComponent />
    ) : (
      <Routes>
        <Route path='/user:userid/home'
            element={
              <Carousels
                games={games}
              />
            }>
          </Route>
          <Route path='/game/:id'
            element={
              <SelectedGame setServerError={setServerError} />
            }>
          </Route>
        <Route
          path='/'
          element={<Users users={users} />}
        />
        <Route
          path='/saved'
          element={<SavedGames games={games} />}
        />
      </Routes>
    )}
    </div>
  )
}

export default App;
