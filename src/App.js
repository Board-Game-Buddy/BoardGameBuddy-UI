import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import './App.css'
import { getUsers } from './apiCalls'
import Carousels from "./components/Carousel/Carousels"
import Header from "./components/Header/Header"
import SelectedGame from "./components/SelectedGame/SelectedGame"
import Users from "./components/Users/Users"
import ServerError from "./components/ServerError/ServerError"
import LoadingComponent from "./components/Loading/Loading"
import SavedGames from "./components/SavedGames/SavedGames"
import { useApi } from "./apiHooks"
import { useSelector, useDispatch } from "react-redux"
import { initFavorites } from './Redux/favoriteCardsSlice'
import AllGames from "./components/AllGames/AllGames"

function App() {
  const [serverError, setServerError] = useState({hasError: false, message: ''})
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  })
  const [userFaves, setUserFaves] = useState([])
  const { getUserFavorites } = useApi()
  const favoriteCardsRedux = useSelector((state) => state.favoriteCards[currentUser])
  const dispatch = useDispatch()

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
        setIsLoading(false)
      })
      .catch((error) => {
        setServerError({ hasError: true, message: `${error.message}` })
      })
  }, [])

  useEffect(() => {
    getUserFavorites(currentUser)
      .then((data) => {
        setUserFaves(data);
        dispatch(initFavorites({ userID: currentUser, favorites: data }))
        setIsLoading(false)
      })
      .catch((error) => {
        setServerError({ hasError: true, message: `${error.message}` })
      })
  }, [currentUser, dispatch, favoriteCardsRedux])

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
                currentUser={currentUser}
                setServerError={setServerError}
                userFaves={userFaves}
              />
            }>
          </Route>
          <Route path='/game/:id'
            element={
              <SelectedGame setServerError={setServerError} currentUser={currentUser} userFaves={userFaves} />
            }>
          </Route>
          <Route
            path='/'
            element={<Users users={users} setCurrentUser={setCurrentUser} />}
          />
          <Route
            path='/:userid/saved'
            element={<SavedGames currentUser={currentUser} setServerError={setServerError} setIsLoading={setIsLoading} isLoading={isLoading} userFaves={userFaves} />}
          />
          <Route
            path='/:userid/:pagenumber'
            element={<AllGames currentUser={currentUser} setServerError={setServerError} />}
          />
          <Route path='*' element={<ServerError resetError={resetError} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
