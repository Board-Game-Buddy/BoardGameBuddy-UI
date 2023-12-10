import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import './App.css'
import { getBoardGames, getUsers } from './apiCalls'
import Carousels from "./components/Carousel/Carousels"
import Header from "./components/Header/Header"
import SelectedGame from "./components/SelectedGame/SelectedGame"
import Users from "./components/Users/Users"
import ServerError from "./components/ServerError/ServerError"
import LoadingComponent from "./components/Loading/Loading"
import SavedGames from "./components/SavedGames/SavedGames"

function App() {
  const [games, setGames] = useState([])
  const [serverError, setServerError] = useState({hasError: false, message: ''})
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  })

  useEffect(() => {
    getBoardGames()
      .then((data) => {
        setGames(data.data)
        setIsLoading(false)
      })
      .catch((error) => {
        setServerError({ hasError: true, message: `${error.message}` })
      });
  }, []);

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        setServerError({ hasError: true, message: `${error.message}` })
      })
  }, [])

  const resetError = () => {
    setServerError({ hasError: false, message: '' })
  }

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <div className="App">
      <Header resetError={resetError} currentUser={currentUser} />
      {serverError.hasError ? (
        <ServerError resetError={resetError} serverError={serverError} currentUser={currentUser} />
      ) : isLoading ? (
        <LoadingComponent />
      ) : (
        <Routes>
          <Route path='/:userid/home'
            element={
              <Carousels
                games={games}
                currentUser={currentUser}
                setServerError={setServerError}
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
          <Route path='*' element={<ServerError resetError={resetError} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
